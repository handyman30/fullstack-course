import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set in environment variables')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-05-28.basil',
  typescript: true,
})

// Subscription configuration
export const SUBSCRIPTION_CONFIG = {
  priceId: '', // We'll create this after setting up the product
  trialDays: 3,
  productName: 'DevMastery Monthly',
  price: 25.00,
  currency: 'usd',
}

// Create a Stripe Checkout session
export async function createCheckoutSession(
  userId: string,
  userEmail: string,
  successUrl: string,
  cancelUrl: string
) {
  try {
    // First, we need to create a price if it doesn't exist
    let priceId = SUBSCRIPTION_CONFIG.priceId
    
    if (!priceId) {
      // Create product and price on the fly (for development)
      const product = await stripe.products.create({
        name: SUBSCRIPTION_CONFIG.productName,
        description: 'Monthly subscription to DevMastery course with 3-day free trial',
      })
      
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: SUBSCRIPTION_CONFIG.price * 100, // Stripe uses cents
        currency: SUBSCRIPTION_CONFIG.currency,
        recurring: {
          interval: 'month',
        },
      })
      
      priceId = price.id
      console.log('Created Stripe price:', priceId)
    }
    
    // Prepare checkout session options
    const sessionOptions: any = {
      mode: 'subscription',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: SUBSCRIPTION_CONFIG.trialDays,
        metadata: {
          userId,
        },
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId,
      },
    }
    
    // Only set customer_email if we have a valid email
    // Otherwise, Stripe will collect it during checkout
    if (userEmail && !userEmail.includes('user-')) {
      sessionOptions.customer_email = userEmail
    } else {
      // Force email collection if we don't have a real email
      sessionOptions.customer_creation = 'always'
      sessionOptions.payment_method_collection = 'always'
    }
    
    const session = await stripe.checkout.sessions.create(sessionOptions)
    
    return session
  } catch (error) {
    console.error('Stripe checkout session error:', error)
    throw error
  }
}

// Get subscription details
export async function getSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId)
    return subscription
  } catch (error) {
    console.error('Stripe subscription fetch error:', error)
    throw error
  }
}

// Cancel subscription
export async function cancelSubscription(subscriptionId: string) {
  try {
    const subscription = await stripe.subscriptions.cancel(subscriptionId)
    return subscription
  } catch (error) {
    console.error('Stripe subscription cancellation error:', error)
    throw error
  }
}

// Get customer portal session
export async function createPortalSession(customerId: string, returnUrl: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })
    return session
  } catch (error) {
    console.error('Stripe portal session error:', error)
    throw error
  }
} 