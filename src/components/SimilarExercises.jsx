import { React, useEffect, useState } from "react";
import HorizontalScrollBar from "./HorizontalScrollBar";
import { fetchData, exerciseOptions } from "../utils/fetchData";
import "./SimilarExercises.css";

const SimilarExercises = ({ exercise, type }) => {
  const [selected, setSelected] = useState();
  const [similarExercises, setSimilarExercises] = useState([]);

  const filterSearch = async (similarExercises) => {
    const searchedExercises = similarExercises.filter(
      (exerciseInSearch) =>
        exerciseInSearch.name.toLowerCase().includes(exercise) ||
        exerciseInSearch.target.toLowerCase().includes(exercise) ||
        exerciseInSearch.equipment.toLowerCase().includes(exercise) ||
        exerciseInSearch.bodyPart.toLowerCase().includes(exercise)
    );
    return searchedExercises.slice(0, 10);
  };

  const filterLocal = async (exercisesLocal) => {
    let filteredLocal = await filterSearch(exercisesLocal);
    setSimilarExercises(filteredLocal.slice(0, 10));
  };

  const getSimilarExercises = async () => {
    let link;
    if (type == "target") {
      link = `https://exercisedb.p.rapidapi.com/exercises/target/${exercise}?limit=10`;
    } else if (type == "search") {
      link = `https://exercisedb.p.rapidapi.com/exercises?limit=-1`;
    } else {
      link = `https://exercisedb.p.rapidapi.com/exercises/equipment/${exercise}?limit=10`;
    }
    let similarExercises = await fetchData(link, exerciseOptions);

    if (type == "search") {
      similarExercises = await filterSearch(similarExercises);
    }

    sessionStorage.setItem(
      `${
        type == "search" || type == "target" ? "target" : "equipment"
      }_${exercise}`,
      JSON.stringify(similarExercises)
    );
    setSimilarExercises(similarExercises);
  };

  useEffect(() => {
    if (exercise) {
      let inSession = sessionStorage.getItem(
        `${
          type == "search" || type == "target" ? "target" : "equipment"
        }_${exercise}`
      );
      if (type == "search" && inSession == null) {
        let inLocalStorage = localStorage.getItem("all_exercises");
        if (inLocalStorage != null) {
          if (new Date().getTime() > JSON.parse(inLocalStorage).expiry) {
            getSimilarExercises();
          } else {
            let exercisesLocal = JSON.parse(inLocalStorage);
            filterLocal(exercisesLocal.value);
          }
        } else {
          getSimilarExercises();
        }
      } else {
        if (inSession != null) {
          setSimilarExercises(JSON.parse(inSession));
        } else {
          getSimilarExercises();
        }
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
          : type == "search"
          ? `${exercise.toUpperCase().charAt(0) + exercise.slice(1)} Exercises`
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
