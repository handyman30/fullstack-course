import { PrismaClient } from '../lib/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')
  
  // Module 1: Design Fundamentals
  const module1 = await prisma.module.create({
    data: {
      order: 1,
      title: 'Design Fundamentals',
      description: 'Master UI/UX principles and tools',
      icon: '🎨',
      color: 'purple',
      lessons: {
        create: [
          {
            order: 1,
            title: 'Introduction to UI/UX Design',
            description: 'Understanding the basics of user interface and experience design',
            duration: '45m',
            videoUrl: 'https://www.youtube.com/embed/c9Wg6Cb_YlU', // Free UI/UX course intro
            isFree: true,
          },
          {
            order: 2,
            title: 'Design Principles & Color Theory',
            description: 'Learn about visual hierarchy, balance, and color psychology',
            duration: '1h 20m',
            videoUrl: 'https://www.youtube.com/embed/YqQx75OPRa0', // Design principles
            isFree: true,
          },
          {
            order: 3,
            title: 'Figma Masterclass',
            description: 'Complete guide to using Figma for web design',
            duration: '2h 30m',
            videoUrl: 'https://www.youtube.com/embed/wvFd-z7jSaA', // Figma tutorial
            isFree: true,
          },
          {
            order: 4,
            title: 'Creating Design Systems',
            description: 'Build reusable component libraries',
            duration: '1h 45m',
            videoUrl: 'https://www.youtube.com/embed/Dtd40cHQQlk', // Design systems
          },
        ],
      },
    },
  })
  
  // Module 2: Frontend Development
  const module2 = await prisma.module.create({
    data: {
      order: 2,
      title: 'Frontend Development',
      description: 'React, Next.js, and modern web development',
      icon: '💻',
      color: 'blue',
      lessons: {
        create: [
          {
            order: 1,
            title: 'HTML5 & Semantic Markup',
            description: 'Modern HTML best practices',
            duration: '1h 30m',
            videoUrl: 'https://www.youtube.com/embed/UB1O30fR-EE', // HTML crash course
            isFree: true,
          },
          {
            order: 2,
            title: 'CSS3 & Modern Layouts',
            description: 'Flexbox, Grid, and responsive design',
            duration: '2h 45m',
            videoUrl: 'https://www.youtube.com/embed/yU7jJ3NbPdA', // CSS course
            isFree: true,
          },
          {
            order: 3,
            title: 'JavaScript ES6+ Fundamentals',
            description: 'Modern JavaScript features and patterns',
            duration: '3h 20m',
            videoUrl: 'https://www.youtube.com/embed/hdI2bqOjy3c', // JavaScript course
          },
          {
            order: 4,
            title: 'React.js Deep Dive',
            description: 'Components, hooks, and state management',
            duration: '4h 30m',
            videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8', // React tutorial
          },
          {
            order: 5,
            title: 'Next.js 14 Complete Guide',
            description: 'Build production-ready applications',
            duration: '3h 15m',
            videoUrl: 'https://www.youtube.com/embed/wm5gMKuwSYk', // Next.js tutorial
          },
        ],
      },
    },
  })
  
  // Module 3: Backend Development
  const module3 = await prisma.module.create({
    data: {
      order: 3,
      title: 'Backend Development',
      description: 'Node.js, APIs, and server-side programming',
      icon: '🚀',
      color: 'green',
      lessons: {
        create: [
          {
            order: 1,
            title: 'Node.js & Express.js Basics',
            description: 'Building your first server',
            duration: '2h 15m',
            videoUrl: 'https://www.youtube.com/embed/Oe421EPjeBE', // Node.js course
          },
          {
            order: 2,
            title: 'RESTful API Design',
            description: 'Creating professional APIs',
            duration: '2h 30m',
            videoUrl: 'https://www.youtube.com/embed/-MTSQjw5DrM', // REST API tutorial
          },
          {
            order: 3,
            title: 'Authentication & Authorization',
            description: 'Secure your applications with JWT',
            duration: '3h',
            videoUrl: 'https://www.youtube.com/embed/mbsmsi7l3r4', // Auth tutorial
          },
          {
            order: 4,
            title: 'GraphQL Fundamentals',
            description: 'Modern API development with GraphQL',
            duration: '2h',
            videoUrl: 'https://www.youtube.com/embed/ed8SzALpx1Q', // GraphQL
          },
        ],
      },
    },
  })
  
  // Module 4: Database & Deployment
  const module4 = await prisma.module.create({
    data: {
      order: 4,
      title: 'Database & Deployment',
      description: 'Data persistence and going live',
      icon: '🗄️',
      color: 'orange',
      lessons: {
        create: [
          {
            order: 1,
            title: 'SQL & PostgreSQL Fundamentals',
            description: 'Relational databases explained',
            duration: '2h 30m',
            videoUrl: 'https://www.youtube.com/embed/qw--VYLpxG4', // PostgreSQL course
          },
          {
            order: 2,
            title: 'MongoDB & NoSQL Databases',
            description: 'Document databases for modern apps',
            duration: '2h 15m',
            videoUrl: 'https://www.youtube.com/embed/-56x56UppqQ', // MongoDB course
          },
          {
            order: 3,
            title: 'Prisma ORM Deep Dive',
            description: 'Modern database toolkit',
            duration: '1h 45m',
            videoUrl: 'https://www.youtube.com/embed/RebA5J-rlwg', // Prisma tutorial
          },
          {
            order: 4,
            title: 'Deploying to Production',
            description: 'Railway, Vercel, and cloud deployment',
            duration: '3h',
            videoUrl: 'https://www.youtube.com/embed/l134cBAJCuc', // Deployment guide
          },
        ],
      },
    },
  })
  
  // Bonus Module: Career Development
  const module5 = await prisma.module.create({
    data: {
      order: 5,
      title: 'Career Development',
      description: 'Land your dream job',
      icon: '💼',
      color: 'pink',
      lessons: {
        create: [
          {
            order: 1,
            title: 'Building Your Portfolio',
            description: 'Showcase your skills effectively',
            duration: '1h 30m',
            videoUrl: 'https://www.youtube.com/embed/ocdgss30n2k', // Portfolio tips
          },
          {
            order: 2,
            title: 'Technical Interview Prep',
            description: 'Ace your coding interviews',
            duration: '2h',
            videoUrl: 'https://www.youtube.com/embed/1qw5ITr3k9E', // Interview prep
          },
          {
            order: 3,
            title: 'Freelancing Masterclass',
            description: 'Start earning while learning',
            duration: '1h 45m',
            videoUrl: 'https://www.youtube.com/embed/P2MZb8bZNxw', // Freelancing
          },
        ],
      },
    },
  })
  
  console.log('✅ Database seeded successfully with real content!')
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 