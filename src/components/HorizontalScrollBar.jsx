import React from "react";
import BodyPart from "./BodyPart";

const HorizontalScrollBar = ({ data }) => {
  return (
    <div className="horizontalScrollBar">
      {data.map((item) => (
        <BodyPart part={item} />
      ))}
    </div>
  );
};

export default HorizontalScrollBar;
