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

  useEffect(() => {
    const handleResize = () => {
      window.innerWidth >= 1024 ? setFullBody(true) : setFullBody(false);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
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
