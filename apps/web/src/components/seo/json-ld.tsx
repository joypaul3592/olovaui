import { cache } from 'react';

interface JsonLdProps {
  data: Record<string, unknown>
}

/**
 * JSON-LD Component for Structured Data
 * Renders schema.org structured data for rich snippets
 */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

// Convenience components for common schemas
export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Olova UI',
    'url': 'https://olovaui.olova.net',
    'logo': 'https://olovaui.olova.net/logo.svg',
    'description': 'Modern React component library with 500+ animated components',
    'foundingDate': '2024',
    'founder': {
      '@type': 'Person',
      'name': 'Nazmul Hossain'
    },
    'sameAs': [
      'https://github.com/olova.net/olovaui',
      'https://twitter.com/olovaui',
      'https://www.npmjs.com/package/olovaui'
    ],
    'address': {
      '@type': 'PostalAddress',
      'addressCountry': 'BD'
    }
  }

  return <JsonLd data={data} />
}

export function WebSiteJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Olova UI',
    'url': 'https://olovaui.olova.net',
    'description': 'Modern React component library with 500+ animated components',
    'publisher': {
      '@type': 'Organization',
      'name': 'Olova UI'
    },
    'potentialAction': {
      '@type': 'SearchAction',
      'target': {
        '@type': 'EntryPoint',
        'urlTemplate': 'https://olovaui.olova.net/docs?search={search_term_string}'
      },
      'query-input': 'required name=search_term_string'
    }
  }

  return <JsonLd data={data} />
}

const getModifiedDate = cache(() => "2025-01-14");

export function SoftwareApplicationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Olova UI',
    'description': 'Modern React component library with 500+ animated components built with Tailwind CSS and Framer Motion',
    'url': 'https://olovaui.olova.net',
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'Web',
    'softwareVersion': '1.0.0',
    'datePublished': '2024-01-01',
    'dateModified': getModifiedDate(),
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock'
    },
    'author': {
      '@type': 'Organization',
      'name': 'Olova UI Team'
    },
    'keywords': 'React components, UI library, Tailwind CSS, Framer Motion, TypeScript, Bangladesh',
    'programmingLanguage': ['TypeScript', 'JavaScript', 'CSS'],
    'downloadUrl': 'https://github.com/olova.net/olovaui',
    'license': 'https://opensource.org/licenses/MIT',
    'aggregateRating': {
      '@type': 'AggregateRating',
      'ratingValue': '4.9',
      'ratingCount': '500',
      'bestRating': '5',
      'worstRating': '1'
    }
  }

  return <JsonLd data={data} />
}

interface BreadcrumbJsonLdProps {
  items: Array<{ name: string; url: string }>
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.name,
      'item': `https://olovaui.olova.net${item.url}`
    }))
  }

  return <JsonLd data={data} />
}

interface FAQJsonLdProps {
  faqs: Array<{ question: string; answer: string }>
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const data = {
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

  return <JsonLd data={data} />
}
