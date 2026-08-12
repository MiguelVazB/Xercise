import { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatLabel } from "../utils/formatters";

const getSavedExerciseIds = () => {
  try {
    return JSON.parse(localStorage.getItem("savedExerciseIds")) ?? [];
  } catch {
    return [];
  }
};

const ExerciseDetail = ({ exercise }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const demoDialogRef = useRef(null);
  const secondaryMuscles = exercise.secondaryMuscles ?? [];
  const instructions = exercise.instructions ?? [];
  const [isSaved, setIsSaved] = useState(() =>
    getSavedExerciseIds().includes(exercise.id)
  );
  const [shareStatus, setShareStatus] = useState("");

  const goBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const toggleSaved = () => {
    const savedIds = getSavedExerciseIds();
    const nextSavedIds = isSaved
      ? savedIds.filter((exerciseId) => exerciseId !== exercise.id)
      : [...new Set([...savedIds, exercise.id])];

    localStorage.setItem("savedExerciseIds", JSON.stringify(nextSavedIds));
    setIsSaved((current) => !current);
  };

  const shareExercise = async () => {
    const shareData = {
      title: formatLabel(exercise.name),
      text: `View ${formatLabel(exercise.name)} on Xercise.`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareStatus("Shared");
      } else {
        await navigator.clipboard.writeText(shareData.url);
        setShareStatus("Link copied");
      }
    } catch (error) {
      if (error?.name !== "AbortError") {
        setShareStatus("Unable to share");
      }
    }
  };

  return (
    <article className="exerciseDetailComponent">
      <nav className="detailBreadcrumb" aria-label="Breadcrumb">
        <button type="button" onClick={goBack} className="detailBackButton">
          <span aria-hidden="true">&larr;</span>
          Back to exercises
        </button>
        <span className="breadcrumbCurrent" aria-current="page">
          {formatLabel(exercise.name)}
        </span>
      </nav>

      <header className="exerciseTitlePanel">
        <p className="sectionEyebrow">Exercise guide</p>
        <h1>{formatLabel(exercise.name)}</h1>
        <p className="exerciseLead">
          Review the movement, equipment, and technique steps before adding it
          to your next training session.
        </p>

        <div className="detailHighlights" aria-label="Exercise summary">
          <div className="detailHighlight">
            <span>Body part</span>
            <strong>{formatLabel(exercise.bodyPart)}</strong>
          </div>
          <div className="detailHighlight">
            <span>Primary muscle</span>
            <strong>{formatLabel(exercise.target)}</strong>
          </div>
          <div className="detailHighlight">
            <span>Equipment</span>
            <strong>{formatLabel(exercise.equipment)}</strong>
          </div>
        </div>

        <div className="detailActions">
          <button
            type="button"
            className={`detailActionButton ${isSaved ? "isSaved" : ""}`}
            onClick={toggleSaved}
            aria-pressed={isSaved}
          >
            {isSaved ? "Saved" : "Save exercise"}
          </button>
          <button
            type="button"
            className="detailActionButton"
            onClick={shareExercise}
          >
            Share
          </button>
          <span className="shareStatus" role="status" aria-live="polite">
            {shareStatus}
          </span>
        </div>
      </header>

      <div className="exerciseImgContainer">
        <div className="exerciseMediaFrame">
          <div className="mediaLabel">
            <span className="mediaStatusDot" aria-hidden="true"></span>
            Looping demonstration
          </div>
          <img
            src={exercise.gifUrl}
            alt={`${exercise.name} exercise demonstration`}
            decoding="async"
          />
          <button
            type="button"
            className="expandDemo"
            onClick={() => demoDialogRef.current?.showModal()}
          >
            View larger
          </button>
        </div>
        <p className="detailCallout">
          Use the demonstration as a movement reference. Stop if the exercise
          causes pain or discomfort.
        </p>
      </div>

      <div className="detailsContainer">
        <nav className="detailSectionNav" aria-label="On this page">
          <a href="#exercise-instructions">Instructions</a>
          <a href="#muscles-used">Muscles</a>
          <a href="#exercise-videos">Videos</a>
          <a href="#related-exercises">Alternatives</a>
        </nav>

        <section
          className="instructionsPanel"
          id="exercise-instructions"
          aria-labelledby="instructions-heading"
        >
          <div className="detailSectionHeading">
            <p className="sectionEyebrow">Technique</p>
            <h2 id="instructions-heading">How to perform it</h2>
          </div>
          {instructions.length > 0 ? (
            <ol className="instructionList">
              {instructions.map((step, index) => (
                <li key={index}>
                  <span className="instructionNumber" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="sectionDescription">
              Step-by-step instructions are not available for this exercise
              yet. Use the demonstration and video walkthroughs for context.
            </p>
          )}
        </section>

        <section
          className="musclesUsed"
          id="muscles-used"
          aria-labelledby="muscles-used-heading"
        >
          <div className="muscleColumn primaryMuscleColumn">
            <p className="sectionEyebrow">Muscle focus</p>
            <h2 id="muscles-used-heading">Muscles involved</h2>
            <span className="primaryMuscleChip">
              {formatLabel(exercise.target)}
              <small>Primary</small>
            </span>
          </div>
          <div className="muscleColumn">
            <h3>Secondary muscles</h3>
            <div className="secondaryMuscleList">
              {secondaryMuscles.length > 0 ? (
                secondaryMuscles.map((muscle) => (
                  <span key={muscle}>{formatLabel(muscle)}</span>
                ))
              ) : (
                <p>No secondary muscles are listed for this movement.</p>
              )}
            </div>
          </div>
        </section>
      </div>

      <dialog
        ref={demoDialogRef}
        className="demoDialog"
        aria-label={`Larger demonstration of ${exercise.name}`}
      >
        <div className="demoDialogHeader">
          <strong>{formatLabel(exercise.name)}</strong>
          <button
            type="button"
            onClick={() => demoDialogRef.current?.close()}
            aria-label="Close enlarged demonstration"
          >
            Close
          </button>
        </div>
        <img
          src={exercise.gifUrl}
          alt={`${exercise.name} exercise demonstration enlarged`}
          decoding="async"
        />
      </dialog>
    </article>
  );
};

export default ExerciseDetail;
