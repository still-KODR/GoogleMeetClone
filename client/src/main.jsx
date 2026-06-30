import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./app/router.jsx";
import AuthProvider from "./app/contexts/AuthContext.jsx";
import SocketProvider from "./app/contexts/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SocketProvider>
      <RouterProvider router={router} />
    </SocketProvider>
  </AuthProvider>,
);
