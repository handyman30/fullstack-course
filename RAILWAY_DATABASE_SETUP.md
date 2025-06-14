# 🚂 Railway PostgreSQL Database Setup

## Step 1: Get Database URL from Railway

1. Go to your Railway project dashboard
2. Click on your service (fullstack-course)
3. Click on the **Variables** tab
4. Look for `DATABASE_URL` - Railway automatically provides this when you have a PostgreSQL database

If you don't see a DATABASE_URL:
1. Click **+ New** → **Database** → **Add PostgreSQL**
2. Railway will automatically create the database and add DATABASE_URL to your service

## Step 2: Create Local .env.local File

Create a `.env.local` file in your project root:

```env
# Database - Copy from Railway Variables tab
DATABASE_URL="postgresql://postgres:YOUR_PASSWORD@YOUR_HOST.railway.app:PORT/railway"

# PayPal (Sandbox)
PAYPAL_CLIENT_ID="AQNr9GfqnB_vSZrUoSGVWvL7rmy5mEVblIXDGXDaFIE3SMfNohI-oJKbFzh3HLMvNtCTCV7e-8df_v_X"
PAYPAL_CLIENT_SECRET="YOUR_ACTUAL_PAYPAL_SECRET"
PAYPAL_MODE="sandbox"
PAYPAL_PLAN_ID="YOUR_PLAN_ID"

# NextAuth
NEXTAUTH_URL="http://localhost:3002"
NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"

# Mixpanel
NEXT_PUBLIC_MIXPANEL_TOKEN="c8295e8750df4e6d6528bf1a4b89979b"
```

## Step 3: Run Database Migrations

Once you have the DATABASE_URL:

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed the database with course content
npx tsx prisma/seed.ts
```

## Step 4: Verify Connection

Test your database connection:

```bash
npx prisma studio
```

This will open Prisma Studio where you can view your database tables.

## Step 5: Railway Environment Variables

In Railway dashboard, make sure these variables are set:

1. `DATABASE_URL` - Automatically provided by Railway
2. `PAYPAL_CLIENT_ID` - Your PayPal client ID
3. `PAYPAL_CLIENT_SECRET` - Your actual PayPal secret (not the same as client ID)
4. `PAYPAL_MODE` - Set to "sandbox"
5. `PAYPAL_PLAN_ID` - Will get this after creating plan
6. `NEXTAUTH_URL` - https://YOUR-APP.up.railway.app
7. `NEXTAUTH_SECRET` - Generate secure secret
8. `NEXT_PUBLIC_MIXPANEL_TOKEN` - Already have this

## Creating PayPal Plan

Since the PayPal secret seems incorrect (it's the same as the client ID), you need the actual secret from PayPal:

1. Go to https://developer.paypal.com
2. Click "Dashboard" → "Apps & Credentials"
3. Select your app
4. Under "Secret", click "Show" and copy the actual secret
5. Update PAYPAL_CLIENT_SECRET in your .env.local
6. Run: `npx tsx scripts/create-paypal-plan.ts`

## Quick Database Commands

```bash
# View database schema
npx prisma studio

# Reset database (careful!)
npx prisma db push --force-reset

# Run migrations
npx prisma migrate dev

# Seed database
npx tsx prisma/seed.ts
``` 