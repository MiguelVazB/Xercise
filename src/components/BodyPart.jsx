import React from "react";

const BodyPart = ({ part, selectedBodyPart, setSelectedBodyPart }) => {
  return (
    <div className="bodyPart">
      <img
        src={`./public/bodyParts/${
          part == "lower arms" || part == "upper arms"
            ? "arm"
            : part == "lower legs" || part == "upper legs"
            ? "legs"
            : part
        }.png`}
      />
      <p>{part}</p>
    </div>
  );
};

export default BodyPart;
