'use client'

import * as THREE from 'three'
import { useRef } from 'react'
import { useGLTF, MeshPortalMaterial, Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useControls } from 'leva'


type SideProps = {
    rotation?: [number, number, number]
    bg?: string
    modelPath?: string
    index: number
    metalness?: number
  }


function Side({ rotation = [0, 0, 0], bg = '#f0f0f0', modelPath, index }: SideProps) {


    const mesh = useRef<THREE.Mesh>(null)
    const { nodes  } = useGLTF('/aobox-transformed.glb')
    const model = useGLTF(modelPath || '') 
    const time = useRef(0)
    
    
  
    useFrame(() => {
        if (mesh.current) {
          model.scene.traverse((object) => {
            if ((object as THREE.Mesh) && object.name === 'mail') {

              time.current += 0.01
              
              object.position.y = Math.sin(time.current * 2) / 10;

             
            }
          })
        }
    })

        
    model.scene.traverse((object) => {
        if ((object as THREE.Mesh).isMesh) {
            object.castShadow = true
            object.receiveShadow = true  
                 
        }    
    })
    

    
    

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
          {model && (
            <primitive
              object={model.scene}
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