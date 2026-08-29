import { cn } from "../../lib/utils"

export function SectionHeader({ title, description, className }) {
  return (
    <div className={cn("mb-8 md:mb-12", className)}>
      <h2 className="text-sm font-semibold tracking-wider text-orange-600 uppercase mb-2">
        {title}
      </h2>
      {description && (
        <p className="text-foreground max-w-2xl text-lg md:text-xl font-medium">
          {description}
        </p>
      )}
    </div>
  )
}
