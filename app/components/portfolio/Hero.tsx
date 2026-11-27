'use client';
import { Arrow } from './Icons';
import LiveInterface from './LiveInterface';

export default function Hero() {
  return <section className="hero shell" aria-labelledby="hero-title">
    <div className="hero-copy"><p className="hero-profession"><span className='animate-pulse' />Développeur web freelance</p>
      <h1 id="hero-title">Du design.<br />Du code.<br /><em>Du caractère.</em></h1>
      <p className="hero-intro">Je suis Alexandre. Je conçois des sites et des applications web sur mesure, avec le goût du détail et des interactions soignées.</p>
      <div className="hero-actions"><a href="#contact" className="button-primary">Discutons de votre projet <Arrow /></a><a href="#atelier" className="text-link">Découvrir mon univers <Arrow down /></a></div>
    </div>
    <LiveInterface />
    <div className="hero-bottom"><span>Conception <i /> Développement <i /> Interaction</span><a href="#atelier" aria-label="Découvrir la suite"><Arrow down /></a></div>
  </section>;
}
