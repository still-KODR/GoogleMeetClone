import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router"
import { fetchCurrentUser } from "./store/slices/authSlice"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCurrentUser())
  }, [dispatch])

  return <Outlet />
}

export default App
