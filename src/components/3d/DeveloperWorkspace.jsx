import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { DeveloperCharacter } from './DeveloperCharacter'
import { DeskSetup } from './DeskSetup'
import { ErrorBoundary } from '../common/ErrorBoundary'
import * as THREE from 'three'

export function DeveloperWorkspace({ mousePosition }) {
  const groupRef = useRef()

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    
    const t = clock.getElapsedTime()
    
    // Smooth continuous floating
    const floatY = Math.sin(t * 1.5) * 0.05
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      floatY,
      0.1
    )

    // Mouse parallax - subtly rotate the entire scene toward the mouse
    if (mousePosition && mousePosition.current) {
      const targetRotationY = (mousePosition.current.x * Math.PI) / 10
      const targetRotationX = (mousePosition.current.y * Math.PI) / 15

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        targetRotationY,
        0.05
      )
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        targetRotationX,
        0.05
      )
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      {/* 
        Rotate the entire workspace slightly to give that 
        angled 3D perspective out of the box 
      */}
      <group rotation={[0.1, -0.4, 0]}>
        <ErrorBoundary fallback={null}>
          <DeveloperCharacter position={[0.2, -0.1, 0.4]} rotation={[0, -0.1, 0]} />
        </ErrorBoundary>
        <DeskSetup position={[0, 0, -0.3]} />
        
        {/* Subtle glow underneath the desk */}
        <pointLight position={[0, -1, 0]} intensity={0.5} color="#ea580c" distance={3} />
      </group>
    </group>
  )
}
