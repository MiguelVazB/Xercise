import React from "react";

const VideoComponent = ({ video, selectedItem, setSelectedItem }) => {
  return (
    <div onClick={() => setSelectedItem(video)}>
      <p>{video}</p>
    </div>
  );
};

export default VideoComponent;
