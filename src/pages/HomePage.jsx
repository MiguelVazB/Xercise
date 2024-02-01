import React from "react";
import { useState, useEffect } from "react";
import HeroComponent from "../components/HeroComponent";
import ExerciseSearch from "../components/ExerciseSearch";
import "./HomePage.css";

const HomePage = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("");

  return (
    <main className="homePage">
      <HeroComponent />
      <ExerciseSearch
        setExercises={setExercises}
        setSelectedBodyPart={setSelectedBodyPart}
        selectedBodyPart={selectedBodyPart}
      />
    </main>
  );
};

export default HomePage;
