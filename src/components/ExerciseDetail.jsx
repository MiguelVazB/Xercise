import React from "react";

const ExerciseDetail = ({ exercise }) => {
  const { id, name, gifUrl, instructions, target, secondaryMuscles } = exercise;
  return (
    <div className="exerciseDetailComponent">
      <div className="infoAndPic">
        <div className="exerciseImgContainer">
          <img src={gifUrl} alt="exercise image" />
        </div>
      </div>
      <div className="detailsContainer">
        <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        <h2>Instructions</h2>
        <div>
          {instructions.map((step) => (
            <p>{step}</p>
          ))}
        </div>
        <div>
          <h3>Muscles involved</h3>
          <ul>
            <li>{target}</li>
          </ul>
          <h4>Secondary Muscles</h4>
          <ul>
            {secondaryMuscles.map((muscle) => (
              <li key={muscle}>{muscle}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
