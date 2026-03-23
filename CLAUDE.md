# Demo Storefront — Claude Code Project

## Project Overview
Fictional storefront for "Unnecessarily Smart Home Appliances Co."
Vue 3 + TypeScript frontend, Express + TypeScript backend, SQLite database.
Pnpm monorepo with two packages: `client` (port 5173) and `server` (port 3001).

## CRITICAL: Development Rules (Windows & macOS)
- **NEVER run `pnpm build`, `vue-tsc`, or any type-check commands**
- **NEVER run `pnpm install` unless explicitly asked**
- **NEVER start dev servers** — they are already running
- **NEVER use `find`, `grep`, or recursive directory scans** to locate files
- **NEVER run `rm`, `rm -rf`, `rd`, or `del` commands**
- **DO NOT verify changes by running the build** — just report what you changed
- On macOS: use `npx tsx` if `tsx` is not found directly on PATH
- When in doubt, make the edit and stop. Do not validate.

## Project Structure — Exact File Locations

### Client (`client/src/`)
```
router/index.ts          — Vue Router, all route definitions live here
stores/cart.ts           — Pinia cart store (items, total, addItem, clearCart)
types/index.ts           — Shared TS interfaces: Product, CartItem, Order, OrderItem
views/
  ProductListView.vue    — Home page, fetches GET /api/products on mount
  ProductDetailView.vue  — Single product, fetches GET /api/products/:id on mount
  OrderConfirmationView.vue — Order success shell, reads route.params.id, NO data fetch yet
  CheckoutView.vue       — Does not exist yet
components/
  ProductCard.vue        — Product grid card with zoom overlay, emits add-to-cart
  CartSidebar.vue        — Slide-in cart, checkout button currently disabled
App.vue                  — Root layout, sticky header, RouterView, CartSidebar
```

### Server (`server/src/`)
```
index.ts                 — Express app entry, auto-seeds products on empty DB
db.ts                    — SQLite schema: products, orders, order_items tables
seed.ts                  — Manual seed script (pnpm --filter server seed)
routes/
  products.ts            — GET /api/products, GET /api/products/:id (both implemented)
  orders.ts              — POST /api/orders (basic, no payment logic), GET /api/orders/:id
```

## Database Schema

### products
| column | type |
|---|---|
| id | INTEGER PK |
| name | TEXT |
| price | REAL |
| description | TEXT |
| image_url | TEXT |
| stock_quantity | INTEGER |
| category | TEXT |

### orders
| column | type |
|---|---|
| id | INTEGER PK |
| customer_email | TEXT |
| created_at | TEXT |
| status | TEXT |

### order_items
| column | type |
|---|---|
| id | INTEGER PK |
| order_id | INTEGER FK |
| product_id | INTEGER FK |
| quantity | INTEGER |
| price_at_purchase | REAL |

## Current Intentional Gaps (demo targets)
- `cart.ts` → `total` computed is hardcoded to `0`
- `CartSidebar.vue` → Checkout button is disabled, no routing
- `CheckoutView.vue` → Does not exist
- `OrderConfirmationView.vue` → Has placeholder text, never fetches order data
- `POST /api/orders` → No payment simulation, no order_number, no decline path
- orders table → Missing columns: customer_name, shipping_address, order_number

## Products (seeded)
| id | name | price | stock_quantity |
|---|---|---|---|
| 1 | AquaLogic HydroMind | $299.99 | 42 |
| 2 | DustBot Existential Series X | $849.99 | 17 |
| 3 | FridgeIQ Oracle Edition | $2,199.99 | 8 |
| 4 | VortexBlend OpinionMaker 9 | $179.99 | 63 |
| 5 | ScaleIQ MotivatorPro | $399.99 | 31 |

## API Endpoints
| method | path | status |
|---|---|---|
| GET | /api/products | ✅ implemented |
| GET | /api/products/:id | ✅ implemented |
| POST | /api/orders | ⚠️ partial — needs payment logic |
| GET | /api/orders/:id | ✅ implemented with items join |

## How to Make Changes
1. Read only the specific file(s) mentioned in the task
2. Make the edit
3. Report what you changed
4. Stop — do not run builds, tests, or installs to verify

## Coding Conventions
- Vue 3 Composition API with `<script setup>` — no Options API
- TypeScript strict mode — use existing types from `types/index.ts`
- Axios for all HTTP calls on the client
- Server uses Node's built-in `node:sqlite` DatabaseSync — synchronous API, no async/await for DB calls
- CSS is scoped per component — follow existing class naming patterns
- No external UI libraries — plain CSS only
- Pinia stores use the setup store pattern (ref/computed/functions, not options)