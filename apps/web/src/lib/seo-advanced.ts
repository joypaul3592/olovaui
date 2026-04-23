import type { Metadata } from 'next'

/**
 * Advanced SEO utilities for Olova UI
 * Implements best practices for search engine optimization
 */

interface BreadcrumbItem {
  name: string
  url: string
}

interface FAQItem {
  question: string
  answer: string
}

interface HowToStep {
  name: string
  text: string
  image?: string
  url?: string
}

// Generate breadcrumb structured data
export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  const baseUrl = 'https://olovaui.olova.net'
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `${baseUrl}${item.url}`
    }))
  }
}

// Generate FAQ structured data
export function generateFAQSchema(faqs: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  }
}

// Generate HowTo structured data
export function generateHowToSchema(title: string, description: string, steps: HowToStep[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': title,
    'description': description,
    'step': steps.map((step, index) => ({
      '@type': 'HowToStep',
      'position': index + 1,
      'name': step.name,
      'text': step.text,
      ...(step.image && { 'image': step.image }),
      ...(step.url && { 'url': step.url })
    }))
  }
}

// Generate VideoObject structured data
export function generateVideoSchema(
  name: string,
  description: string,
  thumbnailUrl: string,
  uploadDate: string,
  duration?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': name,
    'description': description,
    'thumbnailUrl': thumbnailUrl,
    'uploadDate': uploadDate,
    ...(duration && { 'duration': duration }),
    'contentUrl': 'https://olovaui.olova.net'
  }
}

// Generate Course structured data for tutorials
export function generateCourseSchema(
  name: string,
  description: string,
  provider: string = 'Olova UI'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': name,
    'description': description,
    'provider': {
      '@type': 'Organization',
      'name': provider,
      'sameAs': 'https://olovaui.olova.net'
    }
  }
}

// Generate rich component metadata with enhanced keywords
export function generateRichComponentMetadata(
  componentName: string,
  description: string,
  additionalKeywords: string[] = []
): Metadata {
  const baseKeywords = [
    `${componentName} component`,
    `React ${componentName}`,
    `Tailwind ${componentName}`,
    `${componentName} React component`,
    `animated ${componentName}`,
    `${componentName} UI component`,
    `free ${componentName} component`,
    `${componentName} example`,
    `${componentName} tutorial`,
    `how to create ${componentName}`,
    `${componentName} code`,
    `${componentName} template`,
    'React components',
    'Tailwind CSS components',
    'Framer Motion',
    'TypeScript components',
    'copy paste components',
    'free React components',
    'open source UI library',
    'modern UI components',
    'responsive components',
    'accessible components',
    'dark mode components',
    'Next.js components',
    'shadcn alternative',
    'Bangladesh UI library',
    ...additionalKeywords
  ]

  const title = `${componentName} Component - React Tailwind CSS | Olova UI`
  const enhancedDescription = `${description} Free ${componentName} React component built with Tailwind CSS and Framer Motion. Copy-paste ready, accessible, and production-ready. Part of Olova UI component library.`

  return {
    title,
    description: enhancedDescription,
    keywords: baseKeywords.join(', '),
    authors: [{ name: 'Olova UI Team' }],
    creator: 'Olova UI',
    publisher: 'Olova UI',
    alternates: {
      canonical: `/docs/${componentName.toLowerCase()}`
    },
    openGraph: {
      title,
      description: enhancedDescription,
      url: `https://olovaui.olova.net/docs/${componentName.toLowerCase()}`,
      siteName: 'Olova UI',
      type: 'article',
      images: [
        {
          url: `/og-${componentName.toLowerCase()}.png`,
          width: 1200,
          height: 630,
          alt: `${componentName} Component Preview`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: enhancedDescription,
      images: [`/og-${componentName.toLowerCase()}.png`]
    }
  }
}

// SEO-friendly URL slug generator with better handling
export function generateSEOSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '') // Remove leading/trailing hyphens
}

// Generate meta description with optimal length (150-160 characters)
export function generateMetaDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text
  
  // Truncate at word boundary
  const truncated = text.substring(0, maxLength)
  const lastSpace = truncated.lastIndexOf(' ')
  
  return truncated.substring(0, lastSpace) + '...'
}

// Generate canonical URL
export function generateCanonicalURL(path: string): string {
  const baseUrl = 'https://olovaui.olova.net'
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  return `${baseUrl}${cleanPath}`
}

// Generate alternate language links (for future i18n)
export function generateAlternateLinks(path: string, languages: string[] = ['en']) {
  const baseUrl = 'https://olovaui.olova.net'
  
  return languages.reduce((acc, lang) => {
    acc[lang] = `${baseUrl}/${lang}${path}`
    return acc
  }, {} as Record<string, string>)
}

// Performance hints for SEO
export const performanceHints = {
  preconnect: [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.google-analytics.com'
  ],
  dnsPrefetch: [
    '//fonts.googleapis.com',
    '//fonts.gstatic.com',
    '//www.google-analytics.com'
  ],
  preload: [
    { href: '/fonts/geist.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' }
  ]
}

// Social media meta tags generator
export function generateSocialMeta(
  title: string,
  description: string,
  image: string = '/og-image.png',
  type: 'website' | 'article' = 'website'
) {
  return {
    openGraph: {
      title,
      description,
      type,
      images: [{ url: image, width: 1200, height: 630 }],
      siteName: 'Olova UI',
      locale: 'en_US'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@olovaui',
      site: '@olovaui'
    }
  }
}
