import { motion } from "framer-motion"

export function Education({ data }) {
  return (
    <section className="px-4 md:px-8 py-12 md:py-16 border-t border-border/50 max-w-4xl">
      
      <div className="mb-12 md:mb-16">
        <span className="text-xs font-mono font-bold tracking-widest text-muted-foreground uppercase block mb-4">
          02 / EDUCATION
        </span>
      </div>

      <div className="flex flex-col gap-8 md:gap-12">
        {data.map((edu, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="flex flex-col border-b border-border/30 pb-12 last:border-0 last:pb-0"
          >
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2 gap-2">
              <h3 className="text-sm font-mono font-bold tracking-widest uppercase text-orange-500">
                {edu.degree}
              </h3>
              <span className="text-sm font-mono text-muted-foreground">
                {edu.duration}
              </span>
            </div>
            
            <h4 className="text-xl font-medium text-foreground mb-4">
              {edu.major}
            </h4>
            
            <div className="text-base text-muted-foreground mb-6">
              <span className="text-foreground">{edu.institution}</span>
              {edu.location && <span>, {edu.location}</span>}
            </div>
            
            <div className="flex items-center gap-4 text-sm font-mono tracking-widest uppercase">
              <span className="text-muted-foreground">{edu.scoreLabel}</span>
              <span className="text-orange-500 font-bold">{edu.score}</span>
            </div>
          </motion.div>
        ))}
      </div>

    </section>
  )
}
