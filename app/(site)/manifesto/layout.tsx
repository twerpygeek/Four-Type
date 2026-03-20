import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The 4 Temperaments Manifesto | FourType',
  description: 'A comprehensive manifesto exploring the complete theory of the 4 temperaments. Discover the philosophical foundations, characteristics, and profound insights into human temperament.',
  keywords: ['temperament manifesto', 'four temperaments', 'temperament theory complete guide', 'character archetypes'],
  openGraph: {
    title: 'The 4 Temperaments Manifesto | FourType',
    description: 'A comprehensive exploration of temperament theory with detailed information, visuals, and interactive learning experiences.',
    type: 'website',
  },
};

export default function ManifestoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
