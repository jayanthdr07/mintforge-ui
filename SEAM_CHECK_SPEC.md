# Mintforge UI — Master Seam Check Engineering Blueprint & Component Encyclopedia

> **Document Type**: Exhaustive Architecture, Component Catalog & Engineering Roadmap  
> **Target Audience**: Full-Stack Engineers & Technical Contributors  
> **Status**: Official Canonical Specification

---

## Table of Contents
1. [Core Philosophy & Architecture](#1-core-philosophy--architecture)
2. [What Is Already Built (Current Baseline)](#2-what-is-already-built-current-baseline)
3. [Exhaustive Component Catalog (Everything Being Built)](#3-exhaustive-component-catalog)
   - [Category A: Forms & Advanced Input Controls](#category-a-forms--advanced-input-controls)
   - [Category B: Data Display, Tables & Collections](#category-b-data-display-tables--collections)
   - [Category C: Modals, Drawers & Action Overlays](#category-c-modals-drawers--action-overlays)
   - [Category D: URL, Routing, Search & Navigation](#category-d-url-routing-search--navigation)
   - [Category E: Feedback, Loading & Async States](#category-e-feedback-loading--async-states)
   - [Category F: Developer Observability & In-Browser Devtools](#category-f-developer-observability--in-browser-devtools)
4. [The React Hooks Suite (`@mintforge/seam-react`)](#4-the-react-hooks-suite)
5. [Backend Adapters & Scanners (FastAPI, Node, Express, Mongo, Prisma)](#5-backend-adapters--scanners)
6. [CLI & CI/CD Engine Upgrades (`npx mintforge check`)](#6-cli--cicd-engine-upgrades)
7. [Phased Implementation Roadmap for Contributors](#7-phased-implementation-roadmap-for-contributors)

---

## 1. Core Philosophy & Architecture

### The Problem: "The Seam"
In modern software engineering, web and mobile apps are built across two separated worlds:
- **Frontend**: Next.js / React / Expo using **TypeScript & Zod schemas**
- **Backend**: **FastAPI (Python + Pydantic)**, **Node.js (Express + Mongoose / Zod)**, or **Prisma**

The boundary connecting them is **"The Seam"**. This seam is the #1 source of production downtime and silent bugs:
1. **Casing Drift**: Frontend sends `camelCase` (`phoneNumber`), backend expects `snake_case` (`phone_number`). Result: silent HTTP `422 Unprocessable Entity`.
2. **Missing & Optional Drift**: Backend requires a field that frontend forgot to send, or a field made optional on the backend is still marked required in the UI.
3. **Route & Parameter Drift**: Frontend calls `/api/orders` instead of `/api/v1/orders/`, or calls `DELETE /api/users/:userId` when backend expects `{id}`. Result: immediate `404 Not Found` or `405 Method Not Allowed`.
4. **Mongoose Silent Stripping**: In Node/Mongoose, schemas have `strict: true` by default. Any field sent by the frontend that isn't declared in Mongoose is silently discarded without throwing an error.
5. **Response Key Drift**: Backend renames a response field (`created_at` &rarr; `createdAt`). The frontend table or dashboard doesn't crash, but silently displays blank/null cells.

### The Mintforge Solution
- **Zero Codegen**: No fragile code generation steps, no mandatory OpenAPI YAML files.
- **Zero Server Overhead**: Does not require running the backend server or databases to verify contracts.
- **Pure AST Static Verification**: Scans TypeScript and Python / Node files directly using AST parsers.
- **Dual-Layer Protection**:
  1. **Build & CI Time**: `npx mintforge check` blocks broken PRs before deployment.
  2. **In-Browser Dev Time**: Seam components display real-time warnings right on the screen as you build.

---

## 2. What Is Already Built (Current Baseline)

These items are already implemented and serve as the baseline architecture:

| Asset | File Location | Status | Summary |
| :--- | :--- | :---: | :--- |
| **`<SeamStatus />`** | `src/components/ui/seam-status.tsx` | **Complete (Needs Upgrade)** | Dev pill, header banner, and card widget with click-to-open **Seam Inspector Modal** showing live endpoint sync status. |
| **`<SeamForm />` & `<SeamFormField />`** | `src/components/ui/seam-form.tsx` | **Complete (Needs Upgrade)** | Contract-aware form wrapper with React Context that registers inputs and detects `camelCase` vs `snake_case` casing drift and missing fields in real time. |
| **CLI Verification Engine** | `packages/mintforge/bin/index.js` | **Complete (FastAPI)** | Implements `npx mintforge check` and `--init`. |
| **Drift Detector Core** | `packages/mintforge/lib/drift-detector.js` | **Complete** | Framework-agnostic comparison engine identifying casing, route, and payload mismatches. |
| **FastAPI Backend Scanner** | `packages/mintforge/lib/backend-scanner.js` | **Complete** | Python AST & regex scanner for `@router` routes and Pydantic `BaseModel`s. |
| **Frontend Scanner** | `packages/mintforge/lib/frontend-scanner.js` | **Complete** | Scans TypeScript/TSX files for `fetch`, `axios`, `api.*` calls and Zod `z.object({...})`. |
| **Config Loader** | `packages/mintforge/lib/config.js` | **Complete** | Parses `seamcheck.yaml` with auto-path detection. |
| **Documentation Page** | `src/app/docs/seam-check/page.tsx` | **Complete** | Interactive documentation, live CLI preview, and GitHub Action guides. |

---

### Mandatory Upgrades for the 2 Currently Built Components

While `<SeamStatus />` and `<SeamForm />` are working, they were initially written as FastAPI prototypes and **must be upgraded** to support the full-stack architecture (Node.js, Express, Mongoose, and the new components):

#### 1. Upgrades Required for `<SeamStatus />` (`src/components/ui/seam-status.tsx`)
- [ ] **Multi-Backend Framework Support**: Add a `framework?: "fastapi" | "express" | "mongoose"` prop. The badge and Inspector Modal must clearly display whether the endpoint is backed by FastAPI or Express/Mongoose.
- [ ] **Dynamic Endpoint Binding**: Remove hardcoded sample feedback endpoints; allow `<SeamStatus />` to dynamically inherit active endpoint data from nearest `<SeamForm />`, `<SeamTable />`, or global `<SeamDevToolbar />`.
- [ ] **Mongoose Strict-Mode Warnings**: Update the modal inspector to flag fields that will be silently dropped by Mongoose due to `strict: true`.
- [ ] **Status Tag Styling**: Upgrade the Inspector Modal styling to match the latest Mintforge UI light-theme tokens (`#F8F9FC` background, `#5145FF` primary accents, `#E5E7EB` borders).

#### 2. Upgrades Required for `<SeamForm />` & `<SeamFormField />` (`src/components/ui/seam-form.tsx`)
- [ ] **Mongoose / Node Validation Rules**: Expand beyond `camelCase` vs `snake_case` detection. Add detection for Mongoose undeclared keys (strict mode stripping) and missing required fields in Node/Express schemas.
- [ ] **Auto-Error Mapping with `<SeamErrorBoundary />`**: Update `SeamFormContext` to accept an `errorMap?: Record<string, string>`. When backend returns a 422 (FastAPI `loc: ["body", "field"]`) or Mongoose `ValidationError`, `<SeamForm />` must automatically pass the error string to the matching `<SeamFormField />`.
- [ ] **Universal Input Registration**: Expand `registerField(name, metadata)` so it accepts type information (`string`, `number`, `file`, `date`, `array`) and required status. This allows all new input components (`<SeamCombobox />`, `<SeamDatePicker />`, `<SeamUpload />`) to plug into `<SeamForm />` effortlessly.
- [ ] **Pre-Flight Client Validation**: Add a `validateBeforeSubmit?: boolean` prop that executes pre-flight checks locally before calling `onSubmit`, preventing unnecessary network roundtrips for already-invalid payloads.

---

## 3. Exhaustive Component Catalog

Every component listed below is part of the Seam Check ecosystem. They are designed to be dropped directly into any React/Next.js codebase.

---

### Category A: Forms & Advanced Input Controls

When users submit data, every input field must align with backend validation rules, data types, and casing:

#### 1. `<SeamForm />` *(Already Built — Base Container)*
- **Path**: `src/components/ui/seam-form.tsx`
- **Role**: Root context provider for forms. Tracks target endpoint (`POST /api/v1/auth`), expected backend model, and dynamically registered inputs.

#### 2. `<SeamFormField />` *(Already Built — Field Wrapper)*
- **Path**: `src/components/ui/seam-form.tsx`
- **Role**: Wraps inputs with label, helper text, and contract status. Detects when a field name (`userName`) drifts from backend expectations (`user_name`).

#### 3. `<SeamInput />`
- **Target File**: `src/components/ui/seam-input.tsx`
- **Purpose**: Contract-aware text, email, password, and number inputs. Auto-validates min/max length, regex patterns, and numeric bounds declared in backend models.

#### 4. `<SeamTextarea />`
- **Target File**: `src/components/ui/seam-textarea.tsx`
- **Purpose**: Multi-line input supporting character count constraints directly derived from backend string length constraints (e.g. Pydantic `Field(max_length=500)`).

#### 5. `<SeamSelect />`
- **Target File**: `src/components/ui/seam-select.tsx`
- **Purpose**: Dropdown select matching backend `Enum` types (e.g. `Role = "admin" | "member" | "viewer"`). Warns in dev mode if an option value does not exist in the backend enum.

#### 6. `<SeamCombobox />` / `<SeamAsyncSelect />`
- **Target File**: `src/components/ui/seam-combobox.tsx`
- **Purpose**: Dynamic search select that fetches options from a backend endpoint (`GET /api/v1/organizations?search=...`) with debouncing. Validates search query parameter names and option keys (`id`, `label`, `value`).

#### 7. `<SeamMultiSelect />`
- **Target File**: `src/components/ui/seam-multi-select.tsx`
- **Purpose**: Tag/chip multi-selector. Validates that the submitted value is a JSON array matching the backend array schema (e.g. `List[str]` in Python or `[String]` in Mongoose).

#### 8. `<SeamCheckbox />` & `<SeamCheckboxGroup />`
- **Target File**: `src/components/ui/seam-checkbox.tsx`
- **Purpose**: Boolean switches and multi-checkbox groups. Validates boolean primitives and string arrays against backend models.

#### 9. `<SeamRadioGroup />`
- **Target File**: `src/components/ui/seam-radio-group.tsx`
- **Purpose**: Mutually exclusive radio buttons representing backend choice enums.

#### 10. `<SeamSwitch />`
- **Target File**: `src/components/ui/seam-switch.tsx`
- **Purpose**: Toggle switch for settings flags. Ensures boolean keys match backend model properties.

#### 11. `<SeamSlider />`
- **Target File**: `src/components/ui/seam-slider.tsx`
- **Purpose**: Numeric range slider. Enforces backend `ge` (greater than or equal) and `le` (less than or equal) constraints directly on the UI slider bounds.

#### 12. `<SeamDatePicker />` & `<SeamDateRangePicker />`
- **Target File**: `src/components/ui/seam-date-picker.tsx`
- **Purpose**: Handles ISO-8601 vs Unix epoch timestamp drift. Formats date payloads to match the exact string format expected by FastAPI `datetime` or Mongoose `Date`.

#### 13. `<SeamTimePicker />`
- **Target File**: `src/components/ui/seam-time-picker.tsx`
- **Purpose**: Time selection matching backend `time` string formats (`HH:mm:ss` vs `HH:mm`).

#### 14. `<SeamUpload />` / `<SeamDropzone />`
- **Target File**: `src/components/ui/seam-upload.tsx`
- **Purpose**: Multipart file upload. Pre-validates file size limits and MIME types against backend upload route constraints before uploading to avoid HTTP `413 Payload Too Large` or `415 Unsupported Media Type`.

#### 15. `<SeamImageUpload />`
- **Target File**: `src/components/ui/seam-image-upload.tsx`
- **Purpose**: Dedicated avatar and image uploader with aspect ratio and format validation.

#### 16. `<SeamOtpInput />` / `<SeamPinInput />`
- **Target File**: `src/components/ui/seam-otp-input.tsx`
- **Purpose**: One-time-password and PIN inputs for 2FA / auth contracts. Enforces exact digit lengths required by auth verification endpoints.

#### 17. `<SeamTagsInput />`
- **Target File**: `src/components/ui/seam-tags-input.tsx`
- **Purpose**: Dynamic keyword chip input. Validates max tag count and tag string constraints against backend list models.

---

### Category B: Data Display, Tables & Collections

When receiving data from the backend, these components prevent blank cells, unhandled enums, and broken pagination:

#### 18. `<SeamTable />` / `<SeamDataTable />` *(High Priority)*
- **Target File**: `src/components/ui/seam-table.tsx`
- **Purpose**: Validates table column `accessorKey` properties against backend response models (`GET /api/v1/users` &rarr; `UserResponse`). If the backend renames `user_id` to `id`, it warns in dev mode instead of silently rendering blank cells.

#### 19. `<SeamVirtualList />`
- **Target File**: `src/components/ui/seam-virtual-list.tsx`
- **Purpose**: Virtualized scroll list for large datasets. Validates list item schema keys against backend array response models.

#### 20. `<SeamInfiniteScroll />` / `<SeamFeed />`
- **Target File**: `src/components/ui/seam-infinite-scroll.tsx`
- **Purpose**: Social or activity feeds with cursor/offset pagination. Ensures cursor key names (`next_cursor` vs `cursor` vs `has_more`) match backend pagination responses.

#### 21. `<SeamStatCard />` / `<SeamMetric />`
- **Target File**: `src/components/ui/seam-stat-card.tsx`
- **Purpose**: Analytics and KPI cards (e.g. Revenue, Active Users, Churn Rate). Verifies metric keys (`total_revenue` vs `totalRevenue`) against analytics endpoint response models.

#### 22. `<SeamStatusBadge />`
- **Target File**: `src/components/ui/seam-status-badge.tsx`
- **Purpose**: Enum-driven status pill (e.g. `"PENDING"`, `"IN_TRANSIT"`, `"DELIVERED"`). If the backend adds a new enum value (e.g. `"REFUNDED"`) that the frontend hasn't mapped, it renders a clear unhandled-enum warning in dev mode.

#### 23. `<SeamEntityCard />`
- **Target File**: `src/components/ui/seam-entity-card.tsx`
- **Purpose**: User, organization, or product card that binds directly to a backend entity schema.

#### 24. `<SeamTimeline />` / `<SeamAuditLog />`
- **Target File**: `src/components/ui/seam-timeline.tsx`
- **Purpose**: Event history feed matching backend audit log models (`timestamp`, `actor_id`, `event_type`).

#### 25. `<SeamTree />` / `<SeamTreeView />`
- **Target File**: `src/components/ui/seam-tree.tsx`
- **Purpose**: Hierarchical directory or category tree matching recursive backend data structures (`id`, `name`, `children: []`).

---

### Category C: Modals, Drawers & Action Overlays

Where mutations occur and route parameter typos cause 404s/422s:

#### 26. `<SeamDialog />` *(High Priority)*
- **Target File**: `src/components/ui/seam-dialog.tsx`
- **Purpose**: Mutation modal for critical user workflows. Verifies route parameters (`DELETE /api/v1/workspaces/{workspace_id}`) and request body fields before firing the request.

#### 27. `<SeamAlertDialog />`
- **Target File**: `src/components/ui/seam-alert-dialog.tsx`
- **Purpose**: Destructive confirmation dialog (e.g., Delete Account, Revoke API Key) with built-in contract validation.

#### 28. `<SeamSheet />` / `<SeamDrawer />`
- **Target File**: `src/components/ui/seam-sheet.tsx`
- **Purpose**: Slide-out edit panel containing contract-verified forms for editing items without leaving the current view.

#### 29. `<SeamActionMenu />`
- **Target File**: `src/components/ui/seam-action-menu.tsx`
- **Purpose**: Table row dropdown menu (Edit, Clone, Archive, Delete). Guarantees action endpoints match active backend routes.

#### 30. `<SeamCommand />` / `<SeamCommandPalette />` (`Cmd+K`)
- **Target File**: `src/components/ui/seam-command.tsx`
- **Purpose**: Global command palette querying backend search endpoints with query parameter validation.

---

### Category D: URL, Routing, Search & Navigation

Where URL query parameters and routing state drift from backend arguments:

#### 31. `<SeamFilterBar />`
- **Target File**: `src/components/ui/seam-filter-bar.tsx`
- **Purpose**: Toolbar syncing search inputs, status dropdowns, and date filters with URL query parameters (`?status=active&sort_by=created_at&page=1`). Verifies query keys against backend route query arguments.

#### 32. `<SeamSearchBar />`
- **Target File**: `src/components/ui/seam-search-bar.tsx`
- **Purpose**: Debounced search input that validates query parameter names (`q` vs `query` vs `search`) against backend route signatures.

#### 33. `<SeamPagination />`
- **Target File**: `src/components/ui/seam-pagination.tsx`
- **Purpose**: Page controls. Verifies page number vs offset/limit parameters (`page/page_size` vs `skip/limit`).

#### 34. `<SeamTabs />`
- **Target File**: `src/components/ui/seam-tabs.tsx`
- **Purpose**: Tabbed navigation tied to backend child endpoints (`/users/:id/billing`, `/users/:id/security`).

---

### Category E: Feedback, Loading & Async States

Handling errors, loading shapes, and async task progress:

#### 35. `<SeamErrorBoundary />` *(High Priority)*
- **Target File**: `src/components/ui/seam-error-boundary.tsx`
- **Purpose**: Catches backend HTTP 422 (FastAPI `loc`) or Mongoose `ValidationError` and automatically maps error messages directly onto the matching form inputs by field name.

#### 36. `<SeamSkeleton />`
- **Target File**: `src/components/ui/seam-skeleton.tsx`
- **Purpose**: Loading placeholder whose geometry matches the expected layout of the backend model before data arrives.

#### 37. `<SeamEmptyState />`
- **Target File**: `src/components/ui/seam-empty-state.tsx`
- **Purpose**: Graceful empty-state UI for 0 results, empty collections, or unconfigured backend entities.

#### 38. `<SeamToast />`
- **Target File**: `src/components/ui/seam-toast.tsx`
- **Purpose**: Notification popup displaying backend message payloads (`detail`, `message`, `error_code`).

#### 39. `<SeamProgress />`
- **Target File**: `src/components/ui/seam-progress.tsx`
- **Purpose**: Progress bar polling long-running backend async task status (`PENDING`, `PROGRESS`, `COMPLETED`).

---

### Category F: Developer Observability & In-Browser Devtools

Real-time feedback for developers during active coding:

#### 40. `<SeamDevToolbar />` *(High Priority)*
- **Target File**: `src/components/ui/seam-dev-toolbar.tsx`
- **Purpose**: Global floating dev widget in the browser corner. Automatically monitors every API call on the page and displays green/red sync status.

#### 41. `<SeamInspectorModal />` *(Already Built)*
- **Target File**: `src/components/ui/seam-status.tsx`
- **Purpose**: Modal showing full route details, parameter tables, and field-level diff highlights.

#### 42. `<SeamNetworkInterceptor />`
- **Target File**: `src/lib/seam/network-interceptor.ts`
- **Purpose**: In-browser dev-mode interceptor for `window.fetch` and `axios` that compares real network requests against registered backend models.

---

## 4. The React Hooks Suite

For developers building custom UI that doesn't use pre-built components:

| Hook | File Location | Purpose |
| :--- | :--- | :--- |
| **`useSeamQuery`** | `src/lib/hooks/use-seam-query.ts` | Contract-verified data fetching wrapping `fetch` or React Query. |
| **`useSeamMutation`** | `src/lib/hooks/use-seam-mutation.ts` | Pre-flight payload validation for `POST`, `PUT`, `PATCH`, `DELETE`. |
| **`useSeamInfiniteQuery`** | `src/lib/hooks/use-seam-infinite-query.ts` | Contract-aware cursor/offset infinite scroll data fetcher. |
| **`useSeamContract`** | `src/lib/hooks/use-seam-contract.ts` | Access backend validation constraints (min/max length, regex, enums) directly in JavaScript. |
| **`useSeamField`** | `src/lib/hooks/use-seam-field.ts` | Connects any custom input component to the parent `<SeamForm />` context. |

---

## 5. Backend Adapters & Scanners

Expanding Seam Check's CLI to scan any backend without running a server:

```
                          ┌─► fastapi-scanner.js    (FastAPI / Pydantic)
                          ├─► express-scanner.js    (Node.js / Express)
Backend Source Files ─────┼─► mongoose-scanner.js   (MongoDB / Mongoose)
                          ├─► prisma-scanner.js     (Prisma ORM schema)
                          └─► nestjs-scanner.js     (NestJS Controllers/DTOs)
                                      │
                                      ▼
                          Normalized Backend Model
                          { routes: [...], models: [...] }
                                      │
                                      ▼
                              drift-detector.js
                                      ▲
                                      │
                          Normalized Frontend Model
                          (fetch, axios, Zod schemas)
```

| Scanner | Target Path | What It Scans |
| :--- | :--- | :--- |
| **FastAPI Scanner** | `packages/mintforge/lib/backend-scanner.js` | **Complete**: Scans Python `@router` and Pydantic `BaseModel`. |
| **Express Scanner** | `packages/mintforge/lib/express-scanner.js` | **To Build**: Scans `app.use('/api', router)` mounts and `router.get/post/put/delete` endpoints. |
| **Mongoose Scanner** | `packages/mintforge/lib/mongoose-scanner.js` | **To Build**: Scans `new mongoose.Schema({...})` for fields, types, and `required: true`. |
| **Prisma Scanner** | `packages/mintforge/lib/prisma-scanner.js` | **To Build**: Scans `schema.prisma` for models, relations, and optional fields. |
| **Node Validator Scanner** | `packages/mintforge/lib/node-validator-scanner.js` | **To Build**: Scans Joi and backend Zod validation schemas in Node.js. |

---

## 6. CLI & CI/CD Engine Upgrades (`npx mintforge check`)

| Feature | File Location | Purpose |
| :--- | :--- | :--- |
| **Response Model Verification** | `packages/mintforge/lib/drift-detector.js` | Compares frontend response types against backend response schemas. |
| **Query Parameter Verification** | `packages/mintforge/lib/drift-detector.js` | Validates URL query parameters (`?sort=`, `?page=`) against route signatures. |
| **Auto-Fix Command (`--fix`)** | `packages/mintforge/bin/index.js` | `npx mintforge check --fix` automatically renames frontend `camelCase` keys to `snake_case` or generates Pydantic/Mongoose aliases. |

---

## 7. Phased Implementation Roadmap for Contributors

```
┌────────────────────────────────────────────────────────────────────────┐
│ PHASE 0: Upgrade Existing Baseline (Immediate First Task)              │
│  0. Upgrade <SeamStatus />  (Multi-backend framework tags & modal)    │
│  0. Upgrade <SeamForm />    (Mongoose rules, errorMap, rich inputs)    │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 1: Priority UI & Devtools                                        │
│  1. <SeamTable />          (Response verification for data tables)     │
│  2. <SeamDevToolbar />      (Global in-browser floating dev inspector) │
│  3. <SeamErrorBoundary />  (Auto-maps 422 / Mongoose errors to inputs) │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 2: Node, Express & Mongoose Scanners                             │
│  4. express-scanner.js     (Extracts Express routes and prefix mounts) │
│  5. mongoose-scanner.js    (Extracts Mongoose schema fields & required)│
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 3: Advanced Form Inputs & Modals                                 │
│  6. <SeamCombobox />       (Dynamic async search dropdown)             │
│  7. <SeamUpload />         (Multipart upload constraints)              │
│  8. <SeamDatePicker />     (ISO-8601 date format guard)                │
│  9. <SeamDialog />         (Mutation modal parameter verification)     │
│ 10. <SeamStatusBadge />    (Enum-driven status pill)                   │
├────────────────────────────────────────────────────────────────────────┤
│ PHASE 4: Hooks & CLI Enhancements                                      │
│ 11. useSeamQuery & useSeamMutation                                    │
│ 12. npx mintforge check --fix                                          │
└────────────────────────────────────────────────────────────────────────┘
```

---

## Summary
With this architecture, **Mintforge Seam Check** covers every single interaction point between frontend UI and backend services:
- **Forms & Inputs** (Write contracts)
- **Tables, Lists & Cards** (Read contracts)
- **Modals & Drawers** (Action contracts)
- **Filter bars & Search** (Query contracts)
- **Devtools & Error Boundaries** (Developer experience & error recovery)
- **FastAPI, Express, Mongoose & Prisma** (Multi-backend support)
