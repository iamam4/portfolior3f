import Link from 'next/link';

export default function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <p>Alexandre Moreau<span>Conception et développement web</span></p>
      <div>
        <Link href="/#atelier">Atelier</Link>
        <Link href="/#projets">Réalisations</Link>
        <Link href="/#contact">Contact</Link>
      </div>
    </footer>
  );
}
