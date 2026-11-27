import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { projects } from '../../data/projects';
import { Arrow } from '../../components/portfolio/Icons';

export function generateStaticParams() { return projects.map(project => ({ slug: project.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find(item => item.slug === params.slug);
  return { title: project?.name ?? 'Projet introuvable', description: project?.summary };
}
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find(item => item.slug === params.slug);
  if (!project) notFound();
  return <article className="project-detail shell">
    <Link className="text-link back-link" href="/#projets">Retour aux réalisations <Arrow /></Link>
    <header><p className="section-note">{project.category}</p><h1>{project.name}</h1><p>{project.summary}</p></header>
    <Image priority src={project.image} width={1440} height={810} alt={project.alt} className="project-cover" sizes="(max-width: 1280px) 100vw, 1280px" />
    <div className="project-story"><h2>L’expérience en quelques mots.</h2><div><p>{project.description}</p><ul>{project.focus.map(item => <li key={item}>{item}</li>)}</ul></div></div>
    <Image src={project.detail} width={1440} height={810} alt={'Autres écrans et parcours de ' + project.name} className="project-cover" sizes="(max-width: 1280px) 100vw, 1280px" />
    <p className="image-caption">Interfaces du projet · Les valeurs affichées dans les captures sont des données de démonstration.</p>
    <div className="project-outro"><h2>Une idée pour votre activité ?</h2><Link className="button-primary" href="/#contact">Parlons de votre projet <Arrow /></Link></div>
  </article>;
}
