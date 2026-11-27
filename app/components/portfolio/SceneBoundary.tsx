'use client';

import { Component, type ReactNode } from 'react';

export function SceneFallback({ small = false }: { small?: boolean }) {
  return <div className={`scene-fallback ${small ? 'scene-fallback-small' : ''}`} role="img" aria-label="Représentation statique de l’atelier 3D"><div className="fallback-orbit"><span /><span /><span /><b /></div><p>La créativité, sous tous les angles.</p></div>;
}

export class SceneBoundary extends Component<{ children: ReactNode; small?: boolean; fallback?: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? (this.props.fallback ?? <SceneFallback small={this.props.small} />) : this.props.children; }
}
