import { React, useEffect, useState } from "react";
import FullBodyFront from "../components/FullBodyFront";
import FullBodyBack from "../components/FullBodyBack";
import SwitchImage from "../assets/switch.png";
import { motion } from "framer-motion";
import "./MusclesPage.css";

const BodyPage = () => {
  const [musclesSelected, setMusclesSelected] = useState("");

  const [flipBody, setFlipBody] = useState(true);
  const [fullBody, setFullBody] = useState(false);

  function updateSize() {
    window.innerWidth >= 1025 ? setFullBody(true) : setFullBody(false);
  }

  useEffect(() => {
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      onAnimationStart={updateSize}
      exit={{ x: window.innerWidth, transition: { duration: 0.2 } }}
      className="musclesPage"
    >
      {fullBody ? (
        <>
          <FullBodyFront
            musclesSelected={musclesSelected}
            setMusclesSelected={setMusclesSelected}
          />
          <FullBodyBack />
        </>
      ) : flipBody ? (
        <>
          <FullBodyFront
            musclesSelected={musclesSelected}
            setMusclesSelected={setMusclesSelected}
          />
        </>
      ) : (
        <FullBodyBack />
      )}
      {!fullBody ? (
        <img
          onClick={() => setFlipBody((prev) => !prev)}
          className="flip"
          src={SwitchImage}
          alt="flip around image"
        />
      ) : (
        ""
      )}
      <div className="exercises">Select a muscle to show exercises</div>
    </motion.div>
  );
};

export default BodyPage;
