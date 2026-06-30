import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import api from "../services/api";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  console.log("AuthProvider Mounted");
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("useEffect Running");
    fetchCurrentUser();
  }, []);
  const fetchCurrentUser = async () => {
    console.log("Calling /auth/me");
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      await api.post("/auth/logout");

      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
