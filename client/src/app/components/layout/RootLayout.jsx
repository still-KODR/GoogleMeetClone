import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Navbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
const RootLayout = () => {
  return (
    <>
      <Navbar />
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Outlet />
      </GoogleOAuthProvider>
    </>
  );
};

export default RootLayout;
