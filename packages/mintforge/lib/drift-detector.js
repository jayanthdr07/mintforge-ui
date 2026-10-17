/**
 * Seam Check Drift Detection Engine
 * Performs 3 Core Checks:
 *   1. Casing Drift (camelCase vs snake_case)
 *   2. Route Drift (404 Path & Method Mismatches)
 *   3. Payload Drift (Missing / Extra / Optionality Mismatches)
 */

function detectDrift(backendData, frontendData, config) {
  const { routes: backendRoutes, models: backendModels } = backendData;
  const { calls: frontendCalls, schemas: frontendSchemas } = frontendData;
  const { rules, ignore, mappings } = config;

  const findings = [];
  const stats = {
    totalBackendRoutes: backendRoutes.length,
    totalFrontendCalls: frontendCalls.length,
    verifiedMatches: 0,
    casingDrifts: 0,
    routeDrifts: 0,
    payloadDrifts: 0,
    errorCount: 0,
    warningCount: 0,
  };

  const ignoredRoutes = new Set(ignore?.routes || []);
  const ignoredFields = new Set(ignore?.fields || []);

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
          suggestion: `Verify route path and check if router prefix (e.g. /v1) is missing in frontend API client baseURL.`,
        });
        recordFinding(severity, stats, "route");
      }
      continue;
    }

    // Check method
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

    // Check payload fields if backend has a request body model
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
                line: modelFields[snakeKey].line || matchingRoute.line,
                field: snakeKey,
                modelName: matchingRoute.bodyModel.name,
              },
              suggestion: `Rename "${feKey}" to "${snakeKey}" in frontend, or declare Field(validation_alias="${feKey}") on Pydantic model.`,
            });
            recordFinding(severity, stats, "casing");
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
            suggestion: `Add required field "${beKey}" to frontend payload to avoid HTTP 422 Unprocessable Entity.`,
          });
          recordFinding(severity, stats, "payload");
        }
      }
    }
  }

  // ─── 2. CHECK EXPLICIT ZOD <-> PYDANTIC MAPPINGS ─────────────────────────
  if (mappings && typeof mappings === "object") {
    for (const [feSchemaName, beModelName] of Object.entries(mappings)) {
      const feSchema = frontendSchemas[feSchemaName];
      const beModel = backendModels[beModelName];

      if (!feSchema || !beModel) continue;

      const beFieldKeys = Object.keys(beModel.fields);

      for (const [feFieldName, feField] of Object.entries(feSchema.fields)) {
        if (ignoredFields.has(feFieldName)) continue;
        const snakeKey = toSnakeCase(feFieldName);

        if (feFieldName !== snakeKey && beModel.fields[snakeKey]) {
          if (rules.casing !== "off") {
            const severity = rules.casing === "error" ? "error" : "warn";
            findings.push({
              type: "CASING_DRIFT",
              severity,
              message: `Schema mapping ${feSchemaName} -> ${beModelName}: Field "${feFieldName}" is camelCase in Zod, but snake_case ("${snakeKey}") in Pydantic.`,
              frontend: { file: feSchema.file, line: feSchema.line, field: feFieldName },
              backend: { file: beModel.file, line: beModel.fields[snakeKey]?.line, field: snakeKey, modelName: beModelName },
              suggestion: `Rename "${feFieldName}" to "${snakeKey}" in Zod schema, or use camelCase alias on backend model.`,
            });
            recordFinding(severity, stats, "casing");
          }
        }
      }
    }
  }

  return { findings, stats };
}

function findMatchingRoute(frontendCall, backendRoutes) {
  const feSegments = cleanPathSegments(frontendCall.path);

  for (const beRoute of backendRoutes) {
    const beSegments = cleanPathSegments(beRoute.path);

    // If backend route has a prefix (e.g. /v1/interviews/...), compare with and without prefix
    if (segmentsMatch(feSegments, beSegments)) {
      return beRoute;
    }

    // Try trimming a leading version prefix like "v1" or "api" from either
    if (beSegments[0] === "v1" && segmentsMatch(feSegments, beSegments.slice(1))) {
      return beRoute;
    }
    if (feSegments[0] === "v1" && segmentsMatch(feSegments.slice(1), beSegments)) {
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
}

module.exports = {
  detectDrift,
};
