import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';
import { PAGES } from '@/lib/seo/constants';

export const metadata: Metadata = generateMetadata(PAGES.branding);

export default function BrandingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
