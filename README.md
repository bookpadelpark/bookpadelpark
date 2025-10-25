```markdown
# Padel Court Booking — Starter

This is a starter template for a padel court booking app (Next.js + Prisma + SQLite + Stripe).

Quick start:
1. Copy .env.example -> .env and set STRIPE keys and BASE_URL.
2. Install dependencies:
   npm install
3. Generate Prisma client and run migrations:
   npx prisma generate
   npx prisma migrate dev --name init
4. Seed courts:
   npx ts-node prisma/seed.ts
5. Run:
   npm run dev

Notes:
- The template uses simple email/password auth for demo. Replace with proper sessions/JWT in production.
- Do NOT commit your real Stripe secret keys. Use repository secrets or your host's env settings.
- Webhook endpoint expects to be reachable by Stripe and configured with your STRIPE_WEBHOOK_SECRET.
```