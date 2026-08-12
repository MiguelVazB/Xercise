import { useState } from "react";
import FullBodyFront from "../components/FullBodyFront";
import FullBodyBack from "../components/FullBodyBack";
import SwitchImage from "../assets/switch.png";
import SimilarExercises from "../components/SimilarExercises";
import { formatLabel } from "../utils/formatters";
import "./MusclesPage.css";

const muscleGroups = [
  "chest",
  "shoulders",
  "biceps",
  "triceps",
  "forearms",
  "abs",
  "obliques",
  "upper back",
  "lower back",
  "glutes",
  "quads",
  "hamstrings",
  "calves",
];

const BodyPage = () => {
  const [musclesSelected, setMusclesSelected] = useState("");
  const [showFront, setShowFront] = useState(true);

  const handleClick = (event) => {
    setMusclesSelected(event.currentTarget.id);
  };

  return (
    <main id="main-content" className="musclesPage" role="main">
      <section className="musclesHero" aria-labelledby="muscle-map-title">
        <div className="sectionHeader musclesIntro">
          <p className="sectionEyebrow">Interactive explorer</p>
          <h1 id="muscle-map-title">Discover exercises by muscle group</h1>
          <p className="sectionDescription">
            Use the anatomy map to browse movements based on the area you want
            to train, then open curated exercise suggestions below.
          </p>
        </div>
      </section>

      <section className="bodyExperience" aria-label="Interactive muscle explorer">
        <div className="bodyContainer">
          <button
            onClick={() => setShowFront((current) => !current)}
            className="flip"
            aria-label={
              showFront
                ? "Show the back of the body"
                : "Show the front of the body"
            }
            type="button"
          >
            <img
              src={SwitchImage}
              alt=""
              aria-hidden="true"
              width="24"
              height="24"
              loading="lazy"
              decoding="async"
            />
            <span>{showFront ? "View back" : "View front"}</span>
          </button>
          {showFront ? (
            <FullBodyFront
              musclesSelected={musclesSelected}
              handleClick={handleClick}
            />
          ) : (
            <FullBodyBack
              musclesSelected={musclesSelected}
              handleClick={handleClick}
            />
          )}
        </div>
        <aside className="musclesHelperCard">
          <p className="helperLabel">Selected region</p>
          <p className="helperTitle">
            {musclesSelected
              ? formatLabel(musclesSelected)
              : "Choose a muscle group"}
          </p>
          <p className="exercises" role="status" aria-live="polite">
            {musclesSelected
              ? `Showing exercises related to ${formatLabel(
                  musclesSelected
                )} below.`
              : "Click a highlighted region to load matching exercises."}
          </p>
          <div
            className="muscleQuickPick"
            role="group"
            aria-label="Choose a muscle group"
          >
            {muscleGroups.map((muscle) => (
              <button
                key={muscle}
                type="button"
                className={musclesSelected === muscle ? "isSelected" : ""}
                aria-pressed={musclesSelected === muscle}
                onClick={() => setMusclesSelected(muscle)}
              >
                {formatLabel(muscle)}
              </button>
            ))}
          </div>
        </aside>
      </section>

      {musclesSelected && (
        <SimilarExercises exercise={musclesSelected} />
      )}
    </main>
  );
};

export default BodyPage;
