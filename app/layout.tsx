import type { Metadata } from 'next';
import './globals.css';
import './portfolio.css';
import './experiments.css';
import { MotionProvider } from './components/portfolio/MotionProvider';
import SiteHeader from './components/portfolio/SiteHeader';
import SiteFooter from './components/portfolio/SiteFooter';

export const metadata: Metadata = {
  title: 'Alexandre Moreau — Développeur web freelance',
  description: 'Je conçois des sites et des applications web sur mesure, avec le goût du détail et des interactions soignées.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <MotionProvider>
          <a className="skip-link" href="#main">Aller au contenu</a>
          <SiteHeader />
          {children}
          <SiteFooter />
        </MotionProvider>
      </body>
    </html>
  );
}
