import { motion } from "framer-motion"
import { SectionHeader } from "../../components/common/SectionHeader"

export function EngineeringApproach() {
  const steps = [
    {
      number: "01",
      title: "Understand",
      description: "Understand the problem, context, and constraints before choosing a solution."
    },
    {
      number: "02",
      title: "Design",
      description: "Define the structure, API, and trade-offs to ensure scalability and alignment."
    },
    {
      number: "03",
      title: "Build",
      description: "Implement incrementally with readability and maintainability in mind."
    },
    {
      number: "04",
      title: "Improve",
      description: "Test thoroughly, review metrics, and iterate to improve the outcome."
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  }

  return (
    <section className="px-4 md:px-8 py-20 lg:py-32 border-t border-border-subtle bg-secondary/10 overflow-hidden relative">
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Approach"
        description="How i build, Engineering philosophy and process."
          />
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-24 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Animated background connecting line for large screens */}
          <motion.div 
            className="hidden lg:block absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent -z-10"
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
          />

          {steps.map((step) => (
            <motion.div 
              key={step.number} 
              variants={itemVariants}
              className="relative group flex flex-col"
            >
              {/* Glowing animated dot */}
              <div className="hidden lg:flex absolute -top-1.5 left-0 w-3 h-3 rounded-full bg-primary/80 shadow-[0_0_15px_rgba(234,88,12,0.6)] group-hover:scale-150 transition-transform duration-500"></div>

              <div className="flex flex-col pt-8 lg:pt-10">
                <span className="text-5xl md:text-6xl font-black text-primary/10 group-hover:text-primary/20 transition-colors duration-500 mb-6 font-mono tracking-tighter">
                  {step.number}
                </span>
                <h3 className="text-foreground font-bold text-xl mb-4 group-hover:-translate-y-1 transition-transform duration-300">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm group-hover:text-foreground/80 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
