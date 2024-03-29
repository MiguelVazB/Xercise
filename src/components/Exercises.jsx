import React from "react";
import { useState, useEffect } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseBox from "./ExerciseBox";
import ReactPaginate from "react-paginate";

const Exercises = ({
  exercises,
  setExercises,
  selectedBodyPart,
  resultsRef,
}) => {
  const [pageNumber, setPageNumber] = useState(0);
  const [resultsReady, setResultsReady] = useState(false);

  const exercisesPerPage = 6;
  const pageCount = Math.ceil(exercises.length / exercisesPerPage);
  const pagesVisited = pageNumber * exercisesPerPage;

  const exercisesDisplayed = exercises.length - pagesVisited;

  const displayExercises =
    exercises.length > 0
      ? exercises
          .slice(pagesVisited, pagesVisited + exercisesPerPage)
          .map((exercise) => {
            return <ExerciseBox key={exercise.id} exercise={exercise} />;
          })
      : "";

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    setResultsReady(false);
    const fetchBodyParts = async () => {
      let exercisesData = [];
      if (selectedBodyPart == "all") {
        exercisesData = await fetchData(
          "https://exercisedb.p.rapidapi.com/exercises?limit=-1",
          exerciseOptions
        );

        setExercises(exercisesData);
        console.log("Got all exercises!");
      } else {
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}?limit=-1`,
          exerciseOptions
        );
        console.log(`Got all exercises from ${selectedBodyPart}!`);
      }

      setExercises(exercisesData);

      // save exercises to local storage and add expiration date based on API requirements
      let now = new Date().setHours(10, 0, 0); // 12:00pm US Central Time
      if (new Date().getTime() > now) {
        let date = new Date(now);
        now = date.setDate(date.getDate() + 1);
      }

      const exercisesDataWithExpiration = {
        value: exercisesData,
        expiry: now,
      };

      localStorage.setItem(
        `${selectedBodyPart}_exercises`,
        JSON.stringify(exercisesDataWithExpiration)
      );
      console.log(`Got exercises for ${selectedBodyPart}`);
      setResultsReady(true);
    };

    // check localStorage for body part
    let inLocalStorage = localStorage.getItem(`${selectedBodyPart}_exercises`);
    if (inLocalStorage != null) {
      if (new Date().getTime() > JSON.parse(inLocalStorage).expiry) {
        fetchBodyParts();
      } else {
        let exercisesLocal = JSON.parse(
          localStorage.getItem(`${selectedBodyPart}_exercises`)
        );
        setExercises(exercisesLocal.value);
        console.log(`exercises for ${selectedBodyPart} local`);
        setResultsReady(true);
      }
    } else {
      fetchBodyParts();
    }
    setPageNumber(0);
  }, [selectedBodyPart]);

  // Scroll to the results section when the results are ready
  useEffect(() => {
    if (resultsReady && selectedBodyPart != "all") {
      resultsRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [resultsReady, exercises]);

  return (
    <div className="exercisesComponent" ref={resultsRef}>
      <h2>Showing Results</h2>
      <div
        className={`${
          exercisesDisplayed < 4
            ? "exercisesContainer exercisesContainerLessThan4"
            : "exercisesContainer"
        }`}
      >
        {exercises.length > 0 ? displayExercises : "Loading..."}
      </div>
      {exercises.length > 0 ? (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName="paginationButtons"
          previousLinkClassName="previousButton"
          nextLinkClassName="nextButton"
          activeClassName="paginationActive"
          pageLinkClassName="pageButtons"
          forcePage={pageNumber}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Exercises;
