import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { formatLabel } from "../utils/formatters";
import {
  clearWorkout,
  getWorkoutItems,
  removeExerciseFromWorkout,
  resetWorkoutProgress,
  subscribeToWorkout,
  updateWorkoutItem,
} from "../utils/workout";
import "./WorkoutPage.css";

const clampNumber = (value, minimum, maximum) =>
  Math.min(maximum, Math.max(minimum, Number(value) || minimum));

const WorkoutPage = () => {
  const [workoutItems, setWorkoutItems] = useState(getWorkoutItems);

  useEffect(
    () =>
      subscribeToWorkout(() => {
        setWorkoutItems(getWorkoutItems());
      }),
    []
  );

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  const completedCount = workoutItems.filter(
    (item) => item.completed
  ).length;
  const totalSets = useMemo(
    () =>
      workoutItems.reduce(
        (total, item) => total + clampNumber(item.sets, 1, 20),
        0
      ),
    [workoutItems]
  );
  const progress = workoutItems.length
    ? Math.round((completedCount / workoutItems.length) * 100)
    : 0;

  const handleClearWorkout = () => {
    if (window.confirm("Remove every exercise from this workout?")) {
      clearWorkout();
    }
  };

  return (
    <main id="main-content" className="workoutPage">
      <header className="workoutHero">
        <div className="workoutHeroCopy">
          <p className="sectionEyebrow">Plan on this device</p>
          <h1>Quick workout</h1>
          <p>
            Assemble a focused session, adjust your sets and reps, and track
            progress as you train.
          </p>
        </div>
        <div className="workoutProgressCard">
          <div className="workoutProgressValue">
            <strong>{progress}%</strong>
            <span>complete</span>
          </div>
          <div
            className="workoutProgressTrack"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progress}
            aria-label="Workout completion"
          >
            <span style={{ width: `${progress}%` }}></span>
          </div>
          <small>
            {completedCount} of {workoutItems.length} exercises
          </small>
        </div>
      </header>

      {workoutItems.length === 0 ? (
        <section className="workoutEmptyState">
          <div className="workoutEmptyIcon" aria-hidden="true">
            +
          </div>
          <p className="sectionEyebrow">Your session is empty</p>
          <h2>Build a workout as you explore</h2>
          <p>
            Open an exercise and choose <strong>Add to workout</strong>. Sets
            and reps can be adjusted here at any time.
          </p>
          <Link to="/">Find exercises</Link>
        </section>
      ) : (
        <>
          <section className="workoutToolbar" aria-label="Workout summary">
            <div className="workoutMetric">
              <strong>{workoutItems.length}</strong>
              <span>Exercises</span>
            </div>
            <div className="workoutMetric">
              <strong>{totalSets}</strong>
              <span>Total sets</span>
            </div>
            <div className="workoutToolbarActions">
              {completedCount > 0 ? (
                <button type="button" onClick={resetWorkoutProgress}>
                  Reset progress
                </button>
              ) : null}
              <button
                type="button"
                className="destructiveButton workoutClearButton"
                onClick={handleClearWorkout}
              >
                <span className="destructiveButtonIcon" aria-hidden="true">
                  &times;
                </span>
                <span>Clear workout</span>
              </button>
            </div>
          </section>

          <section
            className="workoutList"
            aria-labelledby="workout-list-heading"
          >
            <div className="workoutListHeader">
              <div>
                <p className="sectionEyebrow">Today&apos;s sequence</p>
                <h2 id="workout-list-heading">Workout exercises</h2>
              </div>
              <p>Complete each movement when you finish its prescribed sets.</p>
            </div>

            <ol>
              {workoutItems.map((item, index) => {
                const { exercise } = item;
                const exerciseId = String(exercise.id);

                return (
                  <li
                    className={`workoutItem ${
                      item.completed ? "isComplete" : ""
                    }`}
                    key={exerciseId}
                  >
                    <span className="workoutOrder" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Link
                      className="workoutExerciseLink"
                      to={`/exercises/${exercise.id}`}
                      state={exercise}
                    >
                      <img
                        src={exercise.gifUrl}
                        alt=""
                        width="150"
                        height="150"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="workoutExerciseCopy">
                        <strong>{formatLabel(exercise.name)}</strong>
                        <small>
                          {formatLabel(exercise.target)} /{" "}
                          {formatLabel(exercise.equipment)}
                        </small>
                        <span>View technique</span>
                      </span>
                    </Link>

                    <div className="workoutPrescription">
                      <label>
                        <span>Sets</span>
                        <input
                          type="number"
                          inputMode="numeric"
                          min="1"
                          max="20"
                          value={item.sets}
                          onChange={(event) =>
                            updateWorkoutItem(exerciseId, {
                              sets: clampNumber(event.target.value, 1, 20),
                            })
                          }
                          aria-label={`Sets for ${formatLabel(exercise.name)}`}
                        />
                      </label>
                      <label>
                        <span>Reps</span>
                        <input
                          type="number"
                          inputMode="numeric"
                          min="1"
                          max="100"
                          value={item.reps}
                          onChange={(event) =>
                            updateWorkoutItem(exerciseId, {
                              reps: clampNumber(event.target.value, 1, 100),
                            })
                          }
                          aria-label={`Repetitions for ${formatLabel(
                            exercise.name
                          )}`}
                        />
                      </label>
                    </div>

                    <div className="workoutItemActions">
                      <button
                        type="button"
                        className="workoutCompleteButton"
                        aria-pressed={item.completed}
                        onClick={() =>
                          updateWorkoutItem(exerciseId, {
                            completed: !item.completed,
                          })
                        }
                      >
                        <span aria-hidden="true">
                          {item.completed ? <>&#10003;</> : ""}
                        </span>
                        {item.completed ? "Completed" : "Mark complete"}
                      </button>
                      <button
                        type="button"
                        className="destructiveButton workoutRemoveButton"
                        onClick={() => removeExerciseFromWorkout(exerciseId)}
                        aria-label={`Remove ${formatLabel(
                          exercise.name
                        )} from workout`}
                      >
                        <span
                          className="destructiveButtonIcon"
                          aria-hidden="true"
                        >
                          &times;
                        </span>
                        <span>Remove</span>
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        </>
      )}
    </main>
  );
};

export default WorkoutPage;
