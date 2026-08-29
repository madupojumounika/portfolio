import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Line, Float, Text } from '@react-three/drei'
import * as THREE from 'three'

// Neural network layout constants
const L1 = [[-2.5, 1, 0], [-2.5, 0, 0], [-2.5, -1, 0]]
const L2 = [[-0.8, 1.5, 0.5], [-0.8, 0.5, -0.5], [-0.8, -0.5, 0.5], [-0.8, -1.5, -0.5]]
const L3 = [[0.8, 1.2, -0.5], [0.8, 0.4, 0.5], [0.8, -0.4, -0.5], [0.8, -1.2, 0.5]]
const L4 = [[2.5, 0.5, 0], [2.5, -0.5, 0]]

const NETWORK_NODES = [...L1, ...L2, ...L3, ...L4].map((pos, id) => ({ id, pos }))

const NETWORK_EDGES = (() => {
  const list = []
  for (let i = 0; i < L1.length; i++) {
    for (let j = 0; j < L2.length; j++) list.push([NETWORK_NODES[i].pos, NETWORK_NODES[L1.length + j].pos])
  }
  for (let i = 0; i < L2.length; i++) {
    for (let j = 0; j < L3.length; j++) list.push([NETWORK_NODES[L1.length + i].pos, NETWORK_NODES[L1.length + L2.length + j].pos])
  }
  for (let i = 0; i < L3.length; i++) {
    for (let j = 0; j < L4.length; j++) list.push([NETWORK_NODES[L1.length + L2.length + i].pos, NETWORK_NODES[L1.length + L2.length + L3.length + j].pos])
  }
  return list
})()

export default function AIVisual({ isHovered }) {
  const groupRef = useRef()
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const nodes = useMemo(() => NETWORK_NODES, [])
  const edges = useMemo(() => NETWORK_EDGES, [])

  // Signal propagation
  const signalProgress = useRef(0)
  
  // Parallax group
  const rotationGroupRef = useRef()

  useFrame((state, delta) => {
    if (groupRef.current && !prefersReducedMotion) {
        
      // Signal sweeping left to right (-3 to +3)
      const speed = isHovered ? 2.5 : 1.5
      signalProgress.current += delta * speed
      if (signalProgress.current > 6) { // Loop 0 to 6 (mapped to -3 to 3 X coords)
        signalProgress.current = 0
      }
    }
    
    // Parallax
    if (rotationGroupRef.current && !prefersReducedMotion) {
      if (isHovered) {
        rotationGroupRef.current.rotation.y = THREE.MathUtils.lerp(rotationGroupRef.current.rotation.y, (state.mouse.x * Math.PI) / 6, 0.05)
        rotationGroupRef.current.rotation.x = THREE.MathUtils.lerp(rotationGroupRef.current.rotation.x, -(state.mouse.y * Math.PI) / 6, 0.05)
      } else {
        rotationGroupRef.current.rotation.y = THREE.MathUtils.lerp(rotationGroupRef.current.rotation.y, Math.sin(state.clock.elapsedTime * 0.2) * 0.1, 0.05)
        rotationGroupRef.current.rotation.x = THREE.MathUtils.lerp(rotationGroupRef.current.rotation.x, 0, 0.05)
      }
    }
  })

  return (
    <group ref={groupRef} scale={0.8} position={[0, -0.2, 0]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
        <group ref={rotationGroupRef}>
          
          <Text position={[-2.5, -2, 0]} fontSize={0.3} color="#a1a1aa" anchorX="center">Input</Text>
          <Text position={[2.5, -2, 0]} fontSize={0.3} color="#a1a1aa" anchorX="center">Prediction</Text>

          {edges.map((edge, i) => (
            <Line 
              key={i} 
              points={edge} 
              color="#a1a1aa" 
              transparent 
              opacity={0.4} 
              lineWidth={1.5} 
            />
          ))}

          {nodes.map((node) => (
            <AINode key={node.id} position={node.pos} signalProgress={signalProgress} layerX={node.pos[0]} />
          ))}

        </group>
      </Float>
    </group>
  )
}

function AINode({ position, signalProgress, layerX }) {
  const meshRef = useRef()
  const matRef = useRef()

  useFrame(() => {
    if (matRef.current) {
      // Map signalProgress (0 to 6) to a sweeping X coordinate (-3 to 3)
      const sweepX = -3 + signalProgress.current
      
      // Node activates when the sweep passes over it
      const distance = Math.abs(layerX - sweepX)
      const active = distance < 0.6

      const targetColor = active ? new THREE.Color('#f97316') : new THREE.Color('#e4e4e7')
      const targetEmissive = active ? new THREE.Color('#ea580c') : new THREE.Color('#000000')
      
      matRef.current.color.lerp(targetColor, 0.15)
      matRef.current.emissive.lerp(targetEmissive, 0.15)
      matRef.current.emissiveIntensity = THREE.MathUtils.lerp(matRef.current.emissiveIntensity, active ? 0.8 : 0, 0.15)
      
      if (meshRef.current) {
        const targetScale = active ? 1.5 : 1
        meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.15))
      }
    }
  })

  return (
    <Sphere ref={meshRef} args={[0.12, 16, 16]} position={position}>
      <meshStandardMaterial ref={matRef} color="#e4e4e7" metalness={0.3} roughness={0.4} />
    </Sphere>
  )
}
