# Trading Coaching Academy App

A trading education coaching platform for an academy — mobile app (Android) + admin web panel. Students register, get manually batch-assigned by admin, and access their batch's lectures, quizzes, assignments, and live classes.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- **UI Mockups:** React + Vite (mockup-sandbox artifact) — design blueprints only, final app will be Flutter

## App Context

> Full product context is saved at `.agents/memory/app-context.md` — read that before any design work.

### Quick Summary

- **Platform:** Android only (Flutter). Admin: Flutter Web. Backend: Firebase.
- **Roles:** Admin (full control) · Faculty (content only) · Student (consumer)
- **Flow:** Student registers → Admin assigns to batch → Course unlocked
- **No payment gateway** per spec — enrollment is admin-managed
- **Videos:** YouTube Unlisted (embedded, hidden URLs)
- **Attendance:** Auto — watch ≥80% lecture = Present

### Design System Tokens

| Token | Value |
|---|---|
| Background | `#F8FAFC` |
| Card | `#FFFFFF` |
| Navy Header | `#0F172A` |
| Primary Blue | `#2563EB` |
| Emerald | `#10B981` |
| Amber | `#F59E0B` |
| Muted | `#94A3B8` |
| Border | `#E2E8F0` |
| Font | Poppins |
| Frame | 390×844px |

### Demo Data

- Logged-in student: **Rahul Sharma (RS)** · Batch: Advanced Trading Batch A
- Faculty: **Dr. Anand Kumar**
- Realistic trading topics: Options Chain, Support & Resistance, Volume Profile, Derivatives

### Screens Status (as of June 24, 2026)

| Area | Done | Total | Pending |
|---|---|---|---|
| Student App | 33 | 33 | 0 ✅ |
| Admin Panel | 18 | 18 | 0 ✅ |
| Faculty Portal | 8 | 8 | 0 ✅ |
| **Total** | **59** | **59** | **0 ✅ COMPLETE** |

### ✅ All Screens Complete — No Pending Screens

### ⚠️ Items Needing Client Decision

- Payment & Checkout, Payment Success, Student Wallet — spec says "no payment gateway"
- Mock Trading / Paper Trade — not in spec, added as enhancement
- Doubt & Q&A — not in spec, but coaching-appropriate

## Where things live

- All mockup screens: `artifacts/mockup-sandbox/src/components/mockups/trading-app/`
- Original spec: `attached_assets/Pasted--Trading-Coaching-App-Final-System-Specification-V1-Pro_1782289067770.txt`
- Full App Context memory: `.agents/memory/app-context.md`
- Design Report PDF: `TradingApp_DesignReport.pdf`

## User preferences

- **Update `.agents/memory/app-context.md` after every single step** — every screen designed, every decision made, every pending item completed. This keeps the project context accurate at all times.
- All new screens must match the design system tokens above
- Never use "Lorem ipsum" — use realistic trading content and Indian names
- Student demo name: Rahul Sharma · Faculty demo name: Dr. Anand Kumar

## Gotchas

- `pnpm install` must be run after fresh clone — node_modules not committed
- Mockup sandbox uses Vite; screens are at `/__mockup/preview/trading-app/<ComponentName>`
- Do NOT add screens that contradict spec (no payment, no public access) without client sign-off

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
- See `.agents/memory/app-context.md` for full App Context (roles, systems, screen inventory, pending list)
