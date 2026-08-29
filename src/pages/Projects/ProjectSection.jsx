import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ProjectVisual } from "./ProjectVisual"
import { ProjectMeta } from "./ProjectMeta"

export function ProjectSection({ project, onInView }) {
  const sectionRef = useRef(null)
  
  // Trigger when 40% of the section is visible
  const isInView = useInView(sectionRef, { margin: "-40% 0px -40% 0px" })

  useEffect(() => {
    if (isInView) {
      onInView(project.id)
    }
  }, [isInView, project.id, onInView])

  return (
    <section 
      id={`project-${project.id}`} 
      ref={sectionRef}
      className="scroll-mt-32 w-full flex flex-col"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <span className="text-sm font-mono text-primary font-bold tracking-widest block mb-4">
          {project.id}
        </span>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
          {project.title}
        </h2>
        <p className="text-lg text-muted-foreground">
          {project.description}
        </p>
      </motion.div>

      <ProjectVisual type={project.visualType} image={project.image} projectTitle={project.title} />
      <ProjectMeta project={project} />
    </section>
  )
}
