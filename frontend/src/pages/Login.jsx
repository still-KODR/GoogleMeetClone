const Login = () => {
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8000/api/auth/google';
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-6 p-10 border rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold">Welcome</h1>
        <button
          onClick={handleGoogleLogin}
          className="flex items-center gap-3 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition"
        >
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;