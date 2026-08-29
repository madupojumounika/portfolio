export function ProjectTransition({ number }) {
  return (
    <div className="py-12 md:py-16 flex flex-col items-center justify-center opacity-30">
      <div className="h-12 w-[1px] bg-border mb-6"></div>
      <span className="font-mono text-sm tracking-widest text-muted-foreground">
        {number}
      </span>
      <div className="h-12 w-[1px] bg-border mt-6"></div>
    </div>
  )
}
