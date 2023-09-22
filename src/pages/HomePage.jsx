import React from "react";
import MainPic from "../assets/manExercising.png";
import { Link } from "react-router-dom";
import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="homePageHook">
        <p className="brandName">Xercise</p>
        <p>Your Online Exercise Companion</p>
        <Link to="exercises" className="exploreBtn">
          Explore Exercises
        </Link>
      </div>
      <img src={MainPic} alt="man exercising with dumbbells (Renegade row)" />
      <p className="backSlogan">Unleash your Inner Beast</p>
    </div>
  );
};

export default HomePage;
