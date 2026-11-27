'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Arrow } from './Icons';

const links = [
  { href: '/#atelier', label: 'Atelier' },
  { href: '/#services', label: 'Services' },
  { href: '/#projets', label: 'Réalisations' },
  { href: '/#apropos', label: 'À propos' },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav className="site-nav shell" aria-label="Navigation principale">
        <Link className="wordmark" href="/" aria-label="Alexandre Moreau, accueil" onClick={() => setOpen(false)}>
          Alexandre<span>.</span>
        </Link>
        <div className="desktop-nav">
          {links.map(link => <Link key={link.href} href={link.href}>{link.label}</Link>)}
        </div>
        <div className="nav-actions">
          <Link className="nav-contact" href="/#contact">Parlons de votre projet <Arrow /></Link>
          <button
            className="menu-toggle"
            type="button"
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(value => !value)}
          >
            <span /><span />
          </button>
        </div>
      </nav>
      <nav id="mobile-navigation" className="mobile-nav shell" aria-label="Navigation mobile" hidden={!open}>
        {links.map(link => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}<Arrow /></Link>)}
        <Link href="/#contact" onClick={() => setOpen(false)}>Parlons de votre projet<Arrow /></Link>
      </nav>
    </header>
  );
}
