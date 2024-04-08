import React from "react";

const FullBodyFront = ({ musclesSelected, setMusclesSelected }) => {
  const handleClick = (e) => {
    let muscleGroup = e.target.parentElement;
    setMusclesSelected(muscleGroup.id);
  };

  return (
    <div className="bodyFront">
      <svg
        id="Map"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 278 538"
        // width={"100%"}
        height={"100%"}
        xmlSpace="preserve"
        stroke="white"
        // fill="white"
      >
        <g
          id="chest"
          className={musclesSelected == "chest" ? "muscleGroupSelected" : ""}
          onClick={handleClick}
        >
          <polygon
            id="Left_Pec_Mayoris"
            title=""
            points="144,116,142,149,159,156,183,150,190,130,169,116"
          />
          <polygon
            id="Right_Pec_Mayoris"
            title=""
            points="90,128,94,150,117,156,135,149,134,117,109,117"
          />
        </g>
        <g
          id="obliques"
          className={musclesSelected == "obliques" ? "muscleGroupSelected" : ""}
          onClick={handleClick}
        >
          <polygon
            id="Left_Oblique"
            title=""
            points="185,169,182,154,161,160,164,171,165,218,178,207,180,185"
          />
          <polygon
            id="Right_Oblique"
            title=""
            points="100,206,98,190,93,169,96,154,117,159,113,169,113,219"
          />
        </g>
        <g
          id="biceps"
          className={musclesSelected == "biceps" ? "muscleGroupSelected" : ""}
          onClick={handleClick}
        >
          <polygon
            id="Right_Biceps_Brachii_Long_Head"
            title=""
            points="58,181,61,189,73,176,88,146,85,135,67,151"
          />
          <polygon
            id="Left_Biceps_Brachii_Short_Head"
            title=""
            points="187,150,187,165,203,192,207,186,202,179"
          />
          <polygon
            id="Left_Biceps_Brachii_Long_Head"
            title=""
            points="192,135,189,148,204,176,217,190,220,183,210,150"
          />
          <polygon
            id="Right_Biceps_Brachii_Short_Head"
            title=""
            points="72,184,90,150,90,163,73,193"
          />
        </g>
        <g
          id="neck"
          className={musclesSelected == "neck" ? "muscleGroupSelected" : ""}
          onClick={handleClick}
        >
          <polygon
            id="Left_Neck"
            title=""
            points="153,72,141,96,141,110,168,112,190,124,187,104,172,100,160,89"
          />
          <polygon
            id="Right_Neck"
            title=""
            points="88,124,91,105,106,100,118,88,126,74,137,97,136,110,110,111"
          />
        </g>
        <g
          id="deltoids"
          className={musclesSelected == "deltoids" ? "muscleGroupSelected" : ""}
          onClick={handleClick}
        >
          <polygon
            id="Left_Deltoids_Front"
            title=""
            points="209,144,212,131,211,115,203,107,191,103,194,119,192,130"
          />
          <polygon
            id="Right_Deltoids_Front"
            title=""
            points="86,130,69,144,66,131,67,114,77,105,87,105,83,120"
          />
        </g>
        <polygon
          id="Head_Front"
          title=""
          points="121,21,115,43,120,62,130,71,139,76,151,69,158,61,162,39,157,20,139,14"
          stroke="none"
        />
        <polygon
          id="GROINS"
          title=""
          points="146,284,150,320,164,284,169,259,176,245,164,241,156,270"
          stroke="none"
        />
        <polygon
          id="GROINS"
          title=""
          points="134,285,127,321,120,298,116,291,114,277,110,265,102,244,114,240,119,257,124,272"
          stroke="none"
        />
        <g
          id="quads"
          className={musclesSelected == "quads" ? "muscleGroupSelected" : ""}
          onClick={handleClick}
        >
          <polygon
            id="QUADS"
            title=""
            points="102,256,108,279,108,327,101,350,93,339,89,308,86,287,89,261,96,246"
          />
          <polygon
            id="QUADS"
            title=""
            points="112,331,111,289,118,304,126,331,122,345,115,372,106,373,104,357"
          />
          <polygon
            id="QUADS"
            title=""
            points="97,353,82,371,80,349,80,326,83,294,89,341"
          />
          <polygon
            id="QUADS"
            title=""
            points="193,291,198,318,198,358,195,371,180,353,189,341"
          />
          <polygon
            id="QUADS"
            title=""
            points="172,273,175,259,181,246,189,262,191,288,184,340,177,351,170,329,169,287"
          />
          <polygon
            id="QUADS"
            title=""
            points="163,371,153,330,166,293,167,333,174,356,171,373"
          />
        </g>
        <polygon
          id="Right_Knee_Front"
          title=""
          points="100,357,102,365,104,375,106,384,103,398,90,398,84,388,84,375,91,367"
          stroke="none"
        />
        <g
          id="calves"
          className={musclesSelected == "calves" ? "muscleGroupSelected" : ""}
          onClick={handleClick}
        >
          <polygon
            id="Left_Tibialis_Anterior"
            title=""
            points="192,407,197,390,205,409,212,425,209,474,212,493,200,493"
          />
          <polygon
            id="Left_Shin"
            title=""
            points="195,492,188,404,177,402,174,412,174,419,178,448"
          />
          <polygon
            id="Right_Shin"
            title=""
            points="104,402,105,412,105,423,103,436,103,447,96,460,92,473,83,491,84,474,86,456,87,444,88,430,90,416,91,403"
          />
          <polygon
            id="Right_Tibialis_Anterior"
            title=""
            points="78,491,85,418,86,407,81,392,78,400,72,410,68,425,71,475,68,493"
          />
        </g>
        <g
          id="abs"
          className={musclesSelected == "abs" ? "muscleGroupSelected" : ""}
          onClick={handleClick}
        >
          <polygon
            id="Right_Rectus_Abdominis"
            title=""
            points="124,158,136,154,137,179,136,221,135,277,126,268,117,238,117,206,118,172"
          />
          <polygon
            id="Left_Rectus_Abdominis"
            title=""
            points="155,159,159,171,160,205,160,241,155,255,152,269,143,278,142,221,141,179,142,154"
          />
        </g>
        <g
          id="forearms"
          className={musclesSelected == "forearms" ? "muscleGroupSelected" : ""}
          onClick={handleClick}
        >
          <polygon
            id="Right_Brachioradialis"
            title=""
            points="32,231,42,198,53,186,57,196,64,194,28,253,17,259"
          />
          <polygon
            id="Left_Brachioradialis"
            title=""
            points="224,185,221,194,213,193,250,255,262,260,246,233,237,201"
          />
          <polygon
            id="Left_Flexor_Digitorum"
            title=""
            points="207,191,207,204,214,220,226,234,243,262,249,258"
          />

          <polygon
            id="Right_Flexor_Digitorum"
            title=""
            points="34,262,50,236,63,220,70,203,69,190,29,256"
          />
        </g>
        <polygon
          id="Left_Knee_Front"
          title=""
          points="178,357,194,376,194,387,188,399,176,398,171,384"
          stroke="none"
        />
      </svg>
    </div>
  );
};

export default FullBodyFront;
