import { motion } from "framer-motion"
import { skills } from "../../data/skills"
import { SectionHeader } from "../../components/common/SectionHeader"

// Safe standard icons to avoid broken imports
import { FaJava, FaDatabase, FaServer, FaHtml5, FaCss3Alt, FaCode, FaLaptop, FaTools } from "react-icons/fa"
import {
  SiJavascript, SiTypescript, SiPython, SiReact,
  SiTailwindcss, SiNodedotjs,
  SiExpress, SiMongodb, SiPostgresql, SiGit,
  SiGithub, SiVite, SiPostman, SiFigma,
  SiVercel, SiRender, SiFirebase, SiSupabase
} from "react-icons/si"

// Map skill strings to their respective icons
const iconMap = {
  "Java": <FaJava className="text-[#f89820]" />,
  "JavaScript": <SiJavascript className="text-[#f7df1e]" />,
  "SQL": <FaDatabase className="text-[#00758F]" />,
  "TypeScript": <SiTypescript className="text-[#3178c6]" />,
  "Python": <SiPython className="text-[#3776AB]" />,
  "React": <SiReact className="text-[#61DAFB]" />,
  "Tailwind CSS": <SiTailwindcss className="text-[#06B6D4]" />,
  "HTML": <FaHtml5 className="text-[#E34F26]" />,
  "CSS": <FaCss3Alt className="text-[#1572B6]" />,
  "Node.js": <SiNodedotjs className="text-[#339933]" />,
  "Express": <SiExpress className="text-foreground" />,
  "REST APIs": <FaServer className="text-muted-foreground" />,
  "MongoDB": <SiMongodb className="text-[#47A248]" />,
  "PostgreSQL": <SiPostgresql className="text-[#4169E1]" />,
  "Firebase": <SiFirebase className="text-[#FFCA28]" />,
  "Supabase": <SiSupabase className="text-[#3ECF8E]" />,
  "Git": <SiGit className="text-[#F05032]" />,
  "GitHub": <SiGithub className="text-foreground" />,
  "Vite": <SiVite className="text-[#646CFF]" />,
  "Postman": <SiPostman className="text-[#FF6C37]" />,
  "Figma": <SiFigma className="text-[#F24E1E]" />,
  "Vercel": <SiVercel className="text-foreground" />,
  "Render": <SiRender className="text-[#46E3B7]" />
}

// Category icons
const categoryIconMap = {
  "Languages": <FaCode className="w-5 h-5" />,
  "Frontend": <FaLaptop className="w-5 h-5" />,
  "Backend": <FaServer className="w-5 h-5" />,
  "Database": <FaDatabase className="w-5 h-5" />,
  "Tools": <FaTools className="w-5 h-5" />
}

export function EngineeringStack() {
  const hasSkills = skills && Object.keys(skills).length > 0

  if (!hasSkills) return null

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 60, damping: 15 }
    }
  }

  return (
    <section className="px-4 md:px-8 py-20 lg:py-28 bg-background border-t border-border-subtle overflow-hidden relative">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none opacity-50"></div>

      <div className="w-full max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeader
            title="Engineering Stack"
            description="Core technologies and tools I use to build robust software."
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {Object.entries(skills).map(([category, items]) => {
            // Make 'Tools' span 2 columns on large screens to create a nice bento effect
            const isWide = category === "Tools"

            return (
              <motion.div
                key={category}
                variants={cardVariants}
                className={`flex flex-col p-5 md:p-6 rounded-2xl bg-secondary/30 border border-border/50 hover:border-primary/50 transition-all duration-300 group ${isWide ? 'lg:col-span-2' : 'col-span-1'}`}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20 shadow-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                    {categoryIconMap[category] || <FaCode className="w-5 h-5" />}
                  </div>
                  <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    {category}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2.5 mt-auto">
                  {items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-background/80 border border-border/60 hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-default shadow-sm"
                    >
                      <span className="text-base">
                        {iconMap[item] || <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>}
                      </span>
                      <span className="text-xs font-semibold tracking-tight text-foreground/90">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
