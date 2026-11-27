// Forces are expressed per second; Rapier integrates them at a fixed 60 Hz.
export const SWARM_STEP = 1 / 60;
export const SWARM_DAMPING = .85;
export type Point3 = { x: number; y: number; z: number };
export function attractionForce(position: Point3, strength: number, mass: number): Point3 {
  const distance = Math.hypot(position.x, position.y, position.z);
  // Outside the cluster, a spring strengthens the return force. The previous
  // constant pull lost to a tangential force that grew without bound.
  const acceleration = strength + Math.max(0, distance - 2) * 6;
  const pull = acceleration * mass / Math.max(.7, distance);
  const swirl = .35 * mass / (1 + (distance / 2) ** 2);
  return { x: -position.x * pull - position.z * swirl,
    y: -position.y * pull,
    z: -position.z * pull + position.x * swirl };
}

export function impulseVelocity(position: Point3, velocity: Point3): Point3 {
  const radius = Math.max(.3, Math.hypot(position.x, position.y, position.z));
  // Fade the outward kick outside the cluster, so even clicks on every frame
  // cannot keep an off-screen body moving away from the center.
  const kick = 3.5 * Math.max(0, 1 - Math.max(0, radius - 1.8) / 1.4);
  const x = velocity.x + position.x / radius * kick;
  const y = velocity.y + position.y / radius * kick;
  const z = velocity.z + position.z / radius * kick;
  // Repeated clicks refresh the kick but cannot stack unlimited kinetic energy.
  const scale = Math.min(1, 5 / Math.max(.001, Math.hypot(x, y, z)));
  return { x: x * scale, y: y * scale, z: z * scale };
}

export function swarmBody(index: number, count: number) {
  const y = 1 - 2 * (index + .5) / count;
  const angle = index * 2.399963229728653;
  const ring = Math.sqrt(1 - y * y);
  const radius = 1.35 + (index % 3) * .18;
  return {
    position: [Math.cos(angle) * ring * radius, y * radius * .86, Math.sin(angle) * ring * radius * .75] as [number, number, number],
    rotation: [Math.sin(index * 2) * .5, Math.sin(index * 3) * .8, Math.cos(index) * .5] as [number, number, number],
    scale: .33 + (index % 4) * .026,
  };
}
