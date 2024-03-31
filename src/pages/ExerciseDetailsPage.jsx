import { React, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./ExerciseDetailsPage.css";
import ExerciseDetail from "../components/ExerciseDetail";

const ExerciseDetails = () => {
  // const { id } = useParams();
  const location = useLocation();
  const exercise = location.state;

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
  }, [location]);

  return (
    <div className="exerciseDetailsPage">
      <ExerciseDetail exercise={exercise} />
      <div>Exercise videos</div>
      <div>Similar exercise target</div>
      <div style={{ height: "100vh" }}>Similar exercise equipment</div>
    </div>
  );
};

export default ExerciseDetails;
