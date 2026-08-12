import { useState, useEffect } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import { formatLabel } from "../utils/formatters";
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const exercisesPerPage = 6;
  const pageCount = Math.ceil(exercises.length / exercisesPerPage);
  const pagesVisited = pageNumber * exercisesPerPage;

  const exercisesDisplayed = exercises.length - pagesVisited;

  const displayExercises = exercises.length
    ? exercises
        .slice(pagesVisited, pagesVisited + exercisesPerPage)
        .map((exercise) => <ExerciseBox key={exercise.id} exercise={exercise} />)
    : [];

  const changePage = ({ selected }) => {
    setPageNumber(selected);
    requestAnimationFrame(() => {
      resultsRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  useEffect(() => {
    let isSubscribed = true;

    const setExerciseState = (nextExercises) => {
      if (!isSubscribed) {
        return;
      }

      setExercises(nextExercises);
      setResultsReady(true);
      setIsLoading(false);
    };

    const fetchBodyParts = async () => {
      try {
        let exercisesData = [];

        if (selectedBodyPart === "all") {
          exercisesData = await fetchData(
            "https://exercisedb.p.rapidapi.com/exercises?limit=-1",
            exerciseOptions
          );
        } else {
          exercisesData = await fetchData(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}?limit=-1`,
            exerciseOptions
          );
        }

        let now = new Date().setHours(10, 0, 0);
        if (new Date().getTime() > now) {
          const date = new Date(now);
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
        setExerciseState(exercisesData);
      } catch (fetchError) {
        console.error("Error fetching exercises:", fetchError);
        if (!isSubscribed) {
          return;
        }
        setExercises([]);
        setError("We couldn't load exercises right now. Please try again.");
        setIsLoading(false);
        setResultsReady(true);
      }
    };

    const hydrateExercises = async () => {
      setPageNumber(0);
      setResultsReady(false);
      setIsLoading(true);
      setError("");

      const inLocalStorage = localStorage.getItem(`${selectedBodyPart}_exercises`);

      if (inLocalStorage != null) {
        try {
          const exercisesLocal = JSON.parse(inLocalStorage);
          if (new Date().getTime() > exercisesLocal.expiry) {
            await fetchBodyParts();
          } else {
            setExerciseState(exercisesLocal.value);
          }
        } catch (storageError) {
          console.error("Error reading stored exercises:", storageError);
          await fetchBodyParts();
        }
      } else {
        await fetchBodyParts();
      }
    };

    hydrateExercises();

    return () => {
      isSubscribed = false;
    };
  }, [selectedBodyPart, setExercises]);

  useEffect(() => {
    if (pageNumber > 0 && pagesVisited >= exercises.length) {
      setPageNumber(0);
    }
  }, [exercises.length, pageNumber, pagesVisited]);

  useEffect(() => {
    if (resultsReady && selectedBodyPart !== "all") {
      resultsRef?.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [resultsReady, selectedBodyPart, resultsRef]);

  const showingFrom = exercises.length === 0 ? 0 : pagesVisited + 1;
  const showingTo = Math.min(pagesVisited + exercisesPerPage, exercises.length);

  return (
    <section
      className="exercisesComponent"
      ref={resultsRef}
      aria-labelledby="exercise-results-title"
    >
      <div className="resultsHeader">
        <div className="resultsHeadingGroup">
          <p className="sectionEyebrow">Results</p>
          <h2 id="exercise-results-title" className="scrollHeading results-heading">
            {selectedBodyPart === "all"
              ? "Exercise library"
              : `${formatLabel(selectedBodyPart)} focus`}
          </h2>
        </div>
        <p className="resultsCounter">
          {isLoading
            ? "Loading exercises..."
            : exercises.length > 0
            ? `${showingFrom}-${showingTo} of ${exercises.length}`
            : "No matches yet"}
        </p>
      </div>

      {error ? (
        <div className="emptyState">{error}</div>
      ) : isLoading ? (
        <div className="exercisesContainer">
          {Array.from({ length: exercisesPerPage }).map((_, index) => (
            <div key={index} className="exerciseSkeleton" aria-hidden="true"></div>
          ))}
        </div>
      ) : exercises.length > 0 ? (
        <div
          className={
            exercisesDisplayed < 4
              ? "exercisesContainer exercisesContainerLessThan4"
              : "exercisesContainer"
          }
        >
          {displayExercises}
        </div>
      ) : (
        <div className="emptyState">
          Try a different search term or choose another body part.
        </div>
      )}

      {exercises.length > 0 && pageCount > 1 ? (
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          pageRangeDisplayed={2}
          marginPagesDisplayed={1}
          containerClassName="paginationButtons"
          previousLinkClassName="previousButton"
          nextLinkClassName="nextButton"
          activeClassName="paginationActive"
          pageLinkClassName="pageButtons"
          forcePage={pageNumber}
          ariaLabelBuilder={(page) => `Go to page ${page}`}
          previousAriaLabel="Go to previous page"
          nextAriaLabel="Go to next page"
        />
      ) : null}
    </section>
  );
};

export default Exercises;
