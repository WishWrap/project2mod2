import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="navbar">
      <Link to="/">
        <img src="../component/Logo.jpeg" alt="Logo" />
      </Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>

      </div>
    </div>
  );
};

export default NavBar;