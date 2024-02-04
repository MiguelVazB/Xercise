import React from "react";

const ExerciseBox = ({ exercise }) => {
  return (
    <div className="exerciseBox">
      <img src={exercise.gifUrl} alt={`${exercise.name} gif`} />
      <div className="exerciseInfoContainer">
        <div className="musclesInvolved">
          {exercise.secondaryMuscles.map((muscle) => {
            return <p>{muscle.charAt(0).toUpperCase() + muscle.slice(1)}</p>;
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
