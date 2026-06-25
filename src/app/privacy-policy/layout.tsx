import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | CVerse',
  description: 'Privacy Policy for CVerse - Learn how we collect, use, and protect your personal data.',
  robots: 'index, follow',
  openGraph: {
    title: 'Privacy Policy | CVerse',
    description: 'Privacy Policy for CVerse - Learn how we collect, use, and protect your personal data.',
    type: 'website',
    url: 'https://cverse.dev/privacy-policy',
  },
};

export default function PrivacyPolicyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
