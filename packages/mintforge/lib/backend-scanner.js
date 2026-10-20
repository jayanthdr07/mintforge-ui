const fs = require("fs");
const path = require("path");

const { scanExpressBackend } = require("./express-scanner");
const { scanMongooseSchemas } = require("./mongoose-scanner");
const { scanPrismaSchema } = require("./prisma-scanner");
const { scanNodeValidators } = require("./node-validator-scanner");

/**
 * Scan backend for routes, models, and schemas across
 * FastAPI (Python), Express (Node.js), Mongoose (MongoDB), and Prisma ORM.
 */
function scanBackend(backendConfig) {
  const {
    path: backendPath,
    openapi,
    prefix: globalPrefix = "",
    framework = "auto",
    prisma: prismaPath,
  } = backendConfig;

  // 1. Explicit OpenAPI specification
  const openapiCandidate = openapi || findOpenApiFile(backendPath);
  if (openapiCandidate && fs.existsSync(openapiCandidate)) {
    return scanOpenApi(openapiCandidate);
  }

  if (!backendPath || !fs.existsSync(backendPath)) {
    return {
      source: "unknown",
      frameworks: [],
      routes: [],
      models: {},
      error: `Backend path not found: ${backendPath}`,
    };
  }

  const detectedFrameworks = [];
  const allRoutes = [];
  const allModels = {};
  let allEnums = {};

  // Check file presence
  const pyFiles = findFiles(backendPath, [".py"]);
  const jsFiles = findFiles(backendPath, [".js", ".ts", ".mjs", ".cjs"]);
  const prismaFileCandidate = prismaPath || path.join(backendPath, "schema.prisma") || path.join(backendPath, "prisma", "schema.prisma");

  const shouldScanFastAPI = framework === "fastapi" || (framework === "auto" && pyFiles.length > 0);
  const shouldScanExpress = framework === "express" || (framework === "auto" && jsFiles.length > 0);
  const shouldScanMongoose = framework === "mongoose" || framework === "express" || framework === "auto";
  const shouldScanPrisma = framework === "prisma" || (framework === "auto" && (fs.existsSync(prismaFileCandidate) || prismaPath));

  // 1. Scan FastAPI (Python)
  if (shouldScanFastAPI && pyFiles.length > 0) {
    const pythonResult = scanPythonBackend(backendPath, globalPrefix);
    if (pythonResult.routes.length > 0 || Object.keys(pythonResult.models).length > 0) {
      detectedFrameworks.push("fastapi");
      allRoutes.push(...pythonResult.routes);
      Object.assign(allModels, pythonResult.models);
    }
  }

  // 2. Scan Prisma ORM
  if (shouldScanPrisma) {
    const prismaResult = scanPrismaSchema(prismaPath || backendPath);
    if (Object.keys(prismaResult.models || {}).length > 0) {
      detectedFrameworks.push("prisma");
      Object.assign(allModels, prismaResult.models);
      allEnums = Object.assign(allEnums, prismaResult.enums || {});
    }
  }

  // 3. Scan Mongoose (MongoDB)
  if (shouldScanMongoose && jsFiles.length > 0) {
    const mongooseResult = scanMongooseSchemas(backendPath);
    if (Object.keys(mongooseResult.models || {}).length > 0) {
      detectedFrameworks.push("mongoose");
      Object.assign(allModels, mongooseResult.models);
    }
  }

  // 4. Scan Node Validators (Joi, backend Zod)
  if (jsFiles.length > 0) {
    const validatorResult = scanNodeValidators(backendPath);
    if (Object.keys(validatorResult.models || {}).length > 0) {
      detectedFrameworks.push("validator");
      Object.assign(allModels, validatorResult.models);
    }
  }

  // 5. Scan Express (Node.js)
  if (shouldScanExpress && jsFiles.length > 0) {
    const expressResult = scanExpressBackend(backendPath, globalPrefix);
    if (expressResult.routes.length > 0) {
      detectedFrameworks.push("express");

      // Cross-link Express routes to Mongoose/Prisma/Validator models
      for (const route of expressResult.routes) {
        if (route.modelRef && allModels[route.modelRef]) {
          route.bodyModel = allModels[route.modelRef];
        } else if (route.bodyModel) {
          // If model has a name that matches a known model
          if (allModels[route.bodyModel.name]) {
            route.bodyModel = allModels[route.bodyModel.name];
          }
        }
      }

      allRoutes.push(...expressResult.routes);
    }
  }

  const primarySource = detectedFrameworks.length > 0 ? detectedFrameworks.join("+") : "static";

  return {
    source: primarySource,
    frameworks: detectedFrameworks,
    routes: allRoutes,
    models: allModels,
    enums: allEnums,
  };
}

function findOpenApiFile(backendPath) {
  if (!backendPath || !fs.existsSync(backendPath)) return null;
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

  const schemas = spec.components?.schemas || {};
  for (const [name, schema] of Object.entries(schemas)) {
    models[name] = parseOpenApiSchema(name, schema, schemas);
  }

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

        // Extract query parameters from OpenAPI
        const queryParams = [];
        if (op.parameters && Array.isArray(op.parameters)) {
          for (const param of op.parameters) {
            if (param.in === "query") {
              queryParams.push(param.name);
            }
          }
        }

        routes.push({
          path: normalizeRoutePath(routePath),
          originalPath: routePath,
          method: method.toUpperCase(),
          operationId: op.operationId,
          summary: op.summary || "",
          bodyModel,
          queryParams,
          file: openApiPath,
          line: 1,
        });
      }
    }
  }

  return { source: "openapi", frameworks: ["openapi"], routes, models };
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

  return { name, fields, strict: true };
}

/**
 * Static Python codebase scanner for FastAPI
 */
function scanPythonBackend(backendPath, globalPrefix = "") {
  if (!fs.existsSync(backendPath)) {
    return { source: "static", routes: [], models: {}, error: `Backend path not found: ${backendPath}` };
  }

  const pyFiles = findFiles(backendPath, [".py"]);
  const models = {};
  const routes = [];
  const routerPrefixes = {};

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

    const classMatch = line.match(/^(\s*)class\s+([A-Za-z0-9_]+)\s*\(\s*(?:BaseModel|Document|Settings)[^\)]*\):/);
    if (classMatch) {
      const indent = classMatch[1].length;
      const modelName = classMatch[2];
      currentModel = {
        name: modelName,
        file,
        line: lineNum,
        strict: true,
        fields: {},
      };
      models[modelName] = currentModel;
      modelIndent = indent;
      continue;
    }

    if (currentModel) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const indent = line.search(/\S/);
      if (indent <= modelIndent && trimmed.length > 0) {
        currentModel = null;
        continue;
      }

      const fieldMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*([^=\n#]+)(?:=\s*(.*))?$/);
      if (fieldMatch) {
        const fieldName = fieldMatch[1];
        const rawType = fieldMatch[2].trim();
        const defaultValue = fieldMatch[3]?.trim();

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

    const routeMatch = line.match(/@([a-zA-Z0-9_]+)\.(get|post|put|patch|delete)\s*\(\s*["']([^"']+)["']/i);
    if (routeMatch) {
      const routerVar = routeMatch[1];
      const method = routeMatch[2].toUpperCase();
      const rawPath = routeMatch[3];

      const routerPrefix = routerPrefixes[routerVar] || "";
      const combinedPath = joinPaths(globalPrefix, routerPrefix, rawPath);

      let bodyModel = null;
      let funcSig = "";
      for (let j = i + 1; j < Math.min(i + 15, lines.length); j++) {
        funcSig += " " + lines[j].trim();
        if (lines[j].includes("):")) break;
      }

      // Check for query parameters in FastAPI signature (e.g. search: str = Query(...), page: int = 1)
      const queryParams = [];
      const sigParams = funcSig.split(",");
      for (const sp of sigParams) {
        const qm = sp.match(/([a-zA-Z0-9_]+)\s*:\s*(?:str|int|float|bool|Optional\[[^\]]+\])\s*=\s*(?:Query\(|None|[0-9]+|["'])/);
        if (qm) {
          const pName = qm[1];
          if (!["body", "payload", "request", "db", "session", "user"].includes(pName)) {
            queryParams.push(pName);
          }
        }
      }

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
        queryParams,
        bodyModel,
        file,
        line: lineNum,
        framework: "fastapi",
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
  scanPythonBackend,
  scanOpenApi,
  normalizeRoutePath,
};
