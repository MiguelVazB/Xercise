import React from "react";
import { useState, useEffect } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollBar from "./HorizontalScrollBar";

const ExerciseSearch = ({
  setExercises,
  selectedBodyPart,
  setSelectedBodyPart,
  resultsRef,
}) => {
  const [textInput, setTextInput] = useState("");
  const [bodyParts, setBodyParts] = useState(["all"]);
  const [resultsReady, setResultsReady] = useState(false);

  useEffect(() => {
    const fetchBodyParts = async () => {
      const bodyParts = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
        exerciseOptions
      );

      setBodyParts(["all", ...bodyParts]);
      localStorage.setItem("bodyParts", JSON.stringify(["all", ...bodyParts]));
      console.log("Got all body parts!");
    };

    if (localStorage.getItem("bodyParts") != null) {
      let bodyPartsLocal = JSON.parse(localStorage.getItem("bodyParts"));
      setBodyParts(bodyPartsLocal);
      console.log("Body parts from local storage!");
    } else {
      fetchBodyParts();
    }
  }, []);

  useEffect(() => {
    if (resultsReady) {
      resultsRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [resultsReady]);

  const handleSearch = async () => {
    if (textInput) {
      setResultsReady(false);
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
      setResultsReady(true);
      console.log("Got all exercises from input!");
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
      <HorizontalScrollBar
        data={bodyParts}
        setSelectedBodyPart={setSelectedBodyPart}
        selectedBodyPart={selectedBodyPart}
      />
    </>
  );
};

export default ExerciseSearch;
