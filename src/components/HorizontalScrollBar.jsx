import { lazy, Suspense, useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import LeftArrowImg from "../assets/leftArrow.png";
import RightArrowImg from "../assets/rightArrow.png";
import BodyPart from "./BodyPart";
import ExerciseBox from "./ExerciseBox";

const VideoComponent = lazy(() => import("./VideoComponent"));

const ScrollArrow = ({ direction }) => {
  const { scrollNext, scrollPrev } = useContext(VisibilityContext);
  const isLeft = direction === "left";

  return (
    <button
      onClick={() => (isLeft ? scrollPrev() : scrollNext())}
      className={`iconButton ${isLeft ? "leftArrow" : "rightArrow"}`}
      aria-label={`Scroll ${direction}`}
      type="button"
    >
      <img
        src={isLeft ? LeftArrowImg : RightArrowImg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
    </button>
  );
};

const LeftArrow = () => <ScrollArrow direction="left" />;
const RightArrow = () => <ScrollArrow direction="right" />;

const HorizontalScrollBar = ({
  componentToDisplay,
  data = [],
  selectedItem,
  setSelectedItem,
}) => {
  const renderItems = () => {
    switch (componentToDisplay) {
      case "bodyPart":
        return data.map((part) => (
          <BodyPart
            key={part}
            part={part}
            selectedBodyPart={selectedItem}
            setSelectedBodyPart={setSelectedItem}
          />
        ));
      case "exerciseVideos":
        return data.map((video) => (
          <VideoComponent
            key={video.video_id ?? video.title}
            video={video}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ));
      case "exerciseBox":
        return data.map((exercise) => (
          <ExerciseBox key={exercise.id} exercise={exercise} />
        ));
      default:
        return null;
    }
  };

  return (
    <Suspense fallback={<div className="statusMessage">Loading content...</div>}>
      <ScrollMenu
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
        wrapperClassName="horizontalScrollBar"
      >
        {renderItems()}
      </ScrollMenu>
    </Suspense>
  );
};

export default HorizontalScrollBar;
