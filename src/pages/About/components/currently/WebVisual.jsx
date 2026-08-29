import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder, Line, Float, Text, Sphere } from '@react-three/drei'
import * as THREE from 'three'

export default function WebVisual({ isHovered }) {
  const groupRef = useRef()
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const nodes = useMemo(() => ({
    laptop: [-2, 1, 0],
    server: [0, -0.5, 0],
    db: [2, 1, 0],
  }), [])

  const packetRef = useRef()
  const packetProgress = useRef(0)
  const packetRoute = useRef(0) // 0: laptop->server, 1: server->db, 2: db->server, 3: server->laptop

  // Sub-rotation for parallax
  const rotationGroupRef = useRef()

  useFrame((state, delta) => {
    if (groupRef.current && !prefersReducedMotion) {
      if (packetRef.current) {
        const speed = isHovered ? 2.5 : 1.2
        packetProgress.current += delta * speed
        if (packetProgress.current >= 1) {
          packetProgress.current = 0
          packetRoute.current = (packetRoute.current + 1) % 4
        }

        let start, end
        if (packetRoute.current === 0) { start = nodes.laptop; end = nodes.server; }
        else if (packetRoute.current === 1) { start = nodes.server; end = nodes.db; }
        else if (packetRoute.current === 2) { start = nodes.db; end = nodes.server; }
        else { start = nodes.server; end = nodes.laptop; }

        packetRef.current.position.lerpVectors(
          new THREE.Vector3(...start), 
          new THREE.Vector3(...end), 
          packetProgress.current
        )
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

  const materialProps = { color: "#e4e4e7", metalness: 0.3, roughness: 0.4 }

  return (
    <group ref={groupRef} position={[0, -0.2, 0]} scale={0.7}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      
      <Float speed={2} rotationIntensity={0.05} floatIntensity={0.2}>
        <group ref={rotationGroupRef}>
          
          {/* Connections */}
          <Line points={[nodes.laptop, nodes.server]} color="#a1a1aa" transparent opacity={0.4} lineWidth={1.5} />
          <Line points={[nodes.server, nodes.db]} color="#a1a1aa" transparent opacity={0.4} lineWidth={1.5} />

          {/* Laptop */}
          <group position={nodes.laptop}>
            <Box args={[1.2, 0.8, 0.05]} position={[0, 0.4, -0.4]} rotation={[-0.2, 0, 0]}>
               <meshStandardMaterial {...materialProps} />
               <Box args={[1.1, 0.7, 0.02]} position={[0, 0, 0.03]}>
                  <meshBasicMaterial color="#18181b" />
               </Box>
            </Box>
            <Box args={[1.2, 0.05, 0.8]} position={[0, 0, 0]}>
               <meshStandardMaterial color="#a1a1aa" metalness={0.4} roughness={0.4} />
            </Box>
            <Text position={[0, 1.2, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="bottom">
              Client
            </Text>
          </group>

          {/* Server Rack */}
          <group position={nodes.server}>
            <Box args={[0.8, 1.2, 0.8]}>
              <meshStandardMaterial color="#d4d4d8" metalness={0.4} roughness={0.4} />
            </Box>
            <Box args={[0.7, 0.2, 0.85]} position={[0, 0.4, 0]}>
              <meshStandardMaterial {...materialProps} />
            </Box>
            <Box args={[0.7, 0.2, 0.85]} position={[0, 0, 0]}>
              <meshStandardMaterial {...materialProps} />
            </Box>
            <Box args={[0.7, 0.2, 0.85]} position={[0, -0.4, 0]}>
              <meshStandardMaterial {...materialProps} />
            </Box>
            <Text position={[0, 0.8, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="bottom">
              Server
            </Text>
          </group>

          {/* Database */}
          <group position={nodes.db}>
            <Cylinder args={[0.6, 0.6, 1.2, 32]}>
              <meshStandardMaterial {...materialProps} />
            </Cylinder>
            {/* Database rings */}
            <Cylinder args={[0.62, 0.62, 0.05, 32]} position={[0, 0.3, 0]}>
              <meshStandardMaterial color="#a1a1aa" />
            </Cylinder>
            <Cylinder args={[0.62, 0.62, 0.05, 32]} position={[0, -0.3, 0]}>
              <meshStandardMaterial color="#a1a1aa" />
            </Cylinder>
            <Text position={[0, 0.8, 0]} fontSize={0.2} color="white" anchorX="center" anchorY="bottom">
              Database
            </Text>
          </group>

          {/* Traveling Packet */}
          <Sphere ref={packetRef} args={[0.1, 16, 16]}>
            <meshStandardMaterial color="#f97316" emissive="#ea580c" emissiveIntensity={1} />
          </Sphere>
          
        </group>
      </Float>
    </group>
  )
}
