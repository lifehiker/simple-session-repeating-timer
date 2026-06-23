# FORGE COMPLETION AUDIT

## PRD Requirements to Implementation Mapping

### Core Product

| Requirement | Implementation |
|---|---|
| Guest mode without signup | `src/stores/timer-store.ts`, local guest preset storage in `src/components/timer/timer-builder.tsx` and `src/app/app/presets/page.tsx` |
| Email/password auth | `src/auth.ts`, `src/app/login/page.tsx`, `src/app/signup/page.tsx`, `src/app/api/signup/route.ts` |
| Optional Google sign-in | `src/auth.ts` enables Google provider only when `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET` exist |
| Session timer mode | `src/lib/timer-engine.ts`, `src/components/timer/mode-toggle.tsx` |
| Repeating timer mode | `src/lib/timer-engine.ts`, `src/components/timer/repeat-count-input.tsx` |
| Named segment builder | `src/components/timer/segment-list.tsx`, `src/components/timer/segment-form.tsx`, `src/components/timer/timer-builder.tsx` |
| Segment duration and color | `src/components/timer/segment-form.tsx` |
| Add/edit/delete/reorder segments | `src/components/timer/segment-list.tsx` |
| Preset save/load/delete/customize | `src/app/api/presets/route.ts`, `src/app/api/presets/[id]/route.ts`, `src/app/app/presets/page.tsx`, `src/components/timer/timer-builder.tsx` |
| Free tier preset limit | `src/lib/billing.ts`, `src/app/api/presets/route.ts`, guest limit in `src/components/timer/timer-builder.tsx` |
| Large audience-facing display | `src/app/app/timer/run/page.tsx`, `src/components/timer/timer-display.tsx` |
| Current/next segment display | `src/components/timer/timer-display.tsx` |
| Progress and color recognition | `src/components/timer/timer-display.tsx` |
| Start/pause/resume/skip/previous/restart | `src/components/timer/timer-controls.tsx`, `src/stores/timer-store.ts`, `src/lib/timer-engine.ts` |
| Completion and run-again flow | `src/app/app/timer/run/page.tsx` |
| Sound alerts | `src/lib/audio.ts`, `src/app/app/timer/run/page.tsx` |
| Spoken alerts | `src/lib/speech.ts`, `src/app/app/settings/page.tsx`, `src/app/app/timer/run/page.tsx` |
| User settings | `src/app/app/settings/page.tsx`, `src/stores/timer-store.ts`, `prisma/schema.prisma` |
| Starter templates | `src/lib/templates.ts`, `src/app/templates/*`, `src/app/app/presets/page.tsx` |
| Stripe paywall | `src/lib/billing.ts`, `src/components/billing/upgrade-modal.tsx`, `src/app/pricing/page.tsx`, Stripe API routes |
| Analytics events | `src/lib/analytics.ts` and calls in builder, runner, billing, webhook paths |

### Data Model

| Requirement | Implementation |
|---|---|
| Users and auth accounts | `prisma/schema.prisma` models `User`, `Account`, `Session`, `VerificationToken` |
| Presets and segments | `prisma/schema.prisma` models `Preset`, `Segment` |
| Settings | `prisma/schema.prisma` model `UserSettings` |
| Subscriptions | `prisma/schema.prisma` model `Subscription` |
| Local fallback storage | SQLite/libSQL config in `prisma/schema.prisma`, `prisma.config.ts`, `src/lib/prisma.ts` |

### Pages

| Page | File |
|---|---|
| Homepage | `src/app/page.tsx` |
| Pricing | `src/app/pricing/page.tsx` |
| Login | `src/app/login/page.tsx` |
| Signup | `src/app/signup/page.tsx` |
| App dashboard | `src/app/app/page.tsx` |
| Timer builder | `src/app/app/timer/page.tsx` |
| Timer runner | `src/app/app/timer/run/page.tsx` |
| Presets/templates app page | `src/app/app/presets/page.tsx` |
| Settings | `src/app/app/settings/page.tsx` |
| Presentation timer SEO | `src/app/presentation-timer/page.tsx` |
| Visual timer SEO | `src/app/visual-timer/page.tsx` |
| Interval timer SEO | `src/app/interval-timer/page.tsx` |
| Repeating timer SEO | `src/app/repeating-timer/page.tsx` |
| Classroom timer SEO | `src/app/classroom-timer/page.tsx` |
| Workout interval timer SEO | `src/app/workout-interval-timer/page.tsx` |
| Speaking timer SEO | `src/app/speaking-timer/page.tsx` |
| Templates gallery | `src/app/templates/page.tsx` |
| Template SEO pages | `src/app/templates/presentation/page.tsx`, `src/app/templates/classroom-rotation/page.tsx`, `src/app/templates/laundry-routine/page.tsx`, `src/app/templates/study-session/page.tsx`, `src/app/templates/workout-intervals/page.tsx`, `src/app/templates/tabata-alternative/page.tsx` |
| Blog SEO pages | `src/app/blog/best-presentation-timer-app/page.tsx`, `src/app/blog/visual-timer-for-classroom/page.tsx`, `src/app/blog/repeating-timer-with-voice/page.tsx`, `src/app/blog/interval-timer-not-fitness/page.tsx`, `src/app/blog/how-to-create-named-timer-segments/page.tsx` |

### API Routes

| Route | File |
|---|---|
| NextAuth handlers | `src/app/api/auth/[...nextauth]/route.ts` |
| Signup | `src/app/api/signup/route.ts` |
| List/create presets | `src/app/api/presets/route.ts` |
| Get/update/delete preset | `src/app/api/presets/[id]/route.ts` |
| Stripe checkout | `src/app/api/stripe/checkout/route.ts` |
| Stripe portal | `src/app/api/stripe/portal/route.ts` |
| Stripe webhook | `src/app/api/webhooks/stripe/route.ts` |

### SEO and PWA

| Requirement | Implementation |
|---|---|
| Metadata for public routes | Route-level metadata in `src/app/**/page.tsx`, shared components in `src/components/seo/*` |
| Sitemap | `src/app/sitemap.ts` |
| Robots | `src/app/robots.ts` |
| PWA manifest | `public/manifest.json` |
| Marketing navigation | `src/components/marketing-nav.tsx` |

### Deployment and Reliability

| Requirement | Implementation |
|---|---|
| Standalone Next output | `next.config.ts` |
| Production Dockerfile | `Dockerfile` |
| Docker context hygiene | `.dockerignore` |
| Clean-checkout build | `package.json` runs `prisma generate && next build` |
| No Google font build dependency | Verified no `next/font/google` usage |
| Guarded external integrations | Stripe/Resend are lazy-imported inside request paths and return clear fallbacks without credentials |
| Human credential notes | `HUMAN_INPUT_NEEDED.md` |

## Intentionally Deferred External-Credential Items

- Stripe checkout, billing portal, and webhooks need real Stripe keys, price IDs, and webhook secret. Without them, the app still runs and returns guarded fallback responses from the Stripe API routes.
- Resend welcome email needs `RESEND_API_KEY` and `RESEND_FROM_EMAIL`. Without them, signup still works and email sending is skipped.
- Google OAuth needs `AUTH_GOOGLE_ID` and `AUTH_GOOGLE_SECRET`. Without them, Google sign-in is disabled while guest mode and email/password auth still work.
- Production deployments need a real `AUTH_SECRET`. Local development includes a placeholder secret only for dev use.

## Verification Results

- `npm ci`: passed.
- Installed Next docs reviewed under `node_modules/next/dist/docs/` after dependency restore.
- `npm run build`: passed with Prisma generation and Next production build.
- Dev server: started successfully at `http://localhost:3000`.
- Route smoke test: passed for `/`, `/app`, `/app/timer`, `/app/presets`, `/app/settings`, `/pricing`, SEO pages, templates, and blog page.
- Interactive smoke test: passed add/edit/reorder segments, mode toggle, timer start, pause/resume, skip, previous, restart, completion, and guest preset save/list.
- Visual review: checked homepage desktop, builder desktop, presets mobile, pricing desktop, empty run page, and active mobile timer. Fixed the run page to hide app navigation and removed nonessential template toast overlay.
- Docker build: attempted, but blocked by host permissions: `permission denied while trying to connect to the docker API at unix:///var/run/docker.sock`.
