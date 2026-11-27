'use client';
import ModularDemo from './ModularDemo';
import GengarScene from './GengarScene';

export default function Lab(){
  return <section id="atelier" className="lab-section shell section">
    <div className="section-heading"><div><span className="section-note">L’atelier interactif</span><h2>À regarder. Et surtout, à essayer.</h2></div><p>Des expériences faites pour explorer<br/>ce que le web peut devenir.</p></div>
    <div className="new-lab-grid">
      <article className="experiment-card"><GengarScene/><div className="experiment-caption"><div><h3>Un peu de caractère.</h3><p>Bousculer leur équilibre.</p></div><span className="tech-label">WebGL</span></div></article>
      <article className="experiment-card"><ModularDemo/><div className="experiment-caption"><div><h3>Rien n’est figé.</h3><p>Une composition qui s’adapte à vos idées.</p></div><span className="tech-label">Interaction</span></div></article>
    </div>
  </section>;
}
