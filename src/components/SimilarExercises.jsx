import { useEffect, useState } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import { formatLabel } from "../utils/formatters";
import HorizontalScrollBar from "./HorizontalScrollBar";
import "./SimilarExercises.css";

const filterExercises = (exercises, searchTerm) => {
  const normalizedTerm = searchTerm.toLowerCase();

  return (Array.isArray(exercises) ? exercises : [])
    .filter((item) =>
      [item.name, item.target, item.equipment, item.bodyPart].some((value) =>
        value?.toLowerCase().includes(normalizedTerm)
      )
    )
    .slice(0, 10);
};

const getCachedExercises = (storageKey) => {
  try {
    return JSON.parse(sessionStorage.getItem(storageKey));
  } catch {
    sessionStorage.removeItem(storageKey);
    return null;
  }
};

const SimilarExercises = ({ exercise }) => {
  const [similarExercises, setSimilarExercises] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    let isSubscribed = true;

    const loadExercises = async () => {
      const storageKey = `muscle_${exercise}`;
      const cached = getCachedExercises(storageKey);

      if (cached) {
        setSimilarExercises(cached);
        return;
      }

      try {
        let allExercises;
        const localCache = JSON.parse(
          localStorage.getItem("all_exercises") || "null"
        );

        if (localCache?.value && Date.now() <= localCache.expiry) {
          allExercises = localCache.value;
        } else {
          allExercises = await fetchData(
            "https://exercisedb.p.rapidapi.com/exercises?limit=-1",
            exerciseOptions
          );
        }

        const filtered = filterExercises(allExercises, exercise);
        sessionStorage.setItem(storageKey, JSON.stringify(filtered));

        if (isSubscribed) {
          setSimilarExercises(filtered);
        }
      } catch (loadError) {
        console.error("Error loading muscle exercises:", loadError);
        if (isSubscribed) {
          setError("Exercises for this muscle group are unavailable right now.");
        }
      }
    };

    loadExercises();
    return () => {
      isSubscribed = false;
    };
  }, [exercise]);

  return (
    <section className="similarExercises">
      <div className="sectionHeader">
        <p className="sectionEyebrow">Muscle group</p>
        <h2 className="scrollHeading">{formatLabel(exercise)} exercises</h2>
        <p className="similarSectionDescription">
          A curated set of exercises connected to the selected region.
        </p>
      </div>
      <div className="scrollBarContainer">
        {error ? (
          <div className="emptyState">{error}</div>
        ) : similarExercises.length > 0 ? (
          <HorizontalScrollBar
            componentToDisplay="exerciseBox"
            data={similarExercises}
          />
        ) : (
          <div className="emptyState">Loading related exercises...</div>
        )}
      </div>
    </section>
  );
};

export default SimilarExercises;
