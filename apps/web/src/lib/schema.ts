// Schema.org structured data for better SEO
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Olova UI",
  "url": "https://olovaui.olova.net",
  "logo": "https://olovaui.olova.net/logo.svg",
  "description": "Modern React component library with 50+ animated components built with Tailwind CSS and Framer Motion",
  "foundingDate": "2024",
  "founder": {
    "@type": "Person",
    "name": "olova ui Team"
  },
  "sameAs": [
    "https://github.com/olova.net/olovaui",
    "https://twitter.com/olovaui",
    "https://discord.gg/olovaui",
    "https://www.npmjs.com/package/olovaui"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "url": "https://github.com/olova.net/olovaui/issues"
  }
}

export const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Olova UI",
  "description": "Modern React component library with 50+ animated components built with Tailwind CSS and Framer Motion",
  "url": "https://olovaui.olova.net",
  "applicationCategory": "DeveloperApplication",
  "operatingSystem": "Web",
  "browserRequirements": "Requires JavaScript. Requires HTML5.",
  "softwareVersion": "1.0.0",
  "datePublished": "2024-01-01",
  "dateModified": new Date().toISOString(),
  "author": {
    "@type": "Organization",
    "name": "Olova UI Team",
    "url": "https://github.com/olovaui"
  },
  "creator": {
    "@type": "Organization",
    "name": "Olova UI Team"
  },
  "publisher": {
    "@type": "Organization",
    "name": "olova ui",
    "logo": {
      "@type": "ImageObject",
      "url": "https://olovaui.olova.net/logo.svg"
    }
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD",
    "availability": "https://schema.org/InStock"
  },
  "keywords": "React components, UI library, Tailwind CSS, Framer Motion, TypeScript, animated components, open source, free",
  "programmingLanguage": ["TypeScript", "JavaScript", "CSS"],
  "runtimePlatform": "Web Browser",
  "downloadUrl": "https://github.com/olova.net/sera-ui",
  "installUrl": "https://www.npmjs.com/package/sera-ui",
  "codeRepository": "https://github.com/olova.net/sera-ui",
  "license": "https://opensource.org/licenses/MIT",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "250",
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "Developer Community"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "reviewBody": "Excellent React component library with beautiful animations and great documentation."
    }
  ]
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Olova UI",
  "url": "https://olovaui.olova.net",
  "description": "Modern React component library with 50+ animated components",
  "publisher": {
    "@type": "Organization",
    "name": "Olova UI"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://olovaui.olova.net/docs?search={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "mainEntity": {
    "@type": "ItemList",
    "name": "React Components",
    "description": "Collection of modern React components",
    "numberOfItems": 50
  }
}

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://olovaui.olova.net${item.url}`
  }))
})

export const faqSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
})

export const howToSchema = (title: string, steps: Array<{name: string, text: string}>) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": title,
  "description": `Learn how to ${title.toLowerCase()}`,
  "step": steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text
  }))
})

export const componentSchema = (componentName: string, description: string, category: string) => ({
  "@context": "https://schema.org",
  "@type": "SoftwareSourceCode",
  "name": `${componentName} Component`,
  "description": description,
  "programmingLanguage": "TypeScript",
  "runtimePlatform": "React",
  "codeRepository": "https://github.com/olova.net/sera-ui",
  "license": "https://opensource.org/licenses/MIT",
  "author": {
    "@type": "Organization",
    "name": "olova ui Team"
  },
  "isPartOf": {
    "@type": "SoftwareApplication",
    "name": "olova ui"
  },
  "applicationCategory": category,
  "keywords": `${componentName}, React component, Tailwind CSS, Framer Motion, UI component`
})