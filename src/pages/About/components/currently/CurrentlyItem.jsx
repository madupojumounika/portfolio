import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import DSAVisual from './DSAVisual'
import SystemDesignVisual from './SystemDesignVisual'
import WebVisual from './WebVisual'
import AIVisual from './AIVisual'
import LearningVisual from './LearningVisual'

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 15 }
  }
}

export default function CurrentlyItem({ item, index, anyHovered, setHoveredItem }) {
  const [isHovered, setIsHovered] = useState(false)
  const containerRef = useRef()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  let VisualComponent = LearningVisual
  let description = "Exploring new boundaries."
  
  const lowerItem = item.toLowerCase()
  if (lowerItem.includes('dsa') || lowerItem.includes('algorithm') || lowerItem.includes('data structure')) {
    VisualComponent = DSAVisual
    description = "Data structures & algorithms."
  } else if (lowerItem.includes('system design') || lowerItem.includes('architecture') || lowerItem.includes('backend')) {
    VisualComponent = SystemDesignVisual
    description = "Scalable distributed architecture."
  } else if (lowerItem.includes('saas') || lowerItem.includes('web') || lowerItem.includes('full stack')) {
    VisualComponent = WebVisual
    description = "Modern web applications."
  } else if (lowerItem.includes('ai') || lowerItem.includes('machine') || lowerItem.includes('llm')) {
    VisualComponent = AIVisual
    description = "Neural networks & ML models."
  }

  const isDimmed = anyHovered && !isHovered
  const formattedIndex = (index + 1).toString().padStart(2, '0')

  return (
    <motion.div
      variants={itemVariants}
      onMouseEnter={() => { setIsHovered(true); setHoveredItem(item) }}
      onMouseLeave={() => { setIsHovered(false); setHoveredItem(null) }}
      ref={containerRef}
      className={`relative flex flex-col w-full h-[380px] p-5 border border-border/40 bg-background/30 hover:bg-background/60 rounded-2xl group transition-all duration-500 overflow-hidden ${isDimmed ? 'opacity-40 scale-[0.98]' : 'opacity-100 scale-100'}`}
    >
      {/* 3D Visual - Top Half */}
      <div className="relative w-full h-[220px] mb-6 rounded-lg overflow-hidden pointer-events-none flex items-center justify-center transition-all duration-500 bg-foreground/[0.02] group-hover:bg-foreground/[0.04]">
        {mounted && (
          <Canvas
            camera={{ position: [0, 0, 3.8], fov: 45 }}
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: true }}
            className="w-full h-full pointer-events-auto"
            eventSource={containerRef.current}
          >
            <VisualComponent isHovered={isHovered} />
          </Canvas>
        )}
      </div>
      
      {/* Content - Bottom Half */}
      <div className="flex flex-col mt-auto relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-[10px] font-mono text-muted-foreground/60">{formattedIndex}</span>
          <h3 className={`text-lg font-medium tracking-tight transition-colors duration-300 ${isHovered ? 'text-foreground' : 'text-foreground/80'}`}>
            {item}
          </h3>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed pl-[1.6rem]">
          {description}
        </p>
      </div>
    </motion.div>
  )
}
