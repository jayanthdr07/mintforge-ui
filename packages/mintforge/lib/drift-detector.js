const fs = require("fs");

/**
 * Seam Check Drift Detection Engine
 * Performs Full-Stack Contract Verification:
 *   1. Casing Drift (camelCase vs snake_case)
 *   2. Route & Method Drift (404 Path & Method Mismatches)
 *   3. Payload Drift (Missing / Extra / Optionality Mismatches)
 *   4. Mongoose Strict-Mode Stripping (Undeclared keys silently dropped)
 *   5. Query Parameter Drift (URL search param casing & missing params)
 *   6. Response Model Drift (Frontend response expectations vs Backend responses)
 */

function detectDrift(backendData, frontendData, config) {
  const { routes: backendRoutes, models: backendModels } = backendData;
  const { calls: frontendCalls, schemas: frontendSchemas } = frontendData;
  const { rules = {}, ignore = {}, mappings = {} } = config;

  const findings = [];
  const stats = {
    totalBackendRoutes: backendRoutes.length,
    totalFrontendCalls: frontendCalls.length,
    verifiedMatches: 0,
    casingDrifts: 0,
    routeDrifts: 0,
    payloadDrifts: 0,
    strictModeDrifts: 0,
    queryParamDrifts: 0,
    errorCount: 0,
    warningCount: 0,
  };

  const ignoredRoutes = new Set(ignore.routes || []);
  const ignoredFields = new Set(ignore.fields || ["id", "_id", "created_at", "updated_at", "createdAt", "updatedAt"]);

  // ─── 1. CHECK ROUTES & PAYLOADS ───────────────────────────────────────────
  for (const call of frontendCalls) {
    if (isRouteIgnored(call.path, ignoredRoutes)) continue;

    // Find matching backend route
    const matchingRoute = findMatchingRoute(call, backendRoutes);

    if (!matchingRoute) {
      if (rules.routes !== "off") {
        const severity = rules.routes === "error" ? "error" : "warn";
        findings.push({
          type: "ROUTE_NOT_FOUND",
          severity,
          message: `Frontend calls ${call.method} "${call.rawUrl}", but no matching route was found in backend.`,
          frontend: { file: call.file, line: call.line, path: call.rawUrl, method: call.method },
          backend: null,
          suggestion: `Verify route path and check if router prefix (e.g. /v1 or /api) is missing in frontend API client baseURL.`,
        });
        recordFinding(severity, stats, "route");
      }
      continue;
    }

    // Check HTTP method
    if (call.method !== matchingRoute.method) {
      if (rules.routes !== "off") {
        const severity = rules.routes === "error" ? "error" : "warn";
        findings.push({
          type: "METHOD_MISMATCH",
          severity,
          message: `Frontend calls ${call.method} "${call.rawUrl}", but backend expects ${matchingRoute.method} at ${matchingRoute.file}:${matchingRoute.line}.`,
          frontend: { file: call.file, line: call.line, path: call.rawUrl, method: call.method },
          backend: { file: matchingRoute.file, line: matchingRoute.line, path: matchingRoute.originalPath, method: matchingRoute.method },
          suggestion: `Change frontend HTTP verb to ${matchingRoute.method}.`,
        });
        recordFinding(severity, stats, "route");
      }
      continue;
    }

    stats.verifiedMatches++;

    // ─── 2. CHECK QUERY PARAMETERS ──────────────────────────────────────────
    if (call.queryParams && call.queryParams.length > 0 && matchingRoute.queryParams && matchingRoute.queryParams.length > 0) {
      const beQuerySet = new Set(matchingRoute.queryParams);

      for (const feParam of call.queryParams) {
        if (ignoredFields.has(feParam)) continue;
        const snakeParam = toSnakeCase(feParam);

        if (feParam !== snakeParam && beQuerySet.has(snakeParam)) {
          const severity = rules.casing === "error" ? "error" : "warn";
          findings.push({
            type: "QUERY_PARAM_CASING_DRIFT",
            severity,
            message: `Frontend sends query parameter "${feParam}" (camelCase), but backend expects "${snakeParam}" (snake_case) for ${matchingRoute.originalPath}.`,
            frontend: { file: call.file, line: call.line, param: feParam },
            backend: { file: matchingRoute.file, line: matchingRoute.line, param: snakeParam },
            suggestion: `Rename query parameter "${feParam}" to "${snakeParam}" in frontend URL.`,
          });
          recordFinding(severity, stats, "query");
        }
      }
    }

    // ─── 3. CHECK REQUEST BODY PAYLOAD ──────────────────────────────────────
    if (matchingRoute.bodyModel && call.payloadFields && call.payloadFields.length > 0) {
      const modelFields = matchingRoute.bodyModel.fields || {};
      const backendFieldNames = Object.keys(modelFields);

      for (const feKey of call.payloadFields) {
        if (ignoredFields.has(feKey)) continue;

        // Check for Casing Drift (camelCase in FE vs snake_case in BE)
        const snakeKey = toSnakeCase(feKey);
        if (feKey !== snakeKey && modelFields[snakeKey]) {
          if (rules.casing !== "off") {
            const severity = rules.casing === "error" ? "error" : "warn";
            findings.push({
              type: "CASING_DRIFT",
              severity,
              message: `Frontend sends "${feKey}" (camelCase) to ${matchingRoute.bodyModel.name}, but backend expects "${snakeKey}" (snake_case).`,
              frontend: { file: call.file, line: call.line, field: feKey },
              backend: {
                file: matchingRoute.bodyModel.file || matchingRoute.file,
                line: modelFields[snakeKey]?.line || matchingRoute.line,
                field: snakeKey,
                modelName: matchingRoute.bodyModel.name,
              },
              suggestion: `Rename "${feKey}" to "${snakeKey}" in frontend, or declare validation alias on backend model.`,
              fixable: true,
              from: feKey,
              to: snakeKey,
            });
            recordFinding(severity, stats, "casing");
          }
          continue;
        }

        // Check for Mongoose Strict-Mode Stripping:
        // Field is not declared in Mongoose schema, and schema is strict: true
        if (matchingRoute.bodyModel.strict && backendFieldNames.length > 0) {
          const directMatch = modelFields[feKey];
          const camelMatch = modelFields[toCamelCase(feKey)];
          const snakeMatch = modelFields[toSnakeCase(feKey)];

          if (!directMatch && !camelMatch && !snakeMatch) {
            if (rules.payloads !== "off") {
              const severity = rules.payloads === "error" ? "error" : "warn";
              const frameworkName = matchingRoute.framework || (matchingRoute.bodyModel.schemaVar ? "Mongoose" : "Backend model");
              findings.push({
                type: "MONGOOSE_STRICT_STRIPPING",
                severity,
                message: `Frontend sends undeclared field "${feKey}" to ${matchingRoute.bodyModel.name} (${frameworkName}). Due to strict: true, this field will be silently discarded at runtime!`,
                frontend: { file: call.file, line: call.line, field: feKey },
                backend: {
                  file: matchingRoute.bodyModel.file || matchingRoute.file,
                  line: matchingRoute.bodyModel.line || matchingRoute.line,
                  modelName: matchingRoute.bodyModel.name,
                },
                suggestion: `Declare "${feKey}" in ${matchingRoute.bodyModel.name} schema, or set { strict: false } on schema options.`,
              });
              recordFinding(severity, stats, "strict");
            }
          }
        }
      }

      // Check for missing required fields in frontend call
      for (const [beKey, beField] of Object.entries(modelFields)) {
        if (ignoredFields.has(beKey)) continue;
        if (!beField.required) continue;

        const sentInFe =
          call.payloadFields.includes(beKey) ||
          call.payloadFields.includes(toCamelCase(beKey));

        if (!sentInFe && rules.payloads !== "off") {
          const severity = rules.payloads === "error" ? "error" : "warn";
          findings.push({
            type: "MISSING_REQUIRED_FIELD",
            severity,
            message: `Backend model ${matchingRoute.bodyModel.name} requires field "${beKey}", but frontend payload at ${call.file}:${call.line} does not include it.`,
            frontend: { file: call.file, line: call.line },
            backend: {
              file: matchingRoute.bodyModel.file || matchingRoute.file,
              line: beField.line || matchingRoute.line,
              field: beKey,
              modelName: matchingRoute.bodyModel.name,
            },
            suggestion: `Add required field "${beKey}" to frontend payload to avoid HTTP 422 or validation failure.`,
          });
          recordFinding(severity, stats, "payload");
        }
      }
    }

    // ─── 4. CHECK RESPONSE MODEL CASING ─────────────────────────────────────
    if (call.responseType && backendModels[call.responseType]) {
      const beModel = backendModels[call.responseType];
      const feSchema = frontendSchemas[call.responseType];

      if (feSchema) {
        for (const feField of Object.keys(feSchema.fields)) {
          if (ignoredFields.has(feField)) continue;
          const snakeField = toSnakeCase(feField);
          if (feField !== snakeField && beModel.fields[snakeField]) {
            const severity = rules.casing === "error" ? "error" : "warn";
            findings.push({
              type: "RESPONSE_CASING_DRIFT",
              severity,
              message: `Frontend response type ${call.responseType} expects "${feField}" (camelCase), but backend returns "${snakeField}" (snake_case).`,
              frontend: { file: feSchema.file, line: feSchema.line, field: feField },
              backend: { file: beModel.file, line: beModel.fields[snakeField]?.line, field: snakeField },
              suggestion: `Align frontend response type key "${feField}" with backend response key "${snakeField}".`,
            });
            recordFinding(severity, stats, "casing");
          }
        }
      }
    }
  }

  // ─── 5. CHECK EXPLICIT ZOD <-> BACKEND MODEL MAPPINGS ───────────────────
  if (mappings && typeof mappings === "object") {
    for (const [feSchemaName, beModelName] of Object.entries(mappings)) {
      const feSchema = frontendSchemas[feSchemaName];
      const beModel = backendModels[beModelName];

      if (!feSchema || !beModel) continue;

      for (const [feFieldName, feField] of Object.entries(feSchema.fields)) {
        if (ignoredFields.has(feFieldName)) continue;
        const snakeKey = toSnakeCase(feFieldName);

        if (feFieldName !== snakeKey && beModel.fields[snakeKey]) {
          if (rules.casing !== "off") {
            const severity = rules.casing === "error" ? "error" : "warn";
            findings.push({
              type: "CASING_DRIFT",
              severity,
              message: `Schema mapping ${feSchemaName} -> ${beModelName}: Field "${feFieldName}" is camelCase in Zod, but snake_case ("${snakeKey}") in backend model.`,
              frontend: { file: feSchema.file, line: feSchema.line, field: feFieldName },
              backend: { file: beModel.file, line: beModel.fields[snakeKey]?.line, field: snakeKey, modelName: beModelName },
              suggestion: `Rename "${feFieldName}" to "${snakeKey}" in Zod schema, or declare alias on backend model.`,
              fixable: true,
              from: feFieldName,
              to: snakeKey,
            });
            recordFinding(severity, stats, "casing");
          }
        }
      }
    }
  }

  return { findings, stats };
}

/**
 * Apply automatic fixes for fixable casing drift issues
 */
function applyFixes(findings) {
  const fixableFindings = findings.filter((f) => f.fixable && f.frontend && f.frontend.file);
  const modifiedFiles = new Set();
  let fixedCount = 0;

  // Group by file
  const fileGroups = {};
  for (const f of fixableFindings) {
    const file = f.frontend.file;
    if (!fileGroups[file]) fileGroups[file] = [];
    fileGroups[file].push(f);
  }

  for (const [filePath, fileFindings] of Object.entries(fileGroups)) {
    if (!fs.existsSync(filePath)) continue;

    let content = fs.readFileSync(filePath, "utf8");
    let changed = false;

    for (const item of fileFindings) {
      const fromKey = item.from;
      const toKey = item.to;
      if (!fromKey || !toKey) continue;

      // Replace key in object properties: key: value or shorthand { key }
      // Regex matches word boundary of fromKey when used as object property
      const propRegex = new RegExp(`\\b${fromKey}\\b(?=\\s*[,:\\n\\}])`, "g");
      if (propRegex.test(content)) {
        content = content.replace(propRegex, toKey);
        changed = true;
        fixedCount++;
      }
    }

    if (changed) {
      fs.writeFileSync(filePath, content, "utf8");
      modifiedFiles.add(filePath);
    }
  }

  return {
    fixedCount,
    modifiedFiles: Array.from(modifiedFiles),
  };
}

function findMatchingRoute(frontendCall, backendRoutes) {
  const feSegments = cleanPathSegments(frontendCall.path);

  for (const beRoute of backendRoutes) {
    const beSegments = cleanPathSegments(beRoute.path);

    // Exact segment match
    if (segmentsMatch(feSegments, beSegments)) {
      return beRoute;
    }

    // Try trimming a leading version prefix like "v1" or "api" from either
    if ((beSegments[0] === "v1" || beSegments[0] === "api") && segmentsMatch(feSegments, beSegments.slice(1))) {
      return beRoute;
    }
    if ((feSegments[0] === "v1" || feSegments[0] === "api") && segmentsMatch(feSegments.slice(1), beSegments)) {
      return beRoute;
    }
    if (beSegments[0] === "api" && beSegments[1] === "v1" && segmentsMatch(feSegments, beSegments.slice(2))) {
      return beRoute;
    }
    if (feSegments[0] === "api" && feSegments[1] === "v1" && segmentsMatch(feSegments.slice(2), beSegments)) {
      return beRoute;
    }
  }

  return null;
}

function cleanPathSegments(p) {
  return p
    .split("/")
    .map((s) => s.trim())
    .filter(Boolean);
}

function segmentsMatch(fe, be) {
  if (fe.length !== be.length) return false;

  for (let i = 0; i < fe.length; i++) {
    const f = fe[i];
    const b = be[i];

    // Wildcard / parameter match (:id, :session_id, {session_id})
    if (f.startsWith(":") || f.startsWith("{") || b.startsWith(":") || b.startsWith("{")) {
      continue;
    }

    if (f.toLowerCase() !== b.toLowerCase()) {
      return false;
    }
  }

  return true;
}

function toSnakeCase(str) {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).replace(/^_/, "");
}

function toCamelCase(str) {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

function isRouteIgnored(path, ignoredSet) {
  for (const ign of ignoredSet) {
    if (path.includes(ign.toLowerCase().replace(/^\/+|\/+$/g, ""))) {
      return true;
    }
  }
  return false;
}

function recordFinding(severity, stats, category) {
  if (severity === "error") {
    stats.errorCount++;
  } else {
    stats.warningCount++;
  }

  if (category === "casing") stats.casingDrifts++;
  if (category === "route") stats.routeDrifts++;
  if (category === "payload") stats.payloadDrifts++;
  if (category === "strict") stats.strictModeDrifts++;
  if (category === "query") stats.queryParamDrifts++;
}

module.exports = {
  detectDrift,
  applyFixes,
  toSnakeCase,
  toCamelCase,
};
