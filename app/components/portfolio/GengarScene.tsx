'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { useVisibleScene } from './MotionProvider';
import { SceneBoundary } from './SceneBoundary';
import GengarPoster from './GengarPoster';
import GengarLoader from './GengarLoader';

const GengarCanvas = dynamic(() => import('./GengarCanvas'), { ssr: false, loading: () => null });
const finishes = ['Mat', 'Satin', 'Chrome'] as const;
export type Finish = 0 | 1 | 2;
export type Interaction = { point: { x: number; y: number }; inside: boolean; impulse: number; attraction: number };

function Unavailable({ onUnavailable }: { onUnavailable: (lost: boolean) => void }) {
  useEffect(() => { onUnavailable(true); }, [onUnavailable]);
  return <GengarPoster />;
}

export default function GengarScene() {
  const { ref, active, visible } = useVisibleScene();
  const [seen, setSeen] = useState(false), [lost, setLost] = useState(false), [ready, setReady] = useState(false), [finish, setFinish] = useState<Finish>(1), [
    attraction, setAttraction] = useState(4.5);
  const interaction = useRef<Interaction>({ point: { x: 0, y: 0 }, inside: false, impulse: 0, attraction: 4.5 });
  const invalidate = useRef<() => void>(() => {});
  useEffect(() => { if (visible) setSeen(true); }, [visible]);
  function move(event: PointerEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    interaction.current.point.x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
    interaction.current.point.y = 1 - (event.clientY - bounds.top) / bounds.height * 2;
    interaction.current.inside = true;
    invalidate.current();
  }
  function release(event: PointerEvent<HTMLDivElement>) { if (event.pointerType !== 'mouse') interaction.current.inside = false; }
  return <div className="gengar-experience" ref={ref}>
    <div className="gengar-viewport" role="group" aria-label="Un groupe d’Ectoplasma en apesanteur. Le pointeur repousse les corps, leur attraction centrale les rassemble. Le bouton Impulsion permet aussi de les disperser." onPointerMove={move} onPointerLeave={() => { interaction.current.inside = false; }} onPointerDown={move} onPointerUp={release} onPointerCancel={() => { interaction.current.inside = false; }}>
      <SceneBoundary fallback={<Unavailable onUnavailable={setLost} />}>{seen && !lost ? <GengarCanvas finish={finish} interaction={interaction} active={active} invalidateRef={invalidate} onReady={setReady} onLost={setLost} /> : lost ? <GengarPoster /> : null}</SceneBoundary>
      {!ready && !lost && <div className="gengar-loading-overlay"><GengarLoader /></div>}
      {ready && !lost && <span className="gengar-gesture" aria-hidden="true">Repoussez-les. Ils reviennent.</span>}
    </div>
    <div className="gengar-toolbar">
      <div className="gengar-finishes" role="group" aria-label="Matière du corps">{finishes.map((name, index) => <button type="button" key={name} aria-pressed={finish === index} disabled={lost} onClick={() => setFinish(index as Finish)}>{name}</button>)}</div>
      <label className="gengar-angle" htmlFor="gengar-attraction">Attraction<input id="gengar-attraction" type="range" disabled={lost} min="2" max="8" step=".1" value={attraction} aria-valuetext={`${attraction.toLocaleString('fr-FR')}, ${attraction < 3 ? 'douce' : attraction > 4.5 ? 'forte' : 'modérée'}`} onChange={event => { const value = Number(event.target.value); setAttraction(value); interaction.current.attraction = value; invalidate.current(); }} /></label>
      <button type="button" className="gengar-impulse" onClick={() => { interaction.current.impulse++; invalidate.current(); }} disabled={!active || lost}>Impulsion <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M10 2v4m0 8v4M2 10h4m8 0h4M4.3 4.3l2.8 2.8m5.8 5.8 2.8 2.8M4.3 15.7l2.8-2.8m5.8-5.8 2.8-2.8" /></svg></button>
    </div>
  </div>;
}
