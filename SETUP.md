# DevMastery Setup Instructions

## Environment Setup

### 1. Create `.env.local` file
Create a `.env.local` file in the root directory with the following variables:

```env
# PayPal Configuration
PAYPAL_CLIENT_ID=AQNr9GfqnB_vSZrUoSGVWvL7rmy5mEVblIXDGXDaFIE3SMfNohI-oJKbFzh3HLMvNtCTCV7e-8df_v_X
PAYPAL_CLIENT_SECRET=<your-secret-here>
PAYPAL_MODE=sandbox
PAYPAL_PLAN_ID=<create-in-paypal-dashboard>

# Database Configuration
DATABASE_URL=postgresql://postgres:password@localhost:5432/devmastery

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3002
NEXTAUTH_SECRET=<generate-using-openssl-rand-base64-32>

# OAuth Providers (optional, but recommended)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

### 2. Start PostgreSQL with Docker

```bash
# Start PostgreSQL database
docker-compose up -d

# Verify it's running
docker ps
```

### 3. Initialize Database

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database with sample data
npx prisma db seed
```

### 4. Create PayPal Subscription Plan

1. Log in to [PayPal Developer Dashboard](https://developer.paypal.com)
2. Go to your Sandbox account
3. Navigate to Subscriptions → Plans
4. Create a new plan with:
   - Name: "DevMastery Full-Stack Course"
   - Price: $25/month
   - Trial period: 3 days
5. Copy the Plan ID and add it to your `.env.local` as `PAYPAL_PLAN_ID`

### 5. Set up OAuth Providers (Optional)

#### Google OAuth:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add redirect URI: `http://localhost:3002/api/auth/callback/google`

#### GitHub OAuth:
1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Create a new OAuth App
3. Set Authorization callback URL: `http://localhost:3002/api/auth/callback/github`

### 6. Generate NextAuth Secret

```bash
# Generate a secure secret
openssl rand -base64 32
```

## Running the Application

```bash
# Install dependencies (if not already done)
npm install

# Start the development server
npm run dev

# The app will be available at http://localhost:3002
```

## Testing Payment Flow

1. Click "Start Free Trial" on the landing page
2. Sign in with OAuth (Google/GitHub) or create an account
3. You'll be redirected to PayPal
4. Use PayPal sandbox credentials to complete the subscription
5. After successful payment, you'll have access to the course content

## Deployment to Railway

When ready to deploy:

1. Push your code to GitHub
2. Connect your Railway account to GitHub
3. Create a new project from your repository
4. Add PostgreSQL database service
5. Set all environment variables in Railway
6. Update `NEXTAUTH_URL` to your Railway domain
7. Update OAuth redirect URLs to production domain
8. Switch PayPal to live mode when ready

## Troubleshooting

- **Database connection issues**: Make sure Docker is running and PostgreSQL is accessible
- **PayPal errors**: Verify your credentials and plan ID are correct
- **OAuth issues**: Check redirect URLs match exactly
- **Port conflicts**: If port 3002 is in use, update in package.json and .env.local 