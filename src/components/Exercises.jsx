import React from "react";
import { useState, useEffect } from "react";
import ExerciseBox from "./ExerciseBox";

const Exercises = ({ exercises, setExercises, selectedBodyPart }) => {
  return (
    <div className="exercisesComponent">
      <h2>Showing Results</h2>
      <div>
        {exercises.map((exercise) => {
          return <ExerciseBox key={exercise.id} exercise={exercise} />;
        })}
      </div>
    </div>
  );
};

export default Exercises;
