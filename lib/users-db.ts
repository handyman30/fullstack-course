// Shared in-memory user storage for demo purposes
// In production, use a proper database with hashed passwords

interface StoredUser {
  email: string
  password: string
  name: string
}

// Global singleton for user storage
const globalForUsers = global as unknown as { users: Map<string, StoredUser> }

// Ensure we use the same instance across hot reloads in development
export const USERS_DB = globalForUsers.users || new Map<string, StoredUser>()

if (process.env.NODE_ENV !== 'production') {
  globalForUsers.users = USERS_DB
}

// Demo users
export const DEMO_USERS = [
  {
    email: 'demo@example.com',
    password: 'demo123',
    name: 'Demo User'
  },
  {
    email: 'test@example.com',
    password: 'test123',
    name: 'Test User'
  }
] 