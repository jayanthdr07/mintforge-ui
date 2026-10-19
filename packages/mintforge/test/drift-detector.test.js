const { test, describe, before, after } = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const os = require("os");

const { detectDrift, applyFixes } = require("../lib/drift-detector");

describe("Seam Check Drift Detector Engine", () => {
  let tempDir;

  before(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "mintforge-drift-test-"));
  });

  after(() => {
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  const defaultConfig = {
    rules: { casing: "error", routes: "error", payloads: "error" },
    ignore: { routes: [], fields: ["id", "_id"] },
    mappings: {},
  };

  test("flags CASING_DRIFT when frontend sends camelCase for snake_case backend model field", () => {
    const backendData = {
      routes: [
        {
          path: "api/v1/orders",
          originalPath: "/api/v1/orders",
          method: "POST",
          bodyModel: {
            name: "OrderCreate",
            fields: {
              discount_code: { name: "discount_code", required: false, line: 10 },
              customer_id: { name: "customer_id", required: true, line: 11 },
            },
          },
          file: "routes.py",
          line: 20,
        },
      ],
      models: {},
    };

    const frontendData = {
      calls: [
        {
          method: "POST",
          rawUrl: "/api/v1/orders",
          path: "api/v1/orders",
          payloadFields: ["discountCode", "customer_id"],
          file: "OrderForm.tsx",
          line: 45,
        },
      ],
      schemas: {},
    };

    const { findings, stats } = detectDrift(backendData, frontendData, defaultConfig);

    assert.strictEqual(stats.casingDrifts, 1);
    const casingFinding = findings.find((f) => f.type === "CASING_DRIFT");
    assert.ok(casingFinding);
    assert.strictEqual(casingFinding.frontend.field, "discountCode");
    assert.strictEqual(casingFinding.backend.field, "discount_code");
    assert.strictEqual(casingFinding.fixable, true);
  });

  test("flags MISSING_REQUIRED_FIELD when frontend payload misses required backend field", () => {
    const backendData = {
      routes: [
        {
          path: "api/v1/users",
          originalPath: "/api/v1/users",
          method: "POST",
          bodyModel: {
            name: "UserCreate",
            fields: {
              email: { name: "email", required: true, line: 5 },
              password_hash: { name: "password_hash", required: true, line: 6 },
            },
          },
          file: "users.py",
          line: 15,
        },
      ],
      models: {},
    };

    const frontendData = {
      calls: [
        {
          method: "POST",
          rawUrl: "/api/v1/users",
          path: "api/v1/users",
          payloadFields: ["email"], // misses password_hash
          file: "Signup.tsx",
          line: 30,
        },
      ],
      schemas: {},
    };

    const { findings, stats } = detectDrift(backendData, frontendData, defaultConfig);

    assert.strictEqual(stats.payloadDrifts, 1);
    const missingFinding = findings.find((f) => f.type === "MISSING_REQUIRED_FIELD");
    assert.ok(missingFinding);
    assert.strictEqual(missingFinding.backend.field, "password_hash");
  });

  test("flags MONGOOSE_STRICT_STRIPPING when frontend sends undeclared field to strict schema", () => {
    const backendData = {
      routes: [
        {
          path: "api/posts",
          originalPath: "/api/posts",
          method: "POST",
          bodyModel: {
            name: "Post",
            strict: true,
            fields: {
              title: { name: "title", required: true },
              content: { name: "content", required: true },
            },
          },
          framework: "mongoose",
          file: "posts.js",
          line: 12,
        },
      ],
      models: {},
    };

    const frontendData = {
      calls: [
        {
          method: "POST",
          rawUrl: "/api/posts",
          path: "api/posts",
          payloadFields: ["title", "content", "internalTrackingNote"],
          file: "CreatePost.tsx",
          line: 25,
        },
      ],
      schemas: {},
    };

    const { findings, stats } = detectDrift(backendData, frontendData, defaultConfig);

    assert.strictEqual(stats.strictModeDrifts, 1);
    const strictFinding = findings.find((f) => f.type === "MONGOOSE_STRICT_STRIPPING");
    assert.ok(strictFinding);
    assert.strictEqual(strictFinding.frontend.field, "internalTrackingNote");
    assert.ok(strictFinding.message.includes("silently discarded at runtime"));
  });

  test("flags QUERY_PARAM_CASING_DRIFT when URL query parameter uses camelCase instead of snake_case", () => {
    const backendData = {
      routes: [
        {
          path: "api/products",
          originalPath: "/api/products",
          method: "GET",
          queryParams: ["sort_by", "page_number"],
          file: "routes.js",
          line: 10,
        },
      ],
      models: {},
    };

    const frontendData = {
      calls: [
        {
          method: "GET",
          rawUrl: "/api/products?sortBy=price&page_number=1",
          path: "api/products",
          queryParams: ["sortBy", "page_number"],
          payloadFields: [],
          file: "ProductList.tsx",
          line: 18,
        },
      ],
      schemas: {},
    };

    const { findings, stats } = detectDrift(backendData, frontendData, defaultConfig);

    assert.strictEqual(stats.queryParamDrifts, 1);
    const queryFinding = findings.find((f) => f.type === "QUERY_PARAM_CASING_DRIFT");
    assert.ok(queryFinding);
    assert.strictEqual(queryFinding.frontend.param, "sortBy");
    assert.strictEqual(queryFinding.backend.param, "sort_by");
  });

  test("flags ROUTE_NOT_FOUND and METHOD_MISMATCH", () => {
    const backendData = {
      routes: [
        {
          path: "api/v1/checkout",
          originalPath: "/api/v1/checkout",
          method: "POST",
          file: "checkout.py",
          line: 20,
        },
      ],
      models: {},
    };

    const frontendData = {
      calls: [
        {
          method: "GET",
          rawUrl: "/api/v1/checkout",
          path: "api/v1/checkout",
          payloadFields: [],
          file: "Cart.tsx",
          line: 12,
        },
        {
          method: "POST",
          rawUrl: "/api/v1/unknown-endpoint",
          path: "api/v1/unknown-endpoint",
          payloadFields: [],
          file: "Cart.tsx",
          line: 18,
        },
      ],
      schemas: {},
    };

    const { findings, stats } = detectDrift(backendData, frontendData, defaultConfig);

    assert.strictEqual(stats.routeDrifts, 2);
    assert.ok(findings.some((f) => f.type === "METHOD_MISMATCH"));
    assert.ok(findings.some((f) => f.type === "ROUTE_NOT_FOUND"));
  });

  test("applyFixes correctly rewrites camelCase field names to snake_case in source files", () => {
    const testFile = path.join(tempDir, "OrderForm.tsx");
    const originalCode = `
import { api } from '@/lib/api';

export async function submitOrder(data) {
  return api.post('/api/orders', {
    discountCode: data.code,
    phoneNumber: data.phone,
  });
}
`;
    fs.writeFileSync(testFile, originalCode, "utf8");

    const findings = [
      {
        type: "CASING_DRIFT",
        fixable: true,
        from: "discountCode",
        to: "discount_code",
        frontend: { file: testFile, line: 6 },
      },
      {
        type: "CASING_DRIFT",
        fixable: true,
        from: "phoneNumber",
        to: "phone_number",
        frontend: { file: testFile, line: 7 },
      },
    ];

    const fixResult = applyFixes(findings);

    assert.strictEqual(fixResult.fixedCount, 2);
    assert.strictEqual(fixResult.modifiedFiles.length, 1);

    const updatedContent = fs.readFileSync(testFile, "utf8");
    assert.ok(updatedContent.includes("discount_code: data.code"));
    assert.ok(updatedContent.includes("phone_number: data.phone"));
    assert.ok(!updatedContent.includes("discountCode"));
    assert.ok(!updatedContent.includes("phoneNumber"));
  });
});
