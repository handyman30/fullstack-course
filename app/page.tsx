'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  Code2, 
  Sparkles, 
  Users, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Star,
  TrendingUp,
  BookOpen,
  Rocket,
  Shield,
  CreditCard,
  MessageCircle,
  Zap
} from 'lucide-react'

export default function Home() {
  const [timeLeft, setTimeLeft] = useState(259200) // 3 days in seconds
  const [studentCount, setStudentCount] = useState(3247)
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)
    
    // Simulate growing student count
    const studentTimer = setInterval(() => {
      setStudentCount((prev) => prev + Math.floor(Math.random() * 3))
    }, 30000) // Every 30 seconds
    
    return () => {
      clearInterval(timer)
      clearInterval(studentTimer)
    }
  }, [])
  
  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return { days, hours, minutes, secs }
  }
  
  const { days, hours, minutes, secs } = formatTime(timeLeft)
  
  return (
    <main className="bg-gray-950 text-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-gray-900 to-blue-900/20" />
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-700" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          {/* Navigation */}
          <nav className="flex justify-between items-center mb-16">
            <div className="flex items-center space-x-2">
              <Code2 className="w-8 h-8 text-purple-400" />
              <span className="text-xl font-bold">DevMastery</span>
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 px-6 py-2 rounded-full font-medium transition-colors">
              Start Free Trial
            </button>
          </nav>
          
          {/* Hero Content */}
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <span className="inline-flex items-center space-x-2 bg-purple-900/30 border border-purple-700/50 rounded-full px-4 py-2 text-sm">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>{studentCount.toLocaleString()} students already enrolled</span>
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
            >
              From Zero to Full-Stack Developer
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-300 mb-8"
            >
              Master Design, Frontend, Backend & Database in one complete journey.
              <br />
              <span className="text-lg text-gray-400">The only course you'll ever need.</span>
            </motion.p>
            
            {/* CTA with Timer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Timer */}
              <div className="flex justify-center space-x-4 mb-6">
                {[
                  { value: days, label: 'Days' },
                  { value: hours, label: 'Hours' },
                  { value: minutes, label: 'Minutes' },
                  { value: secs, label: 'Seconds' }
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-900/50 backdrop-blur border border-gray-800 rounded-lg p-3">
                    <div className="text-2xl font-bold text-purple-400">{item.value.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-gray-500">{item.label}</div>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                  <span>Start Your Free Trial</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-2 text-gray-400">
                  <Shield className="w-5 h-5" />
                  <span>No payment required for 3 days</span>
                </div>
              </div>
              
              {/* Trust Badges */}
              <div className="flex items-center justify-center space-x-8 mt-8">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                  <span className="ml-2 text-gray-400">4.9/5 rating</span>
                </div>
                <div className="text-gray-400">
                  <span className="text-white font-semibold">92%</span> job placement rate
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Learning Paths Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Journey</h2>
            <p className="text-xl text-gray-400">Tailored learning paths for every ambition</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "School Students",
                subtitle: "Build Your Foundation",
                description: "Start from scratch with visual learning and fun projects",
                icon: BookOpen,
                color: "purple",
                features: ["Beginner-friendly pace", "Interactive exercises", "Build games & apps"]
              },
              {
                title: "University Students",
                subtitle: "Become Industry-Ready",
                description: "Bridge the gap between theory and real-world development",
                icon: TrendingUp,
                color: "blue",
                features: ["Industry best practices", "Portfolio projects", "Interview preparation"]
              },
              {
                title: "Career Switchers",
                subtitle: "Fast-Track Your Future",
                description: "Intensive path to land your first developer job",
                icon: Rocket,
                color: "green",
                features: ["Accelerated learning", "Job guarantee", "1-on-1 mentorship"]
              }
            ].map((path, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={cn(
                  "relative group cursor-pointer",
                  "bg-gradient-to-br from-gray-900 to-gray-800",
                  "border border-gray-700 rounded-2xl p-8",
                  "hover:border-opacity-50 transition-all duration-300"
                )}
                style={{
                  borderColor: path.color === 'purple' ? 'rgb(147, 51, 234)' : 
                               path.color === 'blue' ? 'rgb(59, 130, 246)' : 
                               'rgb(34, 197, 94)'
                }}
              >
                <div className={cn(
                  "w-12 h-12 rounded-lg flex items-center justify-center mb-6",
                  path.color === 'purple' && "bg-purple-900/50",
                  path.color === 'blue' && "bg-blue-900/50",
                  path.color === 'green' && "bg-green-900/50"
                )}>
                  <path.icon className={cn(
                    "w-6 h-6",
                    path.color === 'purple' && "text-purple-400",
                    path.color === 'blue' && "text-blue-400",
                    path.color === 'green' && "text-green-400"
                  )} />
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{path.title}</h3>
                <p className={cn(
                  "font-medium mb-4",
                  path.color === 'purple' && "text-purple-400",
                  path.color === 'blue' && "text-blue-400",
                  path.color === 'green' && "text-green-400"
                )}>{path.subtitle}</p>
                <p className="text-gray-400 mb-6">{path.description}</p>
                
                <ul className="space-y-2">
                  {path.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2 text-gray-300">
                      <CheckCircle2 className="w-4 h-4 text-gray-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* What You'll Build Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Build Real Projects</h2>
            <p className="text-xl text-gray-400">Create production-ready applications from day one</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: "E-commerce Platform", tech: "Next.js + Stripe", weeks: "Week 4-6" },
              { name: "Social Media App", tech: "React + Node.js", weeks: "Week 7-9" },
              { name: "SaaS Dashboard", tech: "Full-Stack + Analytics", weeks: "Week 10-12" },
              { name: "Real-time Chat App", tech: "WebSockets + Redis", weeks: "Week 13-14" },
              { name: "AI-Powered Tool", tech: "OpenAI + Vector DB", weeks: "Week 15-16" },
              { name: "Your Dream Project", tech: "Everything you learned", weeks: "Final Month" }
            ].map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 hover:border-purple-700/50 transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <span className="text-xs text-purple-400 bg-purple-900/30 px-2 py-1 rounded">{project.weeks}</span>
                </div>
                <p className="text-gray-400 text-sm">{project.tech}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Social Proof Section */}
      <section className="py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p className="text-xl text-gray-400">Join thousands who transformed their careers</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Chen",
                role: "From Teacher to Senior Developer",
                company: "Google",
                salary: "$120k → $180k",
                image: "👩‍💻",
                quote: "The structured approach and real projects made all the difference. I landed my dream job in just 6 months!"
              },
              {
                name: "Marcus Johnson",
                role: "Student to Full-Stack Engineer",
                company: "Spotify",
                salary: "Intern → $130k",
                image: "👨‍💻",
                quote: "As a CS student, this course filled all the gaps my university couldn't. The mentorship was invaluable."
              },
              {
                name: "Priya Patel",
                role: "Designer to Technical Lead",
                company: "Startup Founder",
                salary: "$60k → $200k+",
                image: "👩‍💼",
                quote: "Understanding the full stack empowered me to build my own products. Now I run a team of 10!"
              }
            ].map((story, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gray-900 border border-gray-800 rounded-xl p-6"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="text-4xl">{story.image}</div>
                  <div>
                    <h3 className="font-semibold">{story.name}</h3>
                    <p className="text-sm text-gray-400">{story.role}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-purple-400 font-medium">{story.company}</span>
                  <span className="text-green-400 text-sm font-medium">{story.salary}</span>
                </div>
                <p className="text-gray-300 italic">"{story.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-700/50 rounded-3xl p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your Journey Today</h2>
              <p className="text-xl text-gray-400">One price, lifetime access, unlimited possibilities</p>
            </div>
            
            <div className="bg-gray-900/50 rounded-2xl p-8 mb-8">
              <div className="flex items-end justify-center mb-6">
                <span className="text-5xl font-bold">$25</span>
                <span className="text-gray-400 ml-2">/month</span>
              </div>
              
              <div className="space-y-4 mb-8">
                {[
                  "120+ hours of video content",
                  "50+ real-world projects",
                  "Private Discord community",
                  "Weekly live mentorship sessions",
                  "Job placement assistance",
                  "Lifetime updates",
                  "Certificate of completion",
                  "30-day money-back guarantee"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 rounded-full text-lg transition-all transform hover:scale-105">
                Start 3-Day Free Trial
              </button>
              
              <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-gray-400">
                <div className="flex items-center space-x-2">
                  <CreditCard className="w-4 h-4" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4" />
                  <span>Cancel anytime</span>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 mb-2">Questions? We're here to help</p>
              <button className="flex items-center space-x-2 mx-auto text-purple-400 hover:text-purple-300 transition-colors">
                <MessageCircle className="w-5 h-5" />
                <span>Chat with us</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-t from-purple-900/20 to-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              Your future in tech starts with one click
            </h2>
            <p className="text-xl text-gray-400">
              Join {studentCount.toLocaleString()} students already building their dream careers
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all transform hover:scale-105 inline-flex items-center space-x-2">
              <Zap className="w-5 h-5" />
              <span>Start Learning Now</span>
            </button>
            <p className="text-sm text-gray-500">
              Average time to first job: 4 months • No experience required
            </p>
          </motion.div>
        </div>
      </section>
    </main>
  )
} 