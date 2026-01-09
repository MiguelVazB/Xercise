import React from "react";
import { useState, useRef } from "react";
import HeroComponent from "../components/HeroComponent";
import ExerciseSearch from "../components/ExerciseSearch";
import Exercises from "../components/Exercises";
import "./HomePage.css";

const HomePage = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("all");
  const resultsRef = useRef(null);

  return (
    <main
      id="main-content"
      className="homePage"
      role="main"
    >
      <HeroComponent />
      <ExerciseSearch
        setExercises={setExercises}
        setSelectedBodyPart={setSelectedBodyPart}
        selectedBodyPart={selectedBodyPart}
        resultsRef={resultsRef}
      />
      <Exercises
        exercises={exercises}
        setExercises={setExercises}
        selectedBodyPart={selectedBodyPart}
        resultsRef={resultsRef}
      />
    </main>
  );
};

export default HomePage;
