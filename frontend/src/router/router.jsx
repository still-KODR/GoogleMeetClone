import { createBrowserRouter, Navigate } from "react-router"
import App from "../App"
import Login from "../pages/Login"
import Home from "../pages/Home"
import Room from "../pages/Room"
import ProtectedRoute from "../components/ProtectedRoute"

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/login", element: <Login /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/home", element: <Home /> },
          { path: "/room/:roomID", element: <Room /> },
        ],
      },
      { path: "*", element: <Navigate to="/login" replace /> },
    ],
  },
])
