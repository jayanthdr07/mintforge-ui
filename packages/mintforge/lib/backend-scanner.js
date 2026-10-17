const fs = require("fs");
const path = require("path");

/**
 * Scan FastAPI backend for routes and Pydantic models
 */
function scanBackend(backendConfig) {
  const { path: backendPath, openapi, prefix: globalPrefix = "" } = backendConfig;

  // 1. If explicit openapi.json is provided or exists in backend directory
  const openapiCandidate = openapi || findOpenApiFile(backendPath);
  if (openapiCandidate && fs.existsSync(openapiCandidate)) {
    return scanOpenApi(openapiCandidate);
  }

  // 2. Otherwise perform static Python AST / Regex inspection
  return scanPythonBackend(backendPath, globalPrefix);
}

function findOpenApiFile(backendPath) {
  if (!fs.existsSync(backendPath)) return null;
  const direct = path.join(backendPath, "openapi.json");
  if (fs.existsSync(direct)) return direct;
  return null;
}

/**
 * Parse OpenAPI 3.x schema file
 */
function scanOpenApi(openApiPath) {
  const raw = fs.readFileSync(openApiPath, "utf8");
  const spec = JSON.parse(raw);
  const routes = [];
  const models = {};

  // Extract schemas from components
  const schemas = spec.components?.schemas || {};
  for (const [name, schema] of Object.entries(schemas)) {
    models[name] = parseOpenApiSchema(name, schema, schemas);
  }

  // Extract routes from paths
  const paths = spec.paths || {};
  for (const [routePath, methods] of Object.entries(paths)) {
    for (const [method, op] of Object.entries(methods)) {
      if (["get", "post", "put", "patch", "delete"].includes(method.toLowerCase())) {
        const reqBody = op.requestBody?.content?.["application/json"]?.schema;
        let bodyModel = null;
        if (reqBody) {
          if (reqBody.$ref) {
            const modelName = reqBody.$ref.split("/").pop();
            bodyModel = models[modelName] || { name: modelName, fields: {} };
          } else {
            bodyModel = parseOpenApiSchema("InlineBody", reqBody, schemas);
          }
        }

        routes.push({
          path: normalizeRoutePath(routePath),
          originalPath: routePath,
          method: method.toUpperCase(),
          operationId: op.operationId,
          summary: op.summary || "",
          bodyModel,
          file: openApiPath,
          line: 1,
        });
      }
    }
  }

  return { source: "openapi", routes, models };
}

function parseOpenApiSchema(name, schema, allSchemas) {
  const fields = {};
  const required = new Set(schema.required || []);
  const properties = schema.properties || {};

  for (const [propName, propDef] of Object.entries(properties)) {
    let propType = propDef.type || "any";
    let nestedModel = null;

    if (propDef.$ref) {
      const refName = propDef.$ref.split("/").pop();
      propType = refName;
      if (allSchemas[refName]) {
        nestedModel = parseOpenApiSchema(refName, allSchemas[refName], allSchemas);
      }
    }

    fields[propName] = {
      name: propName,
      type: propType,
      required: required.has(propName),
      nestedModel,
    };
  }

  return { name, fields };
}

/**
 * Static Python codebase scanner
 */
function scanPythonBackend(backendPath, globalPrefix = "") {
  if (!fs.existsSync(backendPath)) {
    return { source: "static", routes: [], models: {}, error: `Backend path not found: ${backendPath}` };
  }

  const pyFiles = findFiles(backendPath, [".py"]);
  const models = {};
  const routes = [];
  const routerPrefixes = {}; // e.g. router variable name -> prefix

  // Step 1: Scan all Pydantic models across Python files
  for (const file of pyFiles) {
    const content = fs.readFileSync(file, "utf8");
    const fileModels = extractPydanticModels(content, file);
    Object.assign(models, fileModels);
  }

  // Step 2: Resolve nested models in fields
  for (const model of Object.values(models)) {
    for (const field of Object.values(model.fields)) {
      if (models[field.rawType]) {
        field.nestedModel = models[field.rawType];
      }
    }
  }

  // Step 3: Scan APIRouter definitions & prefixes
  for (const file of pyFiles) {
    const content = fs.readFileSync(file, "utf8");
    extractRouterPrefixes(content, routerPrefixes);
  }

  // Step 4: Scan endpoints
  for (const file of pyFiles) {
    const content = fs.readFileSync(file, "utf8");
    const fileRoutes = extractRoutes(content, file, routerPrefixes, models, globalPrefix);
    routes.push(...fileRoutes);
  }

  return { source: "static", routes, models };
}

function extractPydanticModels(content, file) {
  const models = {};
  const lines = content.split("\n");

  let currentModel = null;
  let modelIndent = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Detect class Definition inheriting from BaseModel or Document
    const classMatch = line.match(/^(\s*)class\s+([A-Za-z0-9_]+)\s*\(\s*(?:BaseModel|Document|Settings)[^\)]*\):/);
    if (classMatch) {
      const indent = classMatch[1].length;
      const modelName = classMatch[2];
      currentModel = {
        name: modelName,
        file,
        line: lineNum,
        fields: {},
      };
      models[modelName] = currentModel;
      modelIndent = indent;
      continue;
    }

    if (currentModel) {
      // Check if indentation closed the class
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const indent = line.search(/\S/);
      if (indent <= modelIndent && trimmed.length > 0) {
        currentModel = null;
        continue;
      }

      // Check for field definition: name: Type = ...
      const fieldMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*([^=\n#]+)(?:=\s*(.*))?$/);
      if (fieldMatch) {
        const fieldName = fieldMatch[1];
        const rawType = fieldMatch[2].trim();
        const defaultValue = fieldMatch[3]?.trim();

        // Skip internal class config / Settings
        if (fieldName === "Config" || fieldName === "Settings") continue;

        const isOptional =
          rawType.includes("Optional[") ||
          rawType.includes("None") ||
          (defaultValue && (defaultValue === "None" || defaultValue.startsWith("Field(default=None")));

        currentModel.fields[fieldName] = {
          name: fieldName,
          rawType,
          required: !isOptional,
          line: lineNum,
        };
      }
    }
  }

  return models;
}

function extractRouterPrefixes(content, routerPrefixes) {
  // router = APIRouter(prefix="/interviews", tags=[...])
  const regex = /([a-zA-Z0-9_]+)\s*=\s*APIRouter\s*\([^)]*prefix\s*=\s*["']([^"']+)["']/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    routerPrefixes[match[1]] = match[2];
  }
}

function extractRoutes(content, file, routerPrefixes, models, globalPrefix) {
  const routes = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Detect @(router|app).(get|post|put|patch|delete)("...")
    const routeMatch = line.match(/@([a-zA-Z0-9_]+)\.(get|post|put|patch|delete)\s*\(\s*["']([^"']+)["']/i);
    if (routeMatch) {
      const routerVar = routeMatch[1];
      const method = routeMatch[2].toUpperCase();
      const rawPath = routeMatch[3];

      const routerPrefix = routerPrefixes[routerVar] || "";
      const combinedPath = joinPaths(globalPrefix, routerPrefix, rawPath);

      // Look ahead for the async def function signature to identify the body model
      let bodyModel = null;
      let funcSig = "";
      for (let j = i + 1; j < Math.min(i + 15, lines.length); j++) {
        funcSig += " " + lines[j].trim();
        if (lines[j].includes("):")) break;
      }

      // Look for body argument: body: ModelName, request: ModelName, payload: ModelName
      for (const modelName of Object.keys(models)) {
        const modelRegex = new RegExp(`(?:body|payload|data|request)\\s*:\\s*${modelName}\\b`);
        if (modelRegex.test(funcSig)) {
          bodyModel = models[modelName];
          break;
        }
      }

      routes.push({
        path: normalizeRoutePath(combinedPath),
        originalPath: combinedPath,
        method,
        bodyModel,
        file,
        line: lineNum,
      });
    }
  }

  return routes;
}

function joinPaths(...segments) {
  const parts = segments
    .filter(Boolean)
    .map((s) => s.replace(/^\/+|\/+$/g, ""))
    .filter(Boolean);
  return "/" + parts.join("/");
}

function normalizeRoutePath(p) {
  // Normalize parameters: /{session_id}/feedback -> /:session_id/feedback
  return p
    .replace(/^\/+|\/+$/g, "")
    .replace(/\{([a-zA-Z0-9_]+)\}/g, ":$1")
    .replace(/\$\{([a-zA-Z0-9_]+)\}/g, ":$1")
    .toLowerCase();
}

function findFiles(dir, extensions) {
  const results = [];
  if (!fs.existsSync(dir)) return results;

  const ignoreDirs = new Set(["node_modules", ".git", ".venv", "venv", "__pycache__", ".next", "dist", "build"]);

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
  scanBackend,
  normalizeRoutePath,
};
