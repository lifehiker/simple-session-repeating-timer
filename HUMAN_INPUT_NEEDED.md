# Human Input Needed

## Required for Core Functionality

### AUTH_SECRET
- **What**: A secret string used to sign JWT tokens for NextAuth sessions
- **How to generate**: `openssl rand -base64 32`
- **Where**: Set in your deployment environment as `AUTH_SECRET`
- **Default**: The app has `"dev-secret-change-in-production"` in `.env.local` for local dev

### DATABASE_URL
- **What**: Path to the SQLite database file
- **Default**: `file:./dev.db` (local) or `file:/data/app.db` (production Docker)
- **Note**: No external database service needed — SQLite is file-based

## Optional (App Works Without These)

### Stripe (Payments)
- **STRIPE_SECRET_KEY**: From Stripe Dashboard → Developers → API Keys
- **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**: Same location (pk_live_...)
- **STRIPE_WEBHOOK_SECRET**: From Stripe Dashboard → Webhooks → Signing Secret
- **STRIPE_PRO_PRICE_ID**: Stripe monthly Pro recurring price ID
- **STRIPE_PRO_ANNUAL_PRICE_ID**: Stripe annual Pro recurring price ID
- **Without these**: The app shows pricing/upgrade UI but checkout will return a 503 error

#### Stripe Setup Steps (if enabling payments)
1. Create a Stripe account at stripe.com
2. Create a product called "Pro" with two prices:
   - Monthly: $3.99/month (recurring)
   - Annual: $24.99/year (recurring)
3. Add webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
4. Subscribe to events: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`
5. Copy the price IDs into your pricing page CTA buttons

### Resend (Email)
- **RESEND_API_KEY**: From resend.com
- **RESEND_FROM_EMAIL**: e.g., `noreply@yourdomain.com`
- **Without these**: No transactional emails (the app does not currently send emails in MVP)

### Google OAuth (Optional)
- **AUTH_GOOGLE_ID**: Google OAuth client ID
- **AUTH_GOOGLE_SECRET**: Google OAuth client secret
- **Without these**: Google sign-in is disabled server-side; email/password sign-in and guest mode still work

## Deployment Environment Variables Checklist

```bash
# Required
AUTH_SECRET="your-32-char-secret"
DATABASE_URL="file:/data/app.db"  # Docker default

# Optional
NEXT_PUBLIC_APP_URL="https://yourdomain.com"
STRIPE_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
STRIPE_PRO_PRICE_ID="price_monthly_..."
STRIPE_PRO_ANNUAL_PRICE_ID="price_annual_..."
RESEND_API_KEY="re_..."
RESEND_FROM_EMAIL="noreply@yourdomain.com"
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
```
