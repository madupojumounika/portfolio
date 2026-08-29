import { profile } from "../../data/profile"
import { Link } from "react-router-dom"
import { Github, Linkedin, Mail } from "lucide-react"
import { SiX, SiLeetcode } from "react-icons/si"
import { Hero3DScene } from "../../components/3d/Hero3DScene"

export function Hero() {
  if (!profile.name) {
    return (
      <section className="py-24 md:py-32">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-24 bg-muted rounded"></div>
          <div className="h-12 w-64 bg-muted rounded"></div>
          <div className="h-6 w-48 bg-muted rounded"></div>
          <div className="h-16 w-full max-w-lg bg-muted rounded mt-6"></div>
        </div>
      </section>
    )
  }

  return (
    <section className="relative pt-8 pb-24 md:pt-12 md:pb-32 lg:pt-16 lg:pb-40 px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground) / 0.15) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black, transparent 70%)'
        }}
      />
      <div className="lg:col-span-7 xl:col-span-8 flex flex-col items-start">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground mb-6">
          {profile.name}
        </h1>

        <h2 className="text-xl md:text-2xl text-foreground font-medium mb-6">
          {profile.role}
        </h2>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
          {profile.shortBio}
        </p>

        <div className="flex flex-wrap items-center gap-4 mb-12">
          <Link to="/projects" className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium rounded-full bg-gradient-to-tr from-orange-600 to-orange-500 text-white border border-orange-400/50 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_4px_20px_rgba(249,115,22,0.4)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:scale-[1.02] active:scale-[0.98]">
            View Projects
          </Link>

          {profile.resumeUrl && (
            <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center h-10 px-8 text-sm font-medium rounded-full bg-background/50 backdrop-blur-md border border-border/80 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_4px_20px_rgba(0,0,0,0.1)] transition-all duration-300 ease-out hover:-translate-y-[2px] hover:scale-[1.02] active:scale-[0.98] text-foreground">
              Resume
            </a>
          )}
        </div>

        <div className="flex items-center gap-5">
          {profile.social.github && (
            <a href={profile.social.github} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors p-2 -ml-2" aria-label="GitHub">
              <Github className="w-5 h-5" />
            </a>
          )}
          {profile.social.linkedin && (
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors p-2" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
          )}
          {profile.social.twitter && (
            <a href={profile.social.twitter} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors p-2" aria-label="X (Twitter)">
              <SiX className="w-4 h-4 m-0.5" />
            </a>
          )}
          {profile.social.leetcode && (
            <a href={profile.social.leetcode} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-orange-500 transition-colors p-2" aria-label="LeetCode">
              <SiLeetcode className="w-5 h-5" />
            </a>
          )}
          {profile.social.email && (
            <a href={`mailto:${profile.social.email}`} className="text-muted-foreground hover:text-orange-500 transition-colors p-2" aria-label="Email">
              <Mail className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <div className="hidden md:block lg:col-span-5 xl:col-span-4 h-full min-h-[400px]">
        <Hero3DScene className="h-full w-full" />
      </div>
    </section>
  )
}
