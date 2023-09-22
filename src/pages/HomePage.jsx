import React from "react";
import "./HomePage.css";
import MainPic from "../assets/manExercising.png";

const HomePage = () => {
  return (
    <div className="homePage">
      <div className="homePageHook">
        <p className="brandName">Xercise</p>
        <p>Your Online Exercise Companion</p>
        <button>Explore Exercises</button>
      </div>
      <img src={MainPic} alt="man exercising with dumbbells (Renegade row)" />
    </div>
  );
};

export default HomePage;
