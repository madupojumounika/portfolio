import { motion } from "framer-motion"

export function AboutIntro({ data }) {
  return (
    <section className="px-4 md:px-8 pt-20 md:pt-24 pb-8 md:pb-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-6"
      >
        <span className="text-xs font-mono font-bold tracking-widest text-primary uppercase">
          ABOUT
        </span>
        <h1 className="text-xl md:text-2xl lg:text-3xl font-medium leading-relaxed md:leading-relaxed text-foreground max-w-3xl">
          {data}
        </h1>
      </motion.div>
    </section>
  )
}
