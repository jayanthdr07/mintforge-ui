const fs = require("fs");
const path = require("path");

/**
 * Scan Prisma schema files (schema.prisma)
 * Extracts models, field names, types, optionality (?), relations, and enums.
 */
function scanPrismaSchema(prismaPathOrBackendDir) {
  const schemaFile = findPrismaSchemaFile(prismaPathOrBackendDir);
  if (!schemaFile || !fs.existsSync(schemaFile)) {
    return {
      source: "prisma",
      models: {},
      enums: {},
      error: `schema.prisma not found in ${prismaPathOrBackendDir}`,
    };
  }

  const content = fs.readFileSync(schemaFile, "utf8");
  return parsePrismaSchema(content, schemaFile);
}

function findPrismaSchemaFile(target) {
  if (!target) return null;
  if (fs.existsSync(target) && fs.statSync(target).isFile()) {
    return target;
  }

  const direct = path.join(target, "schema.prisma");
  if (fs.existsSync(direct)) return direct;

  const inPrismaDir = path.join(target, "prisma", "schema.prisma");
  if (fs.existsSync(inPrismaDir)) return inPrismaDir;

  return null;
}

function parsePrismaSchema(content, filePath) {
  const models = {};
  const enums = {};
  const lines = content.split("\n");

  let currentBlock = null; // { type: 'model' | 'enum', name: string, startLine: number, fields: {} }

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const lineNum = i + 1;
    const line = rawLine.trim();

    // Skip empty lines and full-line comments
    if (!line || line.startsWith("//")) continue;

    // Detect model start: model User {
    const modelStart = line.match(/^model\s+([A-Za-z0-9_]+)\s*\{/);
    if (modelStart) {
      currentBlock = {
        type: "model",
        name: modelStart[1],
        file: filePath,
        line: lineNum,
        strict: true,
        fields: {},
      };
      models[modelStart[1]] = currentBlock;
      continue;
    }

    // Detect enum start: enum Role {
    const enumStart = line.match(/^enum\s+([A-Za-z0-9_]+)\s*\{/);
    if (enumStart) {
      currentBlock = {
        type: "enum",
        name: enumStart[1],
        file: filePath,
        line: lineNum,
        values: [],
      };
      enums[enumStart[1]] = currentBlock;
      continue;
    }

    // Block close: }
    if (line === "}" || line.startsWith("}")) {
      currentBlock = null;
      continue;
    }

    if (currentBlock) {
      if (currentBlock.type === "enum") {
        const enumVal = line.split("//")[0].trim();
        if (enumVal) {
          currentBlock.values.push(enumVal);
        }
      } else if (currentBlock.type === "model") {
        // Skip block attributes like @@id, @@index, @@map
        if (line.startsWith("@@")) continue;

        // Parse field line: fieldName FieldType attributes...
        const parts = line.split("//")[0].trim().split(/\s+/);
        if (parts.length >= 2) {
          const fieldName = parts[0];
          let fieldType = parts[1];

          // Check if optional: String?
          const isOptional = fieldType.endsWith("?");
          const isList = fieldType.endsWith("[]");
          const cleanType = fieldType.replace(/[?\[\]]/g, "");

          // Check attributes: @id, @default(...), @relation(...)
          const attrString = parts.slice(2).join(" ");
          const isId = attrString.includes("@id");
          const defaultMatch = attrString.match(/@default\(([^)]+)\)/);
          const defaultValue = defaultMatch ? defaultMatch[1].trim() : undefined;
          const isRelation = attrString.includes("@relation");

          currentBlock.fields[fieldName] = {
            name: fieldName,
            rawType: cleanType,
            required: !isOptional && !isList,
            isList,
            isId,
            isRelation,
            default: defaultValue,
            line: lineNum,
          };
        }
      }
    }
  }

  return { source: "prisma", models, enums };
}

module.exports = {
  scanPrismaSchema,
  parsePrismaSchema,
};
