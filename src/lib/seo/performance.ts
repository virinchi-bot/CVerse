/**
 * Performance Optimization Utilities
 * Core Web Vitals optimization and best practices
 */

/**
 * Core Web Vitals targets
 */
export const CORE_WEB_VITALS = {
  LCP: {
    target: '2.5s',
    good: 2500,
    needsImprovement: 4000,
    description: 'Largest Contentful Paint - when largest visual element loads',
  },
  FID: {
    target: '100ms',
    good: 100,
    needsImprovement: 300,
    description: 'First Input Delay - delay before response to user interaction',
  },
  INP: {
    target: '200ms',
    good: 200,
    needsImprovement: 500,
    description: 'Interaction to Next Paint - visual feedback delay',
  },
  CLS: {
    target: '0.1',
    good: 0.1,
    needsImprovement: 0.25,
    description: 'Cumulative Layout Shift - unplanned layout changes',
  },
  TTFB: {
    target: '300ms',
    good: 300,
    needsImprovement: 600,
    description: 'Time to First Byte - server response time',
  },
};

/**
 * Image optimization recommendations
 */
export const IMAGE_OPTIMIZATION = {
  formats: ['webp', 'avif'],
  sizes: [320, 640, 1280, 1920],
  loading: 'lazy',
  maxWidth: 1920,
  quality: {
    default: 75,
    hero: 85,
    thumbnail: 60,
  },
  responsive: {
    mobile: '100vw',
    tablet: '50vw',
    desktop: '33vw',
  },
};

/**
 * Font optimization strategy
 */
export const FONT_OPTIMIZATION = {
  strategy: 'preload',
  display: 'swap', // Show fallback while loading
  subset: 'latin', // Only load required characters
  weights: [200, 300, 400, 500], // Only load needed weights
  preload: [
    {
      href: '/fonts/DM_Sans-400.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
    {
      href: '/fonts/DM_Serif_Display-400.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
  ],
};

/**
 * Bundle size optimization targets
 */
export const BUNDLE_TARGETS = {
  javascript: {
    critical: '50KB', // Loaded immediately
    main: '150KB', // Main app bundle
    total: '300KB', // All JS combined
  },
  css: {
    critical: '10KB',
    total: '50KB',
  },
  images: {
    hero: '100KB',
    average: '50KB',
    thumbnail: '10KB',
  },
};

/**
 * Code splitting strategy
 */
export const CODE_SPLITTING = {
  vendors: 'chunks/vendors.js', // Third-party libraries
  main: 'chunks/main.js', // App code
  pages: 'chunks/pages/[name].js', // Route-specific code
  lazy: {
    three: 'Three.js and related 3D libs',
    lenis: 'Smooth scroll library',
    gsap: 'Animation library',
  },
};

/**
 * Caching strategy
 */
export const CACHING_STRATEGY = {
  html: {
    maxAge: 0,
    sMaxAge: 0,
    revalidate: 'no-cache',
  },
  assets: {
    maxAge: 31536000, // 1 year
    sMaxAge: 31536000,
    immutable: true,
  },
  data: {
    maxAge: 3600, // 1 hour
    sMaxAge: 3600,
    revalidate: 3600,
  },
  images: {
    maxAge: 86400, // 1 day
    sMaxAge: 86400,
    revalidate: 86400,
  },
};

/**
 * Next.js Image optimization config
 */
export const NEXT_IMAGE_CONFIG = {
  formats: ['image/avif', 'image/webp'],
  minimumCacheTTL: 60,
  dangerouslyAllowSVG: false,
  responsive: true,
  loader: 'default',
};

/**
 * Critical rendering path optimization
 */
export const CRITICAL_RENDERING_PATH = {
  /**
   * Resources needed for initial paint
   */
  critical: [
    'HTML',
    'Critical CSS',
    'Critical JavaScript',
    'Above-the-fold images',
  ],

  /**
   * Deferrable resources
   */
  deferrable: [
    'Non-critical JavaScript',
    'Below-the-fold images',
    'Analytics scripts',
    'Third-party scripts',
  ],

  /**
   * Preload strategy
   */
  preload: [
    '/fonts/DM_Sans-400.woff2',
    '/fonts/DM_Serif_Display-400.woff2',
    '/critical.css',
  ],

  /**
   * Prefetch strategy (low priority resources)
   */
  prefetch: [
    '/dashboard',
    '/api/user',
  ],
};

/**
 * React rendering optimization
 */
export const REACT_OPTIMIZATION = {
  /**
   * Use React.memo for components that don't change often
   */
  useMemo: true,

  /**
   * Use useCallback to memoize functions
   */
  useCallback: true,

  /**
   * Avoid unnecessary re-renders
   */
  avoidInlineObjects: true,

  /**
   * Use dynamic imports for code splitting
   */
  dynamicImports: true,

  /**
   * Lazy load components
   */
  lazyLoadComponents: ['Three.js Canvas', 'Animations', 'Modals'],

  /**
   * Server-side rendering targets
   */
  ssr: true,

  /**
   * Client-side hydration optimization
   */
  suppressHydrationWarnings: false,
};

/**
 * Lighthouse performance targets
 */
export const LIGHTHOUSE_TARGETS = {
  performance: 95,
  accessibility: 95,
  bestPractices: 95,
  seo: 100,
};

/**
 * Performance budget (size limits)
 */
export const PERFORMANCE_BUDGET = {
  /**
   * JavaScript size budgets (uncompressed)
   */
  js: {
    critical: 50 * 1024, // 50KB
    main: 150 * 1024, // 150KB
    total: 300 * 1024, // 300KB
  },

  /**
   * CSS size budgets
   */
  css: {
    critical: 10 * 1024, // 10KB
    total: 50 * 1024, // 50KB
  },

  /**
   * Image size budgets
   */
  images: {
    hero: 100 * 1024, // 100KB
    average: 50 * 1024, // 50KB
    thumbnail: 10 * 1024, // 10KB
  },

  /**
   * Total page size
   */
  totalPage: 500 * 1024, // 500KB
};

/**
 * Performance monitoring events
 */
export const PERFORMANCE_EVENTS = {
  LCP: 'largest-contentful-paint',
  FID: 'first-input',
  CLS: 'layout-shift',
  INP: 'interaction-to-next-paint',
  TTFB: 'time-to-first-byte',
};

/**
 * Common performance anti-patterns to avoid
 */
export const PERFORMANCE_ANTI_PATTERNS = [
  'Large JavaScript bundles (>250KB)',
  'Unoptimized images (>100KB)',
  'Render-blocking resources',
  'Synchronous scripts in head',
  'Unnecessary layout shifts',
  'Large DOM trees (>1500 nodes)',
  'Multiple network requests',
  'Uncompressed assets',
  'Missing gzip/brotli compression',
  'Inline large JavaScript',
];
