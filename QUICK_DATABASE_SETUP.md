# 🚀 Quick Database & PayPal Setup

## Step 1: Get Railway Database URL

1. Go to your Railway dashboard: https://railway.app/dashboard
2. Click on your `fullstack-course` project
3. You should see a PostgreSQL database service - click on it
4. Go to the **Variables** tab
5. Copy the `DATABASE_URL` value

If you don't see a PostgreSQL database:
- Click **+ New** → **Database** → **Add PostgreSQL**

## Step 2: Create `.env.local` file

Create a file called `.env.local` in your project root:

```bash
# Create the file
touch .env.local
```

Then add this content (replace with your actual values):

```env
# Railway Database URL (paste from Railway)
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@YOUR_HOST.railway.app:PORT/railway"

# PayPal (for now, using test values)
PAYPAL_CLIENT_ID="AQNr9GfqnB_vSZrUoSGVWvL7rmy5mEVblIXDGXDaFIE3SMfNohI-oJKbFzh3HLMvNtCTCV7e-8df_v_X"
PAYPAL_CLIENT_SECRET="test-secret"
PAYPAL_MODE="sandbox"
PAYPAL_PLAN_ID="P-5ML4271244454362WXNWU5NQ"

# NextAuth
NEXTAUTH_URL="http://localhost:3002"
NEXTAUTH_SECRET="my-super-secret-key"

# Mixpanel
NEXT_PUBLIC_MIXPANEL_TOKEN="c8295e8750df4e6d6528bf1a4b89979b"
```

## Step 3: Setup Database

Once you have the DATABASE_URL in your `.env.local`:

```bash
# Push schema to database
npx prisma db push

# Seed with course content
npx tsx prisma/seed.ts

# Verify it worked
npx prisma studio
```

## Step 4: Run the App

```bash
npm run dev
```

Visit http://localhost:3002

## 🎯 Test Flow

1. Click "Start Free Trial" on landing page
2. Sign in with Google/GitHub
3. You'll see a PayPal error (because we need the real secret)
4. For now, you can access the course at: http://localhost:3002/dashboard

## 📝 Notes

- The app is using a hardcoded PayPal plan ID for testing
- To create your own plan, get your real PayPal secret and run:
  ```bash
  npx tsx scripts/create-paypal-plan.ts
  ```
- The subscription flow will work once you have the correct PayPal credentials 