import type { Metadata } from 'next';
import { generateMetadata, generateFAQSchema, JsonLd } from '@/lib/seo/metadata';
import { PAGES, TOOL_FAQS } from '@/lib/seo/constants';

export const metadata: Metadata = generateMetadata(PAGES.resume);

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  const faqSchema = generateFAQSchema(TOOL_FAQS.resume);

  return (
    <>
      <JsonLd data={faqSchema} />
      {children}
    </>
  );
}
