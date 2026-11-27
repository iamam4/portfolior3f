import Link from 'next/link';
export default function NotFound() { return <div className="not-found shell"><p className="section-note">404</p><h1>Cette page s’est éclipsée.</h1><p>Retrouvons-nous du côté du portfolio.</p><Link className="button-primary" href="/">Revenir à l’accueil</Link></div>; }
