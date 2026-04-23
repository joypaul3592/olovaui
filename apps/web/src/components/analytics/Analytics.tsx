'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-KCJ7NVNQ62', {
        page_path: pathname,
        custom_map: {
          custom_parameter_1: 'component_category',
          custom_parameter_2: 'user_journey_stage'
        }
      })

      if (pathname.startsWith('/docs/') && pathname !== '/docs') {
        const componentName = pathname.split('/').pop()
        window.gtag('event', 'component_view', {
          component_name: componentName,
          component_category: getComponentCategory(componentName || ''),
          page_path: pathname
        })
      }

      const searchQuery = searchParams.get('search')
      if (searchQuery) {
        window.gtag('event', 'search', {
          search_term: searchQuery,
          page_path: pathname
        })
      }

      trackWebVitals()
    }
  }, [pathname, searchParams])

  return null
}

function getComponentCategory(componentName: string): string {
  const categories = {
    'UI Components': ['button', 'card', 'badge', 'tabs', 'dropdown', 'navbar', 'footer'],
    'Form Components': ['login', 'signin', 'password', 'multiselector', 'search'],
    'Animation Components': ['flipwords', 'textreveal', 'sparklestext', 'shimmer', 'loaders'],
    'Layout Components': ['hero', 'pricing', 'testimonial', 'portfolio', 'filetree'],
    'Interactive Components': ['carousel', 'network', 'copybutton', 'colorpalette', 'gradient']
  }

  for (const [category, components] of Object.entries(categories)) {
    if (components.includes(componentName)) {
      return category
    }
  }
  return 'Other'
}

function trackWebVitals() {
  if (typeof window === 'undefined' || !window.gtag) return

  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.entryType === 'largest-contentful-paint' && window.gtag) {
        window.gtag('event', 'web_vitals', {
          metric_name: 'LCP',
          metric_value: Math.round(entry.startTime),
          metric_rating: entry.startTime > 4000 ? 'poor' : entry.startTime > 2500 ? 'needs_improvement' : 'good'
        })
      }
    }
  }).observe({ entryTypes: ['largest-contentful-paint'] })

  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.entryType === 'first-input') {
        const fidEntry = entry as PerformanceEntry & { processingStart: number }
        const fid = fidEntry.processingStart - entry.startTime
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            metric_name: 'FID',
            metric_value: Math.round(fid),
            metric_rating: fid > 300 ? 'poor' : fid > 100 ? 'needs_improvement' : 'good'
          })
        }
      }
    }
  }).observe({ entryTypes: ['first-input'] })

  let clsValue = 0
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      const clsEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value: number }
      if (!clsEntry.hadRecentInput) {
        clsValue += clsEntry.value
      }
    }
    if (window.gtag) {
      window.gtag('event', 'web_vitals', {
        metric_name: 'CLS',
        metric_value: Math.round(clsValue * 1000),
        metric_rating: clsValue > 0.25 ? 'poor' : clsValue > 0.1 ? 'needs_improvement' : 'good'
      })
    }
  }).observe({ entryTypes: ['layout-shift'] })
}

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

export default Analytics