const fs = require("fs");
const path = require("path");

/**
 * Scan Node.js validator schemas (Joi, Zod) in backend source code
 */
function scanNodeValidators(backendPath) {
  if (!fs.existsSync(backendPath)) {
    return { source: "node-validator", models: {} };
  }

  const jsFiles = findFiles(backendPath, [".js", ".ts", ".mjs", ".cjs"]);
  const models = {};

  for (const file of jsFiles) {
    const content = fs.readFileSync(file, "utf8");
    const fileModels = extractValidatorModels(content, file);
    Object.assign(models, fileModels);
  }

  return { source: "node-validator", models };
}

function extractValidatorModels(content, file) {
  const models = {};

  // 1. Joi: (const|let|var) schemaName = Joi.object({ ... })
  const joiRegex = /(?:const|let|var|export\s+const)\s+([A-Za-z0-9_]+)\s*=\s*Joi\.object\s*\(\s*\{/g;
  let jMatch;
  while ((jMatch = joiRegex.exec(content)) !== null) {
    const schemaName = jMatch[1];
    const startIndex = jMatch.index + jMatch[0].length - 1;
    const body = extractMatchingBraces(content, startIndex);
    if (!body) continue;

    const lineNum = content.slice(0, jMatch.index).split("\n").length;
    const fields = parseJoiFields(body, lineNum);

    models[schemaName] = {
      name: schemaName,
      validator: "joi",
      file,
      line: lineNum,
      strict: true,
      fields,
    };
  }

  // 2. Backend Zod: (const|let|var) schemaName = z.object({ ... })
  const zodRegex = /(?:const|let|var|export\s+const)\s+([A-Za-z0-9_]+)\s*=\s*z\.object\s*\(\s*\{/g;
  let zMatch;
  while ((zMatch = zodRegex.exec(content)) !== null) {
    const schemaName = zMatch[1];
    const startIndex = zMatch.index + zMatch[0].length - 1;
    const body = extractMatchingBraces(content, startIndex);
    if (!body) continue;

    const lineNum = content.slice(0, zMatch.index).split("\n").length;
    const fields = parseBackendZodFields(body, lineNum);

    models[schemaName] = {
      name: schemaName,
      validator: "zod",
      file,
      line: lineNum,
      strict: true,
      fields,
    };
  }

  return models;
}

function parseJoiFields(body, baseLine) {
  const fields = {};
  const fieldRegex = /([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*Joi\.([a-zA-Z0-9_]+)\s*\(\s*\)([^,\n}]*)/g;
  let match;

  while ((match = fieldRegex.exec(body)) !== null) {
    const fieldName = match[1];
    const rawType = match[2];
    const chain = match[3] || "";

    const isRequired = chain.includes(".required()");

    fields[fieldName] = {
      name: fieldName,
      rawType,
      required: isRequired,
      line: baseLine,
    };
  }

  return fields;
}

function parseBackendZodFields(body, baseLine) {
  const fields = {};
  const fieldRegex = /([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*z\.([a-zA-Z0-9_]+)\s*\(\s*\)([^,\n}]*)/g;
  let match;

  while ((match = fieldRegex.exec(body)) !== null) {
    const fieldName = match[1];
    const rawType = match[2];
    const chain = match[3] || "";

    const isOptional = chain.includes(".optional()") || chain.includes(".nullable()");

    fields[fieldName] = {
      name: fieldName,
      rawType,
      required: !isOptional,
      line: baseLine,
    };
  }

  return fields;
}

function extractMatchingBraces(str, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < str.length; i++) {
    if (str[i] === "{") depth++;
    if (str[i] === "}") {
      depth--;
      if (depth === 0) {
        return str.slice(openIdx, i + 1);
      }
    }
  }
  return null;
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
  scanNodeValidators,
  extractValidatorModels,
};
