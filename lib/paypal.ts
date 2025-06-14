import axios from 'axios'

// PayPal API configuration
const PAYPAL_API_BASE = process.env.PAYPAL_MODE === 'live' 
  ? 'https://api-m.paypal.com' 
  : 'https://api-m.sandbox.paypal.com'

// Subscription plan configuration
export const SUBSCRIPTION_PLAN = {
  planId: process.env.PAYPAL_PLAN_ID || 'P-XXXXXXXXXXXXXXXXXX', // You'll need to create this in PayPal
  price: 25.00,
  currency: 'USD',
  trialDays: 3,
}

// Get PayPal access token
export async function getPayPalAccessToken() {
  const clientId = process.env.PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET
  
  if (!clientId || !clientSecret) {
    throw new Error('PayPal credentials not configured')
  }
  
  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
  
  try {
    const response = await axios.post(
      `${PAYPAL_API_BASE}/v1/oauth2/token`,
      'grant_type=client_credentials',
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
      }
    )
    
    return response.data.access_token
  } catch (error: any) {
    console.error('PayPal auth error:', error.response?.data || error.message)
    throw new Error('Failed to authenticate with PayPal')
  }
}

// Create PayPal subscription
export async function createPayPalSubscription(accessToken: string, planId: string, userEmail: string) {
  try {
    const response = await axios.post(
      `${PAYPAL_API_BASE}/v1/billing/subscriptions`,
      {
        plan_id: planId,
        subscriber: {
          email_address: userEmail,
        },
        application_context: {
          brand_name: 'DevMastery',
          locale: 'en-US',
          shipping_preference: 'NO_SHIPPING',
          user_action: 'SUBSCRIBE_NOW',
          return_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3002'}/api/subscription/success`,
          cancel_url: `${process.env.NEXTAUTH_URL || 'http://localhost:3002'}/api/subscription/cancel`,
        },
      },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'PayPal-Request-Id': `devmastery-${Date.now()}`,
        },
      }
    )
    
    return response.data
  } catch (error: any) {
    console.error('PayPal subscription creation error:', error.response?.data || error.message)
    throw error
  }
}

// Get subscription details
export async function getPayPalSubscription(subscriptionId: string) {
  try {
    const accessToken = await getPayPalAccessToken()
    
    const response = await axios.get(
      `${PAYPAL_API_BASE}/v1/billing/subscriptions/${subscriptionId}`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    )
    
    return response.data
  } catch (error) {
    console.error('PayPal subscription fetch error:', error)
    throw error
  }
}

// Cancel subscription
export async function cancelPayPalSubscription(subscriptionId: string, reason: string) {
  try {
    const accessToken = await getPayPalAccessToken()
    
    await axios.post(
      `${PAYPAL_API_BASE}/v1/billing/subscriptions/${subscriptionId}/cancel`,
      { reason },
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      }
    )
    
    return true
  } catch (error) {
    console.error('PayPal subscription cancellation error:', error)
    throw error
  }
} 