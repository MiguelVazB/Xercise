import { useState } from "react";
import { Link } from "react-router-dom";
import { formatLabel } from "../utils/formatters";
import ExerciseImage from "./ExerciseImage";

const ExerciseBox = ({ exercise }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const visibleMuscles = [exercise.target, ...(exercise.secondaryMuscles ?? [])]
    .filter(Boolean)
    .slice(0, 3);

  return (
    <Link
      className="exerciseBox"
      to={`/exercises/${exercise.id}`}
      state={exercise}
      aria-label={`View details for ${exercise.name} exercise`}
    >
      <div className={`imageContainer ${imageLoaded ? "" : "pulse"}`}>
        <ExerciseImage
          exercise={exercise}
          className={`exercisePreview ${
            imageLoaded ? "exercisePreviewLoaded" : ""
          }`}
          onLoad={() => setImageLoaded(true)}
          alt={`${exercise.name} exercise demonstration`}
          width="300"
          height="300"
          loading="lazy"
          decoding="async"
        />
        <div className="exerciseOverlay">
          <span className="exerciseTag">{formatLabel(exercise.bodyPart)}</span>
          <span className="exerciseTag">{formatLabel(exercise.equipment)}</span>
        </div>
      </div>
      <div className="exerciseInfoContainer">
        <p className="exerciseSubheading">
          Targets {formatLabel(exercise.target)}
        </p>
        <p className="exerciseName">{formatLabel(exercise.name)}</p>
        <div className="musclesInvolved">
          {visibleMuscles.map((muscle) => (
            <span key={`${muscle}${exercise.id}`}>{formatLabel(muscle)}</span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default ExerciseBox;
