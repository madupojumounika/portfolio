/**
 * CTABackground.jsx
 *
 * Premium 3D animated background for the HomeCTA section.
 *
 * Visual concept:
 *   - Low-poly icosahedron engineering core at center
 *   - 3 orbital torus rings at different angles, slowly rotating
 *   - Instanced particles: most muted zinc, a few active orange
 *   - Particles travel along the orbital paths (parametric curves)
 *   - Mouse parallax: ±2–3° gentle tilt
 *   - Scroll-triggered fade-in via Framer Motion
 *   - Responsive: fewer particles on tablet/mobile
 *   - Respects prefers-reduced-motion
 */

import { useRef, useMemo, useEffect, useState, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion, useInView } from 'framer-motion'
import * as THREE from 'three'

// ─── Design tokens ────────────────────────────────────────────────────────────
const ZINC_DIM    = '#3f3f46'   // zinc-700  — faint structural elements
const ZINC_MID    = '#71717a'   // zinc-500  — midground rings / particles
const ZINC_BRIGHT = '#a1a1aa'   // zinc-400  — near particles, core wireframe
const ORANGE      = '#f97316'   // orange-500 — active data flow accent
const ORANGE_DIM  = '#c2410c'   // orange-700 — subtler orange elements

// ─── Utilities ────────────────────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t }

/** Returns a point on an elliptical orbit given angle t */
function orbitPoint(t, rx, ry, tiltX, tiltY, tiltZ) {
  const x = rx * Math.cos(t)
  const y = ry * Math.sin(t)
  const z = 0
  // Rotate around X
  const y1 = y * Math.cos(tiltX) - z * Math.sin(tiltX)
  const z1 = y * Math.sin(tiltX) + z * Math.cos(tiltX)
  // Rotate around Y
  const x2 = x * Math.cos(tiltY) + z1 * Math.sin(tiltY)
  const z2 = -x * Math.sin(tiltY) + z1 * Math.cos(tiltY)
  // Rotate around Z
  const x3 = x2 * Math.cos(tiltZ) - y1 * Math.sin(tiltZ)
  const y3 = x2 * Math.sin(tiltZ) + y1 * Math.cos(tiltZ)
  return new THREE.Vector3(x3, y3, z2)
}

// ─── Orbit definitions ────────────────────────────────────────────────────────
const ORBITS = [
  // Wide flat ellipse — sweeps left/right edge of the section
  { rx: 7.0, ry: 1.8, tiltX: Math.PI * 0.12, tiltY: 0.08,          tiltZ: 0,            speed: 0.07,  color: ZINC_MID,    opacity: 0.28, tube: 0.01  },
  // Large angled ellipse — reaches corners
  { rx: 9.0, ry: 2.8, tiltX: -Math.PI * 0.22, tiltY: Math.PI * 0.08, tiltZ: Math.PI * 0.08, speed: 0.045, color: ZINC_DIM,   opacity: 0.2,  tube: 0.007 },
  // Tilted near-circle — gives vertical spread
  { rx: 5.5, ry: 4.5, tiltX: Math.PI * 0.45,  tiltY: Math.PI * 0.15, tiltZ: 0,           speed: 0.10,  color: ZINC_BRIGHT, opacity: 0.18, tube: 0.006 },
]

// ─── EngineCore ───────────────────────────────────────────────────────────────
function EngineCore({ pulseRef }) {
  const coreRef  = useRef()
  const wireRef  = useRef()
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const ring3Ref = useRef()
  const glowRef  = useRef()

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.18
      coreRef.current.rotation.x = t * 0.09
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = -t * 0.12
      wireRef.current.rotation.z = t * 0.06
    }
    // Orbital rings around core
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.22
      ring1Ref.current.rotation.x = Math.PI * 0.15
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = Math.PI * 0.5 + t * 0.15
      ring2Ref.current.rotation.y = t * 0.1
    }
    if (ring3Ref.current) {
      ring3Ref.current.rotation.y = t * 0.18
      ring3Ref.current.rotation.z = Math.PI * 0.25
    }
    // Pulse on active orange particle proximity
    if (glowRef.current) {
      const base = 0.55
      const pulse = pulseRef ? pulseRef.current : 0
      const extra = pulse * 0.4
      glowRef.current.intensity = base + extra + Math.sin(t * 2.2) * 0.05
    }
  })

  return (
    <group>
      {/* Subtle point light that pulses */}
      <pointLight ref={glowRef} position={[0, 0, 0]} intensity={0.3} color={ORANGE} distance={5} />

      {/* Low-poly icosahedron core — solid, metallic zinc */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial
          color={ZINC_BRIGHT}
          roughness={0.35}
          metalness={0.75}
          emissive={ORANGE_DIM}
          emissiveIntensity={0.04}
        />
      </mesh>

      {/* Wireframe overlay — shows geometry structure */}
      <mesh ref={wireRef}>
        <icosahedronGeometry args={[0.57, 1]} />
        <meshBasicMaterial
          color={ORANGE}
          wireframe
          transparent
          opacity={0.10}
        />
      </mesh>

      {/* Inner glow sphere */}
      <mesh>
        <sphereGeometry args={[0.38, 12, 12]} />
        <meshBasicMaterial
          color={ORANGE}
          transparent
          opacity={0.03}
        />
      </mesh>

      {/* Orbital ring 1 — thin, slight tilt */}
      <mesh ref={ring1Ref}>
        <torusGeometry args={[0.9, 0.018, 12, 80]} />
        <meshStandardMaterial color={ZINC_MID} metalness={0.6} roughness={0.4} transparent opacity={0.4} />
      </mesh>

      {/* Orbital ring 2 — perpendicular, very thin orange */}
      <mesh ref={ring2Ref}>
        <torusGeometry args={[1.15, 0.012, 12, 80]} />
        <meshBasicMaterial color={ORANGE} transparent opacity={0.3} />
      </mesh>

      {/* Orbital ring 3 — diagonal, faint */}
      <mesh ref={ring3Ref}>
        <torusGeometry args={[0.75, 0.01, 12, 80]} />
        <meshBasicMaterial color={ZINC_BRIGHT} transparent opacity={0.22} />
      </mesh>
    </group>
  )
}

// ─── Orbit Path Lines ─────────────────────────────────────────────────────────
/** Renders one large orbital ellipse as a thin tube */
function OrbitPath({ orbitDef }) {
  const meshRef = useRef()

  // Build the tube geometry from orbit points
  const geometry = useMemo(() => {
    const points = []
    const segments = 120
    for (let i = 0; i <= segments; i++) {
      const t = (i / segments) * Math.PI * 2
      points.push(orbitPoint(t, orbitDef.rx, orbitDef.ry, orbitDef.tiltX, orbitDef.tiltY, orbitDef.tiltZ))
    }
    const curve = new THREE.CatmullRomCurve3(points, true)
    return new THREE.TubeGeometry(curve, 120, orbitDef.tube, 6, true)
  }, [orbitDef])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // Very slow rotation of the orbital plane itself
      meshRef.current.rotation.y = clock.elapsedTime * orbitDef.speed * 0.4
    }
  })

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <meshBasicMaterial color={orbitDef.color} transparent opacity={orbitDef.opacity} />
    </mesh>
  )
}

// ─── Data Particles ───────────────────────────────────────────────────────────
/**
 * Particles travel along the orbital paths parametrically.
 * Each particle knows which orbit it belongs to, its progress angle,
 * and whether it's an "active" orange carrier.
 */
function DataParticles({ orbitDefs, particleCount, onOrangePulse }) {
  const meshRef     = useRef()
  const orangeRef   = useRef()
  const dummy       = useMemo(() => new THREE.Object3D(), [])

  // Initialise particles
  const particles = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const orbitIdx = Math.floor(Math.random() * orbitDefs.length)
      const isOrange = i < Math.max(3, Math.floor(particleCount * 0.07))
      return {
        orbitIdx,
        angle: Math.random() * Math.PI * 2,
        speed: (0.15 + Math.random() * 0.2) * (Math.random() > 0.5 ? 1 : -1),
        isOrange,
        scale: isOrange
          ? 0.85 + Math.random() * 0.35
          : 0.4 + Math.random() * 0.6,
        z: (Math.random() - 0.5) * 0.8, // slight Z scatter for depth
      }
    })
  }, [particleCount, orbitDefs])

  // Separate orange and zinc particles for instanced meshes
  const zincParticles   = useMemo(() => particles.filter(p => !p.isOrange), [particles])
  const orangeParticles = useMemo(() => particles.filter(p => p.isOrange),  [particles])

  useFrame(({ clock }, delta) => {
    const t = clock.elapsedTime

    // ── Zinc particles ──
    if (meshRef.current) {
      zincParticles.forEach((p, i) => {
        p.angle += delta * p.speed * 0.6
        const orbit = orbitDefs[p.orbitIdx]
        // Slowly rotate the orbit plane over time
        const extraTiltY = t * orbit.speed * 0.4
        const pos = orbitPoint(
          p.angle,
          orbit.rx,
          orbit.ry,
          orbit.tiltX,
          orbit.tiltY + extraTiltY,
          orbit.tiltZ
        )
        dummy.position.set(pos.x, pos.y, pos.z + p.z)
        dummy.scale.setScalar(p.scale)
        dummy.updateMatrix()
        meshRef.current.setMatrixAt(i, dummy.matrix)
      })
      meshRef.current.instanceMatrix.needsUpdate = true
    }

    // ── Orange particles ──
    if (orangeRef.current) {
      let closestDist = Infinity
      orangeParticles.forEach((p, i) => {
        p.angle += delta * p.speed * 0.75
        const orbit = orbitDefs[p.orbitIdx]
        const extraTiltY = t * orbit.speed * 0.4
        const pos = orbitPoint(
          p.angle,
          orbit.rx,
          orbit.ry,
          orbit.tiltX,
          orbit.tiltY + extraTiltY,
          orbit.tiltZ
        )
        dummy.position.set(pos.x, pos.y, pos.z + p.z * 0.5)
        dummy.scale.setScalar(p.scale)
        dummy.updateMatrix()
        orangeRef.current.setMatrixAt(i, dummy.matrix)

        // Track closest orange particle to core (for pulse)
        const dist = Math.sqrt(pos.x * pos.x + pos.y * pos.y + pos.z * pos.z)
        if (dist < closestDist) closestDist = dist
      })
      orangeRef.current.instanceMatrix.needsUpdate = true

      // Pulse strength: 0 when far, 1 when very close
      if (onOrangePulse) {
        const pulse = Math.max(0, 1 - closestDist / 2.5)
        onOrangePulse(pulse)
      }
    }
  })

  if (zincParticles.length === 0) return null

  return (
    <>
      {/* Zinc/gray particles */}
      <instancedMesh ref={meshRef} args={[null, null, zincParticles.length]}>
        <sphereGeometry args={[0.04, 6, 6]} />
        <meshBasicMaterial color={ZINC_MID} transparent opacity={0.4} />
      </instancedMesh>

      {/* Orange active particles */}
      {orangeParticles.length > 0 && (
        <instancedMesh ref={orangeRef} args={[null, null, orangeParticles.length]}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color={ORANGE} transparent opacity={0.65} />
        </instancedMesh>
      )}
    </>
  )
}

// ─── Background depth particles ────────────────────────────────────────────────
/** Very faint distant particles for atmosphere and depth */
function AtmosphereParticles({ count }) {
  const meshRef = useRef()
  const dummy   = useMemo(() => new THREE.Object3D(), [])

  const positions = useMemo(() =>
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 32,  // wider spread across full section
      y: (Math.random() - 0.5) * 10,
      z: -5 - Math.random() * 7,
      vy: (Math.random() - 0.5) * 0.005,
    })),
  [count])

  useFrame(() => {
    if (!meshRef.current) return
    positions.forEach((p, i) => {
      p.y += p.vy
      if (p.y > 6)  p.y = -6
      if (p.y < -6) p.y =  6
      dummy.position.set(p.x, p.y, p.z)
      dummy.scale.setScalar(1)
      dummy.updateMatrix()
      meshRef.current.setMatrixAt(i, dummy.matrix)
    })
    meshRef.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[0.025, 4, 4]} />
      <meshBasicMaterial color={ZINC_DIM} transparent opacity={0.22} />
    </instancedMesh>
  )
}

// ─── Scene — mouse parallax + full composition ────────────────────────────────
function Scene({ isMobile, isReducedMotion, particleCount }) {
  const groupRef  = useRef()
  const mouseRef  = useRef({ x: 0, y: 0 })
  const targetRef = useRef({ x: 0, y: 0 })
  const pulseRef  = useRef(0)
  const { gl }    = useThree()

  // Listen to mouse on the canvas container
  const handleMouse = useCallback((e) => {
    if (isMobile || isReducedMotion) return
    const rect = gl.domElement.getBoundingClientRect()
    targetRef.current.x = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
    targetRef.current.y = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
  }, [isMobile, isReducedMotion, gl])

  useEffect(() => {
    const el = gl.domElement.parentElement
    el.addEventListener('mousemove', handleMouse)
    return () => el.removeEventListener('mousemove', handleMouse)
  }, [handleMouse, gl])

  useFrame((_, delta) => {
    if (!groupRef.current) return

    if (!isMobile && !isReducedMotion) {
      // Smooth interpolation toward mouse target
      mouseRef.current.x = lerp(mouseRef.current.x, targetRef.current.x, delta * 2.5)
      mouseRef.current.y = lerp(mouseRef.current.y, targetRef.current.y, delta * 2.5)

      const maxRad = (3 * Math.PI) / 180  // 3 degrees
      groupRef.current.rotation.y = mouseRef.current.x * maxRad
      groupRef.current.rotation.x = -mouseRef.current.y * maxRad * 0.6
    }
  })

  const handlePulse = useCallback((v) => { pulseRef.current = v }, [])

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 8, 6]}  intensity={0.6} color="#ffffff" />
      <directionalLight position={[-8, -4, -4]} intensity={0.2} color={ZINC_MID} />

      {/* Main composition group — responds to mouse */}
      <group ref={groupRef} position={[0, 0, 0]}>
        {/* Central engineering core */}
        <EngineCore pulseRef={pulseRef} />

        {/* Three orbital path ellipses */}
        {ORBITS.map((orb, i) => (
          <OrbitPath key={i} orbitDef={orb} />
        ))}

        {/* Data particles along orbital paths */}
        {!isReducedMotion && (
          <DataParticles
            orbitDefs={ORBITS}
            particleCount={particleCount}
            onOrangePulse={handlePulse}
          />
        )}
      </group>

      {/* Background atmosphere particles (behind, independent of parallax) */}
      {!isReducedMotion && <AtmosphereParticles count={isMobile ? 20 : 45} />}
    </>
  )
}

// ─── CTABackground — exported component ───────────────────────────────────────
export function CTABackground() {
  const containerRef  = useRef(null)
  const isInView      = useInView(containerRef, { once: true, margin: '-80px' })
  const [isMobile,   setIsMobile]   = useState(false)
  const [isTablet,   setIsTablet]   = useState(false)
  const [isReduced,  setIsReduced]  = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setIsReduced(mq.matches)
    const handler = () => setIsReduced(mq.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 640)
      setIsTablet(window.innerWidth < 1024)
    }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const particleCount = isMobile ? 15 : isTablet ? 28 : 50

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      aria-hidden="true"
    >
      {/* Edge vignette — fades the very edges so scene blends into page */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse 110% 90% at 50% 50%, transparent 45%, hsl(var(--background) / 0.7) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Center text-protection overlay — keeps the headline area clear */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(ellipse 55% 65% at 50% 50%, hsl(var(--background) / 0.52) 0%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* The Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 11], fov: 55 }}
        dpr={[1, isMobile ? 1 : 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene
          isMobile={isMobile}
          isReducedMotion={isReduced}
          particleCount={particleCount}
        />
      </Canvas>
    </motion.div>
  )
}
