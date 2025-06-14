'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Code2, 
  Sparkles, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Star,
  Rocket,
  Database,
  Palette,
  Server,
  Monitor,
  DollarSign,
  Timer,
  Trophy,
  Zap,
  Shield,
  MessageCircle,
  CreditCard
} from 'lucide-react'
import Link from 'next/link'
import { analytics } from '@/lib/mixpanel'
import { useCountdownTimer } from '@/lib/useCountdownTimer'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { timeLeft, isExpired } = useCountdownTimer()
  const { data: session, status } = useSession()
  const router = useRouter()
  const [hasSubscription, setHasSubscription] = useState(false)
  
  // Generate initial student count based on current date
  const getInitialStudentCount = () => {
    const today = new Date()
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24))
    // Base count 3000 + up to 500 based on day of year + some randomness
    return 3000 + (dayOfYear * 2) + Math.floor(Math.random() * 100)
  }
  
  const [studentCount, setStudentCount] = useState(getInitialStudentCount())
  
  useEffect(() => {
    // Track landing page view
    analytics.events.viewLanding()
    
    // Student count animation - increment slowly
    const studentTimer = setInterval(() => {
      setStudentCount(prev => prev + Math.floor(Math.random() * 3) + 1)
    }, 30000) // Every 30 seconds
    
    return () => {
      clearInterval(studentTimer)
    }
  }, [])
  
  // Check subscription status when authenticated
  useEffect(() => {
    async function checkSubscription() {
      if (session) {
        try {
          const res = await fetch('/api/subscription/status')
          const data = await res.json()
          setHasSubscription(data.hasActiveSubscription)
        } catch (error) {
          console.error('Failed to check subscription:', error)
        }
      }
    }
    
    checkSubscription()
  }, [session])
  
  // Determine which CTA to show
  const getCtaButton = (location: string) => {
    if (status === 'loading') {
      return (
        <button className="bg-gray-700 px-6 py-2 rounded-full font-medium opacity-50 cursor-wait">
          Loading...
        </button>
      )
    }
    
    if (session && hasSubscription) {
      // User is logged in and has subscription
      return (
        <Link href="/dashboard">
          <button 
            onClick={() => analytics.events.clickStartTrial(location)}
            className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full font-medium transition-all hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Go to Dashboard</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      )
    } else if (session && !hasSubscription) {
      // User is logged in but no subscription
      return (
        <Link href="/subscribe">
          <button 
            onClick={() => analytics.events.clickStartTrial(location)}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-medium transition-all hover:scale-105 inline-flex items-center space-x-2"
          >
            <span>Start Free Trial</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </Link>
      )
    } else {
      // User is not logged in - show sign up as primary CTA
      if (location === 'header') {
        // Header shows both options
        return (
          <div className="flex items-center space-x-3">
            <Link href="/auth/signin">
              <button className="text-gray-300 hover:text-white font-medium transition-colors">
                Sign In
              </button>
            </Link>
            <Link href="/auth/signup">
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-medium transition-all hover:scale-105">
                Start Free Trial
              </button>
            </Link>
          </div>
        )
      } else {
        // Other locations show sign up
        return (
          <Link href="/auth/signup">
            <button 
              onClick={() => analytics.events.clickStartTrial(location)}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-medium transition-all hover:scale-105 inline-flex items-center space-x-2"
            >
              <span>Start Free Trial</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
        )
      }
    }
  }
  
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-gray-950/80 backdrop-blur-lg z-50 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Code2 className="w-8 h-8 text-purple-500" />
              <span className="text-xl font-bold">DevMastery</span>
            </div>
            <div className="flex items-center space-x-4">
              {session && (
                <span className="text-sm text-gray-400">
                  Hi, {session.user?.name || session.user?.email}
                </span>
              )}
              {getCtaButton('header')}
            </div>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse delay-700" />
        </div>
        
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-purple-900/30 border border-purple-500/30 rounded-full px-4 py-2 mb-8">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm">{studentCount.toLocaleString()} students already learning</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Master Full-Stack
              </span>
              <br />
              <span className="text-white">Development</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Learn Design, Frontend, Backend & Database from scratch. 
              The complete path to becoming a professional developer.
            </p>
            
            {/* Timer - Only show if not subscribed */}
            {!hasSubscription && (
              <div className="mb-8">
                <p className="text-sm text-gray-400 mb-4">
                  {isExpired ? '🎉 New offer just started!' : '⏰ Limited time offer ends in:'}
                </p>
                <div className="flex justify-center space-x-4">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                    <div className="text-3xl font-bold text-purple-400">{timeLeft.days}</div>
                    <div className="text-sm text-gray-400">Days</div>
                  </div>
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                    <div className="text-3xl font-bold text-purple-400">{String(timeLeft.hours).padStart(2, '0')}</div>
                    <div className="text-sm text-gray-400">Hours</div>
                  </div>
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                    <div className="text-3xl font-bold text-purple-400">{String(timeLeft.minutes).padStart(2, '0')}</div>
                    <div className="text-sm text-gray-400">Minutes</div>
                  </div>
                  <div className="bg-gray-900 border border-gray-800 rounded-lg p-4">
                    <div className="text-3xl font-bold text-purple-400">{String(timeLeft.seconds).padStart(2, '0')}</div>
                    <div className="text-sm text-gray-400">Seconds</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* CTA */}
            <div className="mb-4">
              {session && hasSubscription ? (
                <Link href="/dashboard">
                  <motion.button
                    onClick={() => analytics.events.clickStartTrial('hero')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-full text-lg inline-flex items-center space-x-2"
                  >
                    <span>Continue Learning</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              ) : session && !hasSubscription ? (
                <Link href="/subscribe">
                  <motion.button
                    onClick={() => analytics.events.clickStartTrial('hero')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg inline-flex items-center space-x-2"
                  >
                    <span>Start Your 3-Day Free Trial</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/auth/signup">
                    <motion.button
                      onClick={() => analytics.events.clickStartTrial('hero')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg inline-flex items-center space-x-2"
                    >
                      <span>Start Your 3-Day Free Trial</span>
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </Link>
                  <Link href="/auth/signin">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-8 rounded-full text-lg border border-gray-700"
                    >
                      <span>Sign In</span>
                    </motion.button>
                  </Link>
                </div>
              )}
            </div>
            
            {/* Show different info based on status */}
            {session && hasSubscription ? (
              <div className="flex items-center justify-center space-x-6 text-gray-400">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Active Subscription</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Full access to all content</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-6 text-gray-400">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Payment info required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
      
      {/* What You'll Learn */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Everything You Need to Know</h2>
            <p className="text-xl text-gray-400">Master all aspects of modern web development</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Palette, title: "Design", desc: "UI/UX, Figma, Design Systems", color: "purple" },
              { icon: Monitor, title: "Frontend", desc: "React, Next.js, TypeScript", color: "blue" },
              { icon: Server, title: "Backend", desc: "Node.js, APIs, Authentication", color: "green" },
              { icon: Database, title: "Database", desc: "PostgreSQL, MongoDB, Redis", color: "orange" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                  item.color === 'purple' ? 'bg-purple-900/50' :
                  item.color === 'blue' ? 'bg-blue-900/50' :
                  item.color === 'green' ? 'bg-green-900/50' :
                  'bg-orange-900/50'
                }`}>
                  <item.icon className={`w-6 h-6 ${
                    item.color === 'purple' ? 'text-purple-400' :
                    item.color === 'blue' ? 'text-blue-400' :
                    item.color === 'green' ? 'text-green-400' :
                    'text-orange-400'
                  }`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Course Preview Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
              initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Course Curriculum</h2>
            <p className="text-xl text-gray-400">120+ hours of hands-on learning</p>
          </motion.div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Module 1: Design Fundamentals */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-purple-900/50 rounded-lg flex items-center justify-center">
                  <Palette className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="text-2xl font-bold">Module 1: Design Fundamentals</h3>
              </div>
              
              <div className="space-y-3">
                {[
                  { num: "01", title: "Introduction to UI/UX Design", duration: "45m", free: true },
                  { num: "02", title: "Design Principles & Color Theory", duration: "1h 20m", free: true },
                  { num: "03", title: "Figma Masterclass", duration: "2h 30m", free: true },
                  { num: "04", title: "Creating Design Systems", duration: "1h 45m" },
                  { num: "05", title: "Responsive Design Patterns", duration: "1h 30m" },
                  { num: "06", title: "User Research & Testing", duration: "2h" }
                ].map((lesson: { num: string; title: string; duration: string; free?: boolean }) => (
                  <div key={lesson.num} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500 font-mono text-sm">{lesson.num}</span>
                      <span className="font-medium">{lesson.title}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {lesson.free && (
                        <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">free</span>
                      )}
                      <span className="text-gray-400 text-sm">{lesson.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Module 2: Frontend Development */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-blue-900/50 rounded-lg flex items-center justify-center">
                  <Monitor className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold">Module 2: Frontend Development</h3>
              </div>
              
              <div className="space-y-3">
                {[
                  { num: "07", title: "HTML5 & Semantic Markup", duration: "1h 30m", free: true },
                  { num: "08", title: "CSS3 & Modern Layouts", duration: "2h 45m", free: true },
                  { num: "09", title: "JavaScript ES6+ Fundamentals", duration: "3h 20m" },
                  { num: "10", title: "React.js Deep Dive", duration: "4h 30m" },
                  { num: "11", title: "Next.js & Server Components", duration: "3h 15m" },
                  { num: "12", title: "State Management & Performance", duration: "2h 30m" }
                ].map((lesson: { num: string; title: string; duration: string; free?: boolean }) => (
                  <div key={lesson.num} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500 font-mono text-sm">{lesson.num}</span>
                      <span className="font-medium">{lesson.title}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {lesson.free && (
                        <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">free</span>
                      )}
                      <span className="text-gray-400 text-sm">{lesson.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Module 3: Backend Development */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-green-900/50 rounded-lg flex items-center justify-center">
                  <Server className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-2xl font-bold">Module 3: Backend Development</h3>
              </div>
              
              <div className="space-y-3">
                {[
                  { num: "13", title: "Node.js & Express.js Basics", duration: "2h 15m" },
                  { num: "14", title: "RESTful API Design", duration: "2h 30m" },
                  { num: "15", title: "Authentication & Authorization", duration: "3h" },
                  { num: "16", title: "WebSockets & Real-time Apps", duration: "2h 45m" },
                  { num: "17", title: "Microservices Architecture", duration: "3h 30m" },
                  { num: "18", title: "Testing & CI/CD", duration: "2h 20m" }
                ].map((lesson: { num: string; title: string; duration: string; free?: boolean }) => (
                  <div key={lesson.num} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500 font-mono text-sm">{lesson.num}</span>
                      <span className="font-medium">{lesson.title}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {lesson.free && (
                        <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">free</span>
                      )}
                      <span className="text-gray-400 text-sm">{lesson.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            {/* Module 4: Database & Deployment */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-900 border border-gray-800 rounded-2xl p-6"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-orange-900/50 rounded-lg flex items-center justify-center">
                  <Database className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold">Module 4: Database & Deployment</h3>
              </div>
              
              <div className="space-y-3">
                {[
                  { num: "19", title: "SQL & PostgreSQL Fundamentals", duration: "2h 30m" },
                  { num: "20", title: "MongoDB & NoSQL Databases", duration: "2h 15m" },
                  { num: "21", title: "Redis & Caching Strategies", duration: "1h 45m" },
                  { num: "22", title: "Database Design & Optimization", duration: "2h 30m" },
                  { num: "23", title: "Cloud Deployment (AWS/Vercel)", duration: "3h" },
                  { num: "24", title: "DevOps & Monitoring", duration: "2h 45m" }
                ].map((lesson: { num: string; title: string; duration: string; free?: boolean }) => (
                  <div key={lesson.num} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-500 font-mono text-sm">{lesson.num}</span>
                      <span className="font-medium">{lesson.title}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {lesson.free && (
                        <span className="text-xs bg-green-900/30 text-green-400 px-2 py-1 rounded">free</span>
                      )}
                      <span className="text-gray-400 text-sm">{lesson.duration}</span>
                    </div>
                </div>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center space-x-2 bg-purple-900/20 border border-purple-500/30 rounded-full px-6 py-3">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="font-medium">Plus 10+ bonus modules on AI, Web3, and Career Development</span>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Projects Showcase Section */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Build Real-World Projects</h2>
            <p className="text-xl text-gray-400">From simple apps to complex systems - learn by building</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                description: "Full-featured online store with cart, payments, and admin panel",
                tech: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
                timeline: "Weeks 4-6",
                difficulty: "Intermediate",
                image: "🛍️"
              },
              {
                title: "Social Media Dashboard", 
                description: "Real-time social platform with posts, comments, and live chat",
                tech: ["React", "Node.js", "Socket.io", "MongoDB"],
                timeline: "Weeks 7-9",
                difficulty: "Advanced",
                image: "💬"
              },
              {
                title: "SaaS Analytics Tool",
                description: "Data visualization dashboard with charts and user analytics",
                tech: ["TypeScript", "D3.js", "Express", "Redis"],
                timeline: "Weeks 10-12",
                difficulty: "Advanced",
                image: "📊"
              },
              {
                title: "AI-Powered Blog",
                description: "CMS with AI content generation and SEO optimization",
                tech: ["Next.js", "OpenAI", "Prisma", "Vercel"],
                timeline: "Weeks 13-14",
                difficulty: "Advanced",
                image: "🤖"
              },
              {
                title: "Video Streaming App",
                description: "Netflix-clone with video upload, streaming, and recommendations",
                tech: ["React", "AWS S3", "Node.js", "FFmpeg"],
                timeline: "Weeks 15-16",
                difficulty: "Expert",
                image: "🎬"
              },
              {
                title: "Your Dream Project",
                description: "Apply everything you've learned to build your own startup idea",
                tech: ["Full Stack", "Your Choice", "Best Practices"],
                timeline: "Final Month",
                difficulty: "Capstone",
                image: "🚀"
              }
            ].map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all group"
              >
                <div className="p-8">
                  <div className="text-5xl mb-4">{project.image}</div>
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-purple-400 font-medium">{project.timeline}</span>
                    <span className={`font-medium ${
                      project.difficulty === 'Intermediate' ? 'text-yellow-400' :
                      project.difficulty === 'Advanced' ? 'text-orange-400' :
                      project.difficulty === 'Expert' ? 'text-red-400' :
                      project.difficulty === 'Capstone' ? 'text-purple-400' :
                      'text-green-400'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Instructor Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-3xl p-8 md:p-12"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Learn from Industry Experts</h2>
                <p className="text-lg text-gray-300 mb-6">
                  Our instructors bring 15+ years of combined experience from top tech companies. 
                  They've built products used by millions and now they're here to share their knowledge with you.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Senior engineers from FAANG companies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Startup founders and CTOs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Open source contributors</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>Published authors and speakers</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex -space-x-2">
                    {["👨‍💻", "👩‍💻", "👨‍🏫", "👩‍🏫"].map((emoji, i) => (
                      <div key={i} className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center border-2 border-gray-900 text-2xl">
                        {emoji}
                      </div>
                    ))}
                  </div>
                  <span className="text-gray-400">+ 10 more instructors</span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">15+</div>
                  <div className="text-gray-400">Years Experience</div>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">50k+</div>
                  <div className="text-gray-400">Students Taught</div>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">100+</div>
                  <div className="text-gray-400">Courses Created</div>
                </div>
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">4.9★</div>
                  <div className="text-gray-400">Average Rating</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Company Logos Section */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <p className="text-gray-400 mb-8">Our graduates now work at</p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-50">
              {[
                { name: "Google", icon: "🔍" },
                { name: "Meta", icon: "📘" },
                { name: "Amazon", icon: "📦" },
                { name: "Microsoft", icon: "🪟" },
                { name: "Apple", icon: "🍎" },
                { name: "Netflix", icon: "🎬" },
                { name: "Spotify", icon: "🎵" },
                { name: "Uber", icon: "🚗" }
              ].map((company, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center space-x-2 text-gray-400"
                >
                  <span className="text-2xl">{company.icon}</span>
                  <span className="text-xl font-semibold">{company.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          </div>
      </section>
      
      {/* Who This Is For */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Perfect For Every Journey</h2>
            <p className="text-xl text-gray-400">Tailored paths for your specific goals</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "School Students",
                desc: "Start coding with fun projects and build a strong foundation",
                features: ["Beginner-friendly", "Visual learning", "Build games & apps"],
                icon: "🎓"
              },
              {
                title: "University Students", 
                desc: "Bridge the gap between academic theory and industry practice",
                features: ["Industry standards", "Real projects", "Interview prep"],
                icon: "🎯"
              },
              {
                title: "Career Switchers",
                desc: "Fast-track your transition into a tech career",
                features: ["Accelerated path", "Job guarantee", "1-on-1 mentorship"],
                icon: "🚀"
              }
            ].map((path, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all"
              >
                <div className="text-4xl mb-4">{path.icon}</div>
                <h3 className="text-2xl font-bold mb-3">{path.title}</h3>
                <p className="text-gray-400 mb-6">{path.desc}</p>
                <ul className="space-y-2">
                  {path.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Success Stories */}
      <section className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Real Success Stories</h2>
            <p className="text-xl text-gray-400">Join thousands who transformed their careers</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah Chen",
                role: "Teacher → Senior Developer",
                company: "Google",
                quote: "The structured approach made all the difference!",
                image: "👩‍💻"
              },
              {
                name: "Marcus Johnson",
                role: "Student → Full-Stack Engineer", 
                company: "Spotify",
                quote: "This course filled all the gaps my university couldn't.",
                image: "👨‍💻"
              },
              {
                name: "Priya Patel",
                role: "Designer → Technical Lead",
                company: "Startup Founder",
                quote: "Now I run a team of 10 developers!",
                image: "👩‍💼"
              }
            ].map((story, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <span className="text-3xl">{story.image}</span>
                  <div>
                    <h4 className="font-semibold">{story.name}</h4>
                    <p className="text-sm text-gray-400">{story.role}</p>
                  </div>
                </div>
                <p className="text-purple-400 font-medium mb-2">{story.company}</p>
                <p className="text-gray-300 italic">"{story.quote}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-3xl p-8 md:p-12"
          >
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-xl text-gray-400">Everything you need to become a developer</p>
            </div>
            
            <div className="bg-gray-900/50 rounded-2xl p-8 mb-8">
              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                <span className="text-5xl font-bold">$25</span>
                <span className="text-gray-400 ml-2">/month</span>
                </div>
                <p className="text-green-400 mt-2">3 days free trial</p>
                <p className="text-sm text-gray-400 mt-1">Then $25/month, billed monthly</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  "120+ hours of content",
                  "50+ real projects",
                  "Private Discord community",
                  "Weekly live sessions",
                  "Job placement help",
                  "Lifetime updates",
                  "Certificate of completion",
                  "30-day money-back guarantee"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              {session && hasSubscription ? (
                <Link href="/dashboard">
                  <motion.button
                    onClick={() => analytics.events.clickStartTrial('pricing')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 rounded-full text-lg"
                  >
                    Go to Dashboard
                  </motion.button>
                </Link>
              ) : (
                <Link href={session ? "/subscribe" : "/auth/signup"}>
                  <motion.button
                    onClick={() => analytics.events.clickStartTrial('pricing')}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-full text-lg"
                  >
                    Start Your Free Trial Now
                  </motion.button>
                </Link>
              )}
              
              <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Secure payment via Stripe</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Timer className="w-4 h-4" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 mb-2">Questions? We're here to help</p>
              <button className="text-purple-400 hover:text-purple-300 inline-flex items-center space-x-2">
                <MessageCircle className="w-5 h-5" />
                <span>Chat with support</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 px-4 bg-gradient-to-t from-purple-900/10 to-transparent">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Join {studentCount.toLocaleString()} students building their dream careers
          </p>
          {session && hasSubscription ? (
            <Link href="/dashboard">
              <motion.button
                onClick={() => analytics.events.clickStartTrial('footer')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold py-4 px-8 rounded-full text-lg inline-flex items-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Continue Learning</span>
              </motion.button>
            </Link>
          ) : (
            <Link href={session ? "/subscribe" : "/auth/signup"}>
              <motion.button
                onClick={() => analytics.events.clickStartTrial('footer')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg inline-flex items-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Start Learning Today</span>
              </motion.button>
            </Link>
          )}
          <p className="text-sm text-gray-500 mt-4">
            Average time to first job: 4 months • 92% job placement rate
          </p>
        </motion.div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 DevMastery. Built with ❤️ for aspiring developers.</p>
        </div>
      </footer>
    </div>
  )
} 