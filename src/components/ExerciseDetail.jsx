import React from "react";

const ExerciseDetail = ({ id }) => {
  return (
    <div className="exerciseDetailComponent">
      <div className="infoAndPic">
        <h1>Exercise Name</h1>
        <img alt="exercise image" />
      </div>
      <div className="detailsContainer">
        <div>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Debitis
          quaerat maiores ipsam culpa animi nesciunt, soluta reiciendis itaque
          neque aspernatur ullam unde ad minima maxime accusamus quas
          repellendus laudantium libero?
        </div>
        <div>
          <p>Muscles involved</p>
          <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;
