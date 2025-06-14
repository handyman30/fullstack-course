# Stripe Configuration

## Your Stripe Keys

### Test Keys (Use for Development)
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_TEST_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_SECRET_KEY_HERE
```

### Live Keys (Use for Production) 
⚠️ **IMPORTANT**: Never commit these to version control!
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_SECRET_KEY_HERE
```

## Setup Instructions

1. **Create or update your `.env.local` file** in the root directory with:

```env
# Stripe Configuration (TEST MODE)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_TEST_PUBLISHABLE_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_TEST_SECRET_KEY_HERE

# NextAuth Configuration
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=http://localhost:3003

# Database Configuration (optional)
DATABASE_URL=your-database-url
```

2. **Restart your development server** to load the new environment variables:
```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

3. **Test the payment flow**:
   - Go to the subscribe page
   - Click "Start Your Free Trial"
   - Use Stripe test card: `4242 4242 4242 4242`
   - Any future date for expiry
   - Any 3 digits for CVC
   - Any billing details

## Switching to Production

When you're ready to go live:

1. Replace the test keys with live keys in `.env.local`
2. Update your Railway/Vercel environment variables
3. Ensure your Stripe account is activated for live payments
4. Test with a real card (you can refund yourself)

## Important Security Notes

- ✅ The publishable key (pk_) is safe to expose in frontend code
- ❌ The secret key (sk_) must NEVER be exposed to the frontend
- ❌ Never commit live keys to version control
- ✅ Use environment variables for all keys
- ✅ Add `.env.local` to your `.gitignore` file

## Need Help?

- Stripe Dashboard: https://dashboard.stripe.com
- Test cards: https://stripe.com/docs/testing
- API docs: https://stripe.com/docs/api 