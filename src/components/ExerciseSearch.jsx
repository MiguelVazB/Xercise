import { useState, useEffect, useCallback } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import { formatLabel } from "../utils/formatters";
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

  useEffect(() => {
    const fetchBodyParts = async () => {
      try {
        const bodyPartsData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises/bodyPartList",
          exerciseOptions
        );

        if (bodyPartsData && Array.isArray(bodyPartsData)) {
          const nextBodyParts = ["all", ...bodyPartsData];
          setBodyParts(nextBodyParts);
          localStorage.setItem("bodyParts", JSON.stringify(nextBodyParts));
        }
      } catch (fetchError) {
        console.error("Error fetching body parts:", fetchError);
        setError("Failed to load body parts. Please refresh the page.");
      }
    };

    if (localStorage.getItem("bodyParts") != null) {
      try {
        const bodyPartsLocal = JSON.parse(localStorage.getItem("bodyParts"));
        setBodyParts(bodyPartsLocal);
      } catch (storageError) {
        console.error("Error parsing stored body parts:", storageError);
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
    const textInputWithoutSpaces = textInput.trim().toLowerCase();

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
        setError(
          `No exercises found for "${textInputWithoutSpaces}". Try a different search term.`
        );
      }
    } catch (searchError) {
      console.error("Search error:", searchError);
      setError("Failed to search exercises. Please try again.");
      setExercises([]);
    } finally {
      setIsLoading(false);
    }
  }, [textInput, setExercises]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  return (
    <section
      id="exercise-search"
      className="searchSection"
      aria-labelledby="exercise-search-title"
    >
      <div className="sectionHeader searchHeader">
        <p className="sectionEyebrow">Exercise explorer</p>
        <h2 id="exercise-search-title" className="scrollHeading">
          Search by movement, muscle group, or equipment
        </h2>
        <p className="sectionDescription">
          Start with a keyword search or use the filters below to move through
          the library faster.
        </p>
      </div>
      <form
        className="searchContainer"
        role="search"
        aria-label="Exercise search"
        onSubmit={handleSubmit}
      >
        <label htmlFor="exercise-search-input" className="visually-hidden">
          Search for exercises
        </label>
        <input
          id="exercise-search-input"
          type="search"
          placeholder="Search exercises by name, muscle, or equipment..."
          value={textInput}
          onChange={(event) => setTextInput(event.target.value)}
          aria-label="Search for exercises"
          aria-describedby={error ? "search-error" : undefined}
          disabled={isLoading}
        />
        <button
          disabled={isLoading || !textInput.trim()}
          aria-label={isLoading ? "Searching..." : "Search exercises"}
          type="submit"
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
      </form>
      {error && (
        <div id="search-error" role="alert" className="searchError">
          {error}
        </div>
      )}
      <div className="filterIntro">
        <div>
          <p className="filterLabel">Body-part filters</p>
          <p className="filterDescription">
            Jump into a curated list of movements for the area you want to
            train.
          </p>
        </div>
        <div className="statusPill">Selected: {formatLabel(selectedBodyPart)}</div>
      </div>
      <div className="scrollBarContainer filterScrollBar">
        <HorizontalScrollBar
          componentToDisplay="bodyPart"
          data={bodyParts}
          setSelectedItem={setSelectedBodyPart}
          selectedItem={selectedBodyPart}
        />
      </div>
    </section>
  );
};

export default ExerciseSearch;
