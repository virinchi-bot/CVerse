import type { Metadata } from 'next';
import { generateMetadata, generateFAQSchema, JsonLd } from '@/lib/seo/metadata';
import { PAGES, TOOL_FAQS } from '@/lib/seo/constants';

export const metadata: Metadata = generateMetadata(PAGES.skills);

export default function SkillsLayout({ children }: { children: React.ReactNode }) {
  const faqSchema = generateFAQSchema(TOOL_FAQS.skills);

  return (
    <>
      <JsonLd data={faqSchema} />
      {children}
    </>
  );
}
