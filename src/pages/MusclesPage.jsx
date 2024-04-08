import { React, useEffect, useState, useLayoutEffect } from "react";
import FullBodyFront from "../components/FullBodyFront";
import FullBodyBack from "../components/FullBodyBack";
import "./MusclesPage.css";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

const BodyPage = () => {
  const [width, height] = useWindowSize();

  return (
    <div className="musclesPage">
      {/* <svg
        id="Map"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 578 538"
        width={"100%"}
        height={"98%"}
        xmlSpace="preserve"
        stroke="white"
        // fill="white"
      > */}
      <FullBodyFront />
      {/* <FullBodyBack /> */}
      {/* </svg> */}
    </div>
  );
};

export default BodyPage;
