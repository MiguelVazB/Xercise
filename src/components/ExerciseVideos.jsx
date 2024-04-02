import React from "react";
import { useState, useEffect } from "react";
import HorizontalScrollBar from "./HorizontalScrollBar";

const ExerciseVideos = ({ exercise, exerciseId }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <HorizontalScrollBar
      componentToDisplay="exerciseVideos"
      data={["hi", "hi", "hi", "hi", "hi"]}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
    />
  );
};

export default ExerciseVideos;
