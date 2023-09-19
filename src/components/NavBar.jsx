import React from "react";
import Logo from "../assets/XerciseLogo_transparent.png";
import "./NavBar.css";

const NavBar = () => {
  return (
    <nav>
      <div className="logoContainer">
        <img src={Logo} alt="Xercise Logo" />
      </div>
      <div className="navLinks">
        <div>Home</div>
        <div>Exercises</div>
      </div>
    </nav>
  );
};

export default NavBar;
