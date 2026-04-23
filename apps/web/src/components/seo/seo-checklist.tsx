'use client'

import { useEffect, useState } from 'react'

/**
 * SEO Checklist Component (Development Only)
 * Displays SEO health check in development mode
 */
export function SEOChecklist() {
  const [checks, setChecks] = useState<Record<string, boolean>>({})

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    const runChecks = () => {
      const newChecks: Record<string, boolean> = {}

      // Title check
      newChecks['Title exists'] = !!document.title
      newChecks['Title length OK'] = document.title.length >= 30 && document.title.length <= 60

      // Description check
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content')
      newChecks['Description exists'] = !!description
      newChecks['Description length OK'] = !!description && description.length >= 120 && description.length <= 160

      // Canonical check
      newChecks['Canonical URL exists'] = !!document.querySelector('link[rel="canonical"]')

      // Open Graph checks
      newChecks['OG Title exists'] = !!document.querySelector('meta[property="og:title"]')
      newChecks['OG Description exists'] = !!document.querySelector('meta[property="og:description"]')
      newChecks['OG Image exists'] = !!document.querySelector('meta[property="og:image"]')

      // Twitter Card checks
      newChecks['Twitter Card exists'] = !!document.querySelector('meta[name="twitter:card"]')
      newChecks['Twitter Image exists'] = !!document.querySelector('meta[name="twitter:image"]')

      // Structured Data check
      newChecks['JSON-LD exists'] = !!document.querySelector('script[type="application/ld+json"]')

      // Heading check
      const h1Count = document.querySelectorAll('h1').length
      newChecks['Single H1 exists'] = h1Count === 1

      // Image alt text check
      const images = document.querySelectorAll('img')
      const imagesWithAlt = Array.from(images).filter(img => img.alt).length
      newChecks['Images have alt text'] = images.length === 0 || imagesWithAlt === images.length

      // Viewport check
      newChecks['Viewport meta exists'] = !!document.querySelector('meta[name="viewport"]')

      // Language check
      newChecks['HTML lang attribute'] = !!document.documentElement.lang

      setChecks(newChecks)
    }

    // Run checks after a delay to ensure all meta tags are loaded
    const timer = setTimeout(runChecks, 1000)
    return () => clearTimeout(timer)
  }, [])

  if (process.env.NODE_ENV !== 'development') return null

  const passedChecks = Object.values(checks).filter(Boolean).length
  const totalChecks = Object.keys(checks).length
  const score = totalChecks > 0 ? Math.round((passedChecks / totalChecks) * 100) : 0

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        background: 'white',
        border: '2px solid #e5e7eb',
        borderRadius: '8px',
        padding: '16px',
        maxWidth: '300px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        zIndex: 9999,
        fontSize: '12px',
        fontFamily: 'system-ui, -apple-system, sans-serif'
      }}
    >
      <div style={{ marginBottom: '12px', fontWeight: 'bold', fontSize: '14px' }}>
        SEO Health Check
      </div>
      <div style={{ marginBottom: '12px' }}>
        Score: <span style={{ color: score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444', fontWeight: 'bold' }}>
          {score}%
        </span> ({passedChecks}/{totalChecks})
      </div>
      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {Object.entries(checks).map(([check, passed]) => (
          <div
            key={check}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '6px',
              color: passed ? '#10b981' : '#ef4444'
            }}
          >
            <span style={{ marginRight: '8px' }}>{passed ? '✓' : '✗'}</span>
            <span>{check}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '12px', fontSize: '10px', color: '#6b7280' }}>
        Development mode only
      </div>
    </div>
  )
}
