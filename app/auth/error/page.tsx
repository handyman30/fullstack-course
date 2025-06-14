'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { AlertCircle, ArrowLeft } from 'lucide-react'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  
  return (
    <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8 text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Authentication Error</h1>
          <p className="text-gray-400 mb-6">
            {error === 'Configuration' 
              ? 'There was a problem with the authentication configuration.'
              : 'Something went wrong during sign in.'}
          </p>
          
          <Link
            href="/auth/signin"
            className="inline-flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Try Again</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 