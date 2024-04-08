import React from "react";
import Logo from "../assets/XerciseLogo_transparent.png";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <Link to="/" className="logoContainer">
        <img src={Logo} alt="Xercise Logo" />
      </Link>
      <div className="navLinks">
        <Link to="/">Home</Link>
        <Link to="/muscles">Exercises</Link>
      </div>
    </nav>
  );
};

export default NavBar;
