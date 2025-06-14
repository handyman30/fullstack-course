import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const sessionId = searchParams.get('session_id')
  
  if (!sessionId) {
    return NextResponse.redirect(new URL('/subscribe?error=missing_session', request.url))
  }
  
  try {
    // Get the checkout session from Stripe
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer']
    })
    
    if (!checkoutSession.subscription) {
      return NextResponse.redirect(new URL('/subscribe?error=no_subscription', request.url))
    }
    
    // Get the authenticated user
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.redirect(new URL('/auth/signin', request.url))
    }
    
    // Get subscription details
    const subscription = typeof checkoutSession.subscription === 'string' 
      ? await stripe.subscriptions.retrieve(checkoutSession.subscription)
      : checkoutSession.subscription
    
    // Calculate trial end date (3 days from now)
    const trialEndsAt = new Date()
    trialEndsAt.setDate(trialEndsAt.getDate() + 3)
    
    // Save subscription to database
    try {
      await prisma.subscription.upsert({
        where: {
          stripeSubscriptionId: subscription.id
        },
        create: {
          userId: session.user.id,
          stripeSubscriptionId: subscription.id,
          stripeCustomerId: subscription.customer as string,
          status: subscription.status === 'trialing' ? 'TRIAL' : 'ACTIVE',
          currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
          currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
          trialEndsAt: subscription.status === 'trialing' ? trialEndsAt : null,
        },
        update: {
          status: subscription.status === 'trialing' ? 'TRIAL' : 'ACTIVE',
          currentPeriodStart: new Date((subscription as any).current_period_start * 1000),
          currentPeriodEnd: new Date((subscription as any).current_period_end * 1000),
          trialEndsAt: subscription.status === 'trialing' ? trialEndsAt : null,
        }
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      // Continue anyway - subscription is created in Stripe
    }
    
    // Redirect to dashboard with success message
    return NextResponse.redirect(new URL('/dashboard?subscribed=true', request.url))
  } catch (error) {
    console.error('Subscription success handler error:', error)
    return NextResponse.redirect(new URL('/subscribe?error=processing_failed', request.url))
  }
} 