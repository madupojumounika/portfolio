import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { AppLayout } from "../components/layout/AppLayout"
import Home from "../pages/Home/Home"
import Projects from "../pages/Projects/Projects"
import About from "../pages/About/About"

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
])

export function AppRouter() {
  return <RouterProvider router={router} />
}
