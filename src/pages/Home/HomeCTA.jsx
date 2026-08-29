import { profile } from "../../data/profile"
import { Button } from "../../components/ui/button"
import { Github, Linkedin, Mail } from "lucide-react"
import { SiX, SiLeetcode } from "react-icons/si"
import { CTABackground } from "./CTABackground"

export function HomeCTA() {
  return (
    <section className="relative overflow-hidden px-4 md:px-8 py-32 md:py-48 flex flex-col items-center text-center border-t border-border-subtle bg-background">
      {/* 3D animated background — absolute, full-width, behind all content */}
      <CTABackground />

      {/* Existing content — lifted above the background */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-orange-600 mb-6 uppercase">
          Let&apos;s build something useful.
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10">
          Have an opportunity, project, or idea worth discussing?
        </p>

        <Button
          size="lg"
          className="px-8 h-12 text-base cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-[1.04] hover:shadow-[0_8px_30px_rgba(249,115,22,0.45)] active:scale-[0.97] active:translate-y-0"
          onClick={() => window.open('https://www.linkedin.com/in/mounikamadupoju/', '_blank', 'noreferrer')}
        >
          Get in touch
        </Button>
      </div>

      {/* Social links — bottom-right corner, inside the section */}
      <div className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-10 flex items-center gap-4">
        {profile.social.github && (
          <a
            href={profile.social.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground hover:text-orange-500 hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.4)] transition-all duration-300"
          >
            <Github className="w-5 h-5" />
          </a>
        )}
        {profile.social.linkedin && (
          <a
            href={profile.social.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground hover:text-orange-500 hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.4)] transition-all duration-300"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        )}
        {profile.social.twitter && (
          <a
            href={profile.social.twitter}
            target="_blank"
            rel="noreferrer"
            aria-label="X (Twitter)"
            className="text-muted-foreground hover:text-orange-500 hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.4)] transition-all duration-300"
          >
            <SiX className="w-4 h-4" />
          </a>
        )}
        {profile.social.leetcode && (
          <a
            href={profile.social.leetcode}
            target="_blank"
            rel="noreferrer"
            aria-label="LeetCode"
            className="text-muted-foreground hover:text-orange-500 hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.4)] transition-all duration-300"
          >
            <SiLeetcode className="w-5 h-5" />
          </a>
        )}
        {profile.social.email && (
          <a
            href={`mailto:${profile.social.email}`}
            aria-label="Email"
            className="text-muted-foreground hover:text-orange-500 hover:-translate-y-0.5 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.4)] transition-all duration-300"
          >
            <Mail className="w-5 h-5" />
          </a>
        )}
      </div>
    </section>
  )
}
