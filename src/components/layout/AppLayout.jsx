import { useEffect } from "react"
import { Outlet, useLocation } from "react-router-dom"
import { Navbar } from "./Navbar"
import { HomeCTA } from "../../pages/Home/HomeCTA"

export function AppLayout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto">
        <Outlet />
      </main>
      <HomeCTA />
    </div>
  )
}
