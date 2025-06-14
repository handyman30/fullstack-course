import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ hasActiveSubscription: false })
    }
    
    // Handle mock users
    if (session.user.id.startsWith('user-')) {
      return NextResponse.json({ 
        hasActiveSubscription: false,
        subscription: null 
      })
    }
    
    const subscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        status: { in: ['ACTIVE', 'TRIALING', 'TRIAL'] }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json({ 
      hasActiveSubscription: !!subscription,
      subscription: subscription ? {
        status: subscription.status,
        trialEndsAt: subscription.trialEndsAt?.toISOString(),
        currentPeriodEnd: subscription.currentPeriodEnd?.toISOString(),
        currentPeriodStart: subscription.currentPeriodStart?.toISOString(),
        isStripe: !!subscription.stripeSubscriptionId,
        isPayPal: !!subscription.paypalSubscriptionId,
      } : null
    })
  } catch (error) {
    console.error('Subscription status error:', error)
    return NextResponse.json({ hasActiveSubscription: false })
  }
} 