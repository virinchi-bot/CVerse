import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';
import { SITE_CONFIG } from '@/lib/seo/constants';

const projectsMetadata: Metadata = {
  title: 'Projects - CVerse',
  description: 'Your project portfolio and management dashboard.',
  robots: 'noindex, nofollow',
};

export const metadata: Metadata = projectsMetadata;

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
