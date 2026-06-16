import { useDispatch } from "react-redux";
import { setUser } from "../reducers/UserSlice";

const LoginPage = () => {

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black flex items-center justify-center px-4">
      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-72 w-72 rounded-full bg-purple-500/20 blur-3xl" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              TS
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">
              Welcome Back
            </h1>
            <p className="text-slate-400 mt-2">
              Continue with your Google account
            </p>
          </div>

          {/* Google Button */}
          <button onClick={()=>{
            window.location.href='http://localhost:8000/api/auth/google'
          }} className="group w-full flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4 text-white font-medium transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02] active:scale-100">
            <svg
              className="h-6 w-6"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFC107"
                d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.215 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.959 3.041l5.657-5.657C34.046 6.053 29.277 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"
              />
              <path
                fill="#FF3D00"
                d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.959 3.041l5.657-5.657C34.046 6.053 29.277 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.177 0 9.862-1.977 13.409-5.192l-6.19-5.238C29.146 35.091 26.673 36 24 36c-5.194 0-9.624-3.332-11.282-7.946l-6.522 5.025C9.514 39.556 16.227 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.084 5.57l.003-.002 6.19 5.238C36.971 38.481 44 33 44 24c0-1.341-.138-2.651-.389-3.917z"
              />
            </svg>

            <span>Continue with Google</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-slate-500 uppercase tracking-wider">
              Secure Login
            </span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <span className="text-green-400">✓</span>
              Fast and secure authentication
            </div>

            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <span className="text-green-400">✓</span>
              Access your workspace instantly
            </div>

            <div className="flex items-center gap-3 text-slate-300 text-sm">
              <span className="text-green-400">✓</span>
              Protected with Google Security
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-xs text-slate-500 mt-8">
            By continuing, you agree to our Terms & Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;