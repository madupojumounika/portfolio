import { motion } from "framer-motion"
import { ExternalLink, Github } from "lucide-react"

export function ProjectMeta({ project }) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mt-8 pt-6 border-t border-border/50">
      <motion.div 
        className="flex flex-wrap gap-3"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
      >
        {project.technologies.map((tech, i) => (
          <motion.span 
            key={i}
            variants={{
              hidden: { opacity: 0, scale: 0.9 },
              visible: { opacity: 1, scale: 1 }
            }}
            className="px-3 py-1 bg-secondary text-secondary-foreground text-xs font-mono tracking-tight rounded"
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

      <div className="flex items-center gap-6 shrink-0">
        <a 
          href={project.sourceUrl} 
          className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-muted-foreground hover:text-orange-500 transition-colors"
          target="_blank" 
          rel="noreferrer"
        >
          <Github className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>Source Code</span>
        </a>
        <a 
          href={project.liveUrl} 
          className="group flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-muted-foreground hover:text-orange-500 transition-colors"
          target="_blank" 
          rel="noreferrer"
        >
          <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>View Project</span>
        </a>
      </div>
    </div>
  )
}
