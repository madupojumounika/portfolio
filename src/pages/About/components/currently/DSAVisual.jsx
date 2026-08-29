import { useRef, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Text, Html, Float } from '@react-three/drei'
import * as THREE from 'three'

const INITIAL_ARRAY = [7, 2, 9, 1, 5]

export default function DSAVisual({ isHovered }) {
  const groupRef = useRef()
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  // Array state for animation
  const [array, setArray] = useState(INITIAL_ARRAY)
  const [activeIndices, setActiveIndices] = useState([])
  const timer = useRef(0)
  const step = useRef(0)

  // Bubble sort steps
  const steps = useMemo(() => {
    const s = []
    let arr = [...INITIAL_ARRAY]
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length - 1 - i; j++) {
        s.push({ type: 'compare', indices: [j, j + 1], arr: [...arr] })
        if (arr[j] > arr[j + 1]) {
          const temp = arr[j]
          arr[j] = arr[j + 1]
          arr[j + 1] = temp
          s.push({ type: 'swap', indices: [j, j + 1], arr: [...arr] })
        }
      }
    }
    s.push({ type: 'done', indices: [], arr: [...arr] })
    return s
  }, [])

  useFrame((state, delta) => {
    if (groupRef.current) {
      if (!prefersReducedMotion) {
        // Idle gentle rotation
        groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, isHovered ? (state.mouse.x * Math.PI) / 8 : 0, 0.05)
        groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, isHovered ? -(state.mouse.y * Math.PI) / 8 : 0, 0.05)
        
        // Sorting Animation Loop
        const speed = isHovered ? 1.5 : 0.8
        timer.current += delta * speed
        
        if (timer.current > 1.2) {
          timer.current = 0
          step.current = (step.current + 1) % steps.length
          
          const currentStep = steps[step.current]
          if (currentStep.type === 'done') {
            // Pause before restart
            setTimeout(() => {
              if (step.current === steps.length - 1) { // Still done
                step.current = 0
                setArray([...INITIAL_ARRAY])
                setActiveIndices([])
              }
            }, 2000)
          } else {
            setArray(currentStep.arr)
            setActiveIndices(currentStep.indices)
          }
        }
      }
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} />
      
      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
        
        {/* The Array */}
        <group position={[-1.2, 0.5, 0]}>
          {array.map((val, i) => {
            const isActive = activeIndices.includes(i)
            return (
              <group key={i} position={[i * 0.6, 0, 0]}>
                <Box args={[0.5, 0.5, 0.5]}>
                  <meshStandardMaterial 
                    color={isActive ? '#f97316' : '#e4e4e7'} 
                    metalness={0.2} 
                    roughness={0.4}
                    emissive={isActive ? '#ea580c' : '#000000'}
                    emissiveIntensity={isActive ? 0.5 : 0}
                  />
                </Box>
                <Text position={[0, 0, 0.26]} fontSize={0.3} color={isActive ? "white" : "#18181b"} anchorX="center" anchorY="middle">
                  {val}
                </Text>
              </group>
            )
          })}
        </group>

        {/* Floating Code Snippet */}
        <Html transform position={[1.5, 1.2, -0.5]} rotation={[0, -0.2, 0]} scale={0.5} occlude>
          <div className="bg-[#18181b] border border-[#3f3f46] p-4 rounded-md shadow-2xl font-mono text-xs text-[#a1a1aa] w-64">
            <div className="flex gap-1.5 mb-3 border-b border-[#3f3f46] pb-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/50"></div>
            </div>
            <pre className="leading-relaxed">
<span className="text-[#cba6f7]">for</span> (i = <span className="text-[#fab387]">0</span>; i &lt; n; i++) {'{\n'}
  <span className="text-[#cba6f7]">for</span> (j = <span className="text-[#fab387]">0</span>; j &lt; n-i-<span className="text-[#fab387]">1</span>; j++) {'{\n'}
    <span className="text-[#cba6f7]">if</span> (arr[j] &gt; arr[j+<span className="text-[#fab387]">1</span>]) {'{\n'}
      <span className="text-[#89b4fa]">swap</span>(arr, j, j+<span className="text-[#fab387]">1</span>);\n
    {'}\n'}
  {'}\n'}
{'}'}
            </pre>
          </div>
        </Html>
      </Float>
    </group>
  )
}
