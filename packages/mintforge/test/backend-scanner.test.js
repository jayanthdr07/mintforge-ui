const { test, describe, before, after } = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const path = require("path");
const os = require("os");

const { scanBackend, scanPythonBackend, normalizeRoutePath } = require("../lib/backend-scanner");
const { scanExpressBackend } = require("../lib/express-scanner");
const { scanMongooseSchemas } = require("../lib/mongoose-scanner");
const { scanPrismaSchema } = require("../lib/prisma-scanner");
const { scanNodeValidators } = require("../lib/node-validator-scanner");

describe("Seam Check Backend Scanners", () => {
  let tempDir;

  before(() => {
    tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "mintforge-be-test-"));
  });

  after(() => {
    if (tempDir && fs.existsSync(tempDir)) {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  test("FastAPI Python Scanner detects routes, Pydantic models, and prefixes", () => {
    const pyCode = `
from fastapi import APIRouter, Query
from pydantic import BaseModel, Field
from typing import Optional

class UserCreate(BaseModel):
    user_name: str
    email_address: str
    bio: Optional[str] = None
    age: int = 18

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/register")
async def register_user(payload: UserCreate):
    return {"status": "ok"}

@router.get("/search")
async def search_users(query_text: str = Query(...), page_number: int = 1):
    return []
`;
    const pyFilePath = path.join(tempDir, "routes.py");
    fs.writeFileSync(pyFilePath, pyCode, "utf8");

    const result = scanPythonBackend(tempDir, "/api/v1");

    assert.strictEqual(result.routes.length, 2);

    const postRoute = result.routes.find((r) => r.method === "POST");
    assert.ok(postRoute);
    assert.strictEqual(postRoute.path, "api/v1/users/register");
    assert.ok(postRoute.bodyModel);
    assert.strictEqual(postRoute.bodyModel.name, "UserCreate");
    assert.strictEqual(postRoute.bodyModel.fields.user_name.required, true);
    assert.strictEqual(postRoute.bodyModel.fields.bio.required, false);

    const getRoute = result.routes.find((r) => r.method === "GET");
    assert.ok(getRoute);
    assert.strictEqual(getRoute.path, "api/v1/users/search");
    assert.ok(getRoute.queryParams.includes("query_text"));
    assert.ok(getRoute.queryParams.includes("page_number"));
  });

  test("Express Scanner extracts mount prefixes, route methods, query params, and body destructuring", () => {
    const expressCode = `
const express = require('express');
const router = express.Router();

// Route 1: Direct destructuring of req.body and req.query
router.post('/orders', (req, res) => {
  const { customer_id, order_total, discount_code } = req.body;
  res.json({ success: true });
});

router.get('/orders', (req, res) => {
  const { page_index, page_size, sort_order } = req.query;
  res.json([]);
});

const app = express();
app.use('/api/v1', router);
`;
    const expressDir = path.join(tempDir, "express-app");
    fs.mkdirSync(expressDir, { recursive: true });
    fs.writeFileSync(path.join(expressDir, "app.js"), expressCode, "utf8");

    const result = scanExpressBackend(expressDir);
    assert.strictEqual(result.routes.length, 2);

    const postOrder = result.routes.find((r) => r.method === "POST");
    assert.ok(postOrder);
    assert.strictEqual(postOrder.path, "api/v1/orders");
    assert.ok(postOrder.bodyModel);
    assert.ok(postOrder.bodyModel.fields.customer_id);
    assert.ok(postOrder.bodyModel.fields.order_total);
    assert.ok(postOrder.bodyModel.fields.discount_code);

    const getOrder = result.routes.find((r) => r.method === "GET");
    assert.ok(getOrder);
    assert.strictEqual(getOrder.path, "api/v1/orders");
    assert.ok(getOrder.queryParams.includes("page_index"));
    assert.ok(getOrder.queryParams.includes("page_size"));
    assert.ok(getOrder.queryParams.includes("sort_order"));
  });

  test("Mongoose Scanner extracts schema fields, types, options, and strict mode", () => {
    const mongooseCode = `
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true,
    trim: true,
  },
  unit_price: {
    type: Number,
    required: true,
  },
  sku_code: String,
  category: {
    type: String,
    enum: ['electronics', 'apparel', 'books'],
    default: 'electronics',
  },
  tags: [String],
}, {
  strict: true,
  timestamps: true,
});

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
`;
    const mongooseDir = path.join(tempDir, "mongoose-models");
    fs.mkdirSync(mongooseDir, { recursive: true });
    fs.writeFileSync(path.join(mongooseDir, "product.js"), mongooseCode, "utf8");

    const result = scanMongooseSchemas(mongooseDir);
    assert.ok(result.models.Product);
    const prod = result.models.Product;

    assert.strictEqual(prod.strict, true);
    assert.strictEqual(prod.fields.product_name.required, true);
    assert.strictEqual(prod.fields.product_name.rawType, "string");
    assert.strictEqual(prod.fields.unit_price.required, true);
    assert.strictEqual(prod.fields.sku_code.rawType, "string");
    assert.strictEqual(prod.fields.sku_code.required, false);
    assert.strictEqual(prod.fields.category.default, "'electronics'");
    assert.strictEqual(prod.fields.createdAt.rawType, "Date");
    assert.strictEqual(prod.fields.updatedAt.rawType, "Date");
    assert.strictEqual(prod.fields._id.rawType, "ObjectId");
  });

  test("Prisma Scanner extracts models, relations, enums, and optional fields", () => {
    const prismaCode = `
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum AccountStatus {
  ACTIVE
  SUSPENDED
  DELETED
}

model Organization {
  id          String         @id @default(uuid())
  org_name    String
  tax_number  String?
  status      AccountStatus  @default(ACTIVE)
  member_count Int           @default(1)
  created_at  DateTime       @default(now())
}
`;
    const prismaDir = path.join(tempDir, "prisma");
    fs.mkdirSync(prismaDir, { recursive: true });
    fs.writeFileSync(path.join(prismaDir, "schema.prisma"), prismaCode, "utf8");

    const result = scanPrismaSchema(prismaDir);
    assert.ok(result.models.Organization);
    assert.ok(result.enums.AccountStatus);

    const org = result.models.Organization;
    assert.strictEqual(org.fields.org_name.required, true);
    assert.strictEqual(org.fields.tax_number.required, false); // tax_number is String?
    assert.strictEqual(org.fields.tax_number.rawType, "String");
    assert.strictEqual(org.fields.status.rawType, "AccountStatus");
    assert.strictEqual(org.fields.id.isId, true);
  });

  test("Node Validator Scanner extracts Joi and backend Zod schemas", () => {
    const validatorCode = `
const Joi = require('joi');
const { z } = require('zod');

const CreateTeamSchema = Joi.object({
  team_name: Joi.string().required(),
  max_members: Joi.number().optional(),
});

const UpdateProfileDto = z.object({
  first_name: z.string(),
  last_name: z.string(),
  phone_number: z.string().optional(),
});
`;
    const valDir = path.join(tempDir, "validators");
    fs.mkdirSync(valDir, { recursive: true });
    fs.writeFileSync(path.join(valDir, "schemas.js"), validatorCode, "utf8");

    const result = scanNodeValidators(valDir);
    assert.ok(result.models.CreateTeamSchema);
    assert.ok(result.models.UpdateProfileDto);

    const joiModel = result.models.CreateTeamSchema;
    assert.strictEqual(joiModel.fields.team_name.required, true);
    assert.strictEqual(joiModel.fields.max_members.required, false);

    const zodModel = result.models.UpdateProfileDto;
    assert.strictEqual(zodModel.fields.first_name.required, true);
    assert.strictEqual(zodModel.fields.phone_number.required, false);
  });

  test("Unified scanBackend automatically coordinates multi-framework backends", () => {
    const unifiedDir = path.join(tempDir, "unified-app");
    fs.mkdirSync(unifiedDir, { recursive: true });

    // Express route with Mongoose model
    const appJs = `
const express = require('express');
const router = express.Router();
const User = require('./models/User');

router.post('/signup', async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

const app = express();
app.use('/api', router);
`;
    fs.writeFileSync(path.join(unifiedDir, "server.js"), appJs, "utf8");

    const modelsDir = path.join(unifiedDir, "models");
    fs.mkdirSync(modelsDir, { recursive: true });
    const userModel = `
const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
});
module.exports = mongoose.model('User', UserSchema);
`;
    fs.writeFileSync(path.join(modelsDir, "User.js"), userModel, "utf8");

    const result = scanBackend({ path: unifiedDir, framework: "auto" });

    assert.ok(result.frameworks.includes("express"));
    assert.ok(result.frameworks.includes("mongoose"));
    assert.strictEqual(result.routes.length, 1);

    const signupRoute = result.routes[0];
    assert.strictEqual(signupRoute.path, "api/signup");
    assert.ok(signupRoute.bodyModel);
    assert.strictEqual(signupRoute.bodyModel.name, "User");
    assert.strictEqual(signupRoute.bodyModel.fields.username.required, true);
  });
});
