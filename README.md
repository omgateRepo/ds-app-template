# App Template

Monorepo template with **Frontend** (React + Vite + TypeScript), **Backend** (Express + Prisma + PostgreSQL), **shared types**, **GitHub Actions CI**, and **Render** hosting. Same stack and workflow as ds-proforma-fresh.

## Structure

- `frontend/` – React 19, Vite 7, TypeScript, Vitest
- `backend/` – Express 5, Prisma 7, PostgreSQL (with `pg` driver), Basic Auth, Vitest
- `packages/types/` – Shared TypeScript types and Zod (used by frontend and backend)
- `.github/workflows/ci.yml` – Lint, typecheck, Prisma migration check, tests
- `render.yaml` – Render Blueprint (API + static frontend)

## Prerequisites

- Node 22
- PostgreSQL (local or hosted)
- Git

## Quick start

1. **Clone or copy this repo** into a new directory and rename the project in `package.json` and `render.yaml` if desired.

2. **Install and run backend (with DB):**
   ```bash
   cp backend/.env.example backend/.env
   # Edit backend/.env and set DATABASE_URL to your Postgres connection string
   npm install
   cd backend && npx prisma migrate deploy && cd ..
   npm run dev
   ```
   Backend runs on port 8080. To run without a database (stub mode):
   ```bash
   SKIP_DB=true SKIP_AUTH=true npm run dev --workspace backend
   ```

3. **Run frontend:**
   ```bash
   cp frontend/.env.example frontend/.env
   # Optional: set VITE_API_BASE_URL=http://localhost:8080 if API is on another origin
   npm run dev --workspace frontend
   ```
   Frontend runs on port 5173.

4. **Auth:** The API uses HTTP Basic Auth. Set `RENDER_AUTH_USER` and `RENDER_AUTH_PASSWORD` (or `BASIC_AUTH_*`) in the backend env, or create a user in the DB and send `Authorization: Basic <base64(email:password)>`. The frontend can store credentials via `setAuthCredentials({ username, password })` and then call `fetchCurrentUser()`.

## Scripts (from repo root)

| Script      | Description |
|------------|-------------|
| `npm run lint` | ESLint on frontend + backend |
| `npm run typecheck` | TypeScript check on frontend + backend |
| `npm run test` | Vitest on frontend + backend |
| `npm run dev` (in backend) | `nodemon` + Prisma; in frontend: `vite` |

## CI (GitHub Actions)

On push/PR to `main`:

- Node 22, `npm install`
- `npm run lint`
- `npm run typecheck`
- `npx prisma migrate diff` in `backend` (migrations vs schema)
- `npm run test`

## Deploy on Render

Push to GitHub, then: **New + → Blueprint** → connect repo → **Apply**. The Blueprint creates the database, API, and frontend. Set **CORS_ORIGIN** on the API to your frontend URL once. See [RENDER_CREATE.md](RENDER_CREATE.md).

## Git workflow

- Use **main** as the default branch.
- Open **feature branches** and merge via **pull requests**.
- CI runs on every push and PR to `main`; keep the branch passing before merging.

## Adding your first feature

- **Backend:** Add routes in `backend/src/routes.js`, models in `backend/prisma/schema.prisma`, then `npx prisma migrate dev --name your_change` in `backend/`.
- **Shared types:** Add types or Zod schemas in `packages/types/src/` and re-export from `index.js` / `index.d.ts`.
- **Frontend:** Add components in `frontend/src/`, call the API via `frontend/src/api.js` (or extend it with typed helpers).
