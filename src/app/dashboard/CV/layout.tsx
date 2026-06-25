import type { Metadata } from 'next';
import { generateMetadata, JsonLd } from '@/lib/seo/metadata';
import { PAGES } from '@/lib/seo/constants';

export const metadata: Metadata = generateMetadata(PAGES.cv);

export default function CVLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
    </>
  );
}
