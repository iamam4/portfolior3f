import Link from 'next/link';
import { Arrow } from './Icons';

const services = [
  {
    title: 'Sites vitrines',
    description: 'Une présence en ligne claire et soignée, pensée pour présenter votre activité et guider vos visiteurs.',
  },
  {
    title: 'Applications web sur mesure',
    description: 'Des outils adaptés à vos usages, avec des parcours simples et une interface qui donne envie de s’en servir.',
  },
  {
    title: 'Outils métier',
    description: 'Des espaces de travail qui rassemblent vos besoins, vos données et les tâches du quotidien.',
  },
  {
    title: 'Maintenance et évolutions',
    description: 'Un site existant à faire évoluer, corriger ou garder à jour ? Je peux vous accompagner dans la durée.',
  },
];

export default function Expertise() {
  return (
    <section id="services" className="expertise-section shell section" aria-labelledby="services-title">
      <div className="expertise-intro">
        <span className="section-note">Ce que je peux construire avec vous</span>
        <h2 id="services-title">Du web utile,<br /><em>pensé pour vous.</em></h2>
        <p>Chaque projet part d’un besoin concret. On clarifie l’idée, puis on construit une expérience cohérente jusque dans les détails.</p>
        <Link className="text-link" href="/#contact">Parler de votre besoin <Arrow /></Link>
      </div>
      <div className="service-list">
        {services.map((service, index) => (
          <details className="service" key={service.title} open={index === 0}>
            <summary><h3>{service.title}</h3><span className="service-plus" aria-hidden="true" /></summary>
            <div className="service-description"><p>{service.description}</p><Link href="/#contact">En discuter <Arrow /></Link></div>
          </details>
        ))}
      </div>
    </section>
  );
}
