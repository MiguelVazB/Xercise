import { useEffect, useState } from "react";
import ExerciseBox from "./ExerciseBox";
import { formatLabel } from "../utils/formatters";
import {
  clearRecentExercises,
  getRecentExercises,
  removeRecentExercise,
  subscribeToRecentExercises,
} from "../utils/recentExercises";

const RecentlyViewed = () => {
  const [recentExercises, setRecentExercises] = useState(getRecentExercises);
  const [showAll, setShowAll] = useState(false);

  useEffect(
    () =>
      subscribeToRecentExercises(() =>
        setRecentExercises(getRecentExercises())
      ),
    []
  );

  if (recentExercises.length === 0) {
    return null;
  }

  const visibleExercises = showAll
    ? recentExercises
    : recentExercises.slice(0, 4);

  return (
    <section
      className="recentlyViewed"
      aria-labelledby="recently-viewed-heading"
    >
      <div className="recentlyViewedHeader">
        <div className="sectionHeader">
          <p className="sectionEyebrow">Pick up where you left off</p>
          <h2 className="scrollHeading" id="recently-viewed-heading">
            Recently viewed
          </h2>
          <p className="sectionDescription">
            Quickly return to exercises you opened on this device.
          </p>
        </div>
        <div className="recentlyViewedActions">
          {recentExercises.length > 4 ? (
            <button
              type="button"
              className="recentToggleButton"
              onClick={() => setShowAll((current) => !current)}
              aria-expanded={showAll}
            >
              {showAll ? "Show latest" : `Show all ${recentExercises.length}`}
            </button>
          ) : null}
          <button
            type="button"
            className="recentClearButton destructiveButton"
            onClick={clearRecentExercises}
          >
            <span className="destructiveButtonIcon" aria-hidden="true">
              &times;
            </span>
            <span>Clear history</span>
          </button>
        </div>
      </div>

      <div className="recentlyViewedGrid">
        {visibleExercises.map((exercise) => (
          <article className="recentExerciseCard" key={exercise.id}>
            <ExerciseBox exercise={exercise} />
            <button
              type="button"
              className="recentRemoveButton destructiveButton"
              onClick={() => removeRecentExercise(exercise.id)}
              aria-label={`Remove ${formatLabel(
                exercise.name
              )} from recently viewed`}
            >
              <span className="destructiveButtonIcon" aria-hidden="true">
                &times;
              </span>
              <span>Remove</span>
            </button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
