'use client';

import { Arrow } from './Icons';
export default function Contact() {

  return <section id="contact" className="contact-section shell section">
    <div><span className="section-note">La suite commence par une conversation</span><h2>Une idée en tête ?<br /><em>Donnons-lui forme.</em></h2></div>
    <div className="contact-content"><p>Un site à créer, une application à imaginer ou un outil à faire évoluer ? Parlons de votre projet.</p><a className="button-primary" href="mailto:amoreau77181@gmail.com">Écrivez-moi <Arrow /></a><div className="email-row"><a href="mailto:amoreau77181@gmail.com">amoreau77181@gmail.com</a></div></div>
  </section>;
}
