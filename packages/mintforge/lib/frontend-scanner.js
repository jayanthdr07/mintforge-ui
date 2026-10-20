const fs = require("fs");
const path = require("path");
const { normalizeRoutePath } = require("./backend-scanner");

/**
 * Scan frontend TypeScript/JavaScript files for API calls and Zod schemas
 */
function scanFrontend(frontendConfig) {
  const { path: frontendPath, basePrefix = "" } = frontendConfig;

  if (!fs.existsSync(frontendPath)) {
    return {
      calls: [],
      schemas: {},
      error: `Frontend path not found: ${frontendPath}`,
    };
  }

  const files = findFiles(frontendPath, [".ts", ".tsx", ".js", ".jsx"]);
  const calls = [];
  const schemas = {};

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");

    // 1. Extract API client calls (api.get, axios.post, fetch, etc.)
    const fileCalls = extractApiCalls(content, file, basePrefix);
    calls.push(...fileCalls);

    // 2. Extract Zod schemas
    const fileSchemas = extractZodSchemas(content, file);
    Object.assign(schemas, fileSchemas);
  }

  return { calls, schemas };
}

function extractApiCalls(content, file, basePrefix) {
  const calls = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Pattern 1: api.post(...) or axios.get(...) or request.post(...)
    const clientMatch = line.match(/(?:api|axios|client|request|http)\.(get|post|put|patch|delete)(?:<([A-Za-z0-9_]+)>)?\s*\(\s*([`'"][^`'"]+[`'"])/i);
    if (clientMatch) {
      const method = clientMatch[1].toUpperCase();
      const responseType = clientMatch[2] || null;
      let rawUrl = clientMatch[3].slice(1, -1); // strip quotes or backticks

      // Separate query string from URL path
      const [urlOnly, queryString] = rawUrl.split("?");

      // Clean template string expressions: /interviews/${sessionId}/feedback -> /interviews/:session_id/feedback
      const normalizedParamPath = urlOnly.replace(/\$\{([a-zA-Z0-9_]+)\}/g, ":$1");
      const normalized = normalizeRoutePath(normalizedParamPath);

      // Extract query parameters from URL and params object
      const queryParams = new Set();
      if (queryString) {
        queryString.split("&").forEach((part) => {
          const key = part.split("=")[0].trim();
          if (key) queryParams.add(key);
        });
      }

      const paramsContext = lines.slice(i, Math.min(lines.length, i + 10)).join("\n");
      const paramsMatch = paramsContext.match(/params\s*:\s*\{([^}]+)\}/);
      if (paramsMatch) {
        paramsMatch[1].split(",").forEach((item) => {
          const key = item.split(":")[0].trim();
          if (/^[a-zA-Z0-9_]+$/.test(key)) {
            queryParams.add(key);
          }
        });
      }

      // Attempt to inspect payload passed as 2nd argument
      let payloadFields = [];
      if (["POST", "PUT", "PATCH"].includes(method)) {
        payloadFields = extractPayloadKeysFromContext(lines, i, content);
      }

      calls.push({
        method,
        rawUrl,
        path: normalized,
        queryParams: Array.from(queryParams),
        payloadFields,
        responseType,
        file,
        line: lineNum,
      });
      continue;
    }

    // Pattern 2: fetch("...", { method: "POST", body: JSON.stringify(...) })
    const fetchMatch = line.match(/fetch\s*\(\s*([`'"][^`'"]+[`'"])/i);
    if (fetchMatch) {
      const rawUrl = fetchMatch[1].slice(1, -1);
      const [urlOnly, queryString] = rawUrl.split("?");
      const normalizedParamPath = urlOnly.replace(/\$\{([a-zA-Z0-9_]+)\}/g, ":$1");
      const normalized = normalizeRoutePath(normalizedParamPath);

      const queryParams = new Set();
      if (queryString) {
        queryString.split("&").forEach((part) => {
          const key = part.split("=")[0].trim();
          if (key) queryParams.add(key);
        });
      }

      // Look ahead for method
      let method = "GET";
      for (let j = i; j < Math.min(i + 6, lines.length); j++) {
        const mMatch = lines[j].match(/method\s*:\s*["'](GET|POST|PUT|PATCH|DELETE)["']/i);
        if (mMatch) {
          method = mMatch[1].toUpperCase();
          break;
        }
      }

      let payloadFields = [];
      if (["POST", "PUT", "PATCH"].includes(method)) {
        payloadFields = extractPayloadKeysFromContext(lines, i, content);
      }

      calls.push({
        method,
        rawUrl,
        path: normalized,
        queryParams: Array.from(queryParams),
        payloadFields,
        responseType: null,
        file,
        line: lineNum,
      });
    }
  }

  return calls;
}

/**
 * Extracts payload keys by looking around the call site:
 * - inline object: api.post(url, { scores, strengths, ... })
 * - function parameter type: export async function submit(sessionId, payload: { ... })
 */
function extractPayloadKeysFromContext(lines, lineIdx, fullContent) {
  const line = lines[lineIdx];
  const keys = new Set();

  // 1. Look for inline object in the call: api.post(url, { foo, bar })
  const contextSnippet = lines.slice(Math.max(0, lineIdx - 1), Math.min(lines.length, lineIdx + 15)).join("\n");
  const inlineObjMatch = contextSnippet.match(/(?:api|axios|request|client|http)\.(?:post|put|patch)\s*\([^,]+,\s*\{([^}]+)\}/s);
  if (inlineObjMatch) {
    const rawProps = inlineObjMatch[1].split(",");
    for (const prop of rawProps) {
      const trimmed = prop.trim();
      if (!trimmed) continue;
      const key = trimmed.split(":")[0].trim();
      if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
        keys.add(key);
      }
    }
    if (keys.size > 0) return Array.from(keys);
  }

  // 2. Look for enclosing function definition with typed payload:
  // export async function submit(... payload: { scores: ...; strengths: ...; })
  for (let k = lineIdx; k >= Math.max(0, lineIdx - 20); k--) {
    if (lines[k].includes("function") && lines[k].includes("payload")) {
      const funcContext = lines.slice(k, lineIdx + 1).join("\n");
      const typeBlockMatch = funcContext.match(/payload\s*:\s*\{([^}]+)\}/s);
      if (typeBlockMatch) {
        const typeLines = typeBlockMatch[1].split(/[;\n]/);
        for (const tl of typeLines) {
          const colonMatch = tl.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*[?:]/);
          if (colonMatch) {
            keys.add(colonMatch[1]);
          }
        }
      }
      break;
    }
  }

  return Array.from(keys);
}

/**
 * Extract Zod schemas
 */
function extractZodSchemas(content, file) {
  const schemas = {};
  const lines = content.split("\n");

  const regex = /(?:const|export\s+const)\s+([A-Za-z0-9_]+)\s*=\s*z\.object\s*\(\s*\{/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const schemaName = match[1];
    const lineNum = content.slice(0, match.index).split("\n").length;

    // Extract fields within object
    const startIndex = match.index + match[0].length;
    const endIndex = content.indexOf("})", startIndex);
    if (endIndex > startIndex) {
      const body = content.slice(startIndex, endIndex);
      const fields = {};
      const fieldRegex = /([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*z\.([a-zA-Z0-9_]+)/g;
      let fMatch;
      while ((fMatch = fieldRegex.exec(body)) !== null) {
        const fieldName = fMatch[1];
        const fieldType = fMatch[2];
        const isOptional = body.slice(fMatch.index, fMatch.index + 50).includes(".optional()");
        fields[fieldName] = {
          name: fieldName,
          type: fieldType,
          required: !isOptional,
        };
      }

      schemas[schemaName] = {
        name: schemaName,
        fields,
        file,
        line: lineNum,
      };
    }
  }

  return schemas;
}

function findFiles(dir, extensions) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const ignoreDirs = new Set(["node_modules", ".git", ".next", ".expo", "dist", "build", ".turbo"]);

  function walk(current) {
    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!ignoreDirs.has(entry.name)) {
          walk(path.join(current, entry.name));
        }
      } else if (extensions.some((ext) => entry.name.endsWith(ext))) {
        results.push(path.join(current, entry.name));
      }
    }
  }

  walk(dir);
  return results;
}

module.exports = {
  scanFrontend,
};
