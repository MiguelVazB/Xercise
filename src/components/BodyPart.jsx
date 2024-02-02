import React from "react";

const BodyPart = ({ part, selectedBodyPart, setSelectedBodyPart }) => {
  return (
    <div className="bodyPart" onClick={() => setSelectedBodyPart(part)}>
      <img
        src={`./bodyParts/${
          part == "lower arms" || part == "upper arms"
            ? "arm"
            : part == "lower legs" || part == "upper legs"
            ? "legs"
            : part
        }.png`}
      />
      <p>{part.charAt(0).toUpperCase() + part.slice(1)}</p>
    </div>
  );
};

export default BodyPart;
