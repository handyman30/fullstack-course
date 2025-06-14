#!/bin/bash

echo "Setting up Stripe environment variables..."

# Check if .env.local exists
if [ -f .env.local ]; then
    echo "⚠️  .env.local already exists. Creating backup..."
    cp .env.local .env.local.backup
fi

# Create or update .env.local with Stripe keys
cat > .env.local << 'EOF'
# Stripe Configuration (TEST MODE)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_TEST_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_SECRET_KEY_HERE

# NextAuth Configuration
NEXTAUTH_SECRET=MSeCh2YPojlR1ReaSYvb9nsnppqcycraMRdATNnUI9g=
NEXTAUTH_URL=http://localhost:3003

# Google OAuth (optional)
# GOOGLE_CLIENT_ID=your-google-client-id
# GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database Configuration
# DATABASE_URL="postgresql://user:password@localhost:5432/fullstack_course?schema=public"
EOF

echo "✅ .env.local created with:"
echo "   - Stripe TEST keys (YOU NEED TO ADD YOUR OWN KEYS)"
echo "   - Secure NEXTAUTH_SECRET"
echo "   - Updated port (3003)"
echo ""
echo "✅ Authentication is now secure with demo users:"
echo "   - demo@example.com / demo123"
echo "   - test@example.com / test123"
echo ""
echo "❌ Google OAuth has been removed"
echo ""
echo "⚠️  IMPORTANT: Replace the placeholder Stripe keys with your actual keys!"
echo ""
echo "Now restart your dev server to apply changes!" 