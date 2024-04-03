import { React, useEffect, useState } from "react";
import HorizontalScrollBar from "./HorizontalScrollBar";
import { fetchData, exerciseOptions } from "../utils/fetchData";

const SimilarExercises = ({ exercise, type }) => {
  const [selected, setSelected] = useState();
  const [similarExercises, setSimilarExercises] = useState([]);

  const getSimilarExercises = async () => {
    let link;
    if (type == "target") {
      link = `https://exercisedb.p.rapidapi.com/exercises/target/${exercise}?limit=10`;
    } else {
      link = `https://exercisedb.p.rapidapi.com/exercises/equipment/${exercise}?limit=10`;
    }
    const similarExercises = await fetchData(link, exerciseOptions);

    console.log(similarExercises);
    sessionStorage.setItem(
      `${type}_${exercise}`,
      JSON.stringify(similarExercises)
    );
    setSimilarExercises(similarExercises);
  };

  useEffect(() => {
    if (exercise) {
      let inSession = sessionStorage.getItem(`${type}_${exercise}`);
      if (inSession != null) {
        setSimilarExercises(JSON.parse(inSession));
        console.log(`loaded similar ${type} exercises from session`);
      } else {
        getSimilarExercises();
        console.log(`fetched similar ${type} exercises`);
      }
    }
  }, [exercise]);

  return (
    <div className="similarExercises">
      <div className="scrollHeading">
        {type == "target"
          ? `Similar exercises that target ${
              exercise.toUpperCase().charAt(0) + exercise.slice(1)
            }`
          : `Exercises that use the similar equipment`}
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
