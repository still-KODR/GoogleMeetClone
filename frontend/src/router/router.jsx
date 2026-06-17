import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Room from "../pages/Room"
import LoginSuccess from "../pages/LoginSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/room/:roomID",
    element: <Room />,
  },
  {
    path: "/login-success",
    element: <LoginSuccess />,
  },
]);