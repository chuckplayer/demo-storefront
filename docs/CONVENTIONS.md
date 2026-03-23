# Project Conventions

## Project Overview
- **Name:** demo-storefront — "Unnecessarily Smart Home Appliances Co."
- **Type:** Vue 3 SPA + Express REST API
- **Primary technologies:** Vue 3, TypeScript, Pinia, Vue Router, Axios (client) / Express, node:sqlite (server)
- **Monorepo:** pnpm workspaces — `client` (port 5173) and `server` (port 3001)

## Solution Structure

```
demo-storefront/
  client/src/
    router/index.ts          — Vue Router, all route definitions
    stores/                  — Pinia stores (one per domain)
    types/index.ts           — All shared TypeScript interfaces
    views/                   — Page-level components (one per route)
    components/              — Reusable UI components
    App.vue                  — Root layout
  server/src/
    index.ts                 — Express app entry point, auto-seeds on empty DB
    db.ts                    — SQLite singleton, schema defined here
    seed.ts                  — Manual seed script
    routes/                  — One Router file per resource
```

## Naming Conventions

- **Vue components:** PascalCase filenames (`ProductCard.vue`, `CartSidebar.vue`)
- **View components:** PascalCase with `View` suffix (`ProductListView.vue`)
- **TypeScript files:** camelCase (`cart.ts`, `index.ts`)
- **Interfaces:** PascalCase, no `I`-prefix (`Product`, `CartItem`, `Order`)
- **Pinia stores:** `use` + PascalCase + `Store` suffix (`useCartStore`)
- **Route names:** kebab-case (`product-list`, `product-detail`)
- **CSS classes:** kebab-case (`product-card`, `add-to-cart-btn`)
- **DB tables:** snake_case plural (`products`, `orders`, `order_items`)
- **DB columns:** snake_case (`customer_email`, `stock_quantity`, `price_at_purchase`)

## Architectural Rules

### Client
- All TypeScript interfaces live in `client/src/types/index.ts` — no inline type definitions in components
- One Pinia store per domain; stores use the **setup pattern** (`ref`/`computed`/functions, not options)
- Axios for all HTTP calls — do not use `fetch`
- Views fetch their own data in `onMounted` — no data-fetching in components
- Components communicate via props down / emits up — no direct store access in pure display components

### Server
- One Express Router file per resource in `routes/` — register all routers in `index.ts`
- Routes query the database directly via `db.prepare()` — there is no service or repository layer
- All DB calls use the **synchronous** `node:sqlite` `DatabaseSync` API — no async/await for DB operations
- Use parameterized prepared statements for all queries — never interpolate user input into SQL
- Multi-statement DB writes must use explicit transactions: `db.exec('BEGIN')` / `COMMIT` / `ROLLBACK`

### Explicitly forbidden
- No Options API in Vue components — Composition API with `<script setup>` only
- No external UI libraries — plain CSS only
- No DbContext/ORM — raw SQL via `node:sqlite`

## Error Handling

### Server
- Route handlers wrap all logic in `try/catch` and call `next(err)` on failure
- Global error handler in `index.ts` catches all errors: logs with `console.error`, responds with `500` and `{ error: err.message }`
- Inline 404s returned as `res.status(404).json({ error: '...' })` — do not throw for not-found

### Client
- HTTP errors are caught in `try/catch` inside `onMounted` or event handlers
- Error state is held in a `ref<string | null>(null)` and rendered in the template
- Use `err instanceof Error ? err.message : 'Fallback message'` for safe error extraction

## Frontend Conventions

### Component structure
- `<template>` → `<script setup lang="ts">` → `<style scoped>` — always in this order
- `defineProps<T>()` and `defineEmits<T>()` with TypeScript generics — no runtime prop definitions
- Scoped CSS (`<style scoped>`) for all component styles
- Exception: styles for Teleport-rendered elements (overlays, modals) go in an **unscoped** `<style>` block in the same file, with a comment noting the reason

### Styling
- No external UI or CSS frameworks — hand-written CSS only
- CSS custom properties are not currently used — use literal color values consistent with existing palette (`#111`, `#f9f9f7`, `#e5e5e3`, etc.)
- Responsive breakpoints: `900px` (3-col → 2-col) and `560px` (2-col → 1-col)

## Logging Standards

- `console.error` for caught errors (global handler and any unexpected catch)
- `console.log` for startup events (server boot, seed operations)
- No structured logging library — plain `console` only

## Testing Conventions

> **Aspirational:** No tests exist yet and no test framework is installed. The conventions below define the target state.

- **Client:** Vitest for unit and component tests
- **Server:** Vitest (or Node's built-in test runner) for route and DB logic tests
- **Coverage target:** new route handlers and Pinia store actions should have tests
- **Test file location:** co-located with source (`foo.test.ts` next to `foo.ts`) or in a `__tests__/` folder within the same package
- **No mocking the database** — use an in-memory SQLite instance in tests instead
