import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'
import { USERS_DB, DEMO_USERS } from '@/lib/users-db'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    // Email/Password authentication
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please enter email and password')
        }
        
        // First check demo users
        const demoUser = DEMO_USERS.find(
          user => user.email === credentials.email && user.password === credentials.password
        )
        
        if (demoUser) {
          try {
            // Find or create demo user in database
            let user = await prisma.user.findUnique({
              where: { email: demoUser.email }
            })
            
            if (!user) {
              user = await prisma.user.create({
                data: {
                  email: demoUser.email,
                  name: demoUser.name,
                }
              })
            }
            
            return {
              id: user.id,
              email: user.email,
              name: user.name,
              image: user.image
            }
          } catch (error) {
            // Return demo user if database is not available
            return {
              id: `demo-${Date.now()}`,
              email: demoUser.email,
              name: demoUser.name,
              image: null
            }
          }
        }
        
        // Check signed up users
        const signedUpUser = USERS_DB.get(credentials.email)
        if (signedUpUser && signedUpUser.password === credentials.password) {
          try {
            // Get user from database
            const user = await prisma.user.findUnique({
              where: { email: signedUpUser.email }
            })
            
            if (user) {
              return {
                id: user.id,
                email: user.email,
                name: user.name,
                image: user.image
              }
            }
          } catch (error) {
            console.log('Database error, using in-memory user')
          }
          
          // Return in-memory user if database fails
          return {
            id: `user-${Date.now()}`,
            email: signedUpUser.email,
            name: signedUpUser.name,
            image: null
          }
        }
        
        throw new Error('Invalid email or password')
      }
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub!
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
} 