import React, { useEffect, useState } from "react";
import { exerciseOptions, fetchData } from "../utils/fetchData";

const ExerciseDetail = ({ exercise, exerciseId }) => {
  const [exerciseState, setExerciseState] = useState({
    id: null,
  });

  useEffect(() => {
    if (exercise != null) {
      setExerciseState(exercise);
      console.log("loaded from localstorage");
    } else {
      const fetchExercise = async () => {
        let exerciseFetched = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/exercise/${exerciseId}`,
          exerciseOptions
        );
        setExerciseState(exerciseFetched);
      };
      fetchExercise();
      console.log("fetched exercise from id");
    }
  }, []);

  return (
    <div className="exerciseDetailComponent">
      {exerciseState.id && (
        <>
          <div className="exerciseImgContainer">
            <img src={exerciseState.gifUrl} alt="exercise image" />
          </div>
          <div className="detailsContainer">
            <h1>
              {exerciseState.name?.charAt(0).toUpperCase() +
                exerciseState.name?.slice(1)}
            </h1>
            <h2>Instructions</h2>
            <div>
              {exerciseState.instructions?.map((step, index) => (
                <p key={index}>{step}</p>
              ))}
            </div>
            <div className="musclesUsed">
              <h3>Muscles involved</h3>
              <ul>
                <li>{exerciseState.target}</li>
              </ul>
              <h4>Secondary Muscles</h4>
              <ul>
                {exerciseState.secondaryMuscles?.map((muscle) => (
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
