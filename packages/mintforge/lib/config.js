const fs = require("fs");
const path = require("path");

/**
 * Lightweight YAML parser for simple configs (zero external dependencies)
 */
function parseSimpleYaml(content) {
  const lines = content.split("\n");
  const result = {};
  const stack = [{ indent: -1, obj: result }];
  let currentKey = null;

  for (let rawLine of lines) {
    const commentIdx = rawLine.indexOf("#");
    const line = (commentIdx >= 0 ? rawLine.slice(0, commentIdx) : rawLine).replace(/\r$/, "");
    if (!line.trim()) continue;

    const indent = line.search(/\S/);
    const trimmed = line.trim();

    while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
      stack.pop();
    }
    const current = stack[stack.length - 1].obj;

    if (trimmed.startsWith("- ")) {
      const val = trimmed.slice(2).trim();
      if (Array.isArray(current)) {
        current.push(parseValue(val));
      } else if (currentKey && Array.isArray(current[currentKey])) {
        current[currentKey].push(parseValue(val));
      }
      continue;
    }

    const colonIdx = trimmed.indexOf(":");
    if (colonIdx > 0) {
      const key = trimmed.slice(0, colonIdx).trim();
      const rawVal = trimmed.slice(colonIdx + 1).trim();

      if (rawVal === "") {
        const isNextList = lines.some((l, idx) => {
          if (idx <= lines.indexOf(rawLine)) return false;
          const tr = l.trim();
          return tr.startsWith("- ") && l.search(/\S/) > indent;
        });

        const nextObj = isNextList ? [] : {};
        current[key] = nextObj;
        currentKey = key;
        stack.push({ indent, obj: nextObj });
      } else {
        current[key] = parseValue(rawVal);
        currentKey = null;
      }
    }
  }

  return result;
}

function parseValue(val) {
  if (val === "true") return true;
  if (val === "false") return false;
  if (val === "null") return null;
  if (!isNaN(Number(val)) && val !== "") return Number(val);
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    return val.slice(1, -1);
  }
  return val;
}

/**
 * Load or auto-detect Seam Check configuration
 */
function loadConfig(cwd = process.cwd(), explicitPath = null) {
  const candidates = explicitPath
    ? [explicitPath]
    : [
        path.join(cwd, "seamcheck.yaml"),
        path.join(cwd, "seamcheck.yml"),
        path.join(cwd, "seamcheck.json"),
        path.join(cwd, "mintforge.config.json"),
        path.join(cwd, ".seamcheck.yaml"),
        path.join(cwd, ".seamcheck.json"),
      ];

  for (const file of candidates) {
    if (fs.existsSync(file)) {
      try {
        const raw = fs.readFileSync(file, "utf8");
        const parsed = file.endsWith(".json") ? JSON.parse(raw) : parseSimpleYaml(raw);
        return {
          found: true,
          filePath: file,
          config: normalizeConfig(parsed, cwd),
        };
      } catch (err) {
        return {
          found: true,
          filePath: file,
          error: `Failed to parse ${path.basename(file)}: ${err.message}`,
          config: null,
        };
      }
    }
  }

  // Auto-detection fallback: Check common full-stack layouts
  const autoBackend = [
    path.join(cwd, "backend"),
    path.join(cwd, "api"),
    path.join(cwd, "server"),
    cwd,
  ].find((p) => {
    if (!fs.existsSync(p)) return false;
    try {
      const files = fs.readdirSync(p);
      return (
        files.some((f) => f.endsWith(".py")) ||
        files.some((f) => f.endsWith(".js") || f.endsWith(".ts")) ||
        files.includes("schema.prisma")
      );
    } catch {
      return false;
    }
  });

  const autoFrontend = [
    path.join(cwd, "frontend"),
    path.join(cwd, "src"),
    path.join(cwd, "app"),
    path.join(cwd, "client"),
    cwd,
  ].find((p) => {
    if (!fs.existsSync(p)) return false;
    try {
      return fs.readdirSync(p).some((f) => f.endsWith(".ts") || f.endsWith(".tsx"));
    } catch {
      return false;
    }
  });

  if (autoBackend && autoFrontend) {
    return {
      found: false,
      autoDetected: true,
      config: normalizeConfig(
        {
          backend: { path: path.relative(cwd, autoBackend) || "." },
          frontend: { path: path.relative(cwd, autoFrontend) || "." },
        },
        cwd
      ),
    };
  }

  return { found: false, autoDetected: false, config: null };
}

function normalizeConfig(raw, cwd) {
  const backendPath = raw.backend?.path || raw.backend || "./backend";
  const frontendPath = raw.frontend?.path || raw.frontend || "./src";

  return {
    version: raw.version || 1,
    backend: {
      path: path.resolve(cwd, typeof backendPath === "string" ? backendPath : "./backend"),
      openapi: raw.backend?.openapi ? path.resolve(cwd, raw.backend.openapi) : null,
      prefix: raw.backend?.prefix || "",
      framework: raw.backend?.framework || "auto", // "fastapi" | "express" | "mongoose" | "prisma" | "auto"
      prisma: raw.backend?.prisma ? path.resolve(cwd, raw.backend.prisma) : null,
    },
    frontend: {
      path: path.resolve(cwd, typeof frontendPath === "string" ? frontendPath : "./src"),
      basePrefix: raw.frontend?.basePrefix || raw.backend?.prefix || "",
    },
    mappings: raw.mappings || {},
    ignore: {
      routes: raw.ignore?.routes || ["/health", "/docs", "/openapi.json", "/redoc"],
      fields: raw.ignore?.fields || ["id", "_id", "created_at", "updated_at", "createdAt", "updatedAt"],
    },
    rules: {
      casing: raw.rules?.casing || "error",     // error | warn | off
      routes: raw.rules?.routes || "error",     // error | warn | off
      payloads: raw.rules?.payloads || "error", // error | warn | off
    },
  };
}

/**
 * Generate default seamcheck.yaml template
 */
function createDefaultConfigFile(cwd = process.cwd()) {
  const targetFile = path.join(cwd, "seamcheck.yaml");
  if (fs.existsSync(targetFile)) {
    return { created: false, message: "seamcheck.yaml already exists." };
  }

  const template = `# ==============================================================================
# Mintforge Seam Check Configuration
# Full-Stack Contract Verification (FastAPI, Express, Mongoose, Prisma)
# Docs: https://mintforge.dev/docs/seam-check
# ==============================================================================

version: 1

backend:
  path: ./backend            # Backend folder (Python FastAPI or Node/Express)
  prefix: /v1                # Global API route prefix (optional)
  framework: auto            # auto | fastapi | express | mongoose | prisma
  # openapi: ./backend/openapi.json
  # prisma: ./prisma/schema.prisma

frontend:
  path: ./frontend           # Next.js or Expo source directory (e.g. ./src or ./frontend)

# Explicit schema mapping (optional)
# mappings:
#   UserCreateForm: UserCreate

ignore:
  routes:
    - /health
    - /docs
    - /openapi.json
    - /redoc
  fields:
    - id
    - _id
    - created_at
    - updated_at
    - createdAt
    - updatedAt

# Verification rules (error | warn | off)
rules:
  casing: error              # Flags camelCase vs snake_case field drift
  routes: error              # Flags 404 path and HTTP verb drift
  payloads: error            # Flags missing required fields and strict-mode violations
`;

  fs.writeFileSync(targetFile, template, "utf8");
  return { created: true, path: targetFile };
}

module.exports = {
  loadConfig,
  createDefaultConfigFile,
  parseSimpleYaml,
  normalizeConfig,
};
