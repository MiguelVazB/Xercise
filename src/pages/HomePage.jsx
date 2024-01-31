import React from "react";
import HeroComponent from "../components/HeroComponent";
import ExerciseSearch from "../components/ExerciseSearch";
import "./HomePage.css";

const HomePage = () => {
  return (
    <main className="homePage">
      <HeroComponent />
      <ExerciseSearch />
    </main>
  );
};

export default HomePage;
