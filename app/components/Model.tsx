'use client'

import { default as Side } from './Side'
import { default as Controls} from './Controls'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Edges} from '@react-three/drei'
import ResizeObserver from 'resize-observer-polyfill';
import { useState, useEffect } from 'react'



 const Model = (props: any) => {
  const [rotate, setRotate] = useState(true)

  // For mobile devices
  useEffect(() => {
      const handleMouseDown = () => {
          setRotate(false)
      }
      window.addEventListener("touchstart", handleMouseDown);
      return () => {
          window.removeEventListener("touchstart", handleMouseDown);
      }
  })

  useEffect(() => {
    const handleMouseDown = () => {
        setRotate(false)
    }
    window.addEventListener("mousedown", handleMouseDown);
    return () => {
        window.removeEventListener("mousedown", handleMouseDown);
    }
})


  const sidesConfig = [
    { rotation: [0, 0, 0], bg: 'orange', modelPath: '/test.glb', index: 0 },
    { rotation: [0, Math.PI, 0], bg: 'indianred', modelPath: '/mail.glb', index: 1 },
    { rotation: [0, -Math.PI / 2, 0], bg: 'black', modelPath: '/nothing.glb', index: 2 },
    { rotation: [0, Math.PI / 2, 0], bg: 'black', modelPath: '/nothing.glb', index: 3 },
    { rotation: [0, -Math.PI / 2, 0], bg: 'lightgreen', modelPath: '/test2.glb', index: 4 },
    { rotation: [0, Math.PI / 2, 0], bg: 'teal', modelPath: '/Chambre.glb', index: 5 }
  ]

  

  return (
  <Canvas shadows  camera={{fov: 40 }} resize={{ polyfill: ResizeObserver }}  dpr={2}>  
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