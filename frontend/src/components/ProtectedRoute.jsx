import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router"

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-3 border-border border-t-text rounded-full animate-spin" />
          <p className="text-text-muted text-sm tracking-wide">Loading...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute;
