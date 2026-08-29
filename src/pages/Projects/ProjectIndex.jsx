import { cn } from "../../lib/utils"

export function ProjectIndex({ projects, activeId }) {
  return (
    <div className="hidden lg:flex flex-col sticky top-32 w-64 shrink-0">
      <h3 className="text-xs font-mono font-bold tracking-widest text-muted-foreground uppercase mb-8">
        Project Index
      </h3>
      <nav className="flex flex-col gap-4 relative">
        {/* Animated Progress Line */}
        <div className="absolute left-[3px] top-2 bottom-2 w-[1px] bg-border/50 -z-10"></div>
        
        {projects.map((project) => {
          const isActive = activeId === project.id
          
          return (
            <a 
              key={project.id}
              href={`#project-${project.id}`}
              className="group flex items-center gap-4 py-1"
            >
              {/* Dot indicator */}
              <div className="relative flex items-center justify-center">
                <div className={cn(
                  "w-[7px] h-[7px] rounded-full transition-all duration-300",
                  isActive ? "bg-primary scale-125" : "bg-border group-hover:bg-primary/50"
                )}></div>
              </div>
              
              <div className="flex gap-3 items-center">
                <span className={cn(
                  "font-mono text-sm transition-colors duration-300",
                  isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                )}>
                  {project.id}
                </span>
                <span className={cn(
                  "text-sm font-medium transition-colors duration-300",
                  isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                )}>
                  {project.title}
                </span>
              </div>
            </a>
          )
        })}
      </nav>
    </div>
  )
}
