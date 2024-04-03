import { React, useEffect, useState } from "react";
import HorizontalScrollBar from "./HorizontalScrollBar";
import { fetchData, exerciseOptions } from "../utils/fetchData";

const SimilarExercises = ({ exercise }) => {
  const [selected, setSelected] = useState();
  const [similarExercises, setSimilarExercises] = useState([]);

  const getSimilarExercises = async () => {
    const similarExercises = await fetchData(
      `https://exercisedb.p.rapidapi.com/exercises/target/${exercise}?limit=10`,
      exerciseOptions
    );

    console.log(similarExercises);
    sessionStorage.setItem(
      `target_${exercise}`,
      JSON.stringify(similarExercises)
    );
    setSimilarExercises(similarExercises);
  };

  useEffect(() => {
    if (exercise) {
      let inSession = sessionStorage.getItem(`target_${exercise}`);
      if (inSession != null) {
        setSimilarExercises(JSON.parse(inSession));
        console.log("loaded similar target exercises from session");
      } else {
        getSimilarExercises();
        console.log("fetched target exercises");
      }
    }
  }, [exercise]);

  return (
    <div className="similarExercises">
      <div className="scrollHeading">
        Similar Exercises that target{" "}
        {exercise.toUpperCase().charAt(0) + exercise.slice(1)}
      </div>
      <div className="scrollBarContainer">
        <HorizontalScrollBar
          componentToDisplay="exerciseBox"
          data={similarExercises}
          setSelectedItem={setSelected}
          selectedItem={selected}
        />
      </div>
    </div>
  );
};

export default SimilarExercises;
