import mixpanel from 'mixpanel-browser'

// Your Mixpanel token
const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN || 'c8295e8750df4e6d6528bf1a4b89979b'

// Initialize Mixpanel
if (typeof window !== 'undefined' && MIXPANEL_TOKEN) {
  mixpanel.init(MIXPANEL_TOKEN, {
    debug: process.env.NODE_ENV === 'development',
    track_pageview: true,
    persistence: 'localStorage',
  })
}

// Analytics functions
export const analytics = {
  // Identify user
  identify: (userId: string, email?: string, name?: string) => {
    if (typeof window !== 'undefined') {
      mixpanel.identify(userId)
      mixpanel.people.set({
        $email: email,
        $name: name,
        $created: new Date(),
      })
    }
  },

  // Track events
  track: (event: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      mixpanel.track(event, {
        ...properties,
        timestamp: new Date(),
      })
    }
  },

  // Track page views
  pageView: (pageName: string, properties?: Record<string, any>) => {
    analytics.track('Page View', {
      page: pageName,
      ...properties,
    })
  },

  // Pre-defined events for the course platform
  events: {
    // Landing page
    viewLanding: () => analytics.track('View Landing Page'),
    clickStartTrial: (location: string) => analytics.track('Click Start Trial', { location }),
    
    // Authentication
    signIn: (method: string) => analytics.track('Sign In', { method }),
    signUp: (method: string) => analytics.track('Sign Up', { method }),
    signOut: () => analytics.track('Sign Out'),
    
    // Subscription
    startSubscription: () => analytics.track('Start Subscription'),
    completeSubscription: (planId: string) => analytics.track('Complete Subscription', { 
      plan_id: planId,
      value: 25,
      currency: 'USD'
    }),
    cancelSubscription: () => analytics.track('Cancel Subscription'),
    
    // Course activity
    viewCourse: () => analytics.track('View Course Dashboard'),
    startLesson: (lessonTitle: string, moduleTitle: string) => analytics.track('Start Lesson', {
      lesson: lessonTitle,
      module: moduleTitle,
    }),
    completeLesson: (lessonTitle: string, moduleTitle: string, duration: number) => analytics.track('Complete Lesson', {
      lesson: lessonTitle,
      module: moduleTitle,
      duration_seconds: duration,
    }),
    
    // Video engagement
    playVideo: (lessonTitle: string) => analytics.track('Play Video', { lesson: lessonTitle }),
    pauseVideo: (lessonTitle: string, progress: number) => analytics.track('Pause Video', { 
      lesson: lessonTitle,
      progress_percent: progress 
    }),
    completeVideo: (lessonTitle: string) => analytics.track('Complete Video', { lesson: lessonTitle }),
    
    // Conversion funnel
    viewPricing: () => analytics.track('View Pricing'),
    clickSubscribe: () => analytics.track('Click Subscribe Button'),
    abandonCheckout: () => analytics.track('Abandon Checkout'),
  },

  // Revenue tracking
  trackRevenue: (amount: number, type: 'trial_start' | 'subscription' | 'renewal') => {
    mixpanel.people.track_charge(amount)
    analytics.track('Revenue', {
      amount,
      type,
      currency: 'USD',
    })
  },

  // User properties
  setUserProperties: (properties: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      mixpanel.people.set(properties)
    }
  },

  // Track time on page
  timeEvent: (eventName: string) => {
    if (typeof window !== 'undefined') {
      mixpanel.time_event(eventName)
    }
  },
} 