import React from "react";
import { useState, useRef } from "react";
import HeroComponent from "../components/HeroComponent";
import ExerciseSearch from "../components/ExerciseSearch";
import Exercises from "../components/Exercises";
import { motion } from "framer-motion";
import "./HomePage.css";

const HomePage = () => {
  const [exercises, setExercises] = useState([]);
  const [selectedBodyPart, setSelectedBodyPart] = useState("all");
  const resultsRef = useRef(null);

  return (
    <motion.main
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
      className="homePage"
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
    </motion.main>
  );
};

export default HomePage;
