import React from "react";
import { useState, useEffect, useRef } from "react";
import HeroComponent from "../components/HeroComponent";
import ExerciseSearch from "../components/ExerciseSearch";
import "./HomePage.css";
import Exercises from "../components/Exercises";

const HomePage = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("all");
  const resultsRef = useRef(null);

  useEffect(() => {
    console.log(exercises);
    console.log(selectedBodyPart);
  }, [exercises, selectedBodyPart]);

  return (
    <main className="homePage">
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
