import { formatLabel } from "../utils/formatters";

const getBodyPartImage = (part) => {
  if (part === "lower arms" || part === "upper arms") {
    return "arm";
  }

  if (part === "lower legs" || part === "upper legs") {
    return "legs";
  }

  return part;
};

const BodyPart = ({ part, selectedBodyPart, setSelectedBodyPart }) => (
  <button
    type="button"
    className={`bodyPart ${selectedBodyPart === part ? "categorySelected" : ""}`}
    onClick={() => setSelectedBodyPart(part)}
    aria-pressed={selectedBodyPart === part}
    aria-label={`Filter exercises by ${formatLabel(part)}`}
  >
    <img
      src={`./bodyParts/${getBodyPartImage(part)}.png`}
      alt=""
      aria-hidden="true"
      loading="lazy"
      decoding="async"
    />
    <p>{formatLabel(part)}</p>
  </button>
);

export default BodyPart;
