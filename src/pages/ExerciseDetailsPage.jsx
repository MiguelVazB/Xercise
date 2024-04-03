import { React, useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseDetail from "../components/ExerciseDetail";
import ExerciseVideos from "../components/ExerciseVideos";
import "./ExerciseDetailsPage.css";

const ExerciseDetails = () => {
  const location = useLocation();
  const exerciseFromState = location.state;
  const { id } = useParams();
  const navigate = useNavigate();

  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    if (exerciseFromState != null) {
      setExercise(exerciseFromState);
      console.log("loaded from localstorage");
    } else {
      const fetchExercise = async () => {
        let exerciseFetched = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/exercise/${id}`,
          exerciseOptions
        );

        if (exerciseFetched == null) navigate("/*");

        sessionStorage.setItem(
          `exerciseID_${id}`,
          JSON.stringify(exerciseFetched)
        );
        setExercise(exerciseFetched);
      };

      let inSession = sessionStorage.getItem(`exerciseID_${id}`);
      if (inSession === "undefined") {
        console.log("fetched exercise from id");
        fetchExercise();
      } else {
        console.log("loaded from session");
        if (inSession == null) navigate("/*");
        setExercise(JSON.parse(inSession));
      }
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
  }, [location]);

  return (
    <div className="exerciseDetailsPage">
      {exercise != null ? (
        <>
          <ExerciseDetail exercise={exercise} />
          <ExerciseVideos exercise={exercise} />
          <div>Similar exercise target</div>
          <div style={{ height: "100vh" }}>Similar exercise equipment</div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ExerciseDetails;
