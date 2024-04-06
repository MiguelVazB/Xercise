import React from "react";
import Logo from "../assets/XerciseLogo_transparent.png";
import { Link } from "react-router-dom";
import "./NavBar.css";

function Footer() {
  return (
    <footer>
      <Link to="/" className="logoContainer">
        <img src={Logo} alt="Xercise Logo" />
      </Link>
      <div
        className="scrollTop"
        onClick={() =>
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }
      >
        Scroll to Top
      </div>
    </footer>
  );
}

export default Footer;
