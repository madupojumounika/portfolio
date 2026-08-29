import { motion } from "framer-motion"

export function ProjectsHero() {
  return (
    <section className="px-4 md:px-8 pt-12 pb-12 lg:pt-20 lg:pb-16 border-b border-border-subtle bg-background">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col max-w-3xl"
        >
          <span className="text-sm font-mono text-primary font-semibold tracking-widest uppercase mb-6 block">
            Projects
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight mb-6">
            Selected Works
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A collection of things I&apos;ve built to solve problems and learn new technologies.
          </p>
          
          <div className="mt-12 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-border"></div>
            <span className="text-sm font-mono text-muted-foreground tracking-widest uppercase">
              [PROJECT COUNT] 06 Projects
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
