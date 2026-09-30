# Linkly LLC — website

Marketing and lead-capture site for Linkly LLC, a US custom web development
and product engineering studio.

Built with [Astro](https://astro.build) 4 and deployed to Vercel. Every page is
prerendered as static HTML; the only server code is the contact-form endpoint.

## Quick start

```bash
npm install
cp .env.example .env   # optional for development; see "Environment" below
npm run dev            # http://localhost:4321
```

Node 22.x is required — it is pinned in `package.json` and matches the runtime
the Vercel adapter uses.

## Commands

| Command                           | What it does                                                  |
| --------------------------------- | ------------------------------------------------------------- |
| `npm run dev`                     | Astro dev server with HMR                                     |
| `npm run build`                   | Production build into `.vercel/output`                        |
| `npm run preview`                 | Serves the production build locally                           |
| `npm run check`                   | `astro check` — template and type errors                      |
| `npm run lint`                    | ESLint over `.astro`, `.ts`, `.js` and the scripts            |
| `npm run format` / `format:check` | Prettier, with `prettier-plugin-astro`                        |
| `npm run generate:assets`         | Regenerates icons and the OG image from source SVGs via Sharp |
| `npm run check:links`             | Verifies every internal link and anchor in the built output   |
| `npm run verify`                  | `check` → `lint` → `format:check` → `build` → `check:links`   |

Run `npm run verify` before every deploy. It is what CI runs on each push.

## Architecture notes

- **Hybrid output.** `output: 'hybrid'` with `@astrojs/vercel/serverless`. Pages
  are prerendered; `src/pages/api/contact.ts` opts out with
  `export const prerender = false`.
- **Contact form.** Posts to `/api/contact`, which validates server-side,
  checks the request origin, and sends through Resend. Spam defenses are a
  honeypot field, a minimum fill time and the origin check. Without Resend
  credentials it returns a 503 pointing at the published email address rather
  than silently failing.
- **Analytics.** Cookie-free Plausible, gated on `localStorage` consent that
  visitors can change at any time on `/cookie-preferences`. Because it sets no
  cookies, no consent banner is shown.
- **Theme.** Light/dark, resolved before first paint by `public/theme-init.js`
  so there is no flash of the wrong theme. The preference lives in
  `localStorage` under `theme`.
- **Security headers.** Set in `vercel.json`, including a Content Security
  Policy. The two small scripts are served from `public/` so the policy does not
  need `'unsafe-inline'` for scripts.

## Environment

Copy `.env.example` to `.env` for local work. Nothing is required to build.

| Variable                  | Scope  | Purpose                                                       |
| ------------------------- | ------ | ------------------------------------------------------------- |
| `PUBLIC_PLAUSIBLE_DOMAIN` | public | Enables Plausible. Unset means no analytics is loaded at all. |
| `RESEND_API_KEY`          | server | Resend API key for the contact form.                          |
| `CONTACT_FROM_EMAIL`      | server | Verified sender address.                                      |
| `CONTACT_TO_EMAIL`        | server | Where inquiries are delivered. Defaults to the site email.    |

Set the server variables as Vercel **Server** variables, never `PUBLIC_` ones.

## Before launch

`LAUNCH_TODO.md` is the authoritative list of everything that must be resolved
before this site goes live: business identity placeholders, the inline legal
placeholders, statistics and case studies that need substantiating, environment
variables, and the items that still need a real browser or an attorney.

The legal pages are drafts and carry a review notice in the file header. Do not
publish them before a licensed US attorney has approved them.

## Layout

```
src/
  components/        shared UI (Linkly's own, plus retained theme pieces)
  config/            site.ts is the single source of truth for company details
  data/              services, stats, case studies, testimonials, form options
  layouts/           Base, Page, LegalLayout, Post
  pages/             one directory per route; api/ holds the serverless contact
  styles/            global, theme and typography layers
public/              static assets, favicons, OG image, robots.txt, manifests
scripts/             asset generation and the link checker
```
