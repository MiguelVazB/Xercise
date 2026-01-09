import React from "react";

const BodyPart = ({ part, selectedBodyPart, setSelectedBodyPart }) => {
  return (
    <div
      className={`bodyPart ${
        selectedBodyPart == part ? "categorySelected" : ""
      }`}
      onClick={() => setSelectedBodyPart(part)}
    >
      <img
        src={`./bodyParts/${
          part == "lower arms" || part == "upper arms"
            ? "arm"
            : part == "lower legs" || part == "upper legs"
            ? "legs"
            : part
        }.png`}
        alt={`${part} body part icon`}
        loading="lazy"
        decoding="async"
      />
      <p>{part.charAt(0).toUpperCase() + part.slice(1)}</p>
    </div>
  );
};

export default BodyPart;
