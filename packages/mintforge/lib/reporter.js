const c = require("./colors");

/**
 * Format and render findings to the terminal
 */
function renderReport(findings, stats, options = {}) {
  console.log("");
  console.log(`  ${c.emerald}${c.bold}▲ Mintforge Seam Check${c.reset} ${c.gray}v0.1.0${c.reset}`);
  console.log(`  ${c.dim}Full-Stack Contract Verification Report${c.reset}`);
  console.log("");

  if (findings.length === 0) {
    console.log(`  ${c.green}${c.bold}✔ ALL CONTRACTS VERIFIED IN SYNC${c.reset}`);
    console.log(`  ${c.dim}Zero casing drift, route mismatches, or payload errors detected.${c.reset}`);
    console.log("");
  } else {
    console.log(`  ${c.bold}Findings (${findings.length}):${c.reset}`);
    console.log("");

    for (let i = 0; i < findings.length; i++) {
      const f = findings[i];
      const num = i + 1;
      const isErr = f.severity === "error";

      const badge = isErr
        ? `${c.bgRed} ERROR ${c.reset}`
        : `${c.bgYellow}  WARN ${c.reset}`;

      const titleColor = isErr ? c.red : c.yellow;

      console.log(`  ${badge} ${c.bold}${titleColor(formatType(f.type))}${c.reset}`);
      console.log(`         ${f.message}`);

      if (f.frontend) {
        console.log(`         ${c.dim}Frontend:${c.reset} ${c.cyan(formatLocation(f.frontend.file, f.frontend.line))}`);
      }
      if (f.backend) {
        console.log(`         ${c.dim}Backend: ${c.reset} ${c.cyan(formatLocation(f.backend.file, f.backend.line))}`);
      }
      if (f.suggestion) {
        console.log(`         ${c.emerald}Fix:      ${c.reset}${f.suggestion}`);
      }
      console.log("");
    }
  }

  // Summary Table
  console.log(`  ${c.bold}Summary:${c.reset}`);
  console.log(`    ${c.dim}Backend Routes Scanned:${c.reset}   ${c.bold(stats.totalBackendRoutes)}`);
  console.log(`    ${c.dim}Frontend Calls Scanned:${c.reset}   ${c.bold(stats.totalFrontendCalls)}`);
  console.log(`    ${c.dim}Verified Parity:${c.reset}          ${c.green(stats.verifiedMatches)}`);
  console.log(`    ${c.dim}Casing Drifts:${c.reset}            ${stats.casingDrifts > 0 ? c.red(stats.casingDrifts) : c.green("0")}`);
  console.log(`    ${c.dim}Route Mismatches:${c.reset}         ${stats.routeDrifts > 0 ? c.red(stats.routeDrifts) : c.green("0")}`);
  console.log(`    ${c.dim}Payload Discrepancies:${c.reset}    ${stats.payloadDrifts > 0 ? c.red(stats.payloadDrifts) : c.green("0")}`);
  console.log("");

  if (stats.errorCount > 0) {
    console.log(`  ${c.red}${c.bold}✖ Verification failed with ${stats.errorCount} error${stats.errorCount > 1 ? "s" : ""}.${c.reset}`);
    console.log(`  ${c.dim}Run 'npx mintforge check' locally before pushing to CI.${c.reset}`);
    console.log("");
    return 1;
  }

  if (stats.warningCount > 0) {
    console.log(`  ${c.yellow}⚠ Verification passed with ${stats.warningCount} warning${stats.warningCount > 1 ? "s" : ""}.${c.reset}`);
    console.log("");
    return 0;
  }

  console.log(`  ${c.green}${c.bold}✔ Parity Confirmed. Ready to ship.${c.reset}`);
  console.log("");
  return 0;
}

function formatType(type) {
  switch (type) {
    case "CASING_DRIFT":
      return "Casing Drift (camelCase vs snake_case)";
    case "ROUTE_NOT_FOUND":
      return "Route Drift (404 Path Not Found)";
    case "METHOD_MISMATCH":
      return "HTTP Method Mismatch";
    case "MISSING_REQUIRED_FIELD":
      return "Missing Required Field";
    case "UNEXPECTED_FIELD":
      return "Unexpected Field";
    default:
      return type;
  }
}

function formatLocation(filePath, line) {
  if (!filePath) return "";
  const rel = filePath.replace(/\\/g, "/");
  return line ? `${rel}:${line}` : rel;
}

module.exports = {
  renderReport,
};
