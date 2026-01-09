import React from "react";
import MainPic from "../assets/manExercising.png";
import { Link } from "react-router-dom";

const HeroComponent = () => {
  return (
    <section className="heroComponent" aria-label="Hero section">
      <div className="homePageHook">
        <h1 className="brandName">Xercise</h1>
        <p className="tagline">Your Online Exercise Companion</p>
        <Link 
          to="muscles" 
          className="exploreBtn"
          aria-label="Explore all exercises organized by muscle groups"
        >
          Explore Exercises
        </Link>
      </div>
      <img
        className="mainPic"
        src={MainPic}
        alt="Athletic person performing dumbbell renegade row exercise"
        width="800"
        height="800"
        fetchpriority="high"
        decoding="async"
      />
      <p className="backSlogan" aria-hidden="true">Unleash your Inner Beast</p>
    </section>
  );
};

export default HeroComponent;
