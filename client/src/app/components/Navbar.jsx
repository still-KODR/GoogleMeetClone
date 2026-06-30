import React from "react";
import { NavLink } from "react-router"; // ✅
import useAuth from "../hooks/useAuth";
import { use } from "react";
const Navbar = () => {
  const { user, logout } = useAuth();
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      {user ? (
        <>
          <span>{user.name}</span>

          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <NavLink to="/login">Login</NavLink>
      )}
    </nav>
  );
};

export default Navbar;
