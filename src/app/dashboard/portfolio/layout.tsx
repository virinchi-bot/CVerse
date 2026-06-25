import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';
import { PAGES } from '@/lib/seo/constants';

export const metadata: Metadata = generateMetadata(PAGES.portfolio);

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
