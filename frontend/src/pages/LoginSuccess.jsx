import { useEffect } from "react";
import { useNavigate } from "react-router";

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = new URLSearchParams(
      window.location.search
    ).get("token");

    if (token) {
      localStorage.setItem("token", token);

      navigate("/");
    }
  }, []);

  return <h1>Logging in...</h1>;
};

export default LoginSuccess;