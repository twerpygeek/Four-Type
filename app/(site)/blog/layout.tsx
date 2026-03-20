import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Temperament Education | FourType',
  description: 'Explore in-depth articles about the 4 temperaments. Learn temperament theory, psychology, leadership tips, and practical applications of temperament knowledge.',
  keywords: ['temperament blog', 'temperament articles', 'personality psychology', 'four temperaments guide', 'temperament theory'],
  openGraph: {
    title: 'Temperament Education Blog | FourType',
    description: 'In-depth articles exploring the 4 temperaments, their history, applications, and relationships to other personality frameworks.',
    type: 'website',
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
