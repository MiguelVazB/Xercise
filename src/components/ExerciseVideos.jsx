import React from "react";
import { useState, useEffect } from "react";
import HorizontalScrollBar from "./HorizontalScrollBar";
import { videoOptions, fetchVideoData } from "../utils/fetchData";

const ExerciseVideos = ({ exerciseName }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [videoData, setVideoData] = useState([]);

  const getVideosData = async () => {
    if (exerciseName) {
      const videoData = await fetchVideoData(
        `https://youtube-v2.p.rapidapi.com/search/?query=${`${exerciseName} exercise`}&lang=en`,
        videoOptions
      );
      sessionStorage.setItem(
        `${exerciseName}_d`,
        JSON.stringify(videoData.videos)
      );
      setVideoData(videoData.videos);
    }
  };

  useEffect(() => {
    if (exerciseName) {
      let inSession = sessionStorage.getItem(`${exerciseName}_d`);
      if (inSession != null) {
        setVideoData(JSON.parse(inSession));
      } else {
        getVideosData();
      }
    }
  }, [exerciseName]);

  return (
    <div className="exerciseVideos">
      <div className="scrollHeading">Videos related to {exerciseName}</div>
      <div className="scrollBarContainer">
        <HorizontalScrollBar
          componentToDisplay="exerciseVideos"
          key={"exerciseVideosScrollBar"}
          data={videoData}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </div>
    </div>
  );
};

export default ExerciseVideos;
