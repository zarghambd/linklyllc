# Linkly LLC — launch checklist

Everything below must be resolved before the site goes live. Anything marked
**[BLOCKER]** either shows placeholder text to a visitor or is legally required.
Nothing in this repository invents a fact to fill a gap: unresolved values are
literal `[PLACEHOLDER: …]` tokens or empty strings, and components hide a line
entirely rather than render a placeholder.

---

## 1. Business identity — all blockers

These live in one place: `src/config/site.ts`.

| Placeholder                                                        | Field                     | Notes                                                                                                                                                                                                                                |
| ------------------------------------------------------------------ | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `[PLACEHOLDER: confirm the production domain this will launch on]` | `site.url`                | Also feeds `astro.config.mjs` `site`, canonical tags, `public/robots.txt` and the sitemap. Currently `https://www.linklyllc.com` — confirm before launch, because changing it later invalidates every canonical URL already indexed. |
| `[PLACEHOLDER: real US phone number in E.164 format…]`             | `site.phone`              | Empty on purpose. The phone line is hidden sitewide (header, footer, contact page, JSON-LD) until a real number exists.                                                                                                              |
| `[PLACEHOLDER: street address]`                                    | `site.address.street`     | Required for CAN-SPAM and the legal pages.                                                                                                                                                                                           |
| `[PLACEHOLDER: city]`                                              | `site.address.city`       |                                                                                                                                                                                                                                      |
| `[PLACEHOLDER: state]`                                             | `site.address.region`     |                                                                                                                                                                                                                                      |
| `[PLACEHOLDER: ZIP code]`                                          | `site.address.postalCode` |                                                                                                                                                                                                                                      |
| _(5 entries)_                                                      | `site.socials[].url`      | X, YouTube, GitHub, LinkedIn, Discord. Each empty URL hides that icon everywhere. Add only profiles that really exist.                                                                                                               |
| `hello@linklyllc.com`                                              | `site.email`              | Confirm this mailbox exists and is monitored. **Not verified.**                                                                                                                                                                      |
| `src/config/settings.js` `url`                                     | theme settings            | Duplicates `site.url`. Keep the two in sync.                                                                                                                                                                                         |

---

## 2. Legal — all blockers, plus attorney review

Every legal page carries this comment at the very top of the file and must keep
it until a licensed US attorney has signed off:

```
/* DRAFT - must be reviewed by a licensed US attorney before publishing. */
```

Values that must be resolved in `src/config/site.ts` → `site.legal`:

| Placeholder                                                   | Field                                                                                                                                                          |
| ------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `[PLACEHOLDER: LEGAL ENTITY NAME]`                            | `entityName` — use the exact registered name. If the site trades as "Linkly" but the entity is something else, say which is which.                             |
| `[PLACEHOLDER: STATE OF FORMATION]`                           | `stateOfFormation`                                                                                                                                             |
| `[PLACEHOLDER: EFFECTIVE DATE]`                               | `effectiveDate` — also renders as the "Last updated" date on all three legal pages, and is emitted into `<time datetime>`, so it must be a valid `YYYY-MM-DD`. |
| `[PLACEHOLDER: CONTACT EMAIL for privacy and legal requests]` | `contactEmail` — currently also used for refund requests.                                                                                                      |

Inline `[PLACEHOLDER: …]` tokens left in the page bodies, by file:

**`src/pages/terms-of-service.astro`**

- payment methods and due-date window
- standard deposit percentage
- basis for pro-rating a partially delivered milestone
- late-payment interest rate
- tax/nexus confirmation
- overdue threshold before work is paused
- whether the B2B warranty disclaimer is enforceable against a consumer
- the liability cap amount
- state of governing law
- county and state of courts
- **the dispute-resolution decision: arbitration vs. exclusive jurisdiction** (with a jury-trial carve-out if litigation is chosen)
- whether to preserve representations made in a proposal
- confidentiality survival period (currently drafted as 3 years)

**`src/pages/privacy-policy.astro`**

- email/domain provider and what it hosts
- server log retention period
- attorney confirmation of the CalOPPA / California Delete Act position
- how much notice is given before a material policy change

**`src/pages/refund-policy.astro`**

- deposit percentage (must agree with the Terms number)
- pro-rata basis for partial milestones
- full-refund cancellation window
- payment due days and acknowledgement/decision/payment deadlines
- attorney confirmation of the California Automatic Renewal Law notice period
- data-retrieval window after a plan is cancelled
- handover-assistance period and notice period when Linkly cancels
- attorney confirmation of which state-specific refund rights apply

> These are deliberately open choices, not oversights. A refund policy that
> invents a cancellation window is worse than one that flags it.

---

## 3. Content that must be verified or replaced

### Statistics — `src/data/stats.ts`

| Placeholder                                    | Field      |
| ---------------------------------------------- | ---------- |
| "Projects delivered" — verify the `20+` figure | `stats[0]` |
| "Years of experience" — verify the `5+` figure | `stats[1]` |

The unverifiable `100% Client satisfaction` claim was removed rather than
reworded. Do not reintroduce a satisfaction percentage without evidence.

### Testimonials — `src/data/testimonials.ts`

The array is **empty**, so `TestimonialSection.astro` renders nothing. To add
real testimonials, push objects and delete the guidance comment. Do not invent
names, roles or companies.

### Case studies — `src/data/case-studies.ts`

Three entries exist purely so `/work` is not an empty page. All are
`published: false` and every visible string is placeholder copy. **Either**
replace them with real, approved projects (client name, permission to publish,
metrics, screenshots) **or** keep them unpublished and decide whether `/work`
should ship at all. `Work` is in the main nav and the footer.

### Other content to review

- `src/pages/index.astro` hero image `alt` text describes the screenshot in
  `public/landing-hero.png` — confirm the description is accurate, since the
  image was inherited from the template.
- Every service description in `src/data/services.ts` is marketing copy written
  from the positioning, not from a signed-off services list.

---

## 4. Infrastructure

### Environment variables — copy `.env.example` to `.env`

| Variable                  | Needed for   | Status                                                                                                                            |
| ------------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `PUBLIC_PLAUSIBLE_DOMAIN` | Analytics    | Unset. With it unset, `public/analytics.js` loads nothing and no request reaches plausible.io. Add the domain in Plausible first. |
| `RESEND_API_KEY`          | Contact form | Unset.                                                                                                                            |
| `CONTACT_FROM_EMAIL`      | Contact form | Unset. Must be on a domain verified in Resend; `onboarding@resend.dev` only works for your own account.                           |
| `CONTACT_TO_EMAIL`        | Contact form | Unset; falls back to `site.email`.                                                                                                |

Without the mail variables the form returns **503 with the email address**, so
it fails visibly rather than pretending to send. Set them as Vercel server
variables, not `PUBLIC_` ones.

### Hosting — Vercel

- `astro.config.mjs` uses `output: 'hybrid'` with `@astrojs/vercel/serverless`,
  so all pages are prerendered and only `/api/contact` is a function.
- `vercel.json` sets CSP, HSTS, `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy`, `COOP` and cache headers.
- `package.json` pins `engines.node` to `22.x`. The local build prints a
  harmless warning that local Node 24 is newer than the adapter supports; the
  deployed function uses the pinned runtime.

### Asset generation

`public/og-image.png`, `public/apple-touch-icon.png` and `public/icon-*.png`
are generated from `public/og-image-source.svg` and `public/favicon.svg` by
`npm run generate:assets`. **They use a gradient-and-monogram treatment, not the
real Linkly logo artwork**, because the logo PNG could not be traced as vector
art. Replace the artwork before launch if brand guidelines require the actual
mark, then re-run the script.

`public/linkly.ico` is the inherited template favicon and does **not** match the
new brand. Either regenerate it or rely on `favicon.svg` alone (all modern
browsers prefer it) — but do not ship the mismatched `.ico`.

### DNS and mail

- Point the domain at the Vercel project and confirm HTTPS.
- The contact form only works once `CONTACT_FROM_EMAIL` is on a domain whose
  SPF and DKIM records are published.

---

## 5. Commands that must pass before deploy

```
npm run check        # astro check   -> 0 errors, 0 warnings, 0 hints
npm run lint         # eslint        -> 0 problems
npm run format:check # prettier      -> all files match
npm run build        # astro build   -> succeeds
npm run check:links  # link checker  -> every internal link resolves
npm run verify       # all five, in sequence
```

**Current status: all five pass.** `npm run verify` is green end to end, and
the link checker confirms all 424 internal links across the 13 built pages
resolve, in-page anchors included.

Two build warnings remain and are upstream, not ours: the Vercel adapter's
experimental `astro:env getSecret` notice, and its local Node 24 notice (the
deployed function uses the pinned 22.x runtime).

Not yet done, because it needs a real browser:

- Lighthouse on `/`, `/services`, `/contact`, `/privacy-policy`.
- Manual keyboard walk of the mobile menu, theme toggle and legal page TOC.
- Screen-reader pass on the contact form error states.
- Real submission test against Resend, including the 503 path.

### Retired template cruft

Removed during the launch pass, because shipping it would be a mistake:

- `src/components/core/Plug.astro` — a "Get This Template" upsell linking to
  the upstream GitHub repo. It was gated behind `showPlug: false`, but the flag
  is gone now along with the component.
- `src/config/footer.js` — stale footer config pointing at deleted pages.
- `netlify.toml` — this deploys to Vercel.

### Unreferenced legacy components, kept on purpose

You asked to keep the components when the demo pages went away, so these are
still in the tree. **None of them are imported by any page**, and none should be
wired in without rework:

| Component                                             | Why it needs rework before use                                                                                                                                                                                                              |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/components/theme-switcher/theme-switcher.ts`     | A five-theme Lit component (`default/dark/earth/ocean/sand`). The real toggle is the `#theme-toggle` in `src/layouts/Page.astro`, which is light/dark only. It also swapped in `/assets/images/home/*-hero.jpg`, which are template images. |
| `src/components/theme-switcher/ThemeProvider.astro`   | Same five-theme model.                                                                                                                                                                                                                      |
| `src/components/sections/heros/HomeHeroSection.astro` | Built around the switcher above and `id="home-hero-image`; the home page uses its own hero with an optimised WebP.                                                                                                                          |
| `src/components/forms/ContactForm.astro`              | Posts to `/contact-thank-you`, which does not exist.                                                                                                                                                                                        |
| `src/components/forms/LandingContactForm.astro`       | Posts to `/contact-thank-you` as well.                                                                                                                                                                                                      |
| `src/components/forms/NewsletterForm.astro`           | No endpoint at all.                                                                                                                                                                                                                         |
| `src/components/blog/*`                               | The blog routes were deleted with the demo pages.                                                                                                                                                                                           |

Use `src/components/ContactForm.astro` for the real contact form — it posts to
`/api/contact` and handles validation, errors and spam defenses.

The template's demo screenshots still in `public/assets/images/` and
`public/assets/screenshots/` are unused and can be deleted to cut deploy size.

### Fonts: the site loads them from Google's CDN, not from disk

This is worth a decision before launch, because it has a privacy angle.

- The live typography is `Inter` for body copy and `Plus Jakarta Sans` for
  headings, set in `src/styles/global.css` as `--body-font` and `--heading-font`.
- Both are fetched at runtime from `fonts.googleapis.com`, with preconnects, in
  `src/components/head/BaseHead.astro`.
- `vercel.json` permits this explicitly: `style-src` allows
  `https://fonts.googleapis.com` and `font-src` allows `https://fonts.gstatic.com`.
  Without those two entries the fonts would be blocked in production.
- The privacy policy already lists Google Fonts as a subprocessor, so the pages
  are consistent with what the code does. Keep that pairing: if you drop Google
  Fonts, delete the subprocessor entry; if you keep them, keep the entry.
- Open with the attorney whether serving fonts from Google's CDN counts as a
  transfer of visitor IP addresses to Google in your users' jurisdictions. It is
  a recognised concern under GDPR and is the usual reason teams self-host.

**The local font files are dead weight.** `public/assets/fonts/` holds Lato and
Roboto Serif, declared with `@font-face` in `src/styles/typography.css` and
referenced only by the legacy `--theme-font-family-*` tokens in
`src/styles/theme.css`, which no live page uses. Roughly 12 files ship to every
visitor for nothing.

Two clean options:

1. Keep Google Fonts and delete `public/assets/fonts/` plus the `@font-face`
   blocks in `typography.css`.
2. Self-host Inter and Plus Jakarta Sans — download the WOFF2 files into
   `public/assets/fonts/`, point `@font-face` at them, and drop the
   `fonts.googleapis.com` links from `BaseHead.astro` and the two font origins
   from the CSP. Faster first paint and no third-party font request, at the cost
   of maintaining the font files yourself.

Do not do neither: shipping the unused Lato/Roboto files while still calling
Google is the current state, and it is the one option that is strictly worse than
either.

- Real submission test against Resend, including the 503 path.

---

## 6. Optional hardening, deliberately not shipped

Cloudflare Turnstile was removed rather than half-wired: the server-side
verification existed but no widget was rendered, so enabling the env var would
have silently broken every submission. The form currently relies on a honeypot
field, a minimum fill-time check and a same-origin check. If spam becomes a
problem, add Turnstile properly — widget _and_ verification — rather than
flipping the old flag.

---

## 7. Assumptions made in the code

1. **US-only business.** Laws, currency, tax language and E.164 phone format
   all assume the United States.
2. **B2B, not B2C.** Services are sold to businesses; consumer-protection
   carve-outs are kept in the Terms in case that is wrong.
3. **Fixed-scope projects, not a subscription.** The refund policy covers
   fixed-scope, hourly/retainer and auto-renewing plans, but the Terms assume
   each engagement is governed by a signed SOW.
4. **No cookie banner is required**, because the only analytics is cookie-free
   Plausible and the theme preference is `localStorage`, not a cookie. If a
   cookie-setting tool is ever added, this assumption breaks and a consent
   banner becomes mandatory.
5. **Deleting demo pages was safe.** `/theme/*`, `/blog/*`, `/landing-pages/*`
   and `/company/*` were removed at your instruction; the reusable components
   they used were kept. Any external link to those URLs will 404.
6. **Legal pages are structurally complete but substantively unverified.**
   They are a drafting starting point, not advice, and they say so.

---

## 8. Decisions taken during the build

| Decision                                                   | Why                                                                                                                                                                                     |
| ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Resend serverless endpoint for the form                    | Chosen over a form service so submissions stay first-party.                                                                                                                             |
| Vercel security headers over Netlify                       | Chosen for the deployment; `netlify.toml` was deleted.                                                                                                                                  |
| Cookie-free Plausible over Google Analytics                | Avoids cookies, consent banners and profile building.                                                                                                                                   |
| Demo pages deleted, components kept                        | Removes template cruft without losing reusable pieces.                                                                                                                                  |
| AI card added to the default service set                   | Matches the AI/mobile positioning in the footer and logo treatment.                                                                                                                     |
| `output: 'hybrid'` instead of `'static'`                   | The adapter requires it, and it prerenders everything except `/api/contact`.                                                                                                            |
| CSP in `vercel.json`, scripts moved to `public/`           | Astro 4 has no built-in CSP, and external scripts let the policy avoid `'unsafe-inline'` for scripts.                                                                                   |
| Origin check written by hand in the endpoint               | `security.checkOrigin` reads request headers on every prerendered page and floods the build with warnings.                                                                              |
| `src/config/footer.js` and `netlify.toml` deleted          | Stale config pointing at deleted pages and the wrong host.                                                                                                                              |
| Prettier 2 → 3 and `prettier-plugin-astro` 0.0.12 → 0.14.1 | The old plugin could not parse `.astro` files under Astro 4, so `format:check` reported a `ParseError` on every page. The upgrade needed Prettier 3, so the whole tree was reformatted. |
| `sharp` and `prettier` declared explicitly                 | Both scripts depended on them arriving transitively, which npm does not guarantee.                                                                                                      |
| `.vercel/` added to `.gitignore` and `.prettierignore`     | The adapter writes its build output into the working tree; it is not source.                                                                                                            |
| `scripts/check-links.mjs` added                            | The link checker is the only check that catches a nav or footer link to a page that was deleted.                                                                                        |
