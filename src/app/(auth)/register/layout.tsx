import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/seo/metadata';
import { PAGES } from '@/lib/seo/constants';

export const metadata: Metadata = generateMetadata(PAGES.register);

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
