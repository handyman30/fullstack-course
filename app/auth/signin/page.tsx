'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Mail, ArrowLeft, Loader2, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { analytics } from '@/lib/mixpanel'

export default function SignIn() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })
      
      if (result?.error) {
        setError(result.error)
      } else {
        router.push(callbackUrl)
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
            <p className="text-gray-400">Sign in to access your course</p>
          </div>
          
          {/* Sign up prompt */}
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-purple-300 mb-2">
              New to DevMastery?
            </p>
            <Link 
              href="/auth/signup"
              className="inline-flex items-center space-x-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              <span>Create an account</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-xs text-purple-200 mt-2">Get 3 days free, then $25/month</p>
          </div>
          
          {/* Demo credentials info */}
          <details className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
            <summary className="text-sm text-gray-300 font-medium cursor-pointer">
              Demo Account (for testing)
            </summary>
            <div className="mt-3 space-y-1 text-sm text-gray-400">
              <p>Email: <code className="bg-gray-900 px-1 rounded">demo@example.com</code></p>
              <p>Password: <code className="bg-gray-900 px-1 rounded">demo123</code></p>
            </div>
          </details>
          
          {error && (
            <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-purple-500 text-white"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white font-semibold py-3 rounded-lg transition-all disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-300">
              ← Back to home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 