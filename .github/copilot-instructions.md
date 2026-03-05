# Copilot Instructions

## Build & Dev Commands

- `npm run dev` — Start Next.js dev server
- `npm run build` — Production build
- `npm run lint` — ESLint (flat config with Next.js core-web-vitals + TypeScript rules)
- `npx supabase start` — Start local Supabase stack (DB on port 54322, API on 54321, Studio on 54323)
- `npx supabase db reset` — Reset local DB and re-run migrations + seed
- `npx supabase migration new <name>` — Create a new migration file

## Architecture

- **Next.js 16 App Router** with React 19 and TypeScript. All routes live under `app/` using React Server Components by default.
- **Supabase** for backend (auth, database, storage). Local dev config is in `supabase/config.toml`, migrations in `supabase/migrations/`. Environment variables in `.env.local` (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- **shadcn/ui** (new-york style) for components. Add components with `npx shadcn@latest add <component>`. Components install to `components/ui/`, app components in `components/`.
- **Tailwind CSS v4** — configured via `@import` directives in `app/globals.css`, not a `tailwind.config` file. Theme uses CSS custom properties with oklch colors. Brand colors defined as `--color-brand-*` in the `@theme` block.

## Conventions

- Use the `@/*` path alias (maps to project root) for all imports.
- Use the `cn()` helper from `lib/utils.ts` for conditional Tailwind class merging.
- Supabase clients: `lib/supabase/client.ts` (browser) and `lib/supabase/server.ts` (server components/actions).
- Server components fetch data directly; client components use `useRouter().refresh()` to trigger re-renders after mutations.
- Node v20.20.0 (pinned in `.nvmrc`).
