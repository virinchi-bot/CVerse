import type { Metadata } from 'next';
import { SITE_CONFIG } from './constants';

// 1. Explicitly define the interface for page configurations
export interface PageConfig {
  path: string;
  title: string;
  description: string;
  keywords?: string[]; // Optional array of keywords
  ogImage: string | null;
  searchable: boolean;
  noindex?: boolean;   // Optional boolean so TS knows it can be undefined
}

/**
 * Generates dynamic Next.js metadata objects for pages.
 * Handles fallbacks, canonical URLs, OpenGraph, Twitter cards, and indexing rules.
 */
export function generateMetadata(
  page: PageConfig,
  overrides?: Partial<Metadata>
): Metadata {
  const url = `${SITE_CONFIG.url}${page.path}`;
  const ogImage = page.ogImage || SITE_CONFIG.ogImage;

  return {
    title: page.title,
    description: page.description,
    keywords: page.keywords?.join(', '),
    
    // Properly evaluates missing/undefined noindex keys without breaking the build
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
    
    // Allows overriding specific metadata keys on individual pages if needed
    ...overrides,
  };
}
