import { AppRouter } from "./routes"
import { ThemeProvider } from "../components/theme-provider"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="portfolio-ui-theme">
      <AppRouter />
    </ThemeProvider>
  )
}
