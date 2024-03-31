import { React, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./ExerciseDetailsPage.css";
import ExerciseDetail from "../components/ExerciseDetail";

const ExerciseDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  console.log(location.state);

  return (
    <div className="exerciseDetailsPage">
      <ExerciseDetail id={id} />
      <div>Exercise videos</div>
      <div>Similar exercise target</div>
      <div>Similar exercise equipment</div>
    </div>
  );
};

export default ExerciseDetails;
