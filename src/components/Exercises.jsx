import React from "react";
import { useState, useEffect } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseBox from "./ExerciseBox";
import ReactPaginate from "react-paginate";

const Exercises = ({ exercises, setExercises, selectedBodyPart }) => {
  const [pageNumber, setPageNumber] = useState(0);

  const exercisesPerPage = 6;
  const pageCount = Math.ceil(exercises.length / exercisesPerPage);
  const pagesVisited = pageNumber * exercisesPerPage;

  const displayExercises = exercises
    .slice(pagesVisited, pagesVisited + exercisesPerPage)
    .map((exercise) => {
      return <ExerciseBox key={exercise.id} exercise={exercise} />;
    });

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    const fetchBodyParts = async () => {
      const exercisesData = await fetchData(
        "https://exercisedb.p.rapidapi.com/exercises?limit=-1",
        exerciseOptions
      );

      setExercises(exercisesData);
    };

    fetchBodyParts();
    console.log("hi");
  }, []);

  return (
    <div className="exercisesComponent">
      <h2>Showing Results</h2>
      <div className="exercisesContainer">
        {/* {exercises.map((exercise) => {
          return <ExerciseBox key={exercise.id} exercise={exercise} />;
        })} */}
        {displayExercises}
      </div>
      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName="paginationButtons"
        previousLinkClassName="previousButton"
        nextLinkClassName="nextButton"
        activeClassName="paginationActive"
        disabledClassName="disabledButtons"
      />
    </div>
  );
};

export default Exercises;
