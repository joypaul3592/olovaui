'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * SEO Monitoring Component
 * Tracks page views and SEO metrics for analytics
 */
export function SEOMonitor() {
  const pathname = usePathname()

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-KCJ7NVNQ62', {
        page_path: pathname,
      })
    }

    // Log SEO metrics in development
    if (process.env.NODE_ENV === 'development') {
      console.warn('📊 SEO Check:', {
        path: pathname,
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
        ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
      })
    }
  }, [pathname])

  return null
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}
