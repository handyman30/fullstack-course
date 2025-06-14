'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Shield, 
  CreditCard, 
  Check, 
  X,
  Loader2,
  Clock,
  DollarSign,
  Zap,
  ArrowLeft
} from 'lucide-react'
import Link from 'next/link'
import { analytics } from '@/lib/mixpanel'
import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe - handle missing key gracefully
const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
if (!stripePublicKey) {
  console.error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable')
}
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null

export default function SubscribePage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [checkingSubscription, setCheckingSubscription] = useState(true)
  
  // Check if user already has subscription
  useEffect(() => {
    async function checkExistingSubscription() {
      if (session) {
        try {
          const res = await fetch('/api/subscription/status')
          const data = await res.json()
          
          if (data.hasActiveSubscription) {
            // User already has subscription, redirect to dashboard
            router.push('/dashboard')
            return
          }
        } catch (error) {
          console.error('Failed to check subscription:', error)
        }
      }
      setCheckingSubscription(false)
    }
    
    checkExistingSubscription()
  }, [session, router])
  
  useEffect(() => {
    if (session?.user) {
      // Track page view - just use general event
      analytics.events.startSubscription()
    }
  }, [session])
  
  // Show loading while checking subscription status
  if (checkingSubscription && session) {
    return (
      <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
      </div>
    )
  }
  
  const handleSubscribe = async () => {
    if (!session) {
      // Track attempt without auth
      analytics.events.startSubscription()
      router.push('/auth/signin?callbackUrl=/subscribe')
      return
    }
    
    setLoading(true)
    setError('')
    
    try {
      // Track checkout start
      analytics.events.startSubscription()
      
      const response = await fetch('/api/subscription/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create subscription')
      }
      
      // Redirect to Stripe Checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (err: any) {
      console.error('Subscription error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }
  
  const features = [
    { icon: Check, text: "120+ hours of video content", included: true },
    { icon: Check, text: "50+ real-world projects", included: true },
    { icon: Check, text: "Private Discord community", included: true },
    { icon: Check, text: "Weekly live Q&A sessions", included: true },
    { icon: Check, text: "Job placement assistance", included: true },
    { icon: Check, text: "Lifetime content updates", included: true },
    { icon: Check, text: "Certificate of completion", included: true },
    { icon: Check, text: "30-day money-back guarantee", included: true },
    { icon: X, text: "Hidden fees", included: false },
    { icon: X, text: "Upsells or add-ons", included: false },
  ]
  
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </header>
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Start Your Free Trial
          </h1>
          <p className="text-xl text-gray-400">
            Get instant access to the complete DevMastery course
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
              <h2 className="text-2xl font-bold mb-6">What's Included</h2>
              
              <div className="space-y-4">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                      feature.included ? 'bg-green-900/50' : 'bg-red-900/50'
                    }`}>
                      <feature.icon className={`w-3 h-3 ${
                        feature.included ? 'text-green-400' : 'text-red-400'
                      }`} />
                    </div>
                    <span className={feature.included ? '' : 'text-gray-500 line-through'}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-gray-800">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">3,247+</div>
                    <div className="text-sm text-gray-400">Active Students</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400">4.9★</div>
                    <div className="text-sm text-gray-400">Average Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Right Column - Pricing */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-2xl p-8">
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-2 bg-green-900/30 border border-green-500/30 rounded-full px-4 py-2 mb-4">
                  <Zap className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-green-400 font-medium">LIMITED TIME OFFER</span>
                </div>
                
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-5xl font-bold">$25</span>
                  <span className="text-gray-400 ml-2">/month</span>
                </div>
                
                <p className="text-green-400 font-medium">3 days free trial</p>
                <p className="text-sm text-gray-400 mt-1">Then $25/month, cancel anytime</p>
              </div>
              
              {/* Payment Info */}
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3 text-sm">
                  <Clock className="w-4 h-4 text-purple-400" />
                  <span>Trial starts immediately after signup</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <CreditCard className="w-4 h-4 text-purple-400" />
                  <span>Secure payment via Stripe</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Shield className="w-4 h-4 text-purple-400" />
                  <span>No charges during trial period</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <DollarSign className="w-4 h-4 text-purple-400" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
              
              {/* Error Message */}
              {error && (
                <div className="mb-4 p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              )}
              
              {/* CTA Button */}
              {status === 'loading' ? (
                <button disabled className="w-full bg-gray-700 py-4 rounded-lg font-semibold">
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                </button>
              ) : session ? (
                <button
                  onClick={handleSubscribe}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 py-4 rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    'Start Your Free Trial'
                  )}
                </button>
              ) : (
                <button
                  onClick={handleSubscribe}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-4 rounded-lg font-semibold transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sign In to Start Trial
                </button>
              )}
              
              <p className="text-xs text-gray-500 text-center mt-4">
                By subscribing, you agree to our Terms of Service and Privacy Policy
              </p>
              
              {/* Secure Payment Badge */}
              <div className="mt-6 pt-6 border-t border-gray-800">
                <div className="flex items-center justify-center space-x-2 text-gray-400">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm">Powered by Stripe</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">When will I be charged?</h3>
              <p className="text-gray-400 text-sm">
                You won't be charged during your 3-day free trial. Your first payment of $25 will be processed after the trial ends.
              </p>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Can I cancel anytime?</h3>
              <p className="text-gray-400 text-sm">
                Yes! You can cancel your subscription at any time from your account settings. No questions asked.
              </p>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-400 text-sm">
                We accept all major credit and debit cards through our secure payment processor, Stripe.
              </p>
            </div>
            
            <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
              <h3 className="font-semibold mb-2">Is there a refund policy?</h3>
              <p className="text-gray-400 text-sm">
                Yes! We offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 