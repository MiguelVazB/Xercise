import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseDetail from "../components/ExerciseDetail";
import ExerciseVideos from "../components/ExerciseVideos";
import RelatedExercises from "../components/RelatedExercises";
import "./ExerciseDetailsPage.css";

const ExerciseDetails = () => {
  const location = useLocation();
  const exerciseFromState = location.state;
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let isSubscribed = true;

    const loadExercise = async () => {
      setIsLoading(true);
      setError("");

      if (exerciseFromState?.id === id) {
        setExercise(exerciseFromState);
        setIsLoading(false);
        return;
      }

      const storageKey = `exerciseID_${id}`;
      const cachedExercise = sessionStorage.getItem(storageKey);

      if (cachedExercise) {
        try {
          const parsedExercise = JSON.parse(cachedExercise);
          if (parsedExercise?.id) {
            setExercise(parsedExercise);
            setIsLoading(false);
            return;
          }
        } catch {
          sessionStorage.removeItem(storageKey);
        }
      }

      try {
        const exerciseFetched = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
          exerciseOptions
        );

        if (!exerciseFetched?.id) {
          throw new Error("Exercise not found");
        }

        if (isSubscribed) {
          sessionStorage.setItem(storageKey, JSON.stringify(exerciseFetched));
          setExercise(exerciseFetched);
        }
      } catch (fetchError) {
        console.error("Error loading exercise details:", fetchError);
        if (isSubscribed) {
          setExercise(null);
          setError(
            "We could not load this exercise. Check the link or try again."
          );
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    loadExercise();

    return () => {
      isSubscribed = false;
    };
  }, [exerciseFromState, id, retryKey]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  return (
    <motion.main
      id="main-content"
      className="exerciseDetailsPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {isLoading ? (
        <div className="detailLoading" role="status" aria-live="polite">
          <span className="visually-hidden">Loading exercise details</span>
          <div className="detailSkeletonMedia"></div>
          <div className="detailSkeletonContent">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      ) : error ? (
        <section className="detailErrorState" role="alert">
          <p className="sectionEyebrow">Exercise unavailable</p>
          <h1>We could not open that exercise</h1>
          <p>{error}</p>
          <div className="detailErrorActions">
            <button type="button" onClick={() => setRetryKey((key) => key + 1)}>
              Try again
            </button>
            <Link to="/">Back to the library</Link>
          </div>
        </section>
      ) : (
        <>
          <ExerciseDetail exercise={exercise} />
          <ExerciseVideos exerciseName={exercise.name} />
          <RelatedExercises
            target={exercise.target}
            equipment={exercise.equipment}
            currentExerciseId={exercise.id}
          />
        </>
      )}
    </motion.main>
  );
};

export default ExerciseDetails;
