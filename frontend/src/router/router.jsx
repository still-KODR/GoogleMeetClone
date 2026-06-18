import { createBrowserRouter } from "react-router";
import Home from "../pages/Home.jsx";
import Room from "../pages/Room.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/room/:roomID", element: <Room /> },
]);
