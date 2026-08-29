import { useState } from "react"
import { motion } from "framer-motion"
import CurrentlyItem from "./components/currently/CurrentlyItem"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

const headerVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
}

export function Currently({ data = [] }) {
  const [hoveredItem, setHoveredItem] = useState(null)
  const anyHovered = hoveredItem !== null

  return (
    <section className="relative w-full py-16 md:py-20 border-t border-border/30">
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="relative z-10 w-full"
      >
        <motion.div variants={headerVariants} className="mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-muted-foreground uppercase block mb-3">
            03 / CURRENTLY
          </span>
          <h2 className="text-2xl md:text-3xl font-medium text-foreground tracking-tight">
            WHAT I&apos;M FOCUSED ON
          </h2>
        </motion.div>

        {/* Minimal 1x4 Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {data.map((item, index) => {
            return (
              <CurrentlyItem 
                key={index}
                item={item} 
                index={index}
                anyHovered={anyHovered} 
                setHoveredItem={setHoveredItem}
              />
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
