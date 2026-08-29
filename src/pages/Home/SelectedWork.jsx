import { projects } from "../../data/projects"
import { SectionHeader } from "../../components/common/SectionHeader"
import { Badge } from "../../components/ui/badge"
import { Card, CardContent } from "../../components/ui/card"
import { Skeleton } from "../../components/ui/skeleton"
import { ExternalLink, Github } from "lucide-react"
import { CountroTerminal } from "../../components/ui/CountroTerminal"

function ProjectSkeleton() {
  return (
    <Card className="overflow-hidden border-border-subtle bg-background shadow-none">
      <div className="aspect-[16/9] w-full bg-muted/30 p-8 flex items-center justify-center">
        <Skeleton className="w-full h-full max-h-64 opacity-50" />
      </div>
      <CardContent className="p-5 md:p-6">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-5/6 mb-6" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
      </CardContent>
    </Card>
  )
}

function ProjectCard({ project, featured }) {
  return (
    <Card className="overflow-hidden border-border bg-card shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full group">
      {project.title === "Countro" ? (
        <div className="aspect-[16/9] w-full overflow-hidden bg-secondary/30 relative flex items-center justify-center">
          <CountroTerminal />
        </div>
      ) : project.image ? (
        <div className="aspect-[16/9] w-full overflow-hidden bg-muted relative">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="aspect-[16/9] w-full bg-secondary/50 flex items-center justify-center p-8">
          <div className="w-full h-full border border-border/50 rounded bg-background/50 flex items-center justify-center text-muted-foreground font-medium text-sm">
            Project Preview
          </div>
        </div>
      )}

      <CardContent className="p-5 md:p-6 flex flex-col flex-1">
        <div className="flex justify-between items-start mb-4 gap-4">
          <h3 className={`font-semibold text-foreground tracking-tight ${featured ? 'text-2xl' : 'text-xl'}`}>
            {project.title}
          </h3>
          <div className="flex items-center gap-3 shrink-0">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors" aria-label="View source code">
                <Github className="w-5 h-5" />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors" aria-label="View live project">
                <ExternalLink className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>

        <p className="text-muted-foreground mb-6 flex-1">
          {project.description}
        </p>

        {project.technologies && project.technologies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-border-subtle">
            {project.technologies.map(tech => (
              <Badge key={tech} variant="secondary" className="bg-secondary/50 text-secondary-foreground font-medium text-xs rounded-sm">
                {tech}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export function SelectedWork() {
  return (
    <section className="px-4 md:px-8 py-20 lg:py-28 bg-background">
      <div className="w-full max-w-5xl relative z-10">
        <SectionHeader
          title="Selected Work"
          description="A selection of recent projects and architectural work."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 mt-12">
          {!projects || projects.length === 0 ? (
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          ) : (
            projects.map((project, index) => (
              <div key={project.id || index}>
                <ProjectCard project={project} featured={false} />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
