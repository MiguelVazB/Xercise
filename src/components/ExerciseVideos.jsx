import React from "react";
import { useState, useEffect } from "react";
import HorizontalScrollBar from "./HorizontalScrollBar";
import { videoOptions, fetchVideoData } from "../utils/fetchData";

const ExerciseVideos = ({ exercise }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [videoData, setVideoData] = useState([]);

  const getVideosData = async () => {
    if (exercise.name) {
      const videoData = await fetchVideoData(
        `https://youtube-v2.p.rapidapi.com/search/?query=${`${exercise.name} exercise`}&lang=en`,
        videoOptions
      );
      sessionStorage.setItem(
        `${exercise.name}_d`,
        JSON.stringify(videoData.videos)
      );
      setVideoData(videoData.videos);
    }
  };

  useEffect(() => {
    if (exercise?.name) {
      let inSession = sessionStorage.getItem(`${exercise?.name}_d`);
      if (inSession != null) {
        setVideoData(JSON.parse(inSession));
        console.log("loaded videos from session");
      } else {
        getVideosData();
        console.log("fetched videos");
      }
    }
  }, [exercise]);

  return (
    <div className="exerciseVideos">
      <div className="videosHeading">Videos related to {exercise?.name}</div>
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
