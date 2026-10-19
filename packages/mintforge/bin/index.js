#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Mintforge UI CLI
 * Official command-line interface for Mintforge UI
 * https://github.com/rakshithkumar608/mintforge-ui
 */

const fs = require("fs");
const path = require("path");

const PKG_VERSION = "0.1.0";

// ANSI color helpers (Zero external dependencies)
const c = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  green: "\x1b[32m",
  emerald: "\x1b[38;2;16;185;129m",
  cyan: "\x1b[36m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  gray: "\x1b[90m",
};

// Load embedded registry
const REGISTRY_PATH = path.join(__dirname, "../registry/components.json");
let registry = {};
try {
  registry = JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"));
} catch {
  registry = {};
}

// Seam Check Modules
const { loadConfig, createDefaultConfigFile } = require("../lib/config");
const { scanBackend } = require("../lib/backend-scanner");
const { scanFrontend } = require("../lib/frontend-scanner");
const { detectDrift, applyFixes } = require("../lib/drift-detector");
const { renderReport } = require("../lib/reporter");

function printBanner() {
  console.log("");
  console.log(`  ${c.emerald}${c.bold}▲ Mintforge UI${c.reset} ${c.gray}v${PKG_VERSION}${c.reset}`);
  console.log(`  ${c.dim}Universal, AI-native component system for Web & Mobile${c.reset}`);
  console.log("");
}

function printHelp() {
  printBanner();
  console.log(`  ${c.bold}Usage:${c.reset}`);
  console.log(`    $ ${c.emerald}npx mintforge${c.reset} <command> [options]`);
  console.log("");
  console.log(`  ${c.bold}Commands:${c.reset}`);
  console.log(`    ${c.emerald}init${c.reset}                  Initialize Mintforge in your project (creates components.json & utils)`);
  console.log(`    ${c.emerald}add${c.reset} <components...>   Add component(s) to your project (e.g. button, card, dialog)`);
  console.log(`    ${c.emerald}check${c.reset} [options]        Verify full-stack contracts (FastAPI, Express, Mongoose, Prisma)`);
  console.log(`    ${c.emerald}list${c.reset}                  List all available components in the registry`);
  console.log(`    ${c.emerald}diff${c.reset} <component>     Compare local component against latest registry`);
  console.log("");
  console.log(`  ${c.bold}Options:${c.reset}`);
  console.log(`    ${c.dim}--init${c.reset}                (With check) Create default seamcheck.yaml config`);
  console.log(`    ${c.dim}--fix${c.reset}                 (With check) Automatically fix casing drift in frontend files`);
  console.log(`    ${c.dim}--framework <name>${c.reset}    Override backend framework (fastapi | express | mongoose | prisma | auto)`);
  console.log(`    ${c.dim}-y, --yes${c.reset}             Skip confirmation prompts and accept defaults`);
  console.log(`    ${c.dim}-h, --help${c.reset}            Display this help message`);
  console.log(`    ${c.dim}-v, --version${c.reset}         Display the current version`);
  console.log("");
  console.log(`  ${c.bold}Examples:${c.reset}`);
  console.log(`    $ ${c.emerald}npx mintforge init${c.reset}`);
  console.log(`    $ ${c.emerald}npx mintforge add button card dialog${c.reset}`);
  console.log(`    $ ${c.emerald}npx mintforge check --init${c.reset}`);
  console.log(`    $ ${c.emerald}npx mintforge check${c.reset}`);
  console.log(`    $ ${c.emerald}npx mintforge list${c.reset}`);
  console.log("");
}

function resolveTargetDir(cwd) {
  const isSrc = fs.existsSync(path.join(cwd, "src"));
  return isSrc ? path.join(cwd, "src") : cwd;
}

function cmdInit(cwd) {
  printBanner();
  console.log(`  ${c.cyan}⚙ Initializing project...${c.reset}`);

  const targetBase = resolveTargetDir(cwd);
  const componentsJsonPath = path.join(cwd, "components.json");

  // 1. Create components.json
  const componentsConfig = {
    $schema: "https://mintforge.dev/schema.json",
    style: "default",
    tailwind: {
      config: fs.existsSync(path.join(cwd, "tailwind.config.ts"))
        ? "tailwind.config.ts"
        : "tailwind.config.js",
      css: fs.existsSync(path.join(targetBase, "app/globals.css"))
        ? "src/app/globals.css"
        : "src/index.css",
      baseColor: "emerald",
      cssVariables: true,
    },
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
    },
  };

  fs.writeFileSync(componentsJsonPath, JSON.stringify(componentsConfig, null, 2) + "\n");
  console.log(`  ${c.green}✔${c.reset} Created ${c.bold}components.json${c.reset}`);

  // 2. Create lib/utils.ts (cn helper)
  const libDir = path.join(targetBase, "lib");
  if (!fs.existsSync(libDir)) {
    fs.mkdirSync(libDir, { recursive: true });
  }

  const utilsPath = path.join(libDir, "utils.ts");
  if (!fs.existsSync(utilsPath)) {
    const utilsContent = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;
    fs.writeFileSync(utilsPath, utilsContent);
    console.log(`  ${c.green}✔${c.reset} Created ${c.bold}${path.relative(cwd, utilsPath)}${c.reset} (with cn utility)`);
  } else {
    console.log(`  ${c.gray}ℹ Existing utils helper detected at ${path.relative(cwd, utilsPath)}${c.reset}`);
  }

  // 3. Ensure UI components directory exists
  const uiDir = path.join(targetBase, "components", "ui");
  if (!fs.existsSync(uiDir)) {
    fs.mkdirSync(uiDir, { recursive: true });
  }
  console.log(`  ${c.green}✔${c.reset} Created components directory: ${c.bold}${path.relative(cwd, uiDir)}${c.reset}`);

  console.log("");
  console.log(`  ${c.emerald}${c.bold}Success! Mintforge initialized.${c.reset}`);
  console.log(`  You can now install components using:`);
  console.log(`    ${c.emerald}npx mintforge add button card dialog${c.reset}`);
  console.log("");
}

function cmdList() {
  printBanner();
  console.log(`  ${c.bold}Available Components (${Object.keys(registry).length}):${c.reset}`);
  console.log("");

  for (const [key, item] of Object.entries(registry)) {
    const deps = item.dependencies && item.dependencies.length > 0
      ? `${c.gray}(deps: ${item.dependencies.join(", ")})${c.reset}`
      : "";
    console.log(`  ${c.emerald}${c.bold}${key.padEnd(12)}${c.reset} ${item.description} ${deps}`);
  }

  console.log("");
  console.log(`  Install any component via:`);
  console.log(`    ${c.emerald}npx mintforge add <name>${c.reset}`);
  console.log("");
}

function cmdAdd(names, cwd) {
  if (!names || names.length === 0) {
    console.error(`  ${c.red}Error: Please specify one or more components to add.${c.reset}`);
    console.log(`  Example: ${c.emerald}npx mintforge add button card${c.reset}`);
    process.exit(1);
  }

  printBanner();
  const targetBase = resolveTargetDir(cwd);
  const uiDir = path.join(targetBase, "components", "ui");

  if (!fs.existsSync(uiDir)) {
    fs.mkdirSync(uiDir, { recursive: true });
  }

  const installed = [];
  const allDeps = new Set();

  for (const name of names) {
    const key = name.toLowerCase().trim();
    const item = registry[key];

    if (!item) {
      console.log(`  ${c.yellow}⚠ Component "${name}" not found in registry. Skipping.${c.reset}`);
      continue;
    }

    const filePath = path.join(uiDir, item.file || `${key}.tsx`);
    fs.writeFileSync(filePath, item.content);
    installed.push({ name: key, path: filePath });

    if (item.dependencies) {
      item.dependencies.forEach((d) => allDeps.add(d));
    }

    console.log(`  ${c.green}✔${c.reset} Installed ${c.bold}${key}${c.reset} -> ${c.gray}${path.relative(cwd, filePath)}${c.reset}`);
  }

  if (installed.length === 0) {
    console.log(`  ${c.red}No components were installed.${c.reset}`);
    process.exit(1);
  }

  console.log("");
  console.log(`  ${c.emerald}${c.bold}Successfully added ${installed.length} component${installed.length > 1 ? "s" : ""}!${c.reset}`);

  if (allDeps.size > 0) {
    const depList = Array.from(allDeps).join(" ");
    console.log("");
    console.log(`  ${c.yellow}Note: Ensure required peer dependencies are installed:${c.reset}`);
    console.log(`    ${c.bold}npm install ${depList}${c.reset}`);
  }

  console.log("");
}

function cmdDiff(name, cwd) {
  if (!name) {
    console.error(`  ${c.red}Error: Please specify a component name to diff.${c.reset}`);
    process.exit(1);
  }

  printBanner();
  const key = name.toLowerCase().trim();
  const item = registry[key];

  if (!item) {
    console.error(`  ${c.red}Component "${name}" does not exist in registry.${c.reset}`);
    process.exit(1);
  }

  const targetBase = resolveTargetDir(cwd);
  const localFile = path.join(targetBase, "components", "ui", item.file || `${key}.tsx`);

  if (!fs.existsSync(localFile)) {
    console.log(`  ${c.yellow}Component "${key}" is not yet installed in your project.${c.reset}`);
    console.log(`  Run: ${c.emerald}npx mintforge add ${key}${c.reset}`);
    return;
  }

  const localContent = fs.readFileSync(localFile, "utf8");
  if (localContent === item.content) {
    console.log(`  ${c.green}✔${c.reset} Local ${c.bold}${key}.tsx${c.reset} is up to date with the latest registry!`);
  } else {
    console.log(`  ${c.yellow}ℹ Local ${c.bold}${key}.tsx${c.reset} has differences from upstream registry.${c.reset}`);
    console.log(`  Upstream version has ${item.content.split("\n").length} lines, local has ${localContent.split("\n").length} lines.`);
  }
  console.log("");
}

function cmdCheck(args, cwd) {
  if (args.includes("--init")) {
    printBanner();
    const res = createDefaultConfigFile(cwd);
    if (res.created) {
      console.log(`  ${c.green}✔ Created seamcheck.yaml in ${cwd}${c.reset}`);
      console.log(`  Configure your backend and frontend paths in seamcheck.yaml.`);
      console.log(`  Then run: ${c.emerald}npx mintforge check${c.reset}`);
    } else {
      console.log(`  ${c.yellow}ℹ ${res.message}${c.reset}`);
    }
    console.log("");
    return;
  }

  let explicitConfig = null;
  const configIdx = args.indexOf("--config") !== -1 ? args.indexOf("--config") : args.indexOf("-c");
  if (configIdx !== -1 && args[configIdx + 1]) {
    explicitConfig = path.resolve(cwd, args[configIdx + 1]);
  }

  const { found, autoDetected, config, error } = loadConfig(cwd, explicitConfig);

  if (error) {
    printBanner();
    console.error(`  ${c.red}Configuration error: ${error}${c.reset}`);
    process.exit(1);
  }

  if (!found && !autoDetected) {
    printBanner();
    console.log(`  ${c.yellow}⚠ No seamcheck.yaml found in ${cwd}${c.reset}`);
    console.log(`  To initialize Seam Check for your project, run:`);
    console.log(`    ${c.emerald}npx mintforge check --init${c.reset}`);
    console.log("");
    return;
  }

  printBanner();
  console.log(`  ${c.cyan}🔍 Scanning full-stack contracts...${c.reset}`);
  if (autoDetected) {
    console.log(`  ${c.dim}Auto-detected paths: Backend=${config.backend.path}, Frontend=${config.frontend.path}${c.reset}`);
  }

  // Handle explicit framework flag
  const fwIdx = args.indexOf("--framework");
  if (fwIdx !== -1 && args[fwIdx + 1]) {
    config.backend.framework = args[fwIdx + 1];
  }

  const backendData = scanBackend(config.backend);
  const frontendData = scanFrontend(config.frontend);

  if (backendData.frameworks && backendData.frameworks.length > 0) {
    console.log(`  ${c.dim}Active Framework(s): ${c.emerald(backendData.frameworks.join(", "))}${c.reset}`);
  }

  let { findings, stats } = detectDrift(backendData, frontendData, config);

  // Handle --fix
  if (args.includes("--fix")) {
    const fixResult = applyFixes(findings);
    if (fixResult.fixedCount > 0) {
      console.log(`  ${c.green}✔ Auto-fixed ${fixResult.fixedCount} casing drift issue(s) across ${fixResult.modifiedFiles.length} file(s)!${c.reset}`);
      // Re-scan frontend to reflect fixes
      const updatedFrontend = scanFrontend(config.frontend);
      const recheck = detectDrift(backendData, updatedFrontend, config);
      findings = recheck.findings;
      stats = recheck.stats;
    } else {
      console.log(`  ${c.dim}ℹ No auto-fixable casing drift found.${c.reset}`);
    }
  }

  const exitCode = renderReport(findings, stats);

  if (exitCode !== 0 && !args.includes("--no-exit")) {
    process.exit(exitCode);
  }
}

// Main CLI router
function main() {
  const args = process.argv.slice(2);
  const cwd = process.cwd();

  if (args.length === 0 || args.includes("-h") || args.includes("--help")) {
    printHelp();
    process.exit(0);
  }

  if (args.includes("-v") || args.includes("--version")) {
    console.log(`v${PKG_VERSION}`);
    process.exit(0);
  }

  const command = args[0];

  switch (command) {
    case "init":
      cmdInit(cwd);
      break;

    case "add":
      cmdAdd(args.slice(1), cwd);
      break;

    case "check":
    case "verify":
      cmdCheck(args.slice(1), cwd);
      break;

    case "list":
    case "ls":
      cmdList();
      break;

    case "diff":
      cmdDiff(args[1], cwd);
      break;

    default:
      console.log("");
      console.log(`  ${c.red}Unknown command: "${command}"${c.reset}`);
      printHelp();
      process.exit(1);
  }
}

main();
