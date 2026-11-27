'use client';

import { useRef, useState } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { useMotion } from './MotionProvider';

const tiles = ['letter', 'spectrum', 'orbit', 'grid'];
const labels: Record<string, string> = {letter:'Typographie',spectrum:'Couleur',orbit:'Mouvement',grid:'Structure'};
export default function ModularDemo() {
  const [order, setOrder] = useState(tiles);
  const [message, setMessage] = useState('Déplacez les éléments. Trouvez votre équilibre.');
  const grid = useRef<HTMLDivElement>(null);
  const { paused } = useMotion();
  function move(id: string, target: number) {
    setOrder(current => { const next = [...current]; const index = next.indexOf(id); if(index === target) return current; next.splice(index,1); next.splice(target,0,id); return next; });
    setMessage(`${labels[id]} : position ${target + 1}.`);
  }
  function endDrag(id: string, info: PanInfo) {
    if (!grid.current || Math.hypot(info.offset.x, info.offset.y) < 15) return;
    const bounds = grid.current.getBoundingClientRect();
    // Framer Motion reports page coordinates; DOM rectangles are viewport-relative.
    const point = { x: info.point.x - window.scrollX, y: info.point.y - window.scrollY };
    if (point.x < bounds.left - 20 || point.x > bounds.right + 20 || point.y < bounds.top - 20 || point.y > bounds.bottom + 20) return;
    let target = order.indexOf(id), distance = Infinity;
    grid.current.querySelectorAll<HTMLElement>('[data-tile]').forEach(element => {
      if (element.dataset.tile === id) return;
      const rect = element.getBoundingClientRect();
      const nextDistance = Math.hypot(point.x - rect.left - rect.width/2, point.y - rect.top - rect.height/2);
      if (nextDistance < distance) { distance = nextDistance; target = order.indexOf(element.dataset.tile!); }
    });
    move(id,target);
  }
  return <div className="modular-experience"><div className="modular-grid" ref={grid}>
    {order.map((id,index) => <motion.button key={id} layout type="button" data-tile={id} drag dragSnapToOrigin dragMomentum={false} onDragEnd={(_,info) => endDrag(id,info)} whileDrag={{scale:1.06,zIndex:5}} transition={paused ? {duration:0} : {type:'spring',stiffness:370,damping:32}} className={`modular-tile tile-${id}`} aria-label={`${labels[id]}, position ${index+1}. Utilisez les flèches pour déplacer.`} onKeyDown={event => { const offset = event.key==='ArrowRight'||event.key==='ArrowDown' ? 1 : event.key==='ArrowLeft'||event.key==='ArrowUp' ? -1 : 0; if(offset){event.preventDefault();move(id,(index+offset+order.length)%order.length);} }}>
      {id==='letter' && <span className="tile-letter-art" aria-hidden="true">Aa<span>Le sens de la lettre</span></span>}
      {id==='spectrum' && <span className="tile-palette" aria-hidden="true"><i /><i /><i /><i /><small>Une palette de possibles.</small></span>}
      {id==='orbit' && <span className="tile-orbit-art" aria-hidden="true"><i /><i /><i /><b /></span>}
      {id==='grid' && <span className="tile-matrix" aria-hidden="true">{Array.from({length:25},(_,i)=><i key={i}/>)}</span>}
      <svg className="tile-grip" viewBox="0 0 12 16" width="10" height="14" fill="currentColor" aria-hidden="true">{[3,8,13].flatMap(y=>[3,9].map(x=><circle key={`${x}-${y}`} cx={x} cy={y} r="1"/>))}</svg>
    </motion.button>)}
  </div><div className="modular-toolbar"><span aria-live="polite">{message}</span><button type="button" onClick={()=>{setOrder(current=>[current[3],...current.slice(0,3)]);setMessage('Une nouvelle composition. À vous de jouer.');}}>Recomposer <svg viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M15 6a6 6 0 1 0 1 6M15 2v5h-5"/></svg></button></div></div>;
}
