import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Check if user is authenticated (optional for demo)
    const session = await getServerSession(authOptions)
    
    // Return demo modules if database is not available
    try {
      // Try to fetch from database
      const modules = await prisma.module.findMany({
        orderBy: { order: 'asc' },
        include: {
          lessons: {
            orderBy: { order: 'asc' },
          },
        },
      })
      
      return NextResponse.json(modules)
    } catch (dbError) {
      console.error('Database error, returning demo modules:', dbError)
      
      // Return full course modules when database is not available
      const demoModules = [
        {
          id: 'module-1',
          order: 1,
          title: 'Design Fundamentals',
          description: 'Master UI/UX design principles and tools',
          icon: '🎨',
          color: 'purple',
          lessons: [
            {
              id: 'lesson-1-1',
              order: 1,
              title: 'Introduction to UI/UX Design',
              description: 'Learn the fundamentals of user interface and user experience design',
              duration: '45m',
              isFree: true
            },
            {
              id: 'lesson-1-2',
              order: 2,
              title: 'Design Principles & Color Theory',
              description: 'Master the core principles of visual design and color psychology',
              duration: '1h 20m',
              isFree: true
            },
            {
              id: 'lesson-1-3',
              order: 3,
              title: 'Figma Masterclass',
              description: 'Become proficient in the industry-standard design tool',
              duration: '2h 30m',
              isFree: true
            },
            {
              id: 'lesson-1-4',
              order: 4,
              title: 'Creating Design Systems',
              description: 'Build scalable and consistent design systems',
              duration: '1h 45m',
              isFree: false
            },
            {
              id: 'lesson-1-5',
              order: 5,
              title: 'Responsive Design Patterns',
              description: 'Design for all devices with modern responsive techniques',
              duration: '1h 30m',
              isFree: false
            },
            {
              id: 'lesson-1-6',
              order: 6,
              title: 'User Research & Testing',
              description: 'Validate your designs with real user feedback',
              duration: '2h',
              isFree: false
            }
          ]
        },
        {
          id: 'module-2',
          order: 2,
          title: 'Frontend Development',
          description: 'Build modern web applications with React and Next.js',
          icon: '💻',
          color: 'blue',
          lessons: [
            {
              id: 'lesson-2-1',
              order: 1,
              title: 'HTML5 & Semantic Markup',
              description: 'Write clean, accessible, and SEO-friendly HTML',
              duration: '1h 30m',
              isFree: true
            },
            {
              id: 'lesson-2-2',
              order: 2,
              title: 'CSS3 & Modern Layouts',
              description: 'Master Flexbox, Grid, and advanced CSS techniques',
              duration: '2h 45m',
              isFree: true
            },
            {
              id: 'lesson-2-3',
              order: 3,
              title: 'JavaScript ES6+ Fundamentals',
              description: 'Learn modern JavaScript features and best practices',
              duration: '3h 20m',
              isFree: false
            },
            {
              id: 'lesson-2-4',
              order: 4,
              title: 'React.js Deep Dive',
              description: 'Build interactive UIs with the most popular framework',
              duration: '4h 30m',
              isFree: false
            },
            {
              id: 'lesson-2-5',
              order: 5,
              title: 'Next.js & Server Components',
              description: 'Create full-stack applications with Next.js 14',
              duration: '3h 15m',
              isFree: false
            },
            {
              id: 'lesson-2-6',
              order: 6,
              title: 'State Management & Performance',
              description: 'Optimize your apps with advanced state management',
              duration: '2h 30m',
              isFree: false
            }
          ]
        },
        {
          id: 'module-3',
          order: 3,
          title: 'Backend Development',
          description: 'Build scalable APIs and server-side applications',
          icon: '🚀',
          color: 'green',
          lessons: [
            {
              id: 'lesson-3-1',
              order: 1,
              title: 'Node.js & Express.js Basics',
              description: 'Set up your first backend server with Node.js',
              duration: '2h 15m',
              isFree: false
            },
            {
              id: 'lesson-3-2',
              order: 2,
              title: 'RESTful API Design',
              description: 'Design and build professional REST APIs',
              duration: '2h 30m',
              isFree: false
            },
            {
              id: 'lesson-3-3',
              order: 3,
              title: 'Authentication & Authorization',
              description: 'Implement secure user authentication systems',
              duration: '3h',
              isFree: false
            },
            {
              id: 'lesson-3-4',
              order: 4,
              title: 'WebSockets & Real-time Apps',
              description: 'Build real-time features with WebSocket technology',
              duration: '2h 45m',
              isFree: false
            },
            {
              id: 'lesson-3-5',
              order: 5,
              title: 'Microservices Architecture',
              description: 'Design scalable applications with microservices',
              duration: '3h 30m',
              isFree: false
            },
            {
              id: 'lesson-3-6',
              order: 6,
              title: 'Testing & CI/CD',
              description: 'Ensure code quality with testing and automation',
              duration: '2h 20m',
              isFree: false
            }
          ]
        },
        {
          id: 'module-4',
          order: 4,
          title: 'Database & Deployment',
          description: 'Master data storage and application deployment',
          icon: '🗄️',
          color: 'orange',
          lessons: [
            {
              id: 'lesson-4-1',
              order: 1,
              title: 'SQL & PostgreSQL Fundamentals',
              description: 'Master relational databases with PostgreSQL',
              duration: '2h 30m',
              isFree: false
            },
            {
              id: 'lesson-4-2',
              order: 2,
              title: 'MongoDB & NoSQL Databases',
              description: 'Work with document databases for flexible data',
              duration: '2h 15m',
              isFree: false
            },
            {
              id: 'lesson-4-3',
              order: 3,
              title: 'Redis & Caching Strategies',
              description: 'Improve performance with caching techniques',
              duration: '1h 45m',
              isFree: false
            },
            {
              id: 'lesson-4-4',
              order: 4,
              title: 'Database Design & Optimization',
              description: 'Design efficient database schemas and queries',
              duration: '2h 30m',
              isFree: false
            },
            {
              id: 'lesson-4-5',
              order: 5,
              title: 'Cloud Deployment (AWS/Vercel)',
              description: 'Deploy your applications to the cloud',
              duration: '3h',
              isFree: false
            },
            {
              id: 'lesson-4-6',
              order: 6,
              title: 'DevOps & Monitoring',
              description: 'Monitor and maintain production applications',
              duration: '2h 45m',
              isFree: false
            }
          ]
        },
        {
          id: 'module-5',
          order: 5,
          title: 'AI & Machine Learning',
          description: 'Integrate AI into your applications',
          icon: '🤖',
          color: 'purple',
          lessons: [
            {
              id: 'lesson-5-1',
              order: 1,
              title: 'Introduction to AI/ML',
              description: 'Understand AI fundamentals and applications',
              duration: '1h 30m',
              isFree: false
            },
            {
              id: 'lesson-5-2',
              order: 2,
              title: 'Working with OpenAI APIs',
              description: 'Build AI-powered features with GPT and DALL-E',
              duration: '2h',
              isFree: false
            },
            {
              id: 'lesson-5-3',
              order: 3,
              title: 'Building AI Chatbots',
              description: 'Create intelligent conversational interfaces',
              duration: '2h 30m',
              isFree: false
            }
          ]
        },
        {
          id: 'module-6',
          order: 6,
          title: 'Career Development',
          description: 'Launch your career as a developer',
          icon: '💼',
          color: 'green',
          lessons: [
            {
              id: 'lesson-6-1',
              order: 1,
              title: 'Building Your Portfolio',
              description: 'Create a portfolio that gets you hired',
              duration: '1h 30m',
              isFree: false
            },
            {
              id: 'lesson-6-2',
              order: 2,
              title: 'Resume & LinkedIn Optimization',
              description: 'Stand out to recruiters and hiring managers',
              duration: '1h 15m',
              isFree: false
            },
            {
              id: 'lesson-6-3',
              order: 3,
              title: 'Technical Interview Preparation',
              description: 'Ace your coding interviews',
              duration: '3h',
              isFree: false
            },
            {
              id: 'lesson-6-4',
              order: 4,
              title: 'Freelancing & Remote Work',
              description: 'Build a successful freelance career',
              duration: '2h',
              isFree: false
            },
            {
              id: 'lesson-6-5',
              order: 5,
              title: 'Networking & Personal Branding',
              description: 'Build your professional network',
              duration: '1h 30m',
              isFree: false
            }
          ]
        }
      ]
      
      return NextResponse.json(demoModules)
    }
  } catch (error) {
    console.error('Error in modules route:', error)
    // Always return an array, even on error
    return NextResponse.json([])
  }
} 