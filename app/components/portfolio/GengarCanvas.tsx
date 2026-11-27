'use client';

import { Suspense, useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Environment, Lightformer, useGLTF } from '@react-three/drei';
import { BallCollider, CapsuleCollider, Physics, RigidBody, useBeforePhysicsStep, type RapierRigidBody } from '@react-three/rapier';
import { Bloom, EffectComposer, N8AO } from '@react-three/postprocessing';
import { BufferGeometry, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, Vector3 } from 'three';
import GengarPoster from './GengarPoster';
import { attractionForce, impulseVelocity, swarmBody, SWARM_DAMPING, SWARM_STEP } from './gengarPhysics';
import type { Finish, Interaction } from './GengarScene';

const MODEL = '/models/gengar/gengar-swarm.glb?v=retopology-2';
const palette = ['#7444ac', '#a49aad', '#352d49', '#8056b0', '#dbd5df', '#4d376e'];
type Piece = { geometry: BufferGeometry; part: string };

function Swarm({ finish, interaction, onReady }: { finish: Finish; interaction: MutableRefObject<Interaction>; onReady: (ready: boolean) => void }) {
  const { scene } = useGLTF(MODEL, false, true);
  const { viewport, size, invalidate } = useThree();
  const count = size.width < 450 ? 14 : 22;
  const bodies = useMemo(() => Array.from({ length: count }, (_, i) => swarmBody(i, count)), [count]);
  const rigidBodies = useRef<(RapierRigidBody | null)[]>([]);
  const pointerBody = useRef<RapierRigidBody>(null);
  const pointerPosition = useRef(new Vector3(0, 0, 6));
  const pointerTarget = useMemo(() => new Vector3(), []);
  const pointerEnabled = useRef(false);
  const lastImpulse = useRef(0);
  const pieces = useMemo(() => {
    const found: Piece[] = [];
    scene.traverse(object => { if (object instanceof Mesh) found.push({ geometry: object.geometry, part: (object.material as MeshStandardMaterial).name }); });
    return found;
  }, [scene]);
  // Instances share both geometry and a small palette of materials.
  const materials = useMemo(() => ({
    bodies: palette.map(color => new MeshPhysicalMaterial({ color, roughness: .7, metalness: .05 })),
    Eyes: new MeshStandardMaterial({ color: '#f83f61', emissive: '#ff163f', emissiveIntensity: 1.6, roughness: .3, toneMapped: false }),
    Teeth: new MeshPhysicalMaterial({ color: '#e6dfd5', roughness: .35, metalness: 0, clearcoat: .2 }),
    Pupils: new MeshStandardMaterial({ color: '#140c20', roughness: .5 }),
  }), []);
  useEffect(() => {
    materials.bodies.forEach((body, i) => {
      body.roughness = finish === 0 ? .68 : finish === 1 ? .24 : .15;
      body.metalness = finish === 2 ? .96 : .05;
      body.clearcoat = finish === 1 ? .8 : .1;
      body.specularIntensity = finish === 0 ? .45 : 1;
      body.clearcoatRoughness = .2;
      body.color.set(finish === 2 && i % 3 === 0 ? '#aaa0bd' : palette[i]);
    });
    invalidate();
  }, [finish, materials, invalidate]);
  useEffect(() => () => { materials.bodies.forEach(m => m.dispose()); materials.Eyes.dispose(); materials.Teeth.dispose(); materials.Pupils.dispose(); }, [materials]);
  useEffect(() => { onReady(true); }, [onReady]);

  useBeforePhysicsStep(() => {
    const input = interaction.current;
    const pulse = input.impulse !== lastImpulse.current;
    lastImpulse.current = input.impulse;
    rigidBodies.current.slice(0, count).forEach((body, index) => {
      if (!body) return;
      const position = body.translation();
      const mass = body.mass();
      body.resetForces(true);
      body.addForce(attractionForce(position, input.attraction, mass), true);
      // Gentle continuous tumble, independent of rendering frame rate.
      body.resetTorques(true);
      body.addTorque({ x: Math.sin(index * 1.7) * mass * .008, y: mass * .006, z: Math.cos(index * 2.1) * mass * .007 }, true);
      if (pulse) {
        body.setLinvel(impulseVelocity(position, body.linvel()), true);
      }
    });
    const pointer = pointerBody.current;
    if (!pointer) return;
    if (!input.inside) {
      pointer.setEnabled(false);
      pointerEnabled.current = false;
      return;
    }
    pointerTarget.set(input.point.x * viewport.width / 2, input.point.y * viewport.height / 2, .8);
    if (!pointerEnabled.current) {
      pointerPosition.current.copy(pointerTarget);
      pointer.setTranslation(pointerPosition.current, true);
      pointer.setEnabled(true);
      pointerEnabled.current = true;
    }
    // Bounded kinematic speed avoids catapulting the cluster on fast mouse entry.
    const distance = pointerPosition.current.distanceTo(pointerTarget);
    pointerPosition.current.lerp(pointerTarget, Math.min(.24, .14 / Math.max(.001, distance)));
    pointer.setNextKinematicTranslation(pointerPosition.current);
  });

  return <>
    {bodies.map((body, index) => <RigidBody key={`${count}-${index}`} ref={value => { rigidBodies.current[index] = value; }} position={body.position} rotation={body.rotation} colliders={false} linearDamping={SWARM_DAMPING} angularDamping={.65} restitution={.22} friction={.15} canSleep={false} ccd angularVelocity={[Math.sin(index) * .35, .2, Math.cos(index) * .25]} linearVelocity={[-body.position[2] * .3, 0, body.position[0] * .3]}>
      <group scale={body.scale}>
        {pieces.map(({ geometry, part }) => <mesh key={part} geometry={geometry} material={part === 'Body' ? materials.bodies[index % palette.length] : materials[part as 'Eyes' | 'Teeth' | 'Pupils']} castShadow receiveShadow dispose={null} />)}
      </group>
      <BallCollider args={[body.scale * 1.05]} position={[0, -.13 * body.scale, 0]} />
      <BallCollider args={[body.scale * .38]} position={[-.77 * body.scale, .94 * body.scale, -.18 * body.scale]} />
      <BallCollider args={[body.scale * .38]} position={[.77 * body.scale, .94 * body.scale, -.18 * body.scale]} />
      <BallCollider args={[body.scale * .42]} position={[-1.14 * body.scale, -.14 * body.scale, 0]} />
      <BallCollider args={[body.scale * .42]} position={[1.14 * body.scale, -.14 * body.scale, 0]} />
    </RigidBody>)}
    <RigidBody ref={pointerBody} type="kinematicPosition" position={[0, 0, 6]} colliders={false}>
      <CapsuleCollider args={[1.2, .56]} rotation={[Math.PI / 2, 0, 0]} friction={.05} restitution={.15} />
    </RigidBody>
  </>;
}

function Studio({ finish, interaction, active, invalidateRef, onReady }: { finish: Finish; interaction: MutableRefObject<Interaction>; active: boolean; invalidateRef: MutableRefObject<() => void>; onReady: (ready: boolean) => void }) {
  const { invalidate, size } = useThree();
  useEffect(() => { invalidateRef.current = invalidate; return () => { invalidateRef.current = () => {}; }; }, [invalidate, invalidateRef]);
  return <>
    <color attach="background" args={['#10111c']} />
    <ambientLight intensity={.5} />
    <directionalLight position={[3, 5, 6]} color="#f0e9ff" intensity={3} castShadow shadow-mapSize={[1024, 1024]} shadow-camera-left={-4} shadow-camera-right={4} shadow-camera-top={4} shadow-camera-bottom={-4} shadow-normalBias={.035} shadow-bias={-.0001} />
    <directionalLight position={[-4, 1, -3]} color="#9b8ce4" intensity={2.5} />
    <Environment resolution={256} frames={1}>
      <Lightformer position={[-4, 3, 3]} rotation={[0, Math.PI / 4, 0]} scale={[3, 5, 1]} intensity={4} color="#e5dcff" />
      <Lightformer position={[4, 1, 0]} rotation={[0, -Math.PI / 2, 0]} scale={[2, 5, 1]} intensity={5} color="#c6e1ed" />
      <Lightformer position={[0, 5, -3]} rotation={[Math.PI / 2, 0, 0]} scale={[4, 3, 1]} intensity={3} />
    </Environment>
    <Physics gravity={[0, 0, 0]} timeStep={SWARM_STEP} paused={!active} interpolate>
      <Swarm finish={finish} interaction={interaction} onReady={onReady} />
    </Physics>
    <EffectComposer multisampling={size.width < 450 ? 0 : 2}>
      <N8AO aoRadius={.35} intensity={1.4} distanceFalloff={1} quality="low" halfRes />
      <Bloom luminanceThreshold={1.1} intensity={.18} mipmapBlur />
    </EffectComposer>
  </>;
}


export default function GengarCanvas({ finish, interaction, active, invalidateRef, onReady, onLost }: {
  finish: Finish; interaction: MutableRefObject<Interaction>; active: boolean;
  invalidateRef: MutableRefObject<() => void>; onReady: (ready: boolean) => void; onLost: (lost: boolean) => void;
}) {
  return <Canvas shadows camera={{ position: [0, 0, 6.6], fov: 26, near: .1, far: 30 }} dpr={[1, 1.5]} frameloop={active ? 'always' : 'demand'} gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }} fallback={<GengarPoster />} onCreated={({ gl }) => gl.domElement.addEventListener('webglcontextlost', () => onLost(true), { once: true })}>
    <Suspense fallback={null}><Studio finish={finish} interaction={interaction} active={active} invalidateRef={invalidateRef} onReady={onReady} /></Suspense>
  </Canvas>;
}
