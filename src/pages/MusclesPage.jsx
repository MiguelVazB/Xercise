import { React, useEffect, useState } from "react";
import FullBodyFront from "../components/FullBodyFront";
import FullBodyBack from "../components/FullBodyBack";
import SwitchImage from "../assets/switch.png";
import SimilarExercises from "../components/SimilarExercises";
import "./MusclesPage.css";

const BodyPage = () => {
  const [musclesSelected, setMusclesSelected] = useState("");

  const [flipBody, setFlipBody] = useState(true);
  const [fullBody, setFullBody] = useState(false);

  const handleClick = (e) => {
    let muscleGroup = e.target.parentElement;
    setMusclesSelected(muscleGroup.id);
  };

  function updateSize() {
    window.innerWidth >= 1025 ? setFullBody(true) : setFullBody(false);
  }

  const handleFlip = () => {
    setFlipBody((prev) => !prev);
  };

  useEffect(() => {
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <main
      id="main-content"
      className="musclesPage"
      role="main"
    >
      <div className="bodyContainer">
        {fullBody ? (
          <>
            <FullBodyFront
              musclesSelected={musclesSelected}
              handleClick={handleClick}
            />
            <FullBodyBack
              musclesSelected={musclesSelected}
              handleClick={handleClick}
            />
          </>
        ) : flipBody ? (
          <>
            <FullBodyFront
              musclesSelected={musclesSelected}
              handleClick={handleClick}
            />
          </>
        ) : (
          <FullBodyBack
            musclesSelected={musclesSelected}
            handleClick={handleClick}
          />
        )}
        {!fullBody && (
          <button
            onClick={handleFlip}
            className="flip"
            aria-label="Flip to view back of body"
            type="button"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <img
              src={SwitchImage}
              alt=""
              aria-hidden="true"
              width="100"
              height="100"
              loading="lazy"
              decoding="async"
            />
          </button>
        )}
        <p className="exercises" role="status" aria-live="polite">
          Select a muscle to show exercises and scroll down
        </p>
      </div>
      {musclesSelected && (
        <SimilarExercises exercise={musclesSelected} type={"search"} />
      )}
    </main>
  );
};

export default BodyPage;
