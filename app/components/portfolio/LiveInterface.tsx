'use client';

import { useRef, useState, type PointerEvent } from 'react';
import { Arrow } from './Icons';
import { useMotion } from './MotionProvider';

export default function LiveInterface() {
  const [exploded, setExploded] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [transformed, setTransformed] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const { paused } = useMotion();
  function track(event: PointerEvent<HTMLDivElement>) {
    if (paused || event.pointerType !== 'mouse' || !stage.current) return;
    const rect = event.currentTarget.getBoundingClientRect();
    stage.current.style.setProperty('--tilt-x', `${-9 - ((event.clientY - rect.top) / rect.height - .5) * 7}deg`);
    stage.current.style.setProperty('--tilt-y', `${-19 + ((event.clientX - rect.left) / rect.width - .5) * 10}deg`);
  }
  function reset() {
    stage.current?.style.removeProperty('--tilt-x');
    stage.current?.style.removeProperty('--tilt-y');
  }
  return <div className={`live-interface ${mobile ? 'is-mobile' : ''} ${exploded ? 'is-exploded' : ''} ${transformed ? 'is-transformed' : ''}`}>
    <div className="interface-stage" ref={stage} onPointerMove={track} onPointerLeave={reset}>
      <div className="interface-object">
        <div className="interface-structure" aria-hidden="true"><div className="structure-nav" /><div className="structure-body"><div /><div /></div><div className="structure-footer" /></div>
        <div className="interface-design">
          <div className="window-chrome"><span className="window-dots" aria-hidden="true"><i /><i /><i /></span><span>atelier.alexandre / idée-001</span><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" aria-hidden="true"><rect x="3" y="6" width="10" height="8" rx="2" /><path d="M5 6V4a3 3 0 0 1 6 0v2" /></svg></div>
          <div className="demo-navigation"><strong>Am<span>Lab</span>.</strong><span>Une idée, du potentiel.</span><span className="demo-menu" aria-hidden="true"><i /><i /></span></div>
          <div className="demo-content"><div className="demo-editorial"><span className="demo-caption">L’atelier des possibles</span><p>Les idées<br />prennent<br /><em>forme.</em></p><span className="demo-description">Du premier pixel<br />à la dernière interaction.</span></div><div className="demo-art" aria-hidden="true"><div className="art-fold fold-one" /><div className="art-fold fold-two" /><div className="art-fold fold-three" /><div className="art-disc" /><span className="art-cross cross-one" /><span className="art-cross cross-two" /></div></div>

        </div>
        <div className="interface-interaction">
          <button type="button" className="demo-action" onClick={() => setTransformed(value => !value)} aria-pressed={transformed}>{transformed ? 'Une autre perspective' : 'Donner vie à l’idée'}<Arrow /></button>
          <div className="floating-component" aria-hidden="true"><div className="component-bars"><i /><i /><i /><i /></div><span>{transformed ? 'Nouvelle perspective' : 'Tout commence ici.'}</span><span className="component-dot" /></div>

        </div>
      </div>

    </div>
    <div className="interface-legend" aria-hidden="true"><span>01 — Structure</span><span>02 — Design</span><span>03 — Interaction</span></div>
    <div className="interface-controls">
      <button type="button" className="layer-control" aria-pressed={exploded} onClick={() => setExploded(value => !value)}><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="m3 8 9-5 9 5-9 5-9-5Zm0 4 9 5 9-5M3 16l9 5 9-5" /></svg>{exploded ? 'Réassembler' : 'Décomposer'}</button>
      <div className="device-control" role="group" aria-label="Format de l’interface"><button type="button" aria-pressed={!mobile} onClick={() => setMobile(false)} aria-label="Afficher au format desktop"><svg width="19" height="17" viewBox="0 0 24 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="2" y="2" width="20" height="13" rx="2" /><path d="M8 19h8M12 15v4" /></svg></button><button type="button" aria-pressed={mobile} onClick={() => setMobile(true)} aria-label="Afficher au format mobile"><svg width="13" height="19" viewBox="0 0 14 22" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="1" y="1" width="12" height="20" rx="2" /><path d="M5 18h4" /></svg></button></div>
    </div>
    <p className="interface-hint" aria-live="polite">{exploded ? 'Structure, design, interaction : chaque couche a son rôle.' : mobile ? 'La même interface. Une nouvelle composition.' : 'Décomposez les couches. Changez de format. Explorez.'}</p>
  </div>;
}
