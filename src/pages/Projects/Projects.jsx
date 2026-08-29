import { useState, useCallback } from "react"
import { allProjects } from "../../data/allProjects"
import { ProjectsHero } from "./ProjectsHero"
import { ProjectIndex } from "./ProjectIndex"
import { ProjectSection } from "./ProjectSection"
import { ProjectTransition } from "./ProjectTransition"

export default function Projects() {
  const [activeId, setActiveId] = useState(allProjects[0].id)

  const handleInView = useCallback((id) => {
    setActiveId(id)
  }, [])

  return (
    <div className="bg-background min-h-screen">
      <ProjectsHero />

      <div className="container mx-auto px-4 md:px-8 max-w-7xl pt-16 lg:pt-32 pb-20">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 relative items-start">

          {/* Sticky left index navigation */}
          <ProjectIndex projects={allProjects} activeId={activeId} />

          {/* Right side project sections */}
          <div className="flex-1 w-full max-w-4xl flex flex-col">
            {allProjects.map((project, index) => (
              <div key={project.id} className="flex flex-col w-full">
                <ProjectSection project={project} onInView={handleInView} />

                {/* Render a transition line after all but the last project */}
                {index < allProjects.length - 1 && (
                  <ProjectTransition number={allProjects[index + 1].id} />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}
