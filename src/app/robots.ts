import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: ['/'],
        disallow: ['/api/'],
        crawlDelay: 0,
      },
      {
        userAgent: 'Bingbot',
        allow: ['/'],
        disallow: ['/api/'],
        crawlDelay: 1,
      },
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/api/'],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://cverse-analyze.vercel.app/sitemap.xml',
    host: 'https://cverse-analyze.vercel.app',
  };
}
