import Image from 'next/image';

export default function GengarPoster() {
  return <div className="gengar-poster"><Image src="/models/gengar/poster.png" alt="Ectoplasma violet, aux yeux rouges et au sourire clair" width={480} height={480} unoptimized/><span>Ectoplasma — aperçu statique</span></div>;
}
