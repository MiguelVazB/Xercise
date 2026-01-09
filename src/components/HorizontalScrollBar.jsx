import React, { useContext, lazy, Suspense } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import BodyPart from "./BodyPart";
import LeftArrowImg from "../assets/leftArrow.png";
import rightArrowImg from "../assets/rightArrow.png";
import ExerciseBox from "./ExerciseBox";
const VideoComponent = lazy(() => import("./VideoComponent"));

const leftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <button
      onClick={() => scrollPrev()}
      className="leftArrow"
      aria-label="Scroll left"
      type="button"
      style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
    >
      <img
        src={LeftArrowImg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
    </button>
  );
};

const rightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <button
      onClick={() => scrollNext()}
      className="rightArrow"
      aria-label="Scroll right"
      type="button"
      style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0 }}
    >
      <img
        src={rightArrowImg}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />
    </button>
  );
};

const HorizontalScrollBar = ({
  componentToDisplay,
  data,
  selectedItem,
  setSelectedItem,
}) => {
  const componentsInScroll = () => {
    switch (componentToDisplay) {
      case "bodyPart":
        return data?.map((item) => (
          <BodyPart
            key={item}
            part={item}
            setSelectedBodyPart={setSelectedItem}
            selectedBodyPart={selectedItem}
          />
        ));
      case "exerciseVideos":
        return data?.map((item) => (
          <VideoComponent
            key={item.title}
            video={item}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem}
          />
        ));
      case "exerciseBox":
        return data?.map((item) => (
          <ExerciseBox key={item.id} exercise={item} />
        ));
      default:
        break;
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ScrollMenu
        LeftArrow={leftArrow}
        RightArrow={rightArrow}
        className="horizontalScrollBar"
      >
        {componentsInScroll()}
      </ScrollMenu>
    </Suspense>
  );
};

export default HorizontalScrollBar;
