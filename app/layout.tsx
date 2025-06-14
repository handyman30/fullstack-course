import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevMastery - Become a Full-Stack Developer | Design, Frontend, Backend & Database',
  description: 'Master full-stack development with our comprehensive course. Learn Design, Frontend (React/Next.js), Backend (Node.js), and Database technologies. Perfect for students, university graduates, and career switchers. Start with a 3-day free trial.',
  keywords: 'full stack development, web development course, learn programming, React, Next.js, Node.js, database, career change, coding bootcamp alternative',
  authors: [{ name: 'DevMastery' }],
  creator: 'DevMastery',
  publisher: 'DevMastery',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://devmastery.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'DevMastery - Become a Full-Stack Developer',
    description: 'Transform your career with our comprehensive full-stack development course. From zero to professional developer.',
    url: 'https://devmastery.com',
    siteName: 'DevMastery',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'DevMastery - Full-Stack Development Course',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevMastery - Become a Full-Stack Developer',
    description: 'Transform your career with our comprehensive full-stack development course.',
    creator: '@devmastery',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>{children}</body>
    </html>
  )
} 