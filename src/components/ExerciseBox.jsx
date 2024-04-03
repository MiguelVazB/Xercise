import { React, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ExerciseBox = ({ exercise }) => {
  const [loaded, setLoaded] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (loaded) {
      setImageLoading(false);
      setPulsing(false);
    }
  }, [loaded]);

  const handleClick = () => {
    navigate(`/exercises/${exercise.id}`, { state: exercise });
  };

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        className="exerciseBox"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ duration: 1.5, delay: 0.2 }}
        onClick={() => handleClick()}
      >
        {/* <div className="exerciseBox"> */}
        <div className={`imageContainer ${pulsing ? "pulse" : ""}`}>
          <motion.img
            initial={{ opacity: 0 }}
            animate={{
              opacity: imageLoading ? 0 : 1,
            }}
            transition={{
              opacity: { delay: 0, duration: 0.2 },
            }}
            style={loaded ? {} : { display: "none" }}
            onLoad={() => setLoaded(true)}
            src={exercise.gifUrl}
            alt={`${exercise.name} gif`}
            // loading="lazy"
          />
        </div>
        <div className="exerciseInfoContainer">
          <div className="musclesInvolved">
            {exercise.secondaryMuscles.map((muscle) => {
              return (
                <p key={`${muscle}${exercise.id}`}>
                  {muscle.charAt(0).toUpperCase() + muscle.slice(1)}
                </p>
              );
            })}
          </div>
          <p className="exerciseName">
            {exercise.name.charAt(0).toUpperCase() + exercise.name.slice(1)}
          </p>
        </div>
        {/* </div> */}
      </motion.div>
    </AnimatePresence>
  );
};

export default ExerciseBox;
