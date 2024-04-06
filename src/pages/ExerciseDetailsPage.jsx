import { React, useEffect, useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseDetail from "../components/ExerciseDetail";
import ExerciseVideos from "../components/ExerciseVideos";
import { motion } from "framer-motion";
import "./ExerciseDetailsPage.css";
import SimilarExercises from "../components/SimilarExercises";

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
          JSON.stringify(exerciseFetched != null ? exerciseFetched : "dne")
        );
        setExercise(exerciseFetched);
      };

      let inSession = sessionStorage.getItem(`exerciseID_${id}`);
      if (inSession === "undefined" || inSession == null) {
        console.log("fetched exercise from id");
        fetchExercise();
      } else {
        console.log("loaded from session");
        if (JSON.parse(inSession) == "dne") {
          navigate("/*");
        } else {
          setExercise(JSON.parse(inSession));
        }
      }
    }
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0, { behavior: "smooth" });
  }, [location]);

  return (
    <motion.div
      className="exerciseDetailsPage"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
    >
      {exercise != null ? (
        <>
          <ExerciseDetail exercise={exercise} />
          <ExerciseVideos exerciseName={exercise.name} />
          <SimilarExercises exercise={exercise.target} type={"target"} />
          <SimilarExercises exercise={exercise.equipment} type={"equipment"} />
        </>
      ) : (
        ""
      )}
    </motion.div>
  );
};

export default ExerciseDetails;
