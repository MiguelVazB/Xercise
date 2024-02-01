import React from "react";
import BodyPart from "./BodyPart";

const HorizontalScrollBar = ({
  data,
  selectedBodyPart,
  setSelectedBodyPart,
}) => {
  return (
    <div className="horizontalScrollBar">
      {data.map((item) => (
        <BodyPart
          key={item}
          part={item}
          setSelectedBodyPart={setSelectedBodyPart}
          selectedBodyPart={selectedBodyPart}
        />
      ))}
    </div>
  );
};

export default HorizontalScrollBar;
