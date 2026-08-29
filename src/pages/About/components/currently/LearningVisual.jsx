import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Float } from '@react-three/drei'
import * as THREE from 'three'

export default function LearningVisual({ isHovered }) {
  const groupRef = useRef()
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useFrame((_state, delta) => {
    if (groupRef.current) {
      // Base rotation
      if (!prefersReducedMotion) {
        const speed = isHovered ? 1.5 : 0.5
        groupRef.current.rotation.y += delta * speed
        groupRef.current.rotation.x += delta * (speed * 0.5)
      }

      // Smooth hover scale & Z movement
      const targetZ = isHovered ? 0.5 : 0
      const targetScale = isHovered ? 1.05 : 1
      groupRef.current.position.z = THREE.MathUtils.lerp(groupRef.current.position.z, targetZ, 0.1)
      groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.1))
    }
  })

  // Orbital positions
  const orbits = useMemo(() => {
    return [
      { radius: 1.2, speed: 1.2, color: '#f97316', size: 0.05, axis: new THREE.Vector3(0, 1, 0) },
      { radius: 1.5, speed: 0.8, color: '#71717a', size: 0.04, axis: new THREE.Vector3(1, 0, 1).normalize() },
      { radius: 1.8, speed: 1.5, color: '#52525b', size: 0.03, axis: new THREE.Vector3(-1, 1, 0).normalize() },
    ]
  }, [])

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* Core */}
        <Sphere args={[0.2, 32, 32]}>
          <meshPhysicalMaterial 
            color="#3f3f46"
            metalness={0.8}
            roughness={0.2}
            clearcoat={1}
          />
        </Sphere>
        
        {/* Wireframe outer core */}
        <Sphere args={[0.25, 8, 8]}>
          <meshBasicMaterial 
            color="#71717a"
            wireframe
            transparent
            opacity={0.3}
          />
        </Sphere>

        {/* Orbitals */}
        {orbits.map((orbit, i) => (
          <OrbitalNode key={i} orbit={orbit} isHovered={isHovered} prefersReducedMotion={prefersReducedMotion} />
        ))}
      </Float>
    </group>
  )
}

function OrbitalNode({ orbit, isHovered, prefersReducedMotion }) {
  const ref = useRef()
  const currentAngle = useRef(Math.random() * Math.PI * 2)

  useFrame((state, delta) => {
    if (ref.current && !prefersReducedMotion) {
      const speedMult = isHovered ? 1.5 : 0.5
      currentAngle.current += delta * orbit.speed * speedMult
      
      const x = Math.cos(currentAngle.current) * orbit.radius
      const z = Math.sin(currentAngle.current) * orbit.radius
      
      // Apply rotation based on axis
      const pos = new THREE.Vector3(x, 0, z)
      pos.applyAxisAngle(orbit.axis, Math.PI / 4)
      
      ref.current.position.copy(pos)
    }
  })

  return (
    <group ref={ref}>
      <Sphere args={[orbit.size, 16, 16]}>
        <meshStandardMaterial 
          color={orbit.color}
          emissive={orbit.color === '#f97316' ? '#ea580c' : '#000000'}
          emissiveIntensity={0.5}
        />
      </Sphere>
    </group>
  )
}
