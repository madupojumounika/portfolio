import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSwarm({ count = 100 }) {
  const points = useRef();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y += delta * 0.02;
      points.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#888888"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.4}
      />
    </Points>
  );
}

function OrbitalRing({ radius, tube, speed, color, rotationAxis }) {
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation[rotationAxis] += delta * speed;
    }
  });

  return (
    <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[radius, tube, 16, 100]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.15}
        wireframe
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function CoreGeometry() {
  const groupRef = useRef();
  const innerRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
      groupRef.current.rotation.z += delta * 0.02;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y -= delta * 0.08;
      innerRef.current.rotation.x += delta * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Outer Wireframe Core */}
      <Icosahedron args={[1.5, 0]}>
        <meshStandardMaterial
          color="#a1a1aa"
          wireframe
          transparent
          opacity={0.2}
        />
      </Icosahedron>

      {/* Inner Solid Core */}
      <Icosahedron ref={innerRef} args={[0.8, 0]}>
        <meshStandardMaterial
          color="#3f3f46"
          metalness={0.8}
          roughness={0.2}
          transparent
          opacity={0.8}
        />
      </Icosahedron>

      {/* Nodes / Connecting Lines could be added here if needed */}
    </group>
  );
}

function Scene() {
  const sceneRef = useRef();

  useFrame((state) => {
    const scrollY = window.scrollY;
    // Normalize scroll (approximate max scroll for About page)
    const normalizedScroll = Math.min(scrollY / 2000, 1);

    // Parallax based on mouse
    const targetX = (state.mouse.x * Math.PI) / 10;
    const targetY = (state.mouse.y * Math.PI) / 10;

    if (sceneRef.current) {
      // Smoothly interpolate current rotation towards target + scroll effect
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneRef.current.rotation.y,
        targetX + normalizedScroll * Math.PI * 0.5,
        0.05
      );
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneRef.current.rotation.x,
        -targetY + normalizedScroll * Math.PI * 0.2,
        0.05
      );
    }
  });

  return (
    <group ref={sceneRef}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <CoreGeometry />
        <OrbitalRing radius={2.2} tube={0.01} speed={0.08} color="#71717a" rotationAxis="z" />
        <OrbitalRing radius={2.8} tube={0.015} speed={-0.05} color="#52525b" rotationAxis="x" />
        <OrbitalRing radius={3.5} tube={0.008} speed={0.03} color="#a1a1aa" rotationAxis="y" />
      </Float>
      <ParticleSwarm count={150} />
    </group>
  );
}

export default function EngineeringCore() {
  // Respect reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="w-full h-full min-h-[300px] md:min-h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 2]} // Cap DPR for performance
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#3f3f46" />

        {prefersReducedMotion ? (
          <group>
            <CoreGeometry />
            <OrbitalRing radius={2.2} tube={0.01} speed={0} color="#71717a" rotationAxis="z" />
          </group>
        ) : (
          <Scene />
        )}
      </Canvas>
    </div>
  );
}
