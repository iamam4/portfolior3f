import Image from 'next/image';
import Link from 'next/link';
import { projects } from '../../data/projects';
import { Arrow } from './Icons';

export default function Projects() {
  return (
    <section id="projets" className="projects-section shell section" aria-labelledby="projects-title">
      <div className="section-heading">
        <div><span className="section-note">Quelques réalisations</span><h2 id="projects-title">Des idées devenues concrètes.</h2></div>
        <p>Des projets personnels et des interfaces<br />imaginées pour des usages précis.</p>
      </div>
      <div className="project-grid">
        {projects.map(project => (
          <Link className="project-card" href={`/realisations/${project.slug}`} key={project.slug}>
            <div className="project-image"><Image src={project.image} alt={project.alt} width={1440} height={900} sizes="(max-width: 650px) 100vw, (max-width: 850px) 50vw, 33vw" /></div>
            <div className="project-title"><h3>{project.name}</h3><Arrow /></div>
            <p>{project.summary}</p>
            <span>{project.category}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
