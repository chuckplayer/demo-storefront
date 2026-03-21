# Unnecessarily Smart Home Appliances Co. — Demo Storefront

A product storefront demo for a fictional company that makes home appliances with deeply questionable levels of artificial intelligence.

## Tech Stack

| Layer    | Technology                        |
|----------|-----------------------------------|
| Frontend | Vue 3 + TypeScript + Vite         |
| Backend  | Express.js + TypeScript           |
| Database | SQLite via `better-sqlite3`       |
| Packages | pnpm workspaces (monorepo)        |

## Project Structure

```
demo-storefront/
├── client/                  # Vue 3 frontend (port 5173)
│   └── src/
│       ├── components/      # ProductCard, CartSidebar
│       ├── views/           # ProductList, ProductDetail, OrderConfirmation
│       ├── stores/          # Pinia cart store
│       ├── router/          # Vue Router
│       └── types/           # Shared TypeScript interfaces
└── server/                  # Express backend (port 3001)
    └── src/
        ├── routes/          # products.ts, orders.ts
        ├── db.ts            # SQLite schema init
        ├── seed.ts          # Seed script
        └── index.ts         # App entry point
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+

### Install

```bash
pnpm install
```

### Run (development)

```bash
pnpm dev
```

Starts both servers concurrently:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

The database is created and seeded automatically on first server startup.

### Seed manually

```bash
pnpm --filter server seed
```

## API Endpoints

All endpoints are currently **stubbed** — they throw `Error('Not implemented')` and are intended to be filled in during a live demo.

| Method | Endpoint             | Description          |
|--------|----------------------|----------------------|
| GET    | `/api/products`      | List all products    |
| GET    | `/api/products/:id`  | Get single product   |
| POST   | `/api/orders`        | Create an order      |
| GET    | `/api/orders/:id`    | Get order by ID      |

## Products

| Product                        | Price      | Category |
|-------------------------------|------------|----------|
| AquaLogic HydroMind            | $299.99    | Kitchen  |
| DustBot Existential Series X   | $849.99    | Cleaning |
| FridgeIQ Oracle Edition        | $2,199.99  | Kitchen  |
| VortexBlend OpinionMaker 9     | $179.99    | Kitchen  |
| ScaleIQ MotivatorPro           | $399.99    | Health   |

## Intentional Demo Gaps

These are left incomplete on purpose as live-coding exercises:

- **API endpoints** — all four routes throw `Not implemented`
- **Cart total** — stubbed to `$0` in `client/src/stores/cart.ts`
- **Product filtering/sorting** — UI absent from `ProductListView`
- **Order confirmation** — view shell with no data loading
- **Stock management** — quantity tracked in DB but never checked or decremented

## Product Images

Placeholder image paths are used (e.g. `/images/aqualogic.png`). Drop real images into `client/public/images/` to replace them.

## License

MIT
