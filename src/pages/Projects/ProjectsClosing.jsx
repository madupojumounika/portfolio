import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

export function ProjectsClosing() {
  return (
    <section className="px-4 md:px-8 py-32 lg:py-48 flex flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl flex flex-col items-center"
      >
        <span className="text-sm font-mono text-muted-foreground tracking-widest uppercase mb-8 block">
          06 / 06
        </span>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight text-foreground mb-8">
          AND I&apos;M STILL BUILDING.
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-12">
          [CLOSING STATEMENT PLACEHOLDER] These six projects are just the beginning. I&apos;m constantly learning new patterns, exploring new technologies, and building better software.
        </p>
        
        <Link 
          to="/contact" 
          className="group flex items-center gap-3 text-lg font-bold tracking-widest uppercase text-primary hover:text-primary/80 transition-colors"
        >
          <span>Let&apos;s Build Something</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </section>
  )
}
