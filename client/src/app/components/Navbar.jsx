import React from "react";
import {NavLink} from 'react-router' // ✅
const Navbar = () => {
  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  );
};

export default Navbar;
