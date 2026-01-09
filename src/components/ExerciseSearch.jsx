import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const bodyParts = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
          exerciseOptions
        );

        if (bodyParts && Array.isArray(bodyParts)) {
          setBodyParts(["all", ...bodyParts]);
          localStorage.setItem("bodyParts", JSON.stringify(["all", ...bodyParts]));
        }
      } catch (error) {
        console.error("Error fetching body parts:", error);
        setError("Failed to load body parts. Please refresh the page.");
      }
    };

    if (localStorage.getItem("bodyParts") != null) {
      try {
        let bodyPartsLocal = JSON.parse(localStorage.getItem("bodyParts"));
        setBodyParts(bodyPartsLocal);
      } catch (error) {
        console.error("Error parsing stored body parts:", error);
        fetchBodyParts();
      }
    } else {
      fetchBodyParts();
    }
  }, []);

  useEffect(() => {
    if (resultsReady) {
      resultsRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [resultsReady, resultsRef]);

  const handleSearch = useCallback(async () => {
    let textInputWithoutSpaces = textInput.trim().toLowerCase();
    if (!textInputWithoutSpaces) {
      setError("Please enter a search term");
      return;
    }

    setIsLoading(true);
    setError(null);
    setResultsReady(false);

    try {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises?limit=-1",
        exerciseOptions
      );

      if (!exercisesData || !Array.isArray(exercisesData)) {
        throw new Error("Invalid data received from server");
      }

      const searchedExercises = exercisesData.filter(
        (exercise) =>
          exercise.name.toLowerCase().includes(textInputWithoutSpaces) ||
          exercise.target.toLowerCase().includes(textInputWithoutSpaces) ||
          exercise.equipment.toLowerCase().includes(textInputWithoutSpaces) ||
          exercise.bodyPart.toLowerCase().includes(textInputWithoutSpaces)
      );

      setExercises(searchedExercises);
      setResultsReady(true);

      if (searchedExercises.length === 0) {
        setError(`No exercises found for "${textInputWithoutSpaces}". Try a different search term.`);
      }
    } catch (error) {
      console.error("Search error:", error);
      setError("Failed to search exercises. Please try again.");
      setExercises([]);
    } finally {
      setIsLoading(false);
    }
  }, [textInput, setExercises]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <section className="searchContainer" role="search" aria-label="Exercise search">
        <label htmlFor="exercise-search-input" className="visually-hidden">Search for exercises</label>
        <input
          id="exercise-search-input"
          ref={searchInputRef}
          type="search"
          placeholder="Search exercises by name, muscle, or equipment..."
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          onKeyPress={handleKeyPress}
          aria-label="Search for exercises"
          aria-describedby={error ? "search-error" : undefined}
          disabled={isLoading}
        />
        <button 
          onClick={handleSearch} 
          disabled={isLoading || !textInput.trim()}
          aria-label={isLoading ? "Searching..." : "Search exercises"}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </section>
      {error && (
        <div 
          id="search-error" 
          role="alert" 
          style={{
            color: "#ff6b6b",
            textAlign: "center",
            padding: "10px",
            margin: "10px 0"
          }}
        >
          {error}
        </div>
      )}
      <div className="scrollBarContainer">
        <HorizontalScrollBar
          componentToDisplay={"bodyPart"}
          data={bodyParts}
          setSelectedItem={setSelectedBodyPart}
          selectedItem={selectedBodyPart}
        />
      </div>
    </>
  );
};

export default ExerciseSearch;
