# 📋 Detailed Setup Guide

## 🔵 PayPal Subscription Plan Setup

### Step 1: Access PayPal Developer Dashboard
1. Go to https://developer.paypal.com
2. Log in with your PayPal account
3. Click "Dashboard" in the top menu

### Step 2: Switch to Sandbox
1. In the top right, make sure you're in "Sandbox" mode
2. Click on "Apps & Credentials"

### Step 3: Create Subscription Product
1. Go to "Sandbox" → "Subscriptions" → "Products"
2. Click "Create Product"
3. Fill in:
   - Product Name: "DevMastery Full-Stack Course"
   - Product Type: "Digital"
   - Category: "Software"
   - Product Description: "Complete full-stack development course"
4. Click "Create Product"

### Step 4: Create Subscription Plan
1. After creating the product, click "Create Plan"
2. Fill in the details:
   ```
   Plan Name: DevMastery Monthly
   Plan Description: Monthly subscription with 3-day free trial
   
   Pricing:
   - Setup Fee: $0
   - Regular Price: $25.00 USD
   - Billing Cycle: Every 1 Month
   
   Trial Period:
   - Enable trial period: ✓
   - Trial length: 3 days
   - Trial price: $0
   ```
3. Click "Create Plan"
4. **COPY THE PLAN ID** (looks like: P-5ML4271244454362WXNWU5NQ)

### Step 5: Add to Your App
Add the Plan ID to your Railway environment variables:
```
PAYPAL_PLAN_ID=P-5ML4271244454362WXNWU5NQ
```

---

## 🔐 OAuth Setup (Google & GitHub)

### Google OAuth Setup

1. **Go to Google Cloud Console**
   - Visit: https://console.cloud.google.com
   - Create a new project or select existing

2. **Enable Google+ API**
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API"
   - Click and Enable it

3. **Create OAuth Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth client ID"
   - Choose "Web application"
   - Name: "DevMastery"

4. **Add Redirect URIs**
   For Railway deployment, add BOTH:
   ```
   http://localhost:3002/api/auth/callback/google
   https://YOUR-APP.up.railway.app/api/auth/callback/google
   ```

5. **Copy Credentials**
   ```
   GOOGLE_CLIENT_ID=xxxxx.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=xxxxx
   ```

### GitHub OAuth Setup

1. **Go to GitHub Settings**
   - Visit: https://github.com/settings/developers
   - Click "OAuth Apps" → "New OAuth App"

2. **Fill App Details**
   ```
   Application name: DevMastery
   Homepage URL: https://YOUR-APP.up.railway.app
   Authorization callback URL: https://YOUR-APP.up.railway.app/api/auth/callback/github
   ```

3. **Create and Copy Credentials**
   ```
   GITHUB_CLIENT_ID=xxxxx
   GITHUB_CLIENT_SECRET=xxxxx
   ```

---

## 🚂 Railway Environment Variables

Since you've deployed to Railway, add all these in your Railway dashboard:

```env
# PayPal
PAYPAL_CLIENT_ID=AQNr9GfqnB_vSZrUoSGVWvL7rmy5mEVblIXDGXDaFIE3SMfNohI-oJKbFzh3HLMvNtCTCV7e-8df_v_X
PAYPAL_CLIENT_SECRET=<your-secret>
PAYPAL_MODE=sandbox
PAYPAL_PLAN_ID=<from-step-4-above>

# Database (Railway provides this automatically)
DATABASE_URL=<railway-provides-this>

# NextAuth
NEXTAUTH_URL=https://YOUR-APP.up.railway.app
NEXTAUTH_SECRET=<generate-with: openssl rand -base64 32>

# OAuth (optional but recommended)
GOOGLE_CLIENT_ID=<from-google-setup>
GOOGLE_CLIENT_SECRET=<from-google-setup>
GITHUB_CLIENT_ID=<from-github-setup>
GITHUB_CLIENT_SECRET=<from-github-setup>

# Mixpanel
NEXT_PUBLIC_MIXPANEL_TOKEN=c8295e8750df4e6d6528bf1a4b89979b
```

## 🎯 Quick Checklist

- [ ] Created PayPal subscription plan
- [ ] Added Plan ID to Railway
- [ ] Set up Google OAuth (optional)
- [ ] Set up GitHub OAuth (optional)
- [ ] Added all env vars to Railway
- [ ] Updated NEXTAUTH_URL to Railway domain

## 🚀 Testing Your Setup

1. Visit your Railway app URL
2. Click "Start Free Trial"
3. Sign in with Google/GitHub
4. You'll be redirected to PayPal
5. Use sandbox buyer account to test
6. After payment, you'll access the course!

## 📝 PayPal Sandbox Test Account

To test payments:
1. Go to PayPal Developer Dashboard
2. Click "Sandbox" → "Accounts"
3. Use the default buyer account or create new
4. Note the email and password for testing 