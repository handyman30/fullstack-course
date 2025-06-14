# 🚂 Railway Deployment Guide

## 🎉 Congratulations on Deploying to Railway!

Since you've already deployed, here's what you need to do to complete the setup:

## 1️⃣ Set Environment Variables in Railway

Go to your Railway project settings and add these environment variables:

```env
# PayPal Configuration
PAYPAL_CLIENT_ID=AQNr9GfqnB_vSZrUoSGVWvL7rmy5mEVblIXDGXDaFIE3SMfNohI-oJKbFzh3HLMvNtCTCV7e-8df_v_X
PAYPAL_CLIENT_SECRET=<your-paypal-secret>
PAYPAL_MODE=sandbox
PAYPAL_PLAN_ID=<from-paypal-dashboard>

# NextAuth Configuration  
NEXTAUTH_URL=https://YOUR-APP-NAME.up.railway.app
NEXTAUTH_SECRET=<generate-with: openssl rand -base64 32>

# OAuth (Optional but Recommended)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Mixpanel Analytics
NEXT_PUBLIC_MIXPANEL_TOKEN=c8295e8750df4e6d6528bf1a4b89979b
```

## 2️⃣ Run Database Migrations

In Railway's terminal or locally with Railway's DATABASE_URL:

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Seed the database with course content
npx tsx prisma/seed.ts
```

## 3️⃣ Create PayPal Subscription Plan

1. Go to https://developer.paypal.com
2. Navigate to **Sandbox** → **Subscriptions** → **Products**
3. Create a product called "DevMastery Full-Stack Course"
4. Create a plan with:
   - Price: $25/month
   - Trial: 3 days free
   - Copy the Plan ID
5. Add the Plan ID to Railway env vars

## 4️⃣ Set Up OAuth (Optional)

### For Production Google OAuth:
1. In Google Cloud Console, add:
   ```
   https://YOUR-APP-NAME.up.railway.app/api/auth/callback/google
   ```

### For Production GitHub OAuth:
1. In GitHub OAuth settings, add:
   ```
   https://YOUR-APP-NAME.up.railway.app/api/auth/callback/github
   ```

## 5️⃣ Test Your Live App

1. Visit: `https://YOUR-APP-NAME.up.railway.app`
2. Click "Start Free Trial"
3. Sign in with OAuth
4. Complete PayPal sandbox payment
5. Access the course!

## 📊 Mixpanel Analytics

Your Mixpanel is already configured! View your analytics at:
https://mixpanel.com/project/c8295e8750df4e6d6528bf1a4b89979b

You'll see:
- Page views and user flow
- Trial start conversions
- Subscription completions
- Lesson engagement
- Video watch time

## 🔧 Troubleshooting

### "Invalid Redirect URI" OAuth Error
- Make sure you added the Railway URL to OAuth providers
- Check that NEXTAUTH_URL matches your Railway domain

### Database Connection Issues
- Railway automatically provides DATABASE_URL
- Make sure you ran migrations

### PayPal Not Working
- Verify you created the subscription plan
- Check that Plan ID is added to env vars
- Ensure you're using sandbox credentials

## 🚀 Going to Production

When ready for real payments:
1. Create a live PayPal app
2. Update PAYPAL_MODE=live
3. Use production PayPal credentials
4. Update OAuth to production credentials

## 📈 Monitor Your Success

In Mixpanel, create dashboards for:
- Conversion funnel (Landing → Trial → Paid)
- Course completion rates
- Most popular lessons
- Revenue tracking

That's it! Your course platform is live on Railway! 🎊 