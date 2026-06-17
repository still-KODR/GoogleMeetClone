import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { GoogleLogin } from "@react-oauth/google"
import { googleLogin, clearError } from "../store/slices/authSlice"

const Login = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home", { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSuccess = (credentialResponse) => {
    dispatch(googleLogin(credentialResponse.credential))
  }

  const handleError = () => {
    dispatch(clearError())
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-surface">
      <div className="flex flex-col items-center gap-8 p-10 rounded-2xl bg-surface-elevated border border-border max-w-sm w-full mx-4">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-2xl font-semibold tracking-tight text-text">MeetClone</h1>
          <p className="text-text-muted text-sm text-center">
            Video meetings for everyone
          </p>
        </div>

        <div className="w-full h-px bg-border" />

        <div className="flex flex-col items-center gap-4 w-full">
          <p className="text-text-muted text-sm">Sign in to continue</p>

          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={handleError}
              theme="filled_black"
              shape="rectangular"
              size="large"
              text="signin_with"
              width="280"
            />
          </div>

          {error && (
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-danger/10 border border-danger/20 w-full">
              <p className="text-danger text-xs">{error}</p>
            </div>
          )}

          {loading && !isAuthenticated && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-text-muted border-t-transparent rounded-full animate-spin" />
              <p className="text-text-muted text-xs">Authenticating...</p>
            </div>
          )}
        </div>

        <p className="text-text-muted text-xs text-center">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  )
}

export default Login;
