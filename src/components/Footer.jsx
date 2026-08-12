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
    <footer className="siteFooter" role="contentinfo">
      <div className="footerBrand">
        <Link
          to="/"
          className="logoContainer footerLogo"
          aria-label="Go to home page"
          onClick={scrollToTop}
        >
          <img
            src={Logo}
            alt="Xercise Logo"
            width="180"
            height="66"
            loading="lazy"
            decoding="async"
          />
        </Link>
        <div className="footerBrandText">
          <p className="footerTitle">Train smarter with Xercise</p>
          <p className="footerCopy">
            Search movements, review technique cues, and explore related
            exercises without the clutter.
          </p>
        </div>
      </div>
      <div className="footerActions">
        <Link to="/workout" className="footerLink">
          Quick workout
        </Link>
        <Link to="/saved" className="footerLink">
          Saved exercises
        </Link>
        <Link to="/muscles" className="footerLink">
          Browse exercises
        </Link>
        <button
          className="scrollTop"
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
          type="button"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}

export default Footer;
