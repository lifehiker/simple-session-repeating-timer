# Simple Session and Repeating Timer PRD Checklist

## Foundation
- [x] Read `PRD.md` end-to-end.
- [x] Read `BUILD_INSTRUCTIONS.md` end-to-end.
- [x] Restored dependencies with `npm ci`.
- [x] Read installed Next docs under `node_modules/next/dist/docs/` for App Router route handlers/config after dependency restore.
- [x] App uses Next App Router, TypeScript, Tailwind/shadcn-style components, and system fonts only.
- [x] `next.config.ts` uses `output: "standalone"`.
- [x] No `next/font/google` or build-time network font dependency.
- [x] `npm run build` generates Prisma Client before `next build` for clean-checkout reliability.

## Data Model
- [x] User model supports credentials auth and OAuth accounts.
- [x] Preset model stores user, name, mode, repeat count, template flag, and timestamps.
- [x] Segment model stores name, duration, color, and ordered position.
- [x] User settings model stores sound, speech, voice, and theme preferences.
- [x] Subscription model stores Stripe customer/subscription/price, status, tier, and renewal date.
- [x] Local SQLite/libSQL fallback lets the app run without external Postgres credentials.

## Auth
- [x] Guest mode works without account for building/running timers and local preset slots.
- [x] Email/password signup creates users with hashed passwords.
- [x] Email/password login works through NextAuth credentials.
- [x] Google OAuth provider is only enabled when credentials exist.
- [x] Guest-capable app pages remain reachable without sign-in; API endpoints return 401 for unauthenticated account-only data.

## User-Facing Pages
- [x] `/` homepage positions the product as a visible session/repeating timer.
- [x] `/login` supports credentials login and optional Google OAuth.
- [x] `/signup` supports no-card account creation.
- [x] `/app` dashboard introduces builder, presets, display, and settings workflows.
- [x] `/app/timer` provides the segment builder.
- [x] `/app/timer/run` provides the large full-viewport display timer.
- [x] `/app/presets` lists saved presets, guest presets, and starter templates without hydration mismatch.
- [x] `/app/settings` exposes sound/speech/voice and billing actions.
- [x] `/pricing` explains Free and Pro tiers.

## API / Server Actions
- [x] `POST /api/signup` creates user, subscription fallback, and guarded welcome email.
- [x] `GET /api/presets` lists signed-in user presets.
- [x] `POST /api/presets` creates presets and enforces free preset limit.
- [x] `GET /api/presets/[id]` returns an owned preset.
- [x] `PUT /api/presets/[id]` updates an owned preset and replaces ordered segments.
- [x] `DELETE /api/presets/[id]` deletes an owned preset.
- [x] `POST /api/stripe/checkout` lazy-initializes Stripe and returns a clear fallback without credentials.
- [x] `POST /api/stripe/portal` lazy-initializes Stripe and returns a clear fallback without credentials/customer.
- [x] `POST /api/webhooks/stripe` verifies Stripe events when configured and no-ops safely otherwise.

## Core Workflows
- [x] Build session mode timers that run segments once.
- [x] Build repeating mode timers with finite or infinite cycles.
- [x] Add, edit, delete, and reorder named segments.
- [x] Configure segment duration and color.
- [x] Start, pause, resume, skip, previous, restart, and rerun timers.
- [x] Show full-screen readable countdown, current segment, next segment, cycle, and progress.
- [x] Play browser sound alerts on transitions and completion.
- [x] Speak browser TTS alerts when enabled.
- [x] Save, duplicate/customize, rename/update, and delete presets.
- [x] Enforce Free tier saved-preset limit and Pro upsell.
- [x] Track key analytics events through a safe local/no-op analytics helper.

## Secondary Workflows
- [x] Preloaded starter presets: Presentation, Classroom Rotation, Workout Intervals, Laundry, and Study Session.
- [x] Browser voice selector and test voice control.
- [x] PWA manifest is present.
- [x] SEO landing pages exist for primary keyword pages.
- [x] SEO template pages exist for required starter templates plus tabata alternative.
- [x] SEO blog pages exist for required long-tail topics.

## Billing / Email / Storage Integrations
- [x] Stripe price IDs are environment-driven.
- [x] Stripe checkout/portal/webhook paths are guarded for missing credentials.
- [x] Resend welcome email is guarded and skipped without credentials.
- [x] Prisma persists account presets/settings/subscription locally by default.
- [x] Credential requirements are documented in `HUMAN_INPUT_NEEDED.md`.

## Marketing / SEO Pages
- [x] Homepage targets visible session timer positioning.
- [x] `/presentation-timer`
- [x] `/visual-timer`
- [x] `/interval-timer`
- [x] `/repeating-timer`
- [x] `/classroom-timer`
- [x] `/workout-interval-timer`
- [x] `/speaking-timer`
- [x] `/templates`
- [x] `/templates/presentation`
- [x] `/templates/classroom-rotation`
- [x] `/templates/laundry-routine`
- [x] `/templates/study-session`
- [x] `/templates/workout-intervals`
- [x] `/templates/tabata-alternative`
- [x] `/blog/best-presentation-timer-app`
- [x] `/blog/visual-timer-for-classroom`
- [x] `/blog/repeating-timer-with-voice`
- [x] `/blog/interval-timer-not-fitness`
- [x] `/blog/how-to-create-named-timer-segments`
- [x] Sitemap, robots, and route metadata cover the main marketing surface.

## Docker / Deploy
- [x] Production Dockerfile exists.
- [x] Dockerfile uses standalone output paths.
- [x] Dockerfile only copies directories that exist (`prisma`, `public`, `src`).
- [x] `.dockerignore` excludes local build artifacts, env files, node_modules, and local databases.
- [ ] Docker build executed successfully.
  - Blocked in this environment: `docker build .` failed with permission denied connecting to `/var/run/docker.sock`.

## Verification
- [x] Dependencies installed/restored with `npm ci`.
- [x] `npm run build` passes.
- [x] Dev server starts without crashing at `http://localhost:3000`.
- [x] Primary routes smoke-tested with Playwright.
- [x] Interactive timer workflows tested with Playwright: edit/add/reorder, mode toggle, start, pause/resume, skip, previous, restart, completion, guest preset save/list.
- [x] Visual pass completed for homepage, builder, presets mobile, pricing, empty run page, and active mobile timer display.
- [x] Full-screen runner adjusted to hide app navigation and avoid nonessential template toast overlay.
- [x] `FORGE_COMPLETION_AUDIT.md` maps PRD requirements to implemented files/routes/components/actions.
