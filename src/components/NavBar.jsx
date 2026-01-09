import React from "react";
import Logo from "../assets/XerciseLogo_transparent.png";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav role="navigation" aria-label="Main navigation">
      <Link to="/" className="logoContainer" aria-label="Xercise home">
        <img src={Logo} alt="Xercise Logo" width="120" height="120" loading="eager" decoding="async" />
      </Link>
      <div className="navLinks" role="menubar">
        <Link to="/" role="menuitem">Home</Link>
        <Link to="/muscles" role="menuitem">Exercises</Link>
      </div>
    </nav>
  );
};

export default NavBar;
