import React from "react";
import Logo from "../assets/XerciseLogo_transparent.png";
import { Link } from "react-router-dom";
import "./NavBar.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer role="contentinfo">
      <Link
        to="/"
        className="logoContainer"
        aria-label="Go to home page"
        onClick={scrollToTop}
      >
        <img src={Logo} alt="Xercise Logo" width="120" height="120" loading="lazy" decoding="async" />
      </Link>
      <button
        className="scrollTop"
        onClick={scrollToTop}
        aria-label="Scroll to top of page"
        type="button"
      >
        Scroll to Top
      </button>
    </footer>
  );
}

export default Footer;
