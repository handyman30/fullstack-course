import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { createCheckoutSession } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Please sign in to continue' }, { status: 401 })
    }
    
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      console.error('Stripe secret key not configured')
      return NextResponse.json({ 
        error: 'Payment system not configured. Please contact support.' 
      }, { status: 500 })
    }
    
    // Handle mock user IDs (from credentials provider without DB)
    const userId = session.user.id
    const isMockUser = userId.startsWith('user-')
    
    if (!isMockUser) {
      try {
        // Check if user already has an active subscription
        const existingSubscription = await prisma.subscription.findFirst({
          where: {
            userId: session.user.id,
            status: { in: ['ACTIVE', 'TRIALING', 'TRIAL'] }
          }
        })
        
        if (existingSubscription) {
          return NextResponse.json({ 
            error: 'You already have an active subscription' 
          }, { status: 400 })
        }
      } catch (dbError) {
        console.log('Database check skipped:', dbError)
      }
    }
    
    // Create Stripe checkout session
    const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3002'
    const successUrl = `${baseUrl}/api/subscription/success?session_id={CHECKOUT_SESSION_ID}`
    const cancelUrl = `${baseUrl}/subscribe?canceled=true`
    
    console.log('Creating checkout session for user:', session.user.email)
    
    const checkoutSession = await createCheckoutSession(
      session.user.id,
      session.user.email || `user-${session.user.id}@devmastery.com`,
      successUrl,
      cancelUrl
    )
    
    if (!checkoutSession.url) {
      throw new Error('No checkout URL received from Stripe')
    }
    
    console.log('Created Stripe checkout session:', checkoutSession.id)
    
    return NextResponse.json({ 
      sessionId: checkoutSession.id,
      checkoutUrl: checkoutSession.url 
    })
    
  } catch (error: any) {
    console.error('Create subscription error:', error)
    
    // Provide more specific error messages
    let errorMessage = 'Failed to create subscription'
    
    if (error.message?.includes('Invalid API Key')) {
      errorMessage = 'Payment configuration error. Please contact support.'
    } else if (error.message?.includes('price')) {
      errorMessage = 'Subscription plan configuration error. Please try again later.'
    } else if (error.message) {
      errorMessage = error.message
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
} 