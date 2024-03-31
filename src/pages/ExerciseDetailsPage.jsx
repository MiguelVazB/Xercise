import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./ExerciseDetailsPage.css";
import ExerciseDetail from "../components/ExerciseDetail";

const ExerciseDetails = () => {
  const { id } = useParams();
  console.log(id);
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
