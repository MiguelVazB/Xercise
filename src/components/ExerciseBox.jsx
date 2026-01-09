import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ExerciseBox = ({ exercise }) => {
  const [loaded, setLoaded] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (loaded) {
      setImageLoading(false);
      setPulsing(false);
    }
  }, [loaded]);

  const handleClick = () => {
    navigate(`/exercises/${exercise.id}`, { state: exercise });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className="exerciseBox"
      onClick={() => handleClick()}
      onKeyPress={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${exercise.name} exercise`}
    >
      <div className={`imageContainer ${pulsing ? "pulse" : ""}`}>
        <img
          style={{ opacity: imageLoading ? 0 : 1, transition: 'opacity 0.2s ease' }}
          onLoad={() => setLoaded(true)}
          src={exercise.gifUrl}
          alt={`${exercise.name} exercise demonstration`}
          width="300"
          height="300"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="exerciseInfoContainer">
        <div className="musclesInvolved">
          {exercise.secondaryMuscles.map((muscle) => {
            return (
              <p key={`${muscle}${exercise.id}`}>
                {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
              </p>
            );
          })}
        </div>
        <p className="exerciseName">
          {exercise.name.charAt(0).toUpperCase() + exercise.name.slice(1)}
        </p>
      </div>
    </div>
  );
};

export default ExerciseBox;
