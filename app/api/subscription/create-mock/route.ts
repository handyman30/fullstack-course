import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

export async function POST() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    
    // Check if user already has an active subscription
    const existingSubscription = await prisma.subscription.findFirst({
      where: {
        userId: session.user.id,
        status: { in: ['ACTIVE', 'TRIALING'] }
      }
    })
    
    if (existingSubscription) {
      // Update to active (simulate successful payment)
      await prisma.subscription.update({
        where: { id: existingSubscription.id },
        data: { status: 'ACTIVE' }
      })
      
      return NextResponse.json({ 
        message: 'Subscription activated!',
        redirect: '/dashboard'
      })
    }
    
    // Create mock subscription
    await prisma.subscription.create({
      data: {
        userId: session.user.id,
        paypalSubscriptionId: `MOCK-${Date.now()}`,
        status: 'ACTIVE',
        currentPeriodStart: new Date(),
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        trialEndsAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      }
    })
    
    return NextResponse.json({ 
      message: 'Mock subscription created!',
      redirect: '/dashboard'
    })
    
  } catch (error) {
    console.error('Mock subscription error:', error)
    return NextResponse.json(
      { error: 'Failed to create mock subscription' },
      { status: 500 }
    )
  }
} 