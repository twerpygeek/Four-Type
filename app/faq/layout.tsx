import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ - Temperament Questions Answered | FourType',
  description: 'Find answers to frequently asked questions about the 4 temperaments. Learn about temperament differences, applications, and how they relate to your life.',
  keywords: ['temperament faq', 'temperament questions', 'four temperaments explained', 'temperament help'],
  openGraph: {
    title: 'FAQ - Frequently Asked Questions | FourType',
    description: 'Get answers to your temperament questions. Understand the 4 temperaments and how they apply to your life.',
    type: 'website',
  },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
