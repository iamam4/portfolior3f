export default function About() {
  return (
    <section id="apropos" className="about-section section" aria-labelledby="about-title">
      <div className="about-grid shell">
        <div>
          <span className="section-note">Une approche directe</span>
          <h2 id="about-title">Derrière chaque écran,<br /><em>une vraie intention.</em></h2>
        </div>
        <div className="about-copy">
          <p>Je suis Alexandre, développeur web freelance. J’aime transformer une idée en une expérience claire, vivante et agréable à utiliser.</p>
          <p>Je m’implique du premier échange aux derniers ajustements, en prenant soin du design, du fonctionnement et de ce que ressent la personne qui découvre le site.</p>
          <ul className="process" aria-label="Étapes de collaboration">
            <li><span>01</span> Échanger</li>
            <li><span>02</span> Concevoir</li>
            <li><span>03</span> Construire</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
