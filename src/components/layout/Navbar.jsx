import { useState, useRef, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { cn } from "../../lib/utils"
import { profile } from "../../data/profile"
import { Button } from "../ui/button"
import { ThemeToggle } from "../ui/ThemeToggle"
import { Github, Linkedin, Mail, ChevronDown } from "lucide-react"
import { SiX, SiLeetcode } from "react-icons/si"
import { AnimatePresence, motion } from "framer-motion"

export function Navbar() {
  const location = useLocation()
  const [isContactOpen, setIsContactOpen] = useState(false)
  const contactRef = useRef(null)

  // Handle clicking outside to close the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (contactRef.current && !contactRef.current.contains(event.target)) {
        setIsContactOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: "About", path: "/about" },
  ]

  const contactLinks = [
    { name: "Email", url: profile.social.email ? `mailto:${profile.social.email}` : null, icon: Mail },
    { name: "LinkedIn", url: profile.social.linkedin, icon: Linkedin },
    { name: "GitHub", url: profile.social.github, icon: Github },
    { name: "X", url: profile.social.twitter, icon: SiX },
    { name: "LeetCode", url: profile.social.leetcode, icon: SiLeetcode }
  ].filter(link => link.url)

  const handleNavClick = (path) => {
    if (location.pathname === path) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link 
          to="/" 
          onClick={() => handleNavClick("/")}
          className="font-semibold text-foreground tracking-tight hover:text-orange-500 transition-colors duration-300"
        >
          {profile.name || "Portfolio"}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => handleNavClick(item.path)}
              className={cn(
                "text-sm font-medium transition-colors duration-300 hover:text-orange-500",
                location.pathname === item.path
                  ? "text-orange-500"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </Link>
          ))}

          {/* Contact Dropdown */}
          <div className="relative" ref={contactRef}>
            <button
              onClick={() => setIsContactOpen(!isContactOpen)}
              className={cn(
                "text-sm font-medium transition-colors duration-300 hover:text-orange-500 flex items-center gap-1",
                isContactOpen ? "text-orange-500" : "text-muted-foreground"
              )}
            >
              Contact
              <ChevronDown className={cn("w-4 h-4 transition-transform duration-300", isContactOpen && "rotate-180")} />
            </button>

            <AnimatePresence>
              {isContactOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute top-full right-0 mt-4 w-48 bg-card border border-border/50 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col z-50"
                >
                  <div className="py-2">
                    {contactLinks.map((link) => {
                      const Icon = link.icon
                      return (
                        <a
                          key={link.name}
                          href={link.url}
                          target={link.name === "Email" ? "_self" : "_blank"}
                          rel={link.name === "Email" ? undefined : "noreferrer"}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-orange-500 hover:bg-secondary/50 transition-colors group"
                          onClick={() => setIsContactOpen(false)}
                        >
                          <Icon className="w-4 h-4 group-hover:text-orange-500 transition-colors" />
                          {link.name}
                        </a>
                      )
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {profile.resumeUrl && (
            <Button variant="outline" size="sm" className="hover:text-orange-500 hover:border-orange-500 transition-colors duration-300" asChild>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                Resume
              </a>
            </Button>
          )}

          <ThemeToggle />
        </nav>

        {/* Mobile menu could be added here later */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <span className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Menu</span>
        </div>
      </div>
    </header>
  )
}
