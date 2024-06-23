'use client'

import { default as Side } from './Side'
import { default as Controls} from './Controls'
import { Suspense, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { Edges} from '@react-three/drei'
import ResizeObserver from 'resize-observer-polyfill';
import { useState, useEffect } from 'react'



 const Model = (props: any) => {
  const [rotate, setRotate] = useState(true)

  // For mobile devices

      const handleTouchStart = useCallback(() => {
          setRotate(false)
  }, [])

  
    const handleMouseDown = useCallback(() => {
        setRotate(false)
    }, [])
 


  const sidesConfig = [
    { rotation: [0, 0, 0], bg: 'grey', modelPath: '/atom.glb', index: 0 },
    { rotation: [0, Math.PI, 0], bg: 'indianred', modelPath: '/mail.glb', index: 1 },
    { rotation: [0, -Math.PI / 2, 0], bg: 'black', modelPath: '/nothing.glb', index: 2 },
    { rotation: [0, Math.PI / 2, 0], bg: 'black', modelPath: '/nothing.glb', index: 3 },
    { rotation: [0, -Math.PI / 2, 0], bg: 'teal', modelPath: '/Chambre.glb', index: 4 },
    { rotation: [0, Math.PI / 2, 0], bg: '#101727', modelPath: '/globe.glb', index: 5 }
  ]

  

  return (
  <Canvas onMouseDown={handleMouseDown} onTouchStart={handleTouchStart} shadows  camera={{fov: 40 }} resize={{ polyfill: ResizeObserver }}  dpr={2}>  
      <mesh castShadow receiveShadow>
        <boxGeometry args={[2, 2, 2]} />
        <Edges />
        <Suspense fallback={null}>
          {sidesConfig.map((config, index) => (
            <Side key={index} rotation={config.rotation as [number, number, number]} bg={config.bg} modelPath={config.modelPath} index={config.index} />
          ))}
          
          
        </Suspense>
      </mesh>
    <Controls  path={props.path} rotate={rotate} />
  </Canvas>
)

}

export default Model