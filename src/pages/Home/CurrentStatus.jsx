import { profile } from "../../data/profile"
import { MapPin, Briefcase } from "lucide-react"

export function CurrentStatus() {
  const hasStatusData = profile.availability || profile.location || profile.focus

  if (!hasStatusData) return null

  return (
    <section className="px-4 md:px-8 pb-20">
      <div className="w-full bg-secondary/50 rounded-lg p-6 flex flex-col md:flex-row flex-wrap gap-6 items-start md:items-center text-sm font-medium text-foreground">

        {profile.availability && (
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3 mr-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span>{profile.availability}</span>
          </div>
        )}

        {profile.location && (
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span>{profile.location}</span>
          </div>
        )}

        {profile.focus && (
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-muted-foreground" />
            <span>{profile.focus}</span>
          </div>
        )}

      </div>
    </section>
  )
}
