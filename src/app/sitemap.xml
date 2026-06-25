import type { MetadataRoute } from 'next';
import { PAGES } from '@/lib/seo/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cverse.dev';

  // Filter only searchable pages (public pages)
  const searchablePages = Object.values(PAGES).filter((page) => page.searchable !== false);

  const routes = searchablePages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: new Date(),
    changeFrequency: page.path === '/' ? 'weekly' : 'monthly',
    priority: page.path === '/' ? 1.0 : 0.8,
  }));

  return routes as MetadataRoute.Sitemap;
}
