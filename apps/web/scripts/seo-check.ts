#!/usr/bin/env tsx

/**
 * SEO Health Check Script
 * Validates SEO implementation across the site
 */

import fs from 'fs'
import path from 'path'

interface SEOIssue {
  severity: 'error' | 'warning' | 'info'
  message: string
  file?: string
}

const issues: SEOIssue[] = []

// Check if sitemap exists
function checkSitemap() {
  const sitemapPath = path.join(process.cwd(), 'src', 'app', 'sitemap.ts')
  if (!fs.existsSync(sitemapPath)) {
    issues.push({
      severity: 'error',
      message: 'sitemap.ts not found in src/app',
      file: 'src/app/sitemap.ts'
    })
  } else {
    issues.push({
      severity: 'info',
      message: '✓ Dynamic sitemap.ts exists'
    })
  }
}

// Check if robots.txt exists
function checkRobots() {
  const robotsPath = path.join(process.cwd(), 'src', 'app', 'robots.ts')
  if (!fs.existsSync(robotsPath)) {
    issues.push({
      severity: 'error',
      message: 'robots.ts not found in src/app',
      file: 'src/app/robots.ts'
    })
  } else {
    issues.push({
      severity: 'info',
      message: '✓ Dynamic robots.ts exists'
    })
  }
}

// Check metadata configuration
function checkMetadata() {
  const metadataPath = path.join(process.cwd(), 'src', 'lib', 'metadata.ts')
  if (!fs.existsSync(metadataPath)) {
    issues.push({
      severity: 'warning',
      message: 'metadata.ts not found in src/lib',
      file: 'src/lib/metadata.ts'
    })
  } else {
    const content = fs.readFileSync(metadataPath, 'utf-8')
    
    // Check for essential metadata
    if (!content.includes('title')) {
      issues.push({
        severity: 'error',
        message: 'Title metadata missing',
        file: metadataPath
      })
    }
    
    if (!content.includes('description')) {
      issues.push({
        severity: 'error',
        message: 'Description metadata missing',
        file: metadataPath
      })
    }
    
    if (!content.includes('keywords')) {
      issues.push({
        severity: 'warning',
        message: 'Keywords metadata missing',
        file: metadataPath
      })
    }
    
    if (!content.includes('openGraph')) {
      issues.push({
        severity: 'warning',
        message: 'Open Graph metadata missing',
        file: metadataPath
      })
    }
    
    if (content.includes('title') && content.includes('description') && content.includes('openGraph')) {
      issues.push({
        severity: 'info',
        message: '✓ Essential metadata configured'
      })
    }
  }
}

// Check structured data
function checkStructuredData() {
  const structuredDataPath = path.join(process.cwd(), 'src', 'components', 'seo', 'StructuredData.tsx')
  if (!fs.existsSync(structuredDataPath)) {
    issues.push({
      severity: 'warning',
      message: 'StructuredData component not found',
      file: 'src/components/seo/StructuredData.tsx'
    })
  } else {
    issues.push({
      severity: 'info',
      message: '✓ Structured data component exists'
    })
  }
}

// Check for llms.txt
function checkLLMsTxt() {
  const llmsPath = path.join(process.cwd(), 'public', 'llms.txt')
  if (!fs.existsSync(llmsPath)) {
    issues.push({
      severity: 'warning',
      message: 'llms.txt not found (recommended for AI search engines)',
      file: 'public/llms.txt'
    })
  } else {
    const content = fs.readFileSync(llmsPath, 'utf-8')
    if (content.length < 500) {
      issues.push({
        severity: 'warning',
        message: 'llms.txt content is too short (should be comprehensive)',
        file: llmsPath
      })
    } else {
      issues.push({
        severity: 'info',
        message: '✓ llms.txt exists with good content'
      })
    }
  }
}

// Check for OG images
function checkOGImages() {
  const ogImagePath = path.join(process.cwd(), 'public', 'og-image.png')
  if (!fs.existsSync(ogImagePath)) {
    issues.push({
      severity: 'warning',
      message: 'Default og-image.png not found',
      file: 'public/og-image.png'
    })
  } else {
    issues.push({
      severity: 'info',
      message: '✓ Default OG image exists'
    })
  }
}

// Check SEO utilities
function checkSEOUtils() {
  const seoPath = path.join(process.cwd(), 'src', 'lib', 'seo.ts')
  const seoAdvancedPath = path.join(process.cwd(), 'src', 'lib', 'seo-advanced.ts')
  
  if (!fs.existsSync(seoPath)) {
    issues.push({
      severity: 'warning',
      message: 'SEO utilities not found',
      file: 'src/lib/seo.ts'
    })
  } else {
    issues.push({
      severity: 'info',
      message: '✓ SEO utilities exist'
    })
  }
  
  if (fs.existsSync(seoAdvancedPath)) {
    issues.push({
      severity: 'info',
      message: '✓ Advanced SEO utilities exist'
    })
  }
}

// Main execution
function main() {
  console.warn('🔍 Running SEO Health Check...\n')
  
  checkSitemap()
  checkRobots()
  checkMetadata()
  checkStructuredData()
  checkLLMsTxt()
  checkOGImages()
  checkSEOUtils()
  
  // Categorize issues
  const errors = issues.filter(i => i.severity === 'error')
  const warnings = issues.filter(i => i.severity === 'warning')
  const info = issues.filter(i => i.severity === 'info')
  
  // Display results
  console.warn('📊 SEO Health Check Results\n')
  console.warn('=' .repeat(50))
  
  if (info.length > 0) {
    console.warn('\n✅ Passed Checks:')
    info.forEach(issue => {
      console.warn(`   ${issue.message}`)
    })
  }
  
  if (warnings.length > 0) {
    console.warn('\n⚠️  Warnings:')
    warnings.forEach(issue => {
      console.warn(`   ${issue.message}`)
      if (issue.file) console.warn(`   File: ${issue.file}`)
    })
  }
  
  if (errors.length > 0) {
    console.warn('\n❌ Errors:')
    errors.forEach(issue => {
      console.warn(`   ${issue.message}`)
      if (issue.file) console.warn(`   File: ${issue.file}`)
    })
  }
  
  // Summary
  console.warn('\n' + '='.repeat(50))
  console.warn(`\n📈 Summary:`)
  console.warn(`   ✓ Passed: ${info.length}`)
  console.warn(`   ⚠ Warnings: ${warnings.length}`)
  console.warn(`   ✗ Errors: ${errors.length}`)
  
  const score = Math.round((info.length / issues.length) * 100)
  console.warn(`\n🎯 SEO Score: ${score}%`)
  
  if (score >= 80) {
    console.warn('   Status: Excellent! 🎉')
  } else if (score >= 60) {
    console.warn('   Status: Good, but room for improvement 👍')
  } else {
    console.warn('   Status: Needs attention ⚠️')
  }
  
  console.warn('\n' + '='.repeat(50))
  
  // Exit with error code if there are errors
  if (errors.length > 0) {
    process.exit(1)
  }
}

main()
