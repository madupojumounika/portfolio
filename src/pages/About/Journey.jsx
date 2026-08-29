import { motion } from "framer-motion"
import { cn } from "../../lib/utils"

export function Journey({ data }) {
  return (
    <section className="px-4 md:px-8 pt-8 pb-12 md:pb-16 max-w-4xl">
      
      <div className="mb-12 md:mb-16">
        <span className="text-xs font-mono font-bold tracking-widest text-muted-foreground uppercase block mb-4">
          01 / JOURNEY
        </span>
        <h2 className="text-2xl md:text-3xl font-medium text-foreground">
          MY ENGINEERING JOURNEY
        </h2>
      </div>

      <div className="flex flex-col gap-8 md:gap-16">
        {data.map((item, index) => {
          const isMilestone = item.title === "INTERNSHIP"

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col md:flex-row gap-4 md:gap-16 group"
            >
              <div className="shrink-0 md:w-16">
                <span className="text-sm font-mono font-bold text-muted-foreground/60 transition-colors group-hover:text-foreground">
                  {item.id}
                </span>
              </div>

              <div className="flex-1 flex flex-col">
                <div className="mb-4">
                  <h3 className={cn(
                    "text-sm font-mono font-bold tracking-widest uppercase mb-2",
                    isMilestone ? "text-orange-500" : "text-foreground"
                  )}>
                    {item.title}
                  </h3>
                  <h4 className="text-xl md:text-2xl font-medium text-foreground">
                    {item.subtitle}
                  </h4>
                </div>
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>

    </section>
  )
}
