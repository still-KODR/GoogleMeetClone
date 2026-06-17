import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { RouterProvider } from "react-router"
import { store } from "./store/store"
import { router } from "./router/router"
import "./index.css"

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </Provider>
)
