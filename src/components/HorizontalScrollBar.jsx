import React, { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import BodyPart from "./BodyPart";
import LeftArrowImg from "../assets/leftArrow.png";
import rightArrowImg from "../assets/rightArrow.png";
import VideoComponent from "./VideoComponent";

const leftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <img
      src={LeftArrowImg}
      className="leftArrow"
      onClick={() => scrollPrev()}
    />
  );
};

const rightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <img
      src={rightArrowImg}
      className="rightArrow"
      onClick={() => scrollNext()}
    />
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
      default:
        break;
    }
  };

  return (
    <ScrollMenu
      LeftArrow={leftArrow}
      RightArrow={rightArrow}
      className="horizontalScrollBar"
    >
      {componentsInScroll()}
    </ScrollMenu>
  );
};

export default HorizontalScrollBar;
