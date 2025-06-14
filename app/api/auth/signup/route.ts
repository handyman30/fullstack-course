import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { USERS_DB, DEMO_USERS } from '@/lib/users-db'

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()
    
    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }
    
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 }
      )
    }
    
    // Check if user already exists (demo users or signed up users)
    const demoEmails = DEMO_USERS.map(u => u.email)
    if (demoEmails.includes(email) || USERS_DB.has(email)) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      )
    }
    
    try {
      // Try to check in database
      const existingUser = await prisma.user.findUnique({
        where: { email }
      })
      
      if (existingUser) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        )
      }
      
      // Create user in database
      const user = await prisma.user.create({
        data: {
          email,
          name,
        }
      })
      
      // Store password in memory (for demo purposes)
      USERS_DB.set(email, { email, password, name })
      
      return NextResponse.json({
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      })
    } catch (dbError) {
      console.log('Database not available, using in-memory storage')
      
      // Store in memory if database is not available
      USERS_DB.set(email, { email, password, name })
      
      return NextResponse.json({
        success: true,
        user: {
          id: `user-${Date.now()}`,
          email,
          name
        }
      })
    }
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    )
  }
} 