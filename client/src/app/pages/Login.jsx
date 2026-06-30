import React, { useEffect } from "react";
import api from "../services/api";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const {setUser}=useAuth()
 
  return (
    <>
      <h1>Google Login</h1>
   
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse);
          const res = await api.post("/auth/google", {
            credential: credentialResponse.credential,
          });
          setUser(res.data.user);
          console.log(res.data);
          navigate("/");
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
};

export default Login;
