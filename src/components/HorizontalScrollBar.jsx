import React, { useContext } from "react";
import BodyPart from "./BodyPart";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import LeftArrowImg from "../assets/leftArrow.png";
import rightArrowImg from "../assets/rightArrow.png";

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
  data,
  selectedBodyPart,
  setSelectedBodyPart,
}) => {
  return (
    <ScrollMenu
      LeftArrow={leftArrow}
      RightArrow={rightArrow}
      className="horizontalScrollBar"
    >
      {data.map((item) => (
        <BodyPart
          key={item}
          part={item}
          setSelectedBodyPart={setSelectedBodyPart}
          selectedBodyPart={selectedBodyPart}
        />
      ))}
    </ScrollMenu>
  );
};

export default HorizontalScrollBar;
