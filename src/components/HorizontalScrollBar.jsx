import React from "react";
import BodyPart from "./BodyPart";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import LeftArrow from "../assets/leftArrow.png";
import rightArrow from "../assets/rightArrow.png";

const HorizontalScrollBar = ({
  data,
  selectedBodyPart,
  setSelectedBodyPart,
}) => {
  return (
    <div className="horMenuContainer">
      <img src={LeftArrow} className="leftArrow" />
      <ScrollMenu className="horizontalScrollBar">
        {data.map((item) => (
          <BodyPart
            key={item}
            part={item}
            setSelectedBodyPart={setSelectedBodyPart}
            selectedBodyPart={selectedBodyPart}
          />
        ))}
      </ScrollMenu>
      <img src={rightArrow} className="rightArrow" />
    </div>
  );
};

export default HorizontalScrollBar;
