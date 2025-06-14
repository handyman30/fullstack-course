'use client'

import { useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import { motion } from 'framer-motion'
import { 
  PlayCircle, 
  Lock, 
  CheckCircle, 
  Clock,
  LogOut,
  User,
  Sparkles,
  AlertCircle,
  CreditCard,
  Calendar,
  BookOpen,
  Code,
  FileText,
  Download,
  ChevronRight
} from 'lucide-react'
import { signOut } from 'next-auth/react'
import { analytics } from '@/lib/mixpanel'

interface Lesson {
  id: string
  order: number
  title: string
  description: string
  duration: string
  isFree: boolean
}

interface Module {
  id: string
  order: number
  title: string
  description: string
  icon: string
  color: string
  lessons: Lesson[]
}

interface SubscriptionInfo {
  status: string
  trialEndsAt?: string
  currentPeriodEnd?: string
}

// Function to get lesson-specific content
const getLessonContent = (lesson: Lesson, module: Module) => {
  // Design module content
  if (module.order === 1) {
    if (lesson.order === 1) {
      // Introduction to UI/UX Design
      return {
        whatYouLearn: [
          'What makes a design "good" - the 10 principles of good design',
          'The difference between UI (User Interface) and UX (User Experience)',
          'How users think: cognitive load, mental models, and design patterns',
          'The design process: Research → Ideate → Prototype → Test → Iterate'
        ],
        overview: 'Good design is invisible. When something is designed well, users don\'t think about it - they just use it. We\'ll explore what separates great design from mediocre design, including principles like consistency, feedback, affordance, and mapping.',
        codeExample: `/* What Makes Good Design? */

1. VISIBILITY - Can users see what they can do?
   ✅ Good: Clear navigation, visible buttons
   ❌ Bad: Hidden menus, mystery meat navigation

2. FEEDBACK - Does the system respond to actions?
   ✅ Good: Loading states, success messages
   ❌ Bad: No response after clicking

3. CONSISTENCY - Do similar things work similarly?
   ✅ Good: All buttons look/act the same
   ❌ Bad: Different styles for same actions

4. AFFORDANCE - Is it clear what things do?
   ✅ Good: Buttons look clickable
   ❌ Bad: Flat design with no visual cues

/* Example: Good vs Bad Button Design */
// ❌ Bad - No visual feedback
<button style="background: none; border: none;">
  Click me
</button>

// ✅ Good - Clear affordance and states
<button style="
  background: #6366F1;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
">
  Click me
</button>`
      }
    } else if (lesson.order === 2) {
      // Design Principles & Color Theory
      return {
        whatYouLearn: [
          'Color theory: RGB vs HSL, color harmonies, and emotional impact',
          'Typography: Font pairing, hierarchy, and readability',
          'Layout principles: Grid systems, white space, and visual flow',
          'Contrast and accessibility: WCAG guidelines and color ratios'
        ],
        overview: 'Color can make or break a design. We\'ll explore how colors work together, why some combinations feel harmonious while others clash, and how to use color to guide attention and evoke emotions.',
        codeExample: `/* COLOR THEORY & GOOD VS BAD PRACTICES */

/* Color Harmonies - Use These Formulas */

// 1. COMPLEMENTARY (High Contrast)
Primary: #6366F1 (Indigo)
Complementary: #F16366 (Red) - 180° opposite

// 2. TRIADIC (Balanced & Vibrant)
Primary: #6366F1
Triadic 1: #F1E963 (+120°)
Triadic 2: #63F1E9 (+240°)

// 3. ANALOGOUS (Harmonious)
Primary: #6366F1
Analogous 1: #8B66F1 (+30°)
Analogous 2: #6388F1 (-30°)

/* ❌ BAD Color Choices */
.bad-design {
  /* Poor contrast */
  color: #777;
  background: #888;
  
  /* Vibrating colors */
  color: #FF0000;
  background: #00FF00;
  
  /* Too many colors */
  --color-1: #FF5733;
  --color-2: #33FF57;
  --color-3: #3357FF;
  --color-4: #FF33F5;
  --color-5: #F5FF33;
}

/* ✅ GOOD Color Choices */
.good-design {
  /* 60-30-10 Rule */
  --primary: #1a1a2e;    /* 60% - Main color */
  --secondary: #16213e;  /* 30% - Supporting */
  --accent: #e94560;     /* 10% - Pop of color */
  
  /* Proper contrast ratios */
  --text-on-dark: #ffffff;  /* 21:1 ratio */
  --text-on-light: #1a1a1a; /* 18:1 ratio */
  
  /* Semantic colors */
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --info: #3b82f6;
}

/* ACCESSIBILITY CONTRAST RATIOS */
/* 
WCAG AA: 4.5:1 for normal text
WCAG AAA: 7:1 for normal text
Large text (18pt+): 3:1 for AA, 4.5:1 for AAA
*/

/* Test these combinations */
background: #1a1a2e; color: #ffffff; /* Ratio: 18.1:1 ✅ */
background: #e94560; color: #ffffff; /* Ratio: 4.8:1 ✅ */
background: #ffd700; color: #ffffff; /* Ratio: 1.8:1 ❌ */`
      }
    } else if (lesson.order === 3) {
      // Figma Masterclass
      return {
        whatYouLearn: [
          'Figma interface and essential shortcuts for speed',
          'Components and variants: Building reusable design elements',
          'Auto-layout: Creating responsive designs that scale',
          'Prototyping: Adding interactions and animations'
        ],
        overview: 'Figma is the industry standard for UI design. We\'ll go beyond the basics to master components, auto-layout, and prototyping features that will make you 10x faster.',
        codeExample: `/* FIGMA ESSENTIAL SHORTCUTS & TECHNIQUES */

/* MUST-KNOW SHORTCUTS */
Cmd/Ctrl + D     → Duplicate
Cmd/Ctrl + G     → Group
Cmd/Ctrl + K     → Create Component
Option + Drag    → Duplicate while dragging
Shift + A        → Auto Layout
Cmd + /          → Quick Actions

/* AUTO-LAYOUT SETTINGS */
Direction: Horizontal | Vertical
Gap: 8px, 16px, 24px (use 8px grid)
Padding: Consistent spacing
Alignment: Control child positioning

/* COMPONENT STRUCTURE */
Button Component
├── .base (default variant)
│   ├── Background (auto-layout frame)
│   ├── Icon (instance swap)
│   └── Label (text)
├── .hover
├── .pressed
└── .disabled

/* NAMING CONVENTION FOR VARIANTS */
Property=Value
State=Default, State=Hover, State=Pressed
Size=Small, Size=Medium, Size=Large
Type=Primary, Type=Secondary, Type=Ghost

/* COLOR STYLES SETUP */
Primitives (base colors)
├── blue-500: #3B82F6
├── gray-900: #111827
└── white: #FFFFFF

Semantic (purpose-based)
├── background/primary → gray-900
├── text/primary → white
└── accent/primary → blue-500

/* RESPONSIVE DESIGN IN FIGMA */
1. Use Auto Layout everywhere
2. Set constraints properly:
   - Hug contents for dynamic sizing
   - Fill container for responsive width
   - Fixed for specific dimensions

3. Breakpoints to design for:
   - Mobile: 375px
   - Tablet: 768px
   - Desktop: 1440px

/* PROTOTYPING INTERACTIONS */
Trigger: On Click / On Hover / After Delay
Action: Navigate To / Open Overlay / Scroll To
Animation: Smart Animate / Move In / Dissolve
Easing: Ease Out (most natural)
Duration: 200-300ms (optimal for UI)`
      }
    } else if (lesson.order === 4) {
      // Creating Design Systems
      return {
        whatYouLearn: [
          'Design tokens: Colors, typography, spacing, and shadows',
          'Component architecture: Atoms → Molecules → Organisms',
          'Documentation: Creating a living style guide',
          'Maintaining consistency across teams and products'
        ],
        overview: 'A design system is more than a component library - it\'s a complete language for building products. Learn how companies like Airbnb, Uber, and IBM create and maintain their design systems.',
        codeExample: `/* DESIGN SYSTEM ARCHITECTURE */

/* 1. DESIGN TOKENS (Foundation) */
const tokens = {
  // Color Primitives
  colors: {
    blue: {
      50: '#eff6ff',
      500: '#3b82f6',
      900: '#1e3a8a'
    },
    gray: {
      50: '#f9fafb',
      500: '#6b7280',
      900: '#111827'
    }
  },
  
  // Semantic Tokens (map to primitives)
  semantic: {
    background: {
      primary: tokens.colors.gray[50],
      secondary: tokens.colors.gray[100],
    },
    text: {
      primary: tokens.colors.gray[900],
      secondary: tokens.colors.gray[600],
    },
    interactive: {
      primary: tokens.colors.blue[500],
      hover: tokens.colors.blue[600],
    }
  },
  
  // Spacing Scale (8px grid)
  spacing: {
    xs: '4px',   // 0.5
    sm: '8px',   // 1
    md: '16px',  // 2
    lg: '24px',  // 3
    xl: '32px',  // 4
    '2xl': '48px', // 6
    '3xl': '64px'  // 8
  },
  
  // Typography Scale
  typography: {
    fontFamily: {
      sans: 'Inter, system-ui, sans-serif',
      mono: 'JetBrains Mono, monospace'
    },
    fontSize: {
      xs: ['12px', { lineHeight: '16px' }],
      sm: ['14px', { lineHeight: '20px' }],
      base: ['16px', { lineHeight: '24px' }],
      lg: ['18px', { lineHeight: '28px' }],
      xl: ['20px', { lineHeight: '28px' }],
      '2xl': ['24px', { lineHeight: '32px' }],
      '3xl': ['30px', { lineHeight: '36px' }],
    },
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  
  // Effects
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
  },
  
  borderRadius: {
    none: '0',
    sm: '4px',
    base: '8px',
    md: '12px',
    lg: '16px',
    full: '9999px'
  }
};

/* 2. COMPONENT HIERARCHY */

// Atoms (smallest building blocks)
const Button = ({ variant, size, children }) => (
  <button className={\`btn btn-\${variant} btn-\${size}\`}>
    {children}
  </button>
);

// Molecules (combinations of atoms)
const SearchBar = () => (
  <div className="search-bar">
    <Input placeholder="Search..." />
    <Button variant="primary" size="sm">
      <Icon name="search" />
    </Button>
  </div>
);

// Organisms (complex components)
const NavigationHeader = () => (
  <header>
    <Logo />
    <SearchBar />
    <UserMenu />
  </header>
);

/* 3. NAMING CONVENTIONS */
// BEM-style for CSS
.card {}
.card__header {}
.card__body {}
.card--featured {}

// Component Props
<Button 
  variant="primary|secondary|ghost"
  size="sm|md|lg"
  state="default|hover|active|disabled"
/>`
      }
    } else if (lesson.order === 5) {
      // Responsive Design Patterns
      return {
        whatYouLearn: [
          'Mobile-first vs Desktop-first strategies',
          'Breakpoint systems and when to use them',
          'Flexible grids, fluid typography, and responsive images',
          'Common responsive patterns: Off-canvas, Reflow, Expand'
        ],
        overview: 'Responsive design isn\'t just about making things fit on mobile. Learn the patterns and techniques that create truly adaptive experiences across all devices.',
        codeExample: `/* RESPONSIVE DESIGN PATTERNS & TECHNIQUES */

/* 1. MOBILE-FIRST BREAKPOINT SYSTEM */
/* Default styles = Mobile */
.container {
  width: 100%;
  padding: 16px;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    max-width: 768px;
    padding: 24px;
  }
}

/* Desktop and up */
@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    padding: 32px;
  }
}

/* 2. FLUID TYPOGRAPHY (Clamp) */
.heading {
  /* min, preferred, max */
  font-size: clamp(1.5rem, 4vw, 3rem);
  line-height: 1.2;
}

.body-text {
  font-size: clamp(1rem, 2vw, 1.25rem);
}

/* 3. RESPONSIVE GRID PATTERNS */

/* Auto-fit Grid (responsive without media queries) */
.auto-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}

/* Sidebar Layout (switches at breakpoint) */
.layout {
  display: grid;
  gap: 24px;
}

@media (min-width: 768px) {
  .layout {
    grid-template-columns: 250px 1fr;
  }
}

/* 4. RESPONSIVE NAVIGATION PATTERNS */

/* Off-Canvas Mobile Menu */
.nav-mobile {
  position: fixed;
  top: 0;
  left: -100%;
  width: 80%;
  height: 100vh;
  transition: left 0.3s ease;
}

.nav-mobile.active {
  left: 0;
}

/* Priority+ Navigation */
.nav-priority {
  display: flex;
  overflow-x: auto;
}

.nav-priority > * {
  flex-shrink: 0;
}

/* 5. RESPONSIVE IMAGES */

/* Art Direction with Picture Element */
<picture>
  <source 
    media="(min-width: 1024px)" 
    srcset="hero-desktop.jpg"
  />
  <source 
    media="(min-width: 768px)" 
    srcset="hero-tablet.jpg"
  />
  <img 
    src="hero-mobile.jpg" 
    alt="Hero image"
    loading="lazy"
  />
</picture>

/* Aspect Ratio Box */
.aspect-ratio-box {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 */
}

.aspect-ratio-box > * {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 6. CONTAINER QUERIES (New CSS) */
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 150px 1fr;
  }
}`
      }
    } else if (lesson.order === 6) {
      // User Research & Testing
      return {
        whatYouLearn: [
          'Research methods: Interviews, surveys, usability testing',
          'Creating user personas and journey maps',
          'A/B testing and data-driven design decisions',
          'Accessibility testing and inclusive design'
        ],
        overview: 'Great design starts with understanding users. Learn how to conduct research, test your designs, and make data-driven decisions that improve user experience.',
        codeExample: `/* USER RESEARCH & TESTING METHODS */

/* 1. USER INTERVIEW SCRIPT */
const interviewQuestions = {
  background: [
    "Tell me about your role and daily tasks",
    "What tools do you currently use for [task]?",
    "What frustrates you most about [current solution]?"
  ],
  
  taskObservation: [
    "Can you show me how you normally do [task]?",
    "What happens when [edge case]?",
    "How often do you need to do this?"
  ],
  
  painPoints: [
    "What takes the longest?",
    "Where do mistakes happen?",
    "If you had a magic wand, what would you fix?"
  ]
};

/* 2. USABILITY TESTING TASKS */
const usabilityTasks = [
  {
    scenario: "You want to buy a birthday gift for a friend",
    tasks: [
      "Find a gift under $50",
      "Add it to cart",
      "Apply discount code 'BIRTHDAY20'",
      "Complete checkout"
    ],
    metrics: {
      timeToComplete: null,
      errorsCount: 0,
      satisfactionScore: null,
      completionRate: null
    }
  }
];

/* 3. A/B TESTING SETUP */
const abTest = {
  hypothesis: "Changing CTA from 'Get Started' to 'Start Free Trial' will increase conversions by 15%",
  
  variants: {
    control: {
      buttonText: "Get Started",
      buttonColor: "#3B82F6"
    },
    variant: {
      buttonText: "Start Free Trial",
      buttonColor: "#10B981"
    }
  },
  
  metrics: {
    primaryMetric: "conversionRate",
    secondaryMetrics: ["timeOnPage", "bounceRate"],
    minimumSampleSize: 1000,
    confidenceLevel: 0.95
  }
};

/* 4. ACCESSIBILITY TESTING CHECKLIST */
const a11yChecklist = {
  keyboard: [
    "✓ All interactive elements reachable via Tab",
    "✓ Visible focus indicators",
    "✓ Logical tab order",
    "✓ Skip links available"
  ],
  
  screenReader: [
    "✓ All images have alt text",
    "✓ Form labels properly associated",
    "✓ Headings in logical order (h1 → h2 → h3)",
    "✓ ARIA labels for icons"
  ],
  
  visual: [
    "✓ Color contrast ratios meet WCAG AA (4.5:1)",
    "✓ Text resizable to 200% without breaking",
    "✓ No information conveyed by color alone",
    "✓ Focus indicators have 3:1 contrast"
  ]
};

/* 5. USER PERSONA TEMPLATE */
const userPersona = {
  name: "Sarah Chen",
  age: 28,
  role: "Product Manager",
  
  goals: [
    "Ship features faster",
    "Reduce meetings",
    "Better team collaboration"
  ],
  
  frustrations: [
    "Too many tools to manage",
    "Constant context switching",
    "Unclear project status"
  ],
  
  dayInLife: {
    "9:00": "Check emails and Slack",
    "10:00": "Daily standup",
    "11:00": "Review PRs and specs",
    "14:00": "Stakeholder meetings",
    "16:00": "Planning tomorrow"
  },
  
  quote: "I spend more time in meetings about the work than doing the work"
};

/* 6. ANALYTICS TRACKING */
// Track user behavior to inform design
const trackingPlan = {
  pageView: {
    event: "page_viewed",
    properties: ["page_name", "referrer"]
  },
  
  interaction: {
    event: "element_clicked", 
    properties: ["element_type", "element_text", "page_section"]
  },
  
  conversion: {
    event: "goal_completed",
    properties: ["goal_type", "value", "time_to_convert"]
  }
};`
      }
    }
  }
  
  // Frontend module content
  if (module.order === 2) {
    if (lesson.order === 1) {
      return {
        whatYouLearn: [
          'Semantic HTML5 elements and their proper usage',
          'Accessibility best practices (ARIA, screen readers)',
          'SEO-friendly markup structure',
          'HTML forms and validation'
        ],
        overview: 'HTML is the foundation of the web. In this lesson, you\'ll learn to write clean, semantic HTML that\'s accessible to all users and optimized for search engines.',
        codeExample: `<!-- Semantic HTML Example -->
<article class="blog-post">
  <header>
    <h1>Article Title</h1>
    <time datetime="2024-01-15">January 15, 2024</time>
  </header>
  <main>
    <p>Article content goes here...</p>
  </main>
  <footer>
    <p>Written by <cite>Author Name</cite></p>
  </footer>
</article>`
      }
    } else if (lesson.order === 4) {
      return {
        whatYouLearn: [
          'React component lifecycle and hooks',
          'State management with useState and useReducer',
          'Performance optimization techniques',
          'Building reusable component libraries'
        ],
        overview: 'React has revolutionized how we build user interfaces. Learn to think in components, manage state effectively, and build scalable applications.',
        codeExample: `// React Component with Hooks
function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    setTodos([...todos, {
      id: Date.now(),
      text: input,
      completed: false
    }]);
    setInput('');
  };
  
  return (
    <div>
      <input 
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}`
      }
    }
  }
  
  // Backend module content
  if (module.order === 3) {
    if (lesson.order === 1) {
      return {
        whatYouLearn: [
          'Setting up a Node.js development environment',
          'Understanding the event loop and async programming',
          'Building REST APIs with Express.js',
          'Middleware and routing patterns'
        ],
        overview: 'Node.js brings JavaScript to the server. Learn how to build fast, scalable backend services using the same language you use on the frontend.',
        codeExample: `// Express.js Server Example
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});`
      }
    }
  }
  
  // Database module content
  if (module.order === 4) {
    if (lesson.order === 1) {
      return {
        whatYouLearn: [
          'Relational database design principles',
          'Writing efficient SQL queries',
          'Database normalization and denormalization',
          'Indexes and query optimization'
        ],
        overview: 'PostgreSQL is one of the most powerful open-source databases. Learn to design schemas, write complex queries, and optimize database performance.',
        codeExample: `-- PostgreSQL Schema Example
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Query with JOIN
SELECT u.name, p.title, p.created_at
FROM users u
JOIN posts p ON u.id = p.user_id
WHERE p.published = true
ORDER BY p.created_at DESC;`
      }
    }
  }
  
  // Default content
  return {
    whatYouLearn: [
      'Core concepts and fundamentals',
      'Best practices and industry standards',
      'Real-world application examples',
      'Common pitfalls to avoid'
    ],
    overview: `This lesson covers essential concepts in ${lesson.title.toLowerCase()}. You'll gain practical skills that you can immediately apply to your projects.`,
    codeExample: `// Example code for ${lesson.title}
function example() {
  console.log("Start learning!");
  // Your code here
}`
  }
}

function DashboardContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [modules, setModules] = useState<Module[]>([])
  const [hasSubscription, setHasSubscription] = useState(false)
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null)
  const [currentModule, setCurrentModule] = useState<Module | null>(null)
  const [testMode, setTestMode] = useState(false)
  const [expandedModule, setExpandedModule] = useState<string | null>(null)
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  
  useEffect(() => {
    // Check if just subscribed
    if (searchParams.get('subscribed') === 'true') {
      setHasSubscription(true)
    }
  }, [searchParams])
  
  useEffect(() => {
    // Allow test mode if no session
    if (status === 'unauthenticated') {
      setTestMode(true)
    } else if (session?.user) {
      // Track user and course view
      analytics.identify(session.user.id, session.user.email || undefined, session.user.name || undefined)
      analytics.events.viewCourse()
    }
  }, [status, session])
  
  useEffect(() => {
    async function loadData() {
      try {
        // Check subscription status only if authenticated
        if (session) {
          try {
            const subRes = await fetch('/api/subscription/status')
            const subData = await subRes.json()
            setHasSubscription(subData.hasActiveSubscription)
            setSubscriptionInfo(subData.subscription)
          } catch (error) {
            console.log('Could not check subscription')
          }
        }
        
        // Load course modules
        const modulesRes = await fetch('/api/modules')
        const modulesData = await modulesRes.json()
        
        // Ensure modules is always an array
        if (Array.isArray(modulesData)) {
          setModules(modulesData)
          
          // Select first lesson by default
          if (modulesData.length > 0 && modulesData[0].lessons.length > 0) {
            setSelectedLesson(modulesData[0].lessons[0])
            setCurrentModule(modulesData[0])
          }
        } else {
          console.error('Invalid modules data:', modulesData)
          setModules([])
        }
      } catch (error) {
        console.error('Error loading data:', error)
        setModules([])
      } finally {
        setLoading(false)
      }
    }
    
    loadData()
  }, [session])
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    )
  }
  
  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }
  
  const getDaysRemaining = (dateString?: string) => {
    if (!dateString) return 0
    const endDate = new Date(dateString)
    const today = new Date()
    const diffTime = endDate.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
  
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold">DevMastery Course</h1>
            
            <div className="flex items-center space-x-4">
              {/* Subscription Status */}
              {hasSubscription && subscriptionInfo && (
                <div className="flex items-center space-x-2 bg-purple-900/30 border border-purple-500/30 px-3 py-1 rounded-full">
                  {subscriptionInfo.status === 'TRIALING' || subscriptionInfo.status === 'TRIAL' ? (
                    <>
                      <Clock className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-purple-400">
                        Trial ends in {getDaysRemaining(subscriptionInfo.trialEndsAt)} days
                      </span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-green-400">Active Subscription</span>
                    </>
                  )}
                </div>
              )}
              
              {testMode && (
                <div className="flex items-center space-x-2 bg-yellow-900/30 border border-yellow-500/30 px-3 py-1 rounded-full">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-yellow-400">Test Mode</span>
                </div>
              )}
              
              {session?.user ? (
                <>
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-gray-400" />
                    <span className="text-sm">{session.user.name || session.user.email}</span>
                  </div>
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => router.push('/auth/signin')}
                  className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Sign In
                </button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 h-[calc(100vh-4rem)] overflow-y-auto bg-gray-900/50 border-r border-gray-800">
          <div className="p-4">
            {/* Show subscription info instead of upgrade prompt */}
            {hasSubscription && subscriptionInfo && (
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <CreditCard className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold">Your Subscription</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-purple-400 capitalize">
                      {subscriptionInfo.status === 'TRIALING' || subscriptionInfo.status === 'TRIAL' ? 'Free Trial' : 'Active'}
                    </span>
                  </div>
                  {subscriptionInfo.trialEndsAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Trial ends:</span>
                      <span>{formatDate(subscriptionInfo.trialEndsAt)}</span>
                    </div>
                  )}
                  {subscriptionInfo.status === 'ACTIVE' && subscriptionInfo.currentPeriodEnd && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Next billing:</span>
                      <span>{formatDate(subscriptionInfo.currentPeriodEnd)}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-gray-700">
                    <p className="text-xs text-gray-400">
                      {subscriptionInfo.status === 'TRIALING' || subscriptionInfo.status === 'TRIAL'
                        ? 'You will be charged $25/month after the trial ends'
                        : 'Billed monthly at $25'
                      }
                    </p>
                  </div>
                </div>
              </div>
            )}
            
            {!hasSubscription && !testMode && (
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span className="font-semibold">Get Full Access</span>
                </div>
                <p className="text-sm text-gray-400 mb-3">
                  Unlock all lessons with a subscription
                </p>
                <button 
                  onClick={() => router.push('/subscribe')}
                  className="w-full bg-purple-600 hover:bg-purple-700 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Start Free Trial
                </button>
              </div>
            )}
            
            {/* Modules */}
            <div className="space-y-6">
              {modules.map((module) => (
                <div key={module.id}>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-2xl">{module.icon}</span>
                    <h2 className="font-semibold">{module.title}</h2>
                  </div>
                  
                  <div className="space-y-1">
                    {module.lessons.map((lesson) => {
                      const isSelected = selectedLesson?.id === lesson.id
                      
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            setSelectedLesson(lesson)
                            setCurrentModule(module)
                            if (session) {
                              analytics.events.startLesson(lesson.title, module.title)
                            }
                          }}
                          className={`w-full text-left p-3 rounded-lg transition-all ${
                            isSelected 
                              ? 'bg-gray-800 border border-gray-700' 
                              : 'hover:bg-gray-800/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <PlayCircle className="w-4 h-4 text-purple-400" />
                              <span className="text-sm">{lesson.title}</span>
                            </div>
                            <span className="text-xs text-gray-500">{lesson.duration}</span>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto">
          {selectedLesson && currentModule && (
            <div className="max-w-5xl mx-auto p-8">
              <motion.div
                key={selectedLesson.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Breadcrumb */}
                <div className="flex items-center space-x-2 text-sm text-gray-400 mb-6">
                  <span>{currentModule.title}</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-white">{selectedLesson.title}</span>
                </div>
                
                <h1 className="text-3xl font-bold mb-4">{selectedLesson.title}</h1>
                <p className="text-gray-400 mb-8">{selectedLesson.description}</p>
                
                {/* Lesson Content - Always show, no lock */}
                <div className="bg-gray-900 border border-gray-800 rounded-lg overflow-hidden mb-8">
                  <div className="p-8">
                    {/* Dynamic Lesson Content */}
                    <div className="prose prose-invert max-w-none">
                      {(() => {
                        const content = getLessonContent(selectedLesson, currentModule)
                        
                        return (
                          <>
                            <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                            <ul className="space-y-2 mb-6">
                              {content.whatYouLearn.map((item, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                            
                            <h2 className="text-2xl font-bold mb-4">Lesson Overview</h2>
                            <p className="text-gray-300 mb-6">{content.overview}</p>
                            
                            {/* Module-specific visual element */}
                            <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-6">
                              <div className="flex items-center justify-center text-6xl mb-4">
                                {currentModule.icon}
                              </div>
                              <p className="text-center text-gray-400">
                                {currentModule.title} - Lesson {selectedLesson.order}
                              </p>
                            </div>
                            
                            {/* Code Example */}
                            <h3 className="text-xl font-bold mb-4">Code Example</h3>
                            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 mb-6">
                              <div className="flex items-center justify-between mb-3">
                                <span className="text-sm text-gray-400">
                                  {currentModule.order === 1 ? 'design-system.js' :
                                   currentModule.order === 2 ? 'component.jsx' :
                                   currentModule.order === 3 ? 'server.js' :
                                   currentModule.order === 4 ? 'schema.sql' :
                                   'example.js'}
                                </span>
                              </div>
                              <pre className="text-sm overflow-x-auto">
                                <code className="text-gray-300">{content.codeExample}</code>
                              </pre>
                            </div>
                            
                            {/* Next Steps */}
                            <div className="mt-8 p-4 bg-gray-800 border border-gray-700 rounded-lg">
                              <h4 className="font-semibold mb-2">🎯 Next Steps</h4>
                              <p className="text-gray-400">
                                After completing this lesson, you'll be ready to move on to more advanced topics. 
                                Make sure to practice what you've learned before proceeding.
                              </p>
                            </div>
                          </>
                        )
                      })()}
                    </div>
                  </div>
                </div>
                
                {/* Lesson Info */}
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{selectedLesson.duration}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <DashboardContent />
    </Suspense>
  )
} 