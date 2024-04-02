import { React, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import "./ExerciseDetailsPage.css";
import ExerciseDetail from "../components/ExerciseDetail";
import ExerciseVideos from "../components/ExerciseVideos";

const ExerciseDetails = () => {
  const location = useLocation();
  const exercise = location.state;
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
  }, [location]);

  return (
    <div className="exerciseDetailsPage">
      <ExerciseDetail exercise={exercise} exerciseId={id} />
      <ExerciseVideos exercise={exercise} exerciseId={id} />
      <div>Similar exercise target</div>
      <div style={{ height: "100vh" }}>Similar exercise equipment</div>
    </div>
  );
};

export default ExerciseDetails;
