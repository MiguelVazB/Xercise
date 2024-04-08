import React from "react";
import MainPic from "../assets/manExercising.png";
import { Link } from "react-router-dom";

const HeroComponent = () => {
  return (
    <div className="heroComponent">
      <div className="homePageHook">
        <h1 className="brandName">Xercise</h1>
        <p>Your Online Exercise Companion</p>
        <Link to="muscles" className="exploreBtn">
          Explore Exercises
        </Link>
      </div>
      <img
        className="mainPic"
        src={MainPic}
        alt="man exercising with dumbbells (Renegade row)"
      />
      <p className="backSlogan">Unleash your Inner Beast</p>
    </div>
  );
};

export default HeroComponent;
