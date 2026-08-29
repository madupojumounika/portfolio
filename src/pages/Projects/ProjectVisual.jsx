import { motion } from "framer-motion"
import { Monitor, Terminal, LayoutDashboard, Database, Box } from "lucide-react"
import { CountroTerminal } from "../../components/ui/CountroTerminal"
import { ExpenseTrackerVisual } from "../../components/ui/ExpenseTrackerVisual"
import { CryptoTrackerVisual } from "../../components/ui/CryptoTrackerVisual"

export function ProjectVisual({ type = "preview", image, projectTitle }) {
  // Different icons based on the visual type hinted in the data structure
  const icons = {
    preview: <Monitor className="w-12 h-12 text-muted-foreground/30 mb-4" />,
    workflow: <Database className="w-12 h-12 text-muted-foreground/30 mb-4" />,
    terminal: <Terminal className="w-12 h-12 text-muted-foreground/30 mb-4" />,
    dashboard: <LayoutDashboard className="w-12 h-12 text-muted-foreground/30 mb-4" />,
    architecture: <Database className="w-12 h-12 text-muted-foreground/30 mb-4" />,
    experimental: <Box className="w-12 h-12 text-muted-foreground/30 mb-4" />
  }

  return (
    <motion.div
      className={`w-full ${projectTitle === "Countro" ? "aspect-[4/3] md:aspect-video lg:aspect-[21/9]" : "aspect-video md:aspect-[21/9] lg:aspect-[24/9]"} bg-secondary/30 border border-border/50 rounded-lg overflow-hidden relative group`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      {projectTitle === "Countro" ? (
        <div className="absolute inset-0 flex items-center justify-center p-0 md:p-2 lg:p-4 bg-secondary/10">
          <CountroTerminal />
        </div>
      ) : projectTitle === "Expense Tracker" ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#0c0c0e]">
          <ExpenseTrackerVisual />
        </div>
      ) : projectTitle === "Crypto Tracker" ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#050508]">
          <CryptoTrackerVisual />
        </div>
      ) : image ? (
        <img
          src={image}
          alt="Project Visual"
          className="absolute inset-0 w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity duration-500"
        />
      ) : (
        <>
          {/* Subtle background pattern for visual interest */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-foreground to-transparent bg-[length:20px_20px]"></div>

          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center backdrop-blur-[2px]">
            {icons[type] || icons.preview}
            <div className="font-mono text-sm tracking-widest text-muted-foreground/60 uppercase border border-border/50 bg-background/50 px-4 py-2 rounded">
              [PROJECT VISUAL / INTERACTIVE DEMO PLACEHOLDER]
            </div>
          </div>
        </>
      )}
    </motion.div>
  )
}
