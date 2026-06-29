import React, { useEffect } from "react";
import api from "../services/api";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   window.google.accounts.id.initialize({
  //     client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  //     callback: handleCredentialResponse,
  //   });

  //   window.google.accounts.id.renderButton(
  //     document.getElementById("googleButton"),
  //     {
  //       theme: "outline",
  //       size: "large",
  //       width: 300,
  //     },
  //   );
  // }, []);
  // async function handleCredentialResponse(response) {
  //   const res = await api.post("/auth/google", {
  //     credential: response.credential,
  //   });
  //   console.log(res.data);
  // }
  return (
    <>
      <h1>Google Login</h1>
      {/* <div id="googleButton"></div> */}
      <GoogleLogin
        onSuccess={async (credentialResponse) => {
          console.log(credentialResponse);
          const res = await api.post("/auth/google", {
            credential: credentialResponse.credential,
          });
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
