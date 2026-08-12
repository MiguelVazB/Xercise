import { formatViews } from "../utils/formatters";

const VideoComponent = ({ video, selectedItem, setSelectedItem }) => {
  const videoUrl = `https://www.youtube.com/watch?v=${video.video_id}`;

  return (
    <a
      className={`videoComponentContainer ${
        video.title === selectedItem ? "selectedContainer" : ""
      }`}
      href={videoUrl}
      target="_blank"
      rel="noreferrer"
      onClick={() => setSelectedItem(video.title)}
      aria-label={`Open ${video.title} on YouTube`}
    >
      <div className="thumbnail">
        <img
          className="thumbnailImg"
          alt=""
          src={video.thumbnails?.[0]?.url}
          loading="lazy"
          decoding="async"
        />
        <div className="length">{video.video_length}</div>
      </div>
      <div className="videoInfo">
        <p className="videoTitle">{video.title}</p>
        <div className="channelAndViewsContainer">
          <p className="videoChannel">{video.author}</p>
          <p className="videoViews">
            {formatViews(video.number_of_views)} views
          </p>
        </div>
      </div>
    </a>
  );
};

export default VideoComponent;
