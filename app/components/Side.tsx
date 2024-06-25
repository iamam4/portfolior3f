'use client'

import * as THREE from 'three'
import { useEffect, useRef } from 'react'
import { useGLTF, MeshPortalMaterial, Environment, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'




type SideProps = {
    rotation?: [number, number, number]
    bg?: string
    modelPath?: string
    index: number
    metalness?: number
  }


function Side({ rotation = [0, 0, 0], bg = '#f0f0f0', modelPath, index }: SideProps) {


    const mesh = useRef<THREE.Mesh>(null)
    const { nodes  } = useGLTF('/model/aobox-transformed.glb')
    const {scene , animations } = useGLTF(modelPath || '') 
    const time = useRef(0)

    const {actions} = useAnimations(animations, scene);

    useEffect(() => {
       
       if (actions && Object.keys(actions).length > 0) {
        
        Object.values(actions).forEach((action) => {
          action?.play()
        })

      }
    }, [actions])
    
    
  
    useFrame(() => {
        if (mesh.current) {
          scene.traverse((object) => {
            if ((object as THREE.Mesh) && object.name === 'mail') {

              time.current += 0.01
              
              object.position.y = Math.sin(time.current * 2) / 10;
            }
            if (object.name === 'Globe'){
              object.rotation.z += 0.005}
          })
        }
    })

    scene.traverse((object) => {
      if ((object as THREE.Mesh).isMesh) {
        const mesh = object as THREE.Mesh;
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        if (mesh.name === 'Globe') {
          const material = mesh.material as THREE.MeshStandardMaterial;
          material.color = new THREE.Color('#4f46e5');
          material.emissiveIntensity = 1;
          material.emissive = new THREE.Color('#4f46e5');
          material.roughness = 0;
        }
      }
    });


        

    

    const geometry = nodes?.Cube ? (nodes.Cube as THREE.Mesh).geometry : new THREE.BoxGeometry()
    const aoMap = nodes?.Cube ? ((nodes.Cube as THREE.Mesh).material as THREE.MeshStandardMaterial).aoMap : null
  
    return (
      <MeshPortalMaterial worldUnits attach={`material-${index}`}>
        <ambientLight intensity={1} />
        <Environment preset="city" />
        <mesh castShadow receiveShadow rotation={rotation} geometry={geometry}>
            <meshStandardMaterial aoMapIntensity={1} aoMap={aoMap} color={bg} />
            <spotLight castShadow  color={'#fff'} intensity={0.5}  position={[6,-1,1]} angle={0.2} penumbra={1} shadow-normalBias={0.05} shadow-bias={0.0001} decay= {0} shadow-mapSize={[2048, 2048]}/>
        </mesh>
        <mesh castShadow receiveShadow ref={mesh}>
          {scene && (
            <primitive
              object={scene}
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={[0.7, 0.7, 0.7]}
            />
          )}
          <meshLambertMaterial color={bg} />
        </mesh>
      </MeshPortalMaterial>
    )
  }

    export default Side