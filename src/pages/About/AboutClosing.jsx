import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export function AboutClosing({ data }) {
  return (
    <section className="px-4 md:px-8 py-16 md:py-20 border-t border-border-subtle max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-2">
          {data.map((line, index) => (
            <span key={index} className="text-xl md:text-2xl font-medium text-foreground">
              {line}
            </span>
          ))}
        </div>
        
        <a 
          href="mailto:madupojumounika0@gmail.com" 
          className="group inline-flex items-center gap-3 text-sm font-mono font-bold tracking-widest uppercase text-primary hover:text-primary/80 transition-colors w-fit"
        >
          <span>LET&apos;S CONNECT</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </motion.div>
    </section>
  )
}
