import { useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PerspectiveCamera, Environment, Float } from '@react-three/drei'
import { DeveloperWorkspace } from './DeveloperWorkspace'
import { cn } from '../../lib/utils'

export function Hero3DScene({ className }) {
  const mousePosition = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    // Normalize mouse position to range [-1, 1]
    const { innerWidth, innerHeight } = window
    mousePosition.current = {
      x: (e.clientX / innerWidth) * 2 - 1,
      y: -(e.clientY / innerHeight) * 2 + 1
    }
  }

  const handleMouseLeave = () => {
    // Reset on leave
    mousePosition.current = { x: 0, y: 0 }
  }

  return (
    <div 
      className={cn("w-full h-full relative cursor-grab active:cursor-grabbing", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 1.5, 5]} fov={45} />
        
        {/* Lighting setup */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <pointLight position={[-3, 2, -3]} intensity={0.8} color="#ea580c" />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <DeveloperWorkspace mousePosition={mousePosition} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  )
}
