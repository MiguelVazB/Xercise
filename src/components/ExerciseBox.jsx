import React from "react";

const ExerciseBox = ({ exercise }) => {
  return (
    <div className="exerciseBox">
      <div className="imageContainer">
        <img
          src={exercise.gifUrl}
          alt={`${exercise.name} gif`}
          loading="lazy"
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
