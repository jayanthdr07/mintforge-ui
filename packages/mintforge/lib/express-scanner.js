const fs = require("fs");
const path = require("path");

/**
 * Scan Express / Node.js backend for routes, route parameters,
 * query parameters, and request body usage.
 */
function scanExpressBackend(backendPath, globalPrefix = "") {
  if (!fs.existsSync(backendPath)) {
    return {
      source: "express",
      routes: [],
      models: {},
      error: `Express backend path not found: ${backendPath}`,
    };
  }

  const jsFiles = findFiles(backendPath, [".js", ".ts", ".mjs", ".cjs"]);
  const routes = [];
  const models = {};
  const mountPrefixes = {}; // e.g. routerVar -> mount prefix path

  // Pass 1: Extract router mount prefixes (e.g. app.use('/api/v1/users', userRouter))
  for (const file of jsFiles) {
    const content = fs.readFileSync(file, "utf8");
    extractMountPrefixes(content, mountPrefixes);
  }

  // Pass 2: Extract route handlers
  for (const file of jsFiles) {
    const content = fs.readFileSync(file, "utf8");
    const fileRoutes = extractExpressRoutes(content, file, mountPrefixes, globalPrefix);
    routes.push(...fileRoutes);
  }

  return { source: "express", routes, models };
}

/**
 * Extract router mount prefixes:
 * app.use('/api/v1', apiRouter)
 * app.use('/users', userRouter)
 * router.use('/auth', authRouter)
 */
function extractMountPrefixes(content, mountPrefixes) {
  // Pattern: (app|router).use('/prefix', routerVar)
  const mountRegex = /(?:app|router|server)\.use\s*\(\s*["'`]([^"'`]+)["'`]\s*,\s*([a-zA-Z0-9_]+)\s*\)/g;
  let match;
  while ((match = mountRegex.exec(content)) !== null) {
    const prefix = match[1];
    const routerVar = match[2];
    mountPrefixes[routerVar] = prefix;
  }
}

/**
 * Extract express routes:
 * router.get('/users', ...), app.post('/api/orders', ...)
 * router.route('/items').get(...).post(...)
 */
function extractExpressRoutes(content, file, mountPrefixes, globalPrefix) {
  const routes = [];
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;

    // Pattern A: (router|app).(get|post|put|patch|delete)('/path', ...)
    const methodMatch = line.match(/(?:([a-zA-Z0-9_]+)\.)?(get|post|put|patch|delete)\s*\(\s*["'`]([^"'`]+)["'`]/i);
    if (methodMatch) {
      const routerVar = methodMatch[1] || "app";
      const method = methodMatch[2].toUpperCase();
      const rawSubPath = methodMatch[3];

      const routerPrefix = mountPrefixes[routerVar] || "";
      const combinedPath = joinPaths(globalPrefix, routerPrefix, rawSubSubPath(rawSubPath));

      // Extract handler context to identify query params and body fields
      const handlerContext = extractHandlerContext(lines, i);
      const queryParams = extractQueryParams(handlerContext);
      const bodyPayload = extractBodyPayload(handlerContext, lines, i);

      let bodyModel = null;
      if (bodyPayload.fields.length > 0 || bodyPayload.modelRef) {
        bodyModel = {
          name: bodyPayload.modelRef || inferModelName(combinedPath, method),
          file,
          line: lineNum,
          fields: {},
          strict: true,
        };

        for (const f of bodyPayload.fields) {
          bodyModel.fields[f] = {
            name: f,
            rawType: "any",
            required: bodyPayload.requiredFields.includes(f),
            line: lineNum,
          };
        }
      }

      routes.push({
        path: normalizeRoutePath(combinedPath),
        originalPath: combinedPath,
        method,
        queryParams,
        bodyModel,
        modelRef: bodyPayload.modelRef || null,
        file,
        line: lineNum,
        framework: "express",
      });
      continue;
    }

    // Pattern B: router.route('/path').get(...).post(...)
    const routeChainMatch = line.match(/([a-zA-Z0-9_]+)\.route\s*\(\s*["'`]([^"'`]+)["'`]\s*\)/i);
    if (routeChainMatch) {
      const routerVar = routeChainMatch[1];
      const rawSubPath = routeChainMatch[2];
      const routerPrefix = mountPrefixes[routerVar] || "";
      const combinedPath = joinPaths(globalPrefix, routerPrefix, rawSubSubPath(rawSubPath));

      // Look ahead for chained HTTP methods on this route
      const chainContext = lines.slice(i, Math.min(lines.length, i + 15)).join("\n");
      const chainedMethods = ["get", "post", "put", "patch", "delete"];
      for (const cm of chainedMethods) {
        const cmRegex = new RegExp(`\\.${cm}\\s*\\(`, "i");
        if (cmRegex.test(chainContext)) {
          const method = cm.toUpperCase();
          const handlerContext = extractHandlerContext(lines, i);
          const queryParams = extractQueryParams(handlerContext);
          const bodyPayload = extractBodyPayload(handlerContext, lines, i);

          let bodyModel = null;
          if (bodyPayload.fields.length > 0 || bodyPayload.modelRef) {
            bodyModel = {
              name: bodyPayload.modelRef || inferModelName(combinedPath, method),
              file,
              line: lineNum,
              fields: {},
              strict: true,
            };
            for (const f of bodyPayload.fields) {
              bodyModel.fields[f] = {
                name: f,
                rawType: "any",
                required: bodyPayload.requiredFields.includes(f),
                line: lineNum,
              };
            }
          }

          routes.push({
            path: normalizeRoutePath(combinedPath),
            originalPath: combinedPath,
            method,
            queryParams,
            bodyModel,
            modelRef: bodyPayload.modelRef || null,
            file,
            line: lineNum,
            framework: "express",
          });
        }
      }
    }
  }

  return routes;
}

function rawSubSubPath(p) {
  return p ? p.trim() : "";
}

/**
 * Extracts lines following the route registration to analyze handler body
 */
function extractHandlerContext(lines, startIdx) {
  let depth = 0;
  let started = false;
  const contextLines = [];

  for (let i = startIdx; i < Math.min(lines.length, startIdx + 45); i++) {
    const l = lines[i];
    contextLines.push(l);

    for (const char of l) {
      if (char === "{") {
        depth++;
        started = true;
      } else if (char === "}") {
        depth--;
        if (started && depth <= 0) {
          return contextLines.join("\n");
        }
      }
    }
  }

  return contextLines.join("\n");
}

/**
 * Extract query parameters from Express handler:
 * req.query.search, req.query.page, const { search, sort_by } = req.query;
 */
function extractQueryParams(context) {
  const params = new Set();

  // Pattern 1: const { foo, bar } = req.query
  const destructureMatch = context.match(/(?:const|let|var)\s*\{([^}]+)\}\s*=\s*(?:req|request)\.query/i);
  if (destructureMatch) {
    destructureMatch[1].split(",").forEach((item) => {
      const clean = item.split(":")[0].trim();
      if (/^[a-zA-Z0-9_]+$/.test(clean)) {
        params.add(clean);
      }
    });
  }

  // Pattern 2: req.query.foo
  const directMatch = context.matchAll(/(?:req|request)\.query\.([a-zA-Z0-9_]+)/gi);
  for (const m of directMatch) {
    params.add(m[1]);
  }

  return Array.from(params);
}

/**
 * Extract body payload keys and referenced validator/model names:
 * const { email, password } = req.body;
 * req.body.username;
 * validate(UserCreateSchema)
 * await User.create(req.body)
 */
function extractBodyPayload(context, lines, startIdx) {
  const fields = new Set();
  const requiredFields = new Set();
  let modelRef = null;

  // 1. Destructured req.body: const { email, password, role } = req.body
  const destructureMatch = context.match(/(?:const|let|var)\s*\{([^}]+)\}\s*=\s*(?:req|request)\.body/i);
  if (destructureMatch) {
    destructureMatch[1].split(",").forEach((item) => {
      const clean = item.split(":")[0].trim();
      if (/^[a-zA-Z0-9_]+$/.test(clean)) {
        fields.add(clean);
        // By default, if explicitly destructured in handler, consider required unless defaulted
        if (!item.includes("=")) {
          requiredFields.add(clean);
        }
      }
    });
  }

  // 2. Direct req.body.foo
  const directMatch = context.matchAll(/(?:req|request)\.body\.([a-zA-Z0-9_]+)/gi);
  for (const m of directMatch) {
    fields.add(m[1]);
  }

  // 3. Validator middleware reference: validate(UserSchema), validateBody(CreateUserDto)
  const validatorMatch = context.match(/(?:validate|validateBody|validator|schemaValidator)\s*\(\s*([A-Za-z0-9_]+)\s*\)/i);
  if (validatorMatch) {
    modelRef = validatorMatch[1];
  }

  // 4. Mongoose or ORM operation: User.create(req.body), new User(req.body)
  const ormMatch = context.match(/(?:new\s+([A-Za-z0-9_]+)\s*\(|(?:await\s+)?([A-Za-z0-9_]+)\.(?:create|findByIdAndUpdate|updateOne)\s*\()/);
  if (ormMatch) {
    const candidate = ormMatch[1] || ormMatch[2];
    if (candidate && !["Promise", "Error", "Response", "JSON"].includes(candidate)) {
      modelRef = candidate;
    }
  }

  return {
    fields: Array.from(fields),
    requiredFields: Array.from(requiredFields),
    modelRef,
  };
}

function inferModelName(routePath, method) {
  const parts = routePath.split("/").filter(Boolean);
  const resource = parts[parts.length - 1] || "Resource";
  const capitalized = resource.charAt(0).toUpperCase() + resource.slice(1);
  return `${method.toLowerCase()}${capitalized}Request`;
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
  scanExpressBackend,
  extractExpressRoutes,
  extractMountPrefixes,
};
