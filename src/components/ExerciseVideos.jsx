import { useEffect, useState } from "react";
import HorizontalScrollBar from "./HorizontalScrollBar";
import { fetchData, videoOptions } from "../utils/fetchData";
import { formatLabel } from "../utils/formatters";

const ExerciseVideos = ({ exerciseName }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [videoData, setVideoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let isSubscribed = true;

    const loadVideos = async () => {
      if (!exerciseName) {
        return;
      }

      setIsLoading(true);
      setError("");
      const storageKey = `${exerciseName}_d`;
      const cachedVideos = sessionStorage.getItem(storageKey);

      if (cachedVideos) {
        try {
          const parsedVideos = JSON.parse(cachedVideos);
          if (isSubscribed) {
            setVideoData(Array.isArray(parsedVideos) ? parsedVideos : []);
            setIsLoading(false);
          }
          return;
        } catch {
          sessionStorage.removeItem(storageKey);
        }
      }

      try {
        const videoResponse = await fetchData(
          `https://youtube-v2.p.rapidapi.com/search/?query=${encodeURIComponent(
            `${exerciseName} exercise`
          )}&lang=en`,
          videoOptions
        );
        const videos = (videoResponse?.videos ?? []).slice(0, 12);

        if (isSubscribed) {
          sessionStorage.setItem(storageKey, JSON.stringify(videos));
          setVideoData(videos);
        }
      } catch (loadError) {
        console.error("Error loading videos:", loadError);
        if (isSubscribed) {
          setVideoData([]);
          setError("Video walkthroughs are unavailable right now.");
        }
      } finally {
        if (isSubscribed) {
          setIsLoading(false);
        }
      }
    };

    loadVideos();

    return () => {
      isSubscribed = false;
    };
  }, [exerciseName, retryKey]);

  return (
    <section
      className="exerciseVideos"
      id="exercise-videos"
      aria-labelledby="exercise-videos-heading"
    >
      <div className="sectionHeader">
        <p className="sectionEyebrow">Video walkthroughs</p>
        <h2 className="scrollHeading" id="exercise-videos-heading">
          See {formatLabel(exerciseName)} in action
        </h2>
        <p className="videoSectionDescription">
          Open a video in a new tab for additional coaching cues and movement
          breakdowns. Videos are provided by external creators.
        </p>
      </div>
      <div className="scrollBarContainer">
        {isLoading ? (
          <div className="emptyState">Loading recommended videos...</div>
        ) : error ? (
          <div className="videoError">
            <p>{error}</p>
            <button type="button" onClick={() => setRetryKey((key) => key + 1)}>
              Try again
            </button>
          </div>
        ) : videoData.length > 0 ? (
          <HorizontalScrollBar
            componentToDisplay="exerciseVideos"
            key="exerciseVideosScrollBar"
            data={videoData}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ) : (
          <div className="emptyState">
            No video walkthroughs were found for this exercise.
          </div>
        )}
      </div>
    </section>
  );
};

export default ExerciseVideos;
