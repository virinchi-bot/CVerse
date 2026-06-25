import type { Metadata } from "next";
import "./globals.css";
import { generateMetadata as genMeta, generateHomePageSchemas, JsonLd } from "@/lib/seo/metadata";
import { PAGES, SITE_CONFIG } from "@/lib/seo/constants";

export const metadata: Metadata = genMeta(PAGES.home, {
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_ID',
  },
  manifest: '/manifest.json',
  metadataBase: new URL(SITE_CONFIG.url),
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#0F1115',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  formatDetection: {
    telephone: false,
  },
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const homePageSchemas = generateHomePageSchemas();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to critical external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Optimized Google Fonts with display=swap */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,200&family=DM+Serif+Display:ital@0;1&display=swap"
          rel="stylesheet"
        />
        
        {/* Favicon and Theme */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0F1115" />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Open Graph & Twitter Meta Tags (Global defaults) */}
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        
        {/* Structured Data - JSON-LD */}
        {homePageSchemas.map((schema, idx) => (
          <JsonLd key={idx} data={schema} />
        ))}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}