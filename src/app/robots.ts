import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: ['/dashboard', '/api/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: ['/'],
        disallow: ['/dashboard', '/api/', '/(auth)'],
        crawlDelay: 1,
      },
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/dashboard', '/api/', '/(auth)'],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://cverse.dev/sitemap.xml',
    host: 'https://cverse.dev',
  };
}
