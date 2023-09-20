import React from "react";
import "./HomePage.css";
import MainPic from "../assets/manExercising.png";

const HomePage = () => {
  return (
    <div className="homePage">
      <p className="homePageHook">
        <b>Xercise</b>
        <br />
        Your Online Exercise Companion
      </p>
      <img src={MainPic} alt="man exercising with dumbbells (Renegade row)" />
    </div>
  );
};

export default HomePage;
