import React from "react";

const VideoComponent = ({ video, selectedItem, setSelectedItem }) => {
  const formatViews = (views) => {
    return Number(views).toLocaleString();
  };

  return (
    <div
      className={`videoComponentContainer ${
        video == selectedItem ? "selectedContainer" : ""
      }`}
      onClick={() => {
        setSelectedItem(video.title);
        window.open(
          `https://www.youtube.com/watch?v=${video.video_id}`,
          "_blank"
        );
        // .focus();
      }}
    >
      <div className="thumbnail">
        <img
          className="thumbnailImg"
          alt={`${video?.title} video`}
          src={video.thumbnails[0].url}
        />
        <div className="length">{video.video_length}</div>
      </div>
      <div className="videoInfo">
        <p className="videoTitle">{video?.title}</p>
        <div className="channelAndViewsContainer">
          <p className="videoChannel">{video?.author}</p>
          <p className="videoViews">
            {formatViews(video.number_of_views)} views
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoComponent;
