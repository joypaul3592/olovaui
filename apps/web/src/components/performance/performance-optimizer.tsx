'use client'

import { useEffect } from 'react'

// Performance optimization component for better Core Web Vitals
export function PerformanceOptimizer() {
  useEffect(() => {
    const optimizeThirdPartyScripts = () => {
      const scripts = document.querySelectorAll('script[data-delay]')
      scripts.forEach(script => {
        setTimeout(() => {
          const newScript = document.createElement('script')
          newScript.src = script.getAttribute('data-delay')!
          newScript.async = true
          document.head.appendChild(newScript)
        }, 3000)
      })
    }

    // Service Worker registration for caching
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator) {
        try {
          await navigator.serviceWorker.register('/sw.js')
          console.warn('Service Worker registered successfully')
        } catch (error) {
          console.warn('Service Worker registration failed:', error)
        }
      }
    }

    optimizeThirdPartyScripts()
    registerServiceWorker()

    // Monitor performance
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        // Log performance metrics for debugging
        if (process.env.NODE_ENV === 'development') {
          console.warn(`${entry.name}: ${entry.startTime}ms`)
        }
      }
    })

    observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint'] })

    return () => {
      observer.disconnect()
    }
  }, [])

  return null
}

export default PerformanceOptimizer