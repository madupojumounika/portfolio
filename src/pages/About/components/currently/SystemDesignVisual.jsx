import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder, Line, Float, Text, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export default function SystemDesignVisual({ isHovered }) {
  const groupRef = useRef()
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Architecture Nodes Map
  const nodes = useMemo(() => ({
    client: [0, 2.5, 0],
    lb: [0, 1.2, 0],
    service1: [-1.5, 0, 0],
    service2: [0, 0, 0],
    service3: [1.5, 0, 0],
    cache: [0, -1.2, 0],
    db: [0, -2.5, 0],
  }), [])

  // Packet animation state
  const packets = useRef([])
  const spawnTimer = useRef(0)

  // Sub-rotation for parallax
  const rotationGroupRef = useRef()

  useFrame((state, delta) => {
    if (groupRef.current && !prefersReducedMotion) {
      const speedMult = isHovered ? 2 : 1
      
      // Spawn new requests
      spawnTimer.current += delta * speedMult
      if (spawnTimer.current > (isHovered ? 0.6 : 1.5)) {
        spawnTimer.current = 0
        
        // Pick random service (0, 1, or 2)
        const targetServiceIndex = Math.floor(Math.random() * 3)
        // Cache hit probability
        const cacheHit = Math.random() > 0.4
        
        packets.current.push({
          id: Math.random(),
          progress: 0,
          serviceIndex: targetServiceIndex,
          cacheHit,
          stage: 0 // 0: C->LB, 1: LB->S, 2: S->Cache, 3: Cache->DB (if miss), etc.
        })
      }

      // Update packets
      for (let i = packets.current.length - 1; i >= 0; i--) {
        const p = packets.current[i]
        p.progress += delta * 2 * speedMult
        
        if (p.progress >= 1) {
          p.progress = 0
          p.stage++
          
          if (p.stage > (p.cacheHit ? 2 : 3)) {
             packets.current.splice(i, 1) // Packet finished its downward journey
          }
        }
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
    <group ref={groupRef} position={[0, 0, 0]} scale={0.7}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
        <group ref={rotationGroupRef}>
          
          {/* Static Connection Lines */}
          <Line points={[nodes.client, nodes.lb]} color="#a1a1aa" transparent opacity={0.4} lineWidth={1.5} />
          <Line points={[nodes.lb, nodes.service1]} color="#a1a1aa" transparent opacity={0.4} lineWidth={1.5} />
          <Line points={[nodes.lb, nodes.service2]} color="#a1a1aa" transparent opacity={0.4} lineWidth={1.5} />
          <Line points={[nodes.lb, nodes.service3]} color="#a1a1aa" transparent opacity={0.4} lineWidth={1.5} />
          <Line points={[nodes.service1, nodes.cache]} color="#a1a1aa" transparent opacity={0.4} lineWidth={1.5} />
          <Line points={[nodes.service2, nodes.cache]} color="#a1a1aa" transparent opacity={0.4} lineWidth={1.5} />
          <Line points={[nodes.service3, nodes.cache]} color="#a1a1aa" transparent opacity={0.4} lineWidth={1.5} />
          <Line points={[nodes.cache, nodes.db]} color="#a1a1aa" transparent opacity={0.4} lineWidth={1.5} />

          {/* Nodes */}
          <Node pos={nodes.lb} label="LB" type="box" size={[0.8, 0.3, 0.5]} />
          <Node pos={nodes.service1} label="Auth" type="box" size={[0.6, 0.6, 0.6]} />
          <Node pos={nodes.service2} label="API" type="box" size={[0.6, 0.6, 0.6]} />
          <Node pos={nodes.service3} label="Worker" type="box" size={[0.6, 0.6, 0.6]} />
          <Node pos={nodes.cache} label="Cache" type="box" size={[1.5, 0.3, 0.6]} color="#f97316" />
          <Node pos={nodes.db} label="Database" type="cyl" size={[0.5, 0.5, 0.8, 32]} />

          {/* Dynamic Packets */}
          <PacketsRenderer packetsRef={packets} nodes={nodes} />
          
        </group>
      </Float>
    </group>
  )
}

function Node({ pos, label, type, size, color = "#71717a" }) {
  return (
    <group position={pos}>
      {type === 'box' ? (
        <Box args={size}>
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </Box>
      ) : (
        <Cylinder args={size}>
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </Cylinder>
      )}
      <Text position={[0, type === 'cyl' ? 0.7 : 0.5, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="bottom">
        {label}
      </Text>
    </group>
  )
}

function PacketsRenderer({ packetsRef, nodes }) {
  const meshRef = useRef()
  
  useFrame(() => {
    if (meshRef.current) {
      // Instance mesh or just map elements - we'll just force a re-render or update positions of a pool.
      // Since packets count is small, we can just use normal meshes tracked via state, 
      // but modifying them directly in useFrame is better.
      meshRef.current.children.forEach((child, i) => {
        const p = packetsRef.current[i]
        if (!p) {
          child.visible = false
          return
        }
        child.visible = true
        
        let start, end
        if (p.stage === 0) { start = nodes.client; end = nodes.lb; }
        else if (p.stage === 1) { 
          start = nodes.lb; 
          end = p.serviceIndex === 0 ? nodes.service1 : (p.serviceIndex === 1 ? nodes.service2 : nodes.service3); 
        }
        else if (p.stage === 2) { 
          start = p.serviceIndex === 0 ? nodes.service1 : (p.serviceIndex === 1 ? nodes.service2 : nodes.service3); 
          end = nodes.cache; 
        }
        else { start = nodes.cache; end = nodes.db; }

        child.position.lerpVectors(new THREE.Vector3(...start), new THREE.Vector3(...end), p.progress)
      })
    }
  })

  // Pre-allocate 15 packets
  return (
    <group ref={meshRef}>
      {Array.from({ length: 15 }).map((_, i) => (
        <Sphere key={i} args={[0.08, 16, 16]} visible={false}>
          <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={1} />
        </Sphere>
      ))}
    </group>
  )
}
