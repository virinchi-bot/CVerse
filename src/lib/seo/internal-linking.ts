/**
 * Internal Linking Strategy & Components
 * Implements strategic internal linking for better SEO
 */

import { PAGES, SITE_CONFIG } from './constants';

export type LinkType = 'related-tool' | 'related-page' | 'breadcrumb' | 'contextual' | 'footer';

export interface InternalLink {
  text: string;
  href: string;
  title: string;
  rel?: string;
}

/**
 * Get related tools for a given tool
 */
export function getRelatedTools(currentPath: string): InternalLink[] {
  const toolLinks: Record<string, InternalLink[]> = {
    [PAGES.resume.path]: [
      {
        text: 'Find Your Skill Gaps',
        href: PAGES.skills.path,
        title: 'Discover missing skills for your target role',
        rel: 'related',
      },
      {
        text: 'Prepare for Interviews',
        href: PAGES.interview.path,
        title: 'Practice with AI mock interviews',
        rel: 'related',
      },
      {
        text: 'Plan Your Career',
        href: PAGES.cv.path,
        title: 'Get AI-powered career recommendations',
        rel: 'related',
      },
    ],
    [PAGES.skills.path]: [
      {
        text: 'Optimize Your Resume',
        href: PAGES.resume.path,
        title: 'Get ATS score and improvement suggestions',
        rel: 'related',
      },
      {
        text: 'Build Your Brand',
        href: PAGES.branding.path,
        title: 'Optimize LinkedIn and personal branding',
        rel: 'related',
      },
    ],
    [PAGES.interview.path]: [
      {
        text: 'Analyze Your Resume',
        href: PAGES.resume.path,
        title: 'Get ATS score and optimization tips',
        rel: 'related',
      },
      {
        text: 'Build Your Portfolio',
        href: PAGES.portfolio.path,
        title: 'Create a compelling project showcase',
        rel: 'related',
      },
    ],
    [PAGES.cv.path]: [
      {
        text: 'Optimize Your Resume',
        href: PAGES.resume.path,
        title: 'Improve your ATS score',
        rel: 'related',
      },
      {
        text: 'Find Your Skill Gaps',
        href: PAGES.skills.path,
        title: 'Discover skills you need to learn',
        rel: 'related',
      },
    ],
    [PAGES.branding.path]: [
      {
        text: 'Create Your Portfolio',
        href: PAGES.portfolio.path,
        title: 'Build a professional portfolio',
        rel: 'related',
      },
      {
        text: 'Optimize Your Resume',
        href: PAGES.resume.path,
        title: 'Improve your resume quality',
        rel: 'related',
      },
    ],
    [PAGES.portfolio.path]: [
      {
        text: 'Build Your Personal Brand',
        href: PAGES.branding.path,
        title: 'Optimize LinkedIn and social presence',
        rel: 'related',
      },
      {
        text: 'Analyze Your Resume',
        href: PAGES.resume.path,
        title: 'Get resume optimization tips',
        rel: 'related',
      },
    ],
  };

  return toolLinks[currentPath] || [];
}

/**
 * Generate breadcrumb trail for navigation
 */
export function getBreadcrumbs(path: string): InternalLink[] {
  const breadcrumbs: InternalLink[] = [
    { text: 'Home', href: '/', title: 'CVerse Home' },
  ];

  // Add intermediate breadcrumbs based on path
  if (path.startsWith('/dashboard')) {
    breadcrumbs.push({
      text: 'Dashboard',
      href: '/dashboard',
      title: 'Dashboard Home',
    });

    // Add specific page breadcrumb
    const pageMap: Record<string, InternalLink> = {
      resume: { text: 'Resume Analyzer', href: PAGES.resume.path, title: PAGES.resume.title },
      skills: { text: 'Skill Gaps', href: PAGES.skills.path, title: PAGES.skills.title },
      interview: { text: 'Mock Interview', href: PAGES.interview.path, title: PAGES.interview.title },
      cv: { text: 'CV Direction', href: PAGES.cv.path, title: PAGES.cv.title },
      branding: { text: 'LinkedIn Branding', href: PAGES.branding.path, title: PAGES.branding.title },
      portfolio: { text: 'Portfolio Generator', href: PAGES.portfolio.path, title: PAGES.portfolio.title },
    };

    const pathSegment = path.split('/')[2];
    if (pathSegment && pageMap[pathSegment]) {
      breadcrumbs.push(pageMap[pathSegment]);
    }
  } else if (path === '/login') {
    breadcrumbs.push({
      text: 'Sign In',
      href: '/login',
      title: 'Sign In to CVerse',
    });
  } else if (path === '/register') {
    breadcrumbs.push({
      text: 'Create Account',
      href: '/register',
      title: 'Create a CVerse Account',
    });
  }

  return breadcrumbs;
}

/**
 * Get footer links (site structure navigation)
 */
export function getFooterLinks(): Record<string, InternalLink[]> {
  return {
    'CV Tools': [
      {
        text: 'Resume Analyzer',
        href: PAGES.resume.path,
        title: 'Analyze your resume',
      },
      {
        text: 'Skill Gap Detection',
        href: PAGES.skills.path,
        title: 'Find missing skills',
      },
      {
        text: 'CV Direction',
        href: PAGES.cv.path,
        title: 'Career recommendations',
      },
    ],
    'Interview & Branding': [
      {
        text: 'Mock Interview',
        href: PAGES.interview.path,
        title: 'Interview practice',
      },
      {
        text: 'LinkedIn Branding',
        href: PAGES.branding.path,
        title: 'Personal branding',
      },
      {
        text: 'Portfolio Generator',
        href: PAGES.portfolio.path,
        title: 'Build your portfolio',
      },
    ],
    Account: [
      {
        text: 'Sign In',
        href: PAGES.login.path,
        title: 'Sign in to your account',
      },
      {
        text: 'Create Account',
        href: PAGES.register.path,
        title: 'Create a new account',
      },
      {
        text: 'Dashboard',
        href: PAGES.dashboard.path,
        title: 'Access dashboard',
      },
    ],
  };
}

/**
 * Get all public pages for sitemap and navigation
 */
export function getAllPublicPages(): InternalLink[] {
  return Object.values(PAGES)
    .filter((page) => page.searchable !== false)
    .map((page) => ({
      text: page.title,
      href: page.path,
      title: page.description,
    }));
}

/**
 * Anchor link component props helper
 */
export function getLinkProps(link: InternalLink) {
  return {
    href: link.href,
    title: link.title,
    rel: link.rel,
  };
}
