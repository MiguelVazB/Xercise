import React from "react";
import { useState, useEffect } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";

const ExerciseSearch = () => {
  const [textInput, setTextInput] = useState("");
  const [exercises, setExercises] = useState([]);
  const [bodyParts, setBodyParts] = useState([]);

  useEffect(() => {
    const fetchBodyParts = async () => {
      const bodyParts = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );

      setBodyParts([...bodyParts]);
    };

    fetchBodyParts();
  }, []);

  const handleSearch = async () => {
    console.log(bodyParts);
    if (textInput) {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises?limit=-1",
        exerciseOptions
      );

      const searchedExercises = exercisesData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(textInput) ||
          exercise.target.toLowerCase().includes(textInput) ||
          exercise.equipment.toLowerCase().includes(textInput) ||
          exercise.bodyPart.toLowerCase().includes(textInput)
      );

      setTextInput("");
      setExercises(searchedExercises);
    }
  };

  return (
    <>
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search Exercise"
          onChange={(e) => setTextInput(e.target.value.toLowerCase())}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <HorizontalScrollBar data={bodyParts} />
    </>
  );
};

export default ExerciseSearch;
