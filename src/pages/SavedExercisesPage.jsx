import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ExerciseBox from "../components/ExerciseBox";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import { formatLabel } from "../utils/formatters";
import {
  cacheSavedExerciseSnapshots,
  clearSavedExercises,
  getSavedExerciseIds,
  getSavedExerciseSnapshots,
  removeSavedExercise,
  subscribeToSavedExercises,
} from "../utils/savedExercises";
import "./SavedExercisesPage.css";

const getCachedExercise = (exerciseId) => {
  const sessionExercise = sessionStorage.getItem(`exerciseID_${exerciseId}`);

  if (sessionExercise) {
    try {
      const parsedExercise = JSON.parse(sessionExercise);
      if (parsedExercise?.id) {
        return parsedExercise;
      }
    } catch {
      sessionStorage.removeItem(`exerciseID_${exerciseId}`);
    }
  }

  try {
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (!key?.endsWith("_exercises")) {
        continue;
      }

      const cachedCollection = JSON.parse(localStorage.getItem(key));
      const exercises = Array.isArray(cachedCollection)
        ? cachedCollection
        : cachedCollection?.value;
      const match = Array.isArray(exercises)
        ? exercises.find((exercise) => String(exercise.id) === exerciseId)
        : null;

      if (match) {
        return match;
      }
    }
  } catch {
    return null;
  }

  return null;
};

const SavedExercisesPage = () => {
  const [savedIds, setSavedIds] = useState(getSavedExerciseIds);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [bodyPart, setBodyPart] = useState("all");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  useEffect(
    () =>
      subscribeToSavedExercises(() => {
        setSavedIds(getSavedExerciseIds());
      }),
    []
  );

  useEffect(() => {
    let isSubscribed = true;

    const loadSavedExercises = async () => {
      setError("");

      if (savedIds.length === 0) {
        setExercises([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      const exerciseMap = new Map(
        getSavedExerciseSnapshots().map((exercise) => [
          String(exercise.id),
          exercise,
        ])
      );

      savedIds.forEach((exerciseId) => {
        if (!exerciseMap.has(exerciseId)) {
          const cachedExercise = getCachedExercise(exerciseId);
          if (cachedExercise) {
            exerciseMap.set(exerciseId, cachedExercise);
          }
        }
      });

      const missingIds = savedIds.filter(
        (exerciseId) => !exerciseMap.has(exerciseId)
      );

      if (missingIds.length > 0) {
        const results = await Promise.allSettled(
          missingIds.map((exerciseId) =>
            fetchData(
              `https://exercisedb.p.rapidapi.com/exercises/exercise/${exerciseId}`,
              exerciseOptions
            )
          )
        );

        results.forEach((result) => {
          if (result.status === "fulfilled" && result.value?.id) {
            const exercise = result.value;
            exerciseMap.set(String(exercise.id), exercise);
            sessionStorage.setItem(
              `exerciseID_${exercise.id}`,
              JSON.stringify(exercise)
            );
          }
        });

        const failedCount = results.filter(
          (result) => result.status === "rejected"
        ).length;

        if (failedCount > 0) {
          setError(
            failedCount === missingIds.length
              ? "Saved exercise details could not be refreshed right now."
              : `${failedCount} saved exercise could not be refreshed.`
          );
        }
      }

      if (!isSubscribed) {
        return;
      }

      const orderedExercises = savedIds
        .map((exerciseId) => exerciseMap.get(exerciseId))
        .filter(Boolean);

      cacheSavedExerciseSnapshots(orderedExercises);
      setExercises(orderedExercises);
      setIsLoading(false);
    };

    loadSavedExercises();

    return () => {
      isSubscribed = false;
    };
  }, [retryKey, savedIds]);

  const bodyParts = useMemo(
    () =>
      [...new Set(exercises.map((exercise) => exercise.bodyPart).filter(Boolean))]
        .sort(),
    [exercises]
  );

  useEffect(() => {
    if (bodyPart !== "all" && !bodyParts.includes(bodyPart)) {
      setBodyPart("all");
    }
  }, [bodyPart, bodyParts]);

  const filteredExercises = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return exercises.filter((exercise) => {
      const matchesBodyPart =
        bodyPart === "all" || exercise.bodyPart === bodyPart;
      const searchableValues = [
        exercise.name,
        exercise.target,
        exercise.equipment,
        exercise.bodyPart,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return (
        matchesBodyPart &&
        (!normalizedSearch || searchableValues.includes(normalizedSearch))
      );
    });
  }, [bodyPart, exercises, searchTerm]);

  const handleClearAll = () => {
    const confirmed = window.confirm(
      "Remove every exercise from your saved list?"
    );

    if (confirmed) {
      clearSavedExercises();
    }
  };

  return (
    <main id="main-content" className="savedExercisesPage">
      <header className="savedHero">
        <div className="savedHeroCopy">
          <p className="sectionEyebrow">Your training shortlist</p>
          <h1>Saved exercises</h1>
          <p>
            Keep useful movements together, revisit their technique, and build
            your next session without searching again.
          </p>
        </div>
        <div className="savedSummary" aria-label="Saved exercise summary">
          <strong>{savedIds.length}</strong>
          <span>{savedIds.length === 1 ? "exercise saved" : "exercises saved"}</span>
          <small>Stored on this device</small>
        </div>
      </header>

      {isLoading ? (
        <section className="savedLoading" aria-live="polite" aria-busy="true">
          <span className="visually-hidden">Loading saved exercises</span>
          <div className="savedGrid">
            {Array.from({ length: Math.min(savedIds.length || 3, 6) }).map(
              (_, index) => (
                <div
                  className="exerciseSkeleton"
                  aria-hidden="true"
                  key={index}
                ></div>
              )
            )}
          </div>
        </section>
      ) : savedIds.length === 0 ? (
        <section className="savedEmptyState">
          <div className="savedEmptyIcon" aria-hidden="true">
            <span></span>
          </div>
          <p className="sectionEyebrow">Nothing saved yet</p>
          <h2>Build a shortlist you can return to</h2>
          <p>
            Open any exercise and choose <strong>Save exercise</strong>. It
            will appear here for quick access on this device.
          </p>
          <Link to="/">Explore the exercise library</Link>
        </section>
      ) : exercises.length === 0 && error ? (
        <section className="savedErrorState" role="alert">
          <p className="sectionEyebrow">Unable to load saved exercises</p>
          <h2>Your saved list is still here</h2>
          <p>{error} Check your connection and try once more.</p>
          <button type="button" onClick={() => setRetryKey((key) => key + 1)}>
            Try again
          </button>
        </section>
      ) : (
        <>
          <section className="savedControls" aria-label="Filter saved exercises">
            <div className="savedSearchField">
              <label htmlFor="saved-search">Search your saved exercises</label>
              <input
                id="saved-search"
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by name, muscle, or equipment"
              />
            </div>
            <div className="savedFilterField">
              <label htmlFor="saved-body-part">Body part</label>
              <select
                id="saved-body-part"
                value={bodyPart}
                onChange={(event) => setBodyPart(event.target.value)}
              >
                <option value="all">All body parts</option>
                {bodyParts.map((item) => (
                  <option value={item} key={item}>
                    {formatLabel(item)}
                  </option>
                ))}
              </select>
            </div>
            <button
              type="button"
              className="clearSavedButton destructiveButton"
              onClick={handleClearAll}
            >
              <span className="destructiveButtonIcon" aria-hidden="true">
                &times;
              </span>
              <span>Clear all</span>
            </button>
          </section>

          <section
            className="savedResults"
            aria-labelledby="saved-results-heading"
          >
            <div className="savedResultsHeader">
              <div>
                <p className="sectionEyebrow">Your collection</p>
                <h2 id="saved-results-heading">
                  {filteredExercises.length === exercises.length
                    ? "All saved exercises"
                    : "Filtered exercises"}
                </h2>
              </div>
              <span>
                {filteredExercises.length}{" "}
                {filteredExercises.length === 1 ? "result" : "results"}
              </span>
            </div>

            {error ? (
              <div className="savedNotice" role="status">
                {error} Showing the saved details available on this device.
                <button
                  type="button"
                  onClick={() => setRetryKey((key) => key + 1)}
                >
                  Retry
                </button>
              </div>
            ) : null}

            {filteredExercises.length > 0 ? (
              <div className="savedGrid">
                {filteredExercises.map((exercise) => (
                  <article className="savedExerciseCard" key={exercise.id}>
                    <ExerciseBox exercise={exercise} />
                    <button
                      type="button"
                      className="savedRemoveButton destructiveButton"
                      onClick={() => removeSavedExercise(exercise.id)}
                      aria-label={`Remove ${formatLabel(
                        exercise.name
                      )} from saved exercises`}
                    >
                      <span className="destructiveButtonIcon" aria-hidden="true">
                        &times;
                      </span>
                      <span>Remove</span>
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="savedNoMatches">
                <h3>No saved exercises match</h3>
                <p>Try a broader search or choose a different body part.</p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm("");
                    setBodyPart("all");
                  }}
                >
                  Reset filters
                </button>
              </div>
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default SavedExercisesPage;
