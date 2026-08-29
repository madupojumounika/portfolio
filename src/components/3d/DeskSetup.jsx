import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export function DeskSetup(props) {
  const laptopScreenRef = useRef()

  // Subtle pulsing glow for the laptop screen
  useFrame(({ clock }) => {
    if (laptopScreenRef.current) {
      const pulse = Math.sin(clock.getElapsedTime() * 2) * 0.1 + 0.9
      laptopScreenRef.current.emissiveIntensity = pulse
    }
  })

  // Materials
  const woodMaterial = new THREE.MeshStandardMaterial({ 
    color: '#3d2817', 
    roughness: 0.8,
    metalness: 0.1
  })
  
  const metalMaterial = new THREE.MeshStandardMaterial({ 
    color: '#222222', 
    roughness: 0.4, 
    metalness: 0.6 
  })
  
  const silverMaterial = new THREE.MeshStandardMaterial({ 
    color: '#888888', 
    roughness: 0.3, 
    metalness: 0.8 
  })

  return (
    <group {...props} dispose={null}>
      {/* Desk Top */}
      <mesh position={[0, -0.05, 0]} receiveShadow castShadow material={woodMaterial}>
        <boxGeometry args={[3, 0.1, 1.5]} />
      </mesh>
      
      {/* Desk Legs */}
      <mesh position={[-1.3, -0.8, 0]} receiveShadow castShadow material={metalMaterial}>
        <boxGeometry args={[0.1, 1.5, 1.2]} />
      </mesh>
      <mesh position={[1.3, -0.8, 0]} receiveShadow castShadow material={metalMaterial}>
        <boxGeometry args={[0.1, 1.5, 1.2]} />
      </mesh>

      {/* Laptop Base */}
      <mesh position={[0.2, 0.05, 0.1]} receiveShadow castShadow material={silverMaterial} rotation={[0, -0.2, 0]}>
        <boxGeometry args={[0.8, 0.03, 0.6]} />
      </mesh>
      
      {/* Laptop Screen */}
      <group position={[0.2, 0.05, -0.2]} rotation={[0, -0.2, 0]}>
        <mesh position={[0, 0.3, 0]} rotation={[0.2, 0, 0]} castShadow material={silverMaterial}>
          <boxGeometry args={[0.8, 0.6, 0.03]} />
        </mesh>
        {/* Screen Display */}
        <mesh position={[0, 0.3, 0.02]} rotation={[0.2, 0, 0]}>
          <planeGeometry args={[0.75, 0.55]} />
          <meshStandardMaterial 
            ref={laptopScreenRef}
            color="#1e1e1e" 
            emissive="#ea580c" 
            emissiveIntensity={1}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* Coffee Cup */}
      <mesh position={[-0.8, 0.1, 0.2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.08, 0.2, 16]} />
        <meshStandardMaterial color="#ffffff" roughness={0.5} />
      </mesh>
    </group>
  )
}
