const fs = require("fs");
const path = require("path");

/**
 * Scan Mongoose schemas in a Node.js / Express codebase
 * Extracts schema fields, types, required flags, default values,
 * and strict mode configuration.
 */
function scanMongooseSchemas(backendPath) {
  if (!fs.existsSync(backendPath)) {
    return { source: "mongoose", models: {}, error: `Path not found: ${backendPath}` };
  }

  const jsFiles = findFiles(backendPath, [".js", ".ts", ".mjs", ".cjs"]);
  const models = {};

  for (const file of jsFiles) {
    const content = fs.readFileSync(file, "utf8");
    const fileModels = extractMongooseModels(content, file);
    Object.assign(models, fileModels);
  }

  return { source: "mongoose", models };
}

/**
 * Extract Mongoose schemas and model bindings from file content
 */
function extractMongooseModels(content, file) {
  const models = {};
  const schemaVarToModelName = {};

  // Step 1: Detect model declarations like:
  // mongoose.model('User', UserSchema) or model('User', UserSchema) or const User = model(...)
  const modelRegex = /(?:mongoose\.)?model\s*\(\s*["']([A-Za-z0-9_]+)["']\s*,\s*([A-Za-z0-9_]+)/g;
  let mMatch;
  while ((mMatch = modelRegex.exec(content)) !== null) {
    const modelName = mMatch[1];
    const schemaVar = mMatch[2];
    schemaVarToModelName[schemaVar] = modelName;
  }

  // Step 2: Detect schema instantiations:
  // const UserSchema = new (mongoose.)?Schema({ ... }, { strict: ... })
  const schemaRegex = /(?:const|let|var)\s+([A-Za-z0-9_]+)\s*=\s*new\s+(?:mongoose\.)?Schema\s*\(\s*\{/g;
  let sMatch;
  while ((sMatch = schemaRegex.exec(content)) !== null) {
    const schemaVar = sMatch[1];
    const startIndex = sMatch.index + sMatch[0].length - 1; // points to opening '{'

    const bodyObj = extractMatchingBraces(content, startIndex);
    if (!bodyObj) continue;

    const lineNum = content.slice(0, sMatch.index).split("\n").length;

    // Check options object (second argument to Schema constructor)
    const afterBody = content.slice(startIndex + bodyObj.length);
    const optionsMatch = afterBody.match(/^\s*,\s*(\{([^}]+)\})?/);
    let strictMode = true; // Mongoose default is strict: true
    let hasTimestamps = false;

    if (optionsMatch && optionsMatch[2]) {
      const optStr = optionsMatch[2];
      if (/strict\s*:\s*false/.test(optStr)) {
        strictMode = false;
      }
      if (/timestamps\s*:\s*(true|\{)/.test(optStr)) {
        hasTimestamps = true;
      }
    }

    const resolvedName = schemaVarToModelName[schemaVar] || schemaVar.replace(/Schema$/, "");
    const fields = parseMongooseFields(bodyObj, lineNum);

    if (hasTimestamps) {
      if (!fields["createdAt"]) {
        fields["createdAt"] = { name: "createdAt", rawType: "Date", required: false, line: lineNum };
      }
      if (!fields["updatedAt"]) {
        fields["updatedAt"] = { name: "updatedAt", rawType: "Date", required: false, line: lineNum };
      }
    }

    // Include MongoDB _id by default unless explicitly disabled
    if (!fields["_id"] && !fields["id"]) {
      fields["_id"] = { name: "_id", rawType: "ObjectId", required: false, line: lineNum };
    }

    const modelObj = {
      name: resolvedName,
      schemaVar,
      file,
      line: lineNum,
      strict: strictMode,
      fields,
    };

    models[resolvedName] = modelObj;
    if (schemaVar !== resolvedName) {
      models[schemaVar] = modelObj;
    }
  }

  return models;
}

/**
 * Parse fields inside a Mongoose Schema definition using depth-aware scanning
 */
function parseMongooseFields(schemaBody, baseLine) {
  const fields = {};

  // Strip outer { and }
  let clean = schemaBody.trim();
  if (clean.startsWith("{")) clean = clean.slice(1);
  if (clean.endsWith("}")) clean = clean.slice(0, -1);

  // Remove comments
  clean = clean
    .replace(/\/\/[^\n]*/g, "")
    .replace(/\/\*[\s\S]*?\*\//g, "");

  let i = 0;
  while (i < clean.length) {
    // Skip whitespace, commas, and semicolons
    while (i < clean.length && (/\s/.test(clean[i]) || clean[i] === "," || clean[i] === ";")) {
      i++;
    }
    if (i >= clean.length) break;

    // Read fieldName:
    const keyMatch = clean.slice(i).match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:/);
    if (!keyMatch) {
      i++;
      continue;
    }

    const fieldName = keyMatch[1];
    i += keyMatch[0].length; // advance past 'fieldName:'

    // Read value respecting {}, [], ()
    let valStart = i;
    let depthBrace = 0;
    let depthBracket = 0;
    let depthParen = 0;
    let inQuote = null;

    while (i < clean.length) {
      const ch = clean[i];

      if (inQuote) {
        if (ch === inQuote && clean[i - 1] !== "\\") {
          inQuote = null;
        }
      } else if (ch === '"' || ch === "'" || ch === "`") {
        inQuote = ch;
      } else if (ch === "{") {
        depthBrace++;
      } else if (ch === "}") {
        depthBrace--;
      } else if (ch === "[") {
        depthBracket++;
      } else if (ch === "]") {
        depthBracket--;
      } else if (ch === "(") {
        depthParen++;
      } else if (ch === ")") {
        depthParen--;
      } else if (depthBrace === 0 && depthBracket === 0 && depthParen === 0) {
        if (ch === "," || ch === "\n") {
          break;
        }
      }
      i++;
    }

    const rawVal = clean.slice(valStart, i).trim();

    // Skip special Schema configuration keys if they appear inside body
    if (["versionKey", "autoIndex", "toJSON", "toObject", "id"].includes(fieldName)) {
      continue;
    }

    if (rawVal) {
      fields[fieldName] = parseSingleMongooseField(fieldName, rawVal, baseLine);
    }
  }

  return fields;
}

function parseSingleMongooseField(fieldName, rawVal, baseLine) {
  let fieldType = "any";
  let isRequired = false;
  let defaultValue = undefined;
  let enumValues = undefined;

  if (rawVal.startsWith("{")) {
    // Detailed definition: { type: String, required: true, ... }
    const typeMatch = rawVal.match(/type\s*:\s*([^,}\n]+)/);
    if (typeMatch) {
      fieldType = normalizeMongooseType(typeMatch[1].trim());
    } else {
      fieldType = "Object";
    }

    if (/required\s*:\s*(true|\[\s*true)/.test(rawVal)) {
      isRequired = true;
    }

    const defMatch = rawVal.match(/default\s*:\s*([^,}\n]+)/);
    if (defMatch) {
      defaultValue = defMatch[1].trim();
    }

    const enumMatch = rawVal.match(/enum\s*:\s*\[([^\]]+)\]/);
    if (enumMatch) {
      enumValues = enumMatch[1].split(",").map((s) => s.trim().replace(/['"]/g, ""));
    }
  } else if (rawVal.startsWith("[") && rawVal.endsWith("]")) {
    const inner = rawVal.slice(1, -1).trim();
    fieldType = `Array[${normalizeMongooseType(inner || "any")}]`;
  } else {
    fieldType = normalizeMongooseType(rawVal.replace(/[,;]$/, "").trim());
  }

  return {
    name: fieldName,
    rawType: fieldType,
    required: isRequired,
    default: defaultValue,
    enum: enumValues,
    line: baseLine,
  };
}

function normalizeMongooseType(typeStr) {
  const clean = typeStr
    .replace(/^mongoose\./, "")
    .replace(/^Schema\.Types\./, "")
    .replace(/^Types\./, "")
    .trim();

  switch (clean) {
    case "String":
      return "string";
    case "Number":
      return "number";
    case "Boolean":
      return "boolean";
    case "Date":
      return "datetime";
    case "ObjectId":
      return "ObjectId";
    case "Buffer":
      return "buffer";
    case "Mixed":
      return "any";
    case "Array":
      return "array";
    case "Map":
      return "map";
    default:
      return clean;
  }
}

/**
 * Extract substring bounded by matching braces '{' and '}'
 */
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
  scanMongooseSchemas,
  extractMongooseModels,
};
