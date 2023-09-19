import React from "react";
import "./HomePage.css";
import MainPic from "../assets/manExercising.png";

const HomePage = () => {
  return (
    <div className="homePage">
      <p>Xercise: Your Online Exercise Companion</p>
      <img src={MainPic} />
    </div>
  );
};

export default HomePage;
