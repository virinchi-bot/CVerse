/**
 * SEO Constants for CVerse
 * Centralized configuration for all SEO-related values
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://cverse.dev';

export const SITE_CONFIG = {
  name: 'CVerse',
  url: SITE_URL,
  domain: 'cverse.dev',
  description: 'AI-powered career intelligence platform. Resume analysis, skill gaps, mock interviews, and more.',
  ogImage: `${SITE_URL}/auth-img.png`,
  twitterHandle: '@CVerseAI',
  email: 'support@cverse.dev',
  locale: 'en_US',
};

export const PAGES = {
  home: {
    path: '/',
    title: 'CVerse - AI Resume & Career Intelligence Platform',
    description: 'Get AI-powered resume analysis, skill gap detection, mock interviews, career guidance, and LinkedIn branding. Engineered to get you noticed.',
    keywords: ['AI resume analyzer', 'career intelligence', 'ATS optimization', 'skill gaps'],
    ogImage: null,
    searchable: true,
  },
  dashboard: {
    path: '/dashboard',
    title: 'Dashboard - CVerse Career Intelligence',
    description: 'Access all your CV intelligence tools. Resume analyzer, skill gaps, interviews, and more.',
    keywords: ['career dashboard', 'resume tools', 'AI tools'],
    ogImage: null,
    searchable: false, // Requires login
  },
  resume: {
    path: '/dashboard/resume',
    title: 'AI Resume Analyzer - Get Your ATS Score Instantly',
    description: 'Upload your resume for instant ATS scoring, clarity rating, impact analysis, and skill assessment. Get actionable improvement suggestions.',
    keywords: ['ATS score', 'resume analyzer', 'ATS optimization', 'resume checker', 'ATS resume'],
    ogImage: null,
    searchable: false,
  },
  skills: {
    path: '/dashboard/skills',
    title: 'Skill Gap Detection - Find Missing Skills for Your Dream Role',
    description: 'Analyze your current skills and discover what you need to learn for your target position. Get personalized reskilling recommendations.',
    keywords: ['skill gap analysis', 'skill assessment', 'career skills', 'reskilling', 'job requirements'],
    ogImage: null,
    searchable: false,
  },
  interview: {
    path: '/dashboard/interview',
    title: 'AI Mock Interview - Practice with AI Interview Coach',
    description: 'Practice with AI-generated interview questions based on your resume and target role. Get instant feedback and improve your interview skills.',
    keywords: ['mock interview', 'interview prep', 'interview questions', 'interview practice', 'AI interview coach'],
    ogImage: null,
    searchable: false,
  },
  cv: {
    path: '/dashboard/career',
    title: 'CV Direction - AI Career Path Recommendations',
    description: 'Get AI-powered recommendations on the best CV strategies and career paths based on your profile and job market analysis.',
    keywords: ['career path', 'career planning', 'career recommendations', 'job market', 'career direction'],
    ogImage: null,
    searchable: false,
  },
  branding: {
    path: '/dashboard/branding',
    title: 'LinkedIn Branding - AI Personal Brand Builder',
    description: 'Generate authentic LinkedIn posts, optimize your profile, create GitHub bios, and build a strong personal brand.',
    keywords: ['LinkedIn optimization', 'personal branding', 'LinkedIn posts', 'GitHub bio', 'online presence'],
    ogImage: null,
    searchable: false,
  },
  portfolio: {
    path: '/dashboard/portfolio',
    title: 'Portfolio Generator - AI-Powered Portfolio Builder',
    description: 'Auto-generate professional portfolio content from your resume and projects. Create compelling project descriptions and showcase your work.',
    keywords: ['portfolio generator', 'portfolio builder', 'project showcase', 'portfolio website', 'portfolio content'],
    ogImage: null,
    searchable: false,
  },
  login: {
    path: '/login',
    title: 'Sign In - CVerse',
    description: 'Sign in to your CVerse account to access resume analysis and career intelligence tools.',
    keywords: ['login', 'sign in'],
    ogImage: `${SITE_CONFIG.url}/auth-img.png`,
    searchable: false,
    noindex: true,
  },
  register: {
    path: '/register',
    title: 'Create Account - CVerse',
    description: 'Sign up for CVerse to get started with AI-powered resume analysis and career intelligence.',
    keywords: ['signup', 'register'],
    ogImage: `${SITE_CONFIG.url}/auth-img.png`,
    searchable: false,
    noindex: true,
  },
};

export const SCHEMA_TYPES = {
  ORGANIZATION: 'Organization',
  WEBSITE: 'WebSite',
  WEBAPP: 'WebApplication',
  BREADCRUMB: 'BreadcrumbList',
  FAQ: 'FAQPage',
  ARTICLE: 'Article',
  PERSON: 'Person',
  PRODUCT: 'Product',
  SOFTWAREAPP: 'SoftwareApplication',
};

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/CVerseAI',
  linkedin: 'https://linkedin.com/company/cverse',
  github: 'https://github.com/cverse',
};

export const ROBOTS_CONFIG = {
  rules: [
    {
      userAgent: 'Googlebot',
      allow: '/',
      disallow: ['/dashboard', '/api/'],
      crawlDelay: 0,
    },
    {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/api/', '/(auth)'],
      crawlDelay: 1,
    },
  ],
  sitemap: 'https://cverse.dev/sitemap.xml',
};

export const PERFORMANCE_HINTS = {
  dns: ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'],
  preload: [
    {
      href: '/fonts/DM_Sans-400.woff2',
      as: 'font',
      type: 'font/woff2',
      crossOrigin: 'anonymous',
    },
  ],
};

export const TOOL_FAQS = {
  resume: [
    {
      question: 'What is an ATS score?',
      answer: 'An ATS (Applicant Tracking System) score measures how well your resume is optimized to pass through automated screening systems used by recruiters.',
    },
    {
      question: 'How accurate is the resume analyzer?',
      answer: 'Our AI model is trained on 10,000+ ATS databases and real recruiter feedback, achieving 94% accuracy in predicting ATS pass/fail rates.',
    },
    {
      question: 'Can I improve my ATS score?',
      answer: 'Yes! CVerse provides actionable recommendations for formatting, keywords, and structure. Most users improve their ATS score by 20-40 points.',
    },
  ],
  skills: [
    {
      question: 'How does skill gap analysis work?',
      answer: 'We analyze your current skills, compare them with job market requirements for your target role, and identify gaps in high-demand skills.',
    },
    {
      question: 'Are the recommendations realistic?',
      answer: 'Yes. Our recommendations are based on real job postings and career progression data from 50,000+ professionals.',
    },
  ],
  interview: [
    {
      question: 'How realistic is the mock interview?',
      answer: 'Our AI generates company-specific and role-specific questions based on actual interview patterns used by top tech companies.',
    },
    {
      question: 'Can I practice multiple times?',
      answer: 'Absolutely! Practice unlimited times. Each session generates new questions and provides detailed feedback on your answers.',
    },
  ],
};
