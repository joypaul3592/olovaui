// SEO Configuration for Olova UI
export const seoConfig = {
  // Basic site information
  siteName: 'Olova UI',
  siteUrl: 'https://olovaui.olova.net',
  siteDescription: 'Modern React component library with 50+ animated components built with Tailwind CSS and Framer Motion. Free, open-source, and production-ready for modern web applications.',

  // Social media
  social: {
    twitter: '@olovaui',
    github: 'https://github.com/olova.net/olovaui',
    discord: 'https://discord.gg/olovaui',
    npm: 'https://www.npmjs.com/package/olovaui'
  },

  // Default metadata
  defaultMetadata: {
    title: 'Olova UI - Modern React Component Library | 50+ Animated Components',
    description: 'Build stunning web applications with Olova UI\'s 50+ animated React components. Free, open-source, built with Tailwind CSS & Framer Motion. Perfect for developers who want beautiful, accessible, and performant UI components.',
    keywords: [
      'React components',
      'UI library',
      'Tailwind CSS',
      'Framer Motion',
      'TypeScript',
      'Next.js',
      'animated components',
      'modern UI',
      'open source',
      'free components',
      'shadcn alternative',
      'Bangladesh UI library',
      'copy paste components',
      'responsive design',
      'accessible components',
      'dark mode',
      'component library',
      'design system'
    ],
    authors: ['Olova UI Team'],
    creator: 'Olova UI Team',
    publisher: 'Olova UI',
    category: 'technology'
  },

  // Open Graph defaults
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Olova UI',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Olova UI - Modern React Component Library'
      }
    ]
  },

  // Twitter defaults
  twitter: {
    card: 'summary_large_image',
    site: '@olovaui',
    creator: '@olovaui'
  },

  // Robots configuration
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },

  // Component categories for better organization
  componentCategories: {
    'UI Components': {
      description: 'Essential UI components for modern web applications',
      components: ['button', 'card', 'badge', 'tabs', 'dropdown', 'navbar', 'footer', 'dock', 'marquee']
    },
    'Form Components': {
      description: 'Beautiful and accessible form components',
      components: ['login', 'signin', 'password', 'forgotpassword', 'twostep', 'multiselector', 'search']
    },
    'Animation Components': {
      description: 'Engaging animation and text effect components',
      components: ['flipwords', 'textreveal', 'sparklestext', 'decrypting', 'shimmer', 'loaders', 'retro']
    },
    'Layout Components': {
      description: 'Complete layout sections and templates',
      components: ['hero', 'pricing', 'testimonial', 'portfolio', 'teammember', 'waitlist', 'filetree', 'masonary']
    },
    'Interactive Components': {
      description: 'Interactive and dynamic components',
      components: ['carousel', 'network', 'copybutton', 'colorpalette', 'gradient', 'fuzzy', 'magic', 'spotlightcard']
    },
    'Specialized Components': {
      description: 'Specialized components for specific use cases',
      components: ['nftmarketplace', 'amazongift', 'codeprofile', 'pattern', 'aurora', 'integrations', 'prompt']
    }
  },

  // Analytics configuration
  analytics: {
    googleAnalytics: 'G-KCJ7NVNQ62',
    hotjar: '3849284',
    clarity: 'n8j9k2l3m4'
  },

  // Performance thresholds for monitoring
  performance: {
    lcp: { good: 2500, needsImprovement: 4000 },
    fid: { good: 100, needsImprovement: 300 },
    cls: { good: 0.1, needsImprovement: 0.25 },
    fcp: { good: 1800, needsImprovement: 3000 },
    tti: { good: 3800, needsImprovement: 7300 }
  },

  // Structured data templates
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Olova UI',
      url: 'https://olovaui.olova.net',
      logo: 'https://olovaui.olova.net/logo.svg',
      description: 'Modern React component library for developers',
      foundingDate: '2024',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'BD'
      }
    },

    softwareApplication: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Olova UI',
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD'
      }
    }
  }
}

export default seoConfig