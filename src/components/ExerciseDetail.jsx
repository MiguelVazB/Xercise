import React, { useEffect, useState } from "react";

const ExerciseDetail = ({ exercise }) => {
  return (
    <div className="exerciseDetailComponent">
      {exercise?.id && (
        <>
          <div className="exerciseImgContainer">
            <img src={exercise.gifUrl} alt="exercise image" />
          </div>
          <div className="detailsContainer">
            <h1>
              {exercise.name?.charAt(0).toUpperCase() + exercise.name?.slice(1)}
            </h1>
            <h2>Instructions</h2>
            <div>
              {exercise.instructions?.map((step, index) => (
                <p key={index}>{step}</p>
              ))}
            </div>
            <div className="musclesUsed">
              <h3>Muscles involved</h3>
              <ul>
                <li>{exercise.target}</li>
              </ul>
              <h4>Secondary Muscles</h4>
              <ul>
                {exercise.secondaryMuscles?.map((muscle) => (
                  <li key={muscle}>{muscle}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExerciseDetail;
