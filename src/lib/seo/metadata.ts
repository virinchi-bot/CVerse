/**
 * SEO Metadata Utilities
 * Generate consistent metadata across all pages
 */

import { createElement } from 'react';
import type { Metadata } from 'next';
import { SITE_CONFIG, PAGES } from './constants';

export function generateMetadata(
  page: (typeof PAGES)[keyof typeof PAGES],
  overrides?: Partial<Metadata>
): Metadata {
  const url = `${SITE_CONFIG.url}${page.path}`;
  const ogImage = page.ogImage || SITE_CONFIG.ogImage;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords?.join(', '),
    robots: page.noindex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      siteName: SITE_CONFIG.name,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: SITE_CONFIG.name }] : [],
      type: 'website',
      locale: SITE_CONFIG.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.title,
      description: page.description,
      images: ogImage ? [ogImage] : [],
      creator: SITE_CONFIG.twitterHandle,
    },
    alternates: {
      canonical: url,
    },
    ...overrides,
  };
}

export function getCanonicalUrl(path: string): string {
  return `${SITE_CONFIG.url}${path}`;
}

export function generateBreadcrumb(
  items: Array<{ name: string; url: string }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description: SITE_CONFIG.description,
    sameAs: [
      'https://twitter.com/CVerseAI',
      'https://linkedin.com/company/cverse',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Support',
      email: SITE_CONFIG.email,
    },
  };
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

export function generateWebAppSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    applicationCategory: 'BusinessApplication',
    offers: {
      '@type': 'Offer',
      price: 'Free',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
    },
    author: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
    },
  };
}

export function generateToolSchema(tool: {
  name: string;
  description: string;
  url: string;
  icon?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: tool.name,
    description: tool.description,
    url: tool.url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: 'Free',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.7',
      ratingCount: '500',
    },
  };
}

export function generateArticleSchema(article: {
  headline: string;
  description: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  url: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    author: {
      '@type': 'Organization',
      name: article.author || SITE_CONFIG.name,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
  };
}

export function generateHowToSchema(howTo: {
  name: string;
  description: string;
  steps: Array<{
    name: string;
    description: string;
  }>;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: howTo.name,
    description: howTo.description,
    step: howTo.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.description,
    })),
  };
}

/**
 * JSON-LD Script component - use in layout
 */
export function JsonLd({ data }: { data: any }) {
  return createElement('script', {
    type: 'application/ld+json',
    dangerouslySetInnerHTML: { __html: JSON.stringify(data) },
  });
}

/**
 * Generate all schema for home page
 */
export function generateHomePageSchemas() {
  return [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateWebAppSchema(),
  ];
}

/**
 * Get page config by path
 */
export function getPageConfig(path: string) {
  return Object.values(PAGES).find((page) => page.path === path) || PAGES.home;
}
