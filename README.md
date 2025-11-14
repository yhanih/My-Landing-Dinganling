# Reava Monorepo

Unified workspace containing the public Reava landing experience and the protected Horizon-inspired control center.

## Structure

```
.
├── landing/           # Public marketing site powered by Vite + Tailwind
├── dashboard/         # Internal control center powered by Vite + Tailwind
├── packages/
│   ├── hooks/         # Shared Supabase client and auth provider
│   └── ui/            # Design system primitives (buttons, cards, protected route)
├── config/
│   ├── env/           # Environment schema shared by every workspace
│   ├── tailwind/      # Tailwind preset + tokens
│   └── theme/         # Reava design tokens
├── supabase/          # SQL migrations & helpers
├── dist-landing/      # Landing production build output (generated)
├── dist-dashboard/    # Dashboard production build output (generated)
└── ...shared config   # ESLint, Prettier, tsconfig, etc.
```

## Requirements

- Node.js 20+
- npm 10+

## Getting started

1. Install dependencies from the repo root (uses npm workspaces):

   ```bash
   npm install
   ```

2. Copy the environment template and fill in Supabase / Stripe credentials:

   ```bash
   cp .env.example .env
   ```

   The shared schema expects the following keys:

   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY` (server-only, optional)
   - `VITE_BASE_URL` or `NEXT_PUBLIC_BASE_URL`
   - Optional Stripe keys (`STRIPE_PUBLIC_KEY`, `STRIPE_SECRET_KEY`)

3. Run both apps side-by-side:

   ```bash
   npm run dev
   ```

   - Landing: http://localhost:5000
   - Dashboard: http://localhost:5001 (`/dashboard` base path)

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run landing and dashboard dev servers in parallel |
| `npm run build` | Build both apps into `dist-landing/` and `dist-dashboard/` |
| `npm run lint` | Lint landing + dashboard using shared ESLint config |
| `npm run format` | Format project files with Prettier |
| `npm --workspace <app> run <cmd>` | Run a script within a single workspace |

## Deployment notes

- Each app produces a standalone build artefact: `dist-landing/` and `dist-dashboard/`.
- Example Nginx mapping:

  ```nginx
  location / {
    root /var/www/reava/dist-landing;
    try_files $uri /index.html;
  }

  location /dashboard/ {
    alias /var/www/reava/dist-dashboard/;
    try_files $uri /index.html;
  }
  ```

- Ensure environment variables are injected for both builds (Supabase + Stripe).

## Shared design system

- Tailwind preset: `config/tailwind/shared.preset.js`
- Theme tokens: `config/theme/reavaTheme.js`
- UI primitives: `packages/ui`
- Auth + Supabase: `packages/hooks`

These modules are consumed by both landing and dashboard applications to guarantee consistent branding, typography, and button variants.

## Migration checklist

- Move any universal hooks into `packages/hooks`.
- Consolidate shared UI into `packages/ui`.
- Remove redundant CRA/webpack tooling when bringing new features from legacy repos—use Vite configuration patterns found in `landing/vite.config.js` and `dashboard/vite.config.js`.
- Keep environment access behind the shared schema (`config/env`).

