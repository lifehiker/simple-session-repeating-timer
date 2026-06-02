# FORGE PRD TASKS

## Foundation
- [x] Initialize Next.js 15 project with TypeScript, Tailwind, ESLint, App Router
- [x] Install all dependencies (prisma, next-auth@beta, bcryptjs, stripe, resend, zod, zustand, etc.)
- [x] Set up shadcn/ui with all required components
- [x] Configure `output: "standalone"` in next.config.ts
- [x] System font stack (no next/font/google)

## Data / Auth
- [x] Prisma schema: User, Account, Session, VerificationToken, Preset, Segment, UserSettings, Subscription
- [x] SQLite datasource with libsql adapter
- [x] binaryTargets = ["native", "debian-openssl-3.0.x"]
- [x] `npx prisma generate` and `npx prisma db push`
- [x] NextAuth v5 with Credentials provider (email + password)
- [x] JWT session strategy
- [x] bcrypt password hashing
- [x] User session includes user.id

## Core Workflows

### Timer Engine
- [x] TimerEngine class with setInterval + drift correction
- [x] Session mode (run once)
- [x] Repeating mode (N cycles or infinite)
- [x] start(), pause(), resume(), skipNext(), goPrevious(), restart()
- [x] onTick, onSegmentChange, onComplete callbacks

### Timer Builder
- [x] Mode toggle (Session / Repeating)
- [x] Segment list with add/edit/delete/reorder
- [x] Repeat count input
- [x] Named segments with duration and color
- [x] Starter templates (Presentation, Classroom Rotation, Workout Intervals, Laundry, Study Session)

### Timer Runner
- [x] Large countdown display
- [x] Current segment name in large text
- [x] Next segment preview
- [x] Progress bar
- [x] Cycle counter
- [x] Start/Pause/Resume/Skip/Previous/Restart controls
- [x] Full-screen toggle
- [x] Color background based on segment color

### Alerts
- [x] Sound alerts using Web Audio API
- [x] Text-to-speech spoken alerts
- [x] Graceful fallback if speech unavailable

### Presets
- [x] Guest mode: store up to 3 presets in localStorage
- [x] Authenticated: save/load/delete presets via API
- [x] Free tier limit: 3 presets
- [x] Pro tier: unlimited presets

## Pages

### Public / Marketing
- [x] / — homepage with hero, features, use cases, pricing teaser
- [x] /pricing — full pricing page with comparison table
- [x] /login — credentials login form
- [x] /signup — registration form
- [x] /presentation-timer — SEO page
- [x] /visual-timer — SEO page
- [x] /interval-timer — SEO page
- [x] /repeating-timer — SEO page
- [x] /classroom-timer — SEO page
- [x] /templates — templates gallery

### App (authenticated or guest)
- [x] /app — dashboard with quick actions and recent presets
- [x] /app/timer — timer builder
- [x] /app/timer/run — full-screen timer runner
- [x] /app/presets — saved presets list
- [x] /app/settings — sound, speech, voice, account, billing

## API Routes
- [x] /api/auth/[...nextauth] — NextAuth handlers
- [x] /api/signup — user registration
- [x] /api/presets — GET all, POST create
- [x] /api/presets/[id] — GET, PUT, DELETE single preset
- [x] /api/stripe/checkout — create checkout session (lazy init)
- [x] /api/stripe/portal — create billing portal session
- [x] /api/webhooks/stripe — handle stripe events

## Components
- [x] TimerBuilder
- [x] SegmentList
- [x] SegmentForm
- [x] ModeToggle
- [x] RepeatCountInput
- [x] TimerDisplay
- [x] TimerControls
- [x] UpgradeModal
- [x] AppNav
- [x] Providers (SessionProvider + Toaster)

## Billing
- [x] isPro(userId) helper
- [x] FREE_PRESET_LIMIT = 3
- [x] FREE_REPEATING_LIMIT = 1
- [x] canCreatePreset() check
- [x] Upgrade modal
- [x] Stripe checkout (lazy init, graceful without credentials)
- [x] Stripe webhook handler

## SEO / PWA
- [x] sitemap.ts
- [x] robots.ts
- [x] public/manifest.json

## Analytics
- [x] trackEvent() helper
- [x] Events: timer_started, timer_completed, preset_created, template_used, upgrade_clicked, checkout_started, subscription_activated

## Deployment
- [x] output: "standalone" in next.config.ts
- [x] .env.example with all variables
- [x] .env.local for local dev
- [x] HUMAN_INPUT_NEEDED.md

## Verification
- [x] `npm run build` passes with 0 errors
- [x] All pages render without crashes
- [x] Public routes work without auth
- [x] Protected /app/* routes redirect to /login when unauthenticated
