import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, Sphere, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleSwarm({ count = 80 }) {
  const points = useRef();

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12; // taller distribution for helix
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (points.current) {
      points.current.rotation.y -= delta * 0.02;
      points.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a1a1aa"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
}

function HelixStrands() {
  const curve1 = useMemo(() => {
    const pts = [];
    for (let i = -4; i <= 4; i += 0.1) {
      const y = i;
      const x = Math.sin(y * 1.2) * 1.1;
      const z = Math.cos(y * 1.2) * 1.1;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  const curve2 = useMemo(() => {
    const pts = [];
    for (let i = -4; i <= 4; i += 0.1) {
      const y = i;
      const x = Math.sin(y * 1.2 + Math.PI) * 1.1;
      const z = Math.cos(y * 1.2 + Math.PI) * 1.1;
      pts.push(new THREE.Vector3(x, y, z));
    }
    return new THREE.CatmullRomCurve3(pts);
  }, []);

  const material = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: "#52525b",
    metalness: 0.8,
    roughness: 0.2,
    transparent: true,
    opacity: 0.5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  }), []);

  return (
    <group>
      <mesh material={material}>
        <tubeGeometry args={[curve1, 100, 0.02, 8, false]} />
      </mesh>
      <mesh material={material}>
        <tubeGeometry args={[curve2, 100, 0.02, 8, false]} />
      </mesh>
    </group>
  );
}

function HelixConnections() {
  const rungs = useMemo(() => {
    const lines = [];
    for (let y = -3.8; y <= 3.8; y += 0.4) {
      const x1 = Math.sin(y * 1.2) * 1.1;
      const z1 = Math.cos(y * 1.2) * 1.1;

      const x2 = Math.sin(y * 1.2 + Math.PI) * 1.1;
      const z2 = Math.cos(y * 1.2 + Math.PI) * 1.1;

      lines.push([new THREE.Vector3(x1, y, z1), new THREE.Vector3(x2, y, z2)]);
    }
    return lines;
  }, []);

  return (
    <group>
      {rungs.map((points, i) => (
        <Line key={i} points={points} color="#71717a" opacity={0.25} transparent lineWidth={1} />
      ))}
    </group>
  );
}

function MilestoneNodes({ data = [] }) {
  const nodes = useMemo(() => {
    // We reverse the data to build from bottom to top (Intermediate -> B.Tech -> Future)
    const items = [...data].reverse();
    // Push an implicit current/future node
    items.push({ degree: "Continuing Growth" });

    return items.map((item, index) => {
      // Distribute along the Y axis from bottom to top
      const y = -2.5 + (index * 2.5);
      // Place on curve 1
      const x = Math.sin(y * 1.2) * 1.1;
      const z = Math.cos(y * 1.2) * 1.1;

      return { position: [x, y, z], item };
    });
  }, [data]);

  const nodesRef = useRef();

  // Subtle pulse for nodes
  useFrame(({ clock }) => {
    if (nodesRef.current) {
      const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.05;
      nodesRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={nodesRef}>
      {nodes.map((node, i) => (
        <group key={i}>
          <Sphere args={[0.08, 16, 16]} position={node.position}>
            <meshStandardMaterial
              color="#f97316"
              emissive="#ea580c"
              emissiveIntensity={0.6}
              metalness={0.8}
              roughness={0.2}
            />
          </Sphere>
          {/* Add a subtle larger transparent glow sphere around it */}
          <Sphere args={[0.15, 16, 16]} position={node.position}>
            <meshStandardMaterial
              color="#f97316"
              transparent
              opacity={0.15}
              depthWrite={false}
            />
          </Sphere>
        </group>
      ))}
    </group>
  );
}

function HelixGroup({ data }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15; // Continuous slow rotation
    }
  });

  return (
    <group ref={groupRef}>
      <HelixStrands />
      <HelixConnections />
      <MilestoneNodes data={data} />
    </group>
  );
}

function Scene({ data }) {
  const sceneRef = useRef();

  useFrame((state) => {
    const scrollY = window.scrollY;
    // Map scroll roughly to the Education section (assuming it starts around 800px-1000px)
    const scrollFactor = Math.max((scrollY - 500) / 1500, 0);
    const normalizedScroll = Math.min(scrollFactor, 1);

    const targetX = (state.mouse.x * Math.PI) / 12;
    const targetY = (state.mouse.y * Math.PI) / 12;

    if (sceneRef.current) {
      sceneRef.current.rotation.y = THREE.MathUtils.lerp(
        sceneRef.current.rotation.y,
        targetX + normalizedScroll * Math.PI * 0.5, // untwist slowly as we scroll
        0.05
      );
      sceneRef.current.rotation.x = THREE.MathUtils.lerp(
        sceneRef.current.rotation.x,
        -targetY,
        0.05
      );
    }
  });

  return (
    <group ref={sceneRef} scale={1.2}>
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.6}>
        <HelixGroup data={data} />
      </Float>
      <ParticleSwarm count={80} />
    </group>
  );
}

export default function EducationHelix({ data }) {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className="w-full h-full min-h-[300px] md:min-h-full">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <directionalLight position={[-10, 5, -10]} intensity={1} color="#f97316" />
        <directionalLight position={[0, -10, -5]} intensity={0.5} color="#3f3f46" />

        {prefersReducedMotion ? (
          <group scale={1.2}>
            <HelixGroup data={data} />
          </group>
        ) : (
          <Scene data={data} />
        )}
      </Canvas>
    </div>
  );
}
