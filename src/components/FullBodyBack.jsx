import React from "react";

const FullBodyBack = ({ musclesSelected, handleClick }) => {
  return (
    <div className="bodyBack">
      <svg
        id="Map"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="322 0 248 538"
        // width={"100%"}
        height={"95%"}
        xmlSpace="preserve"
        stroke="white"
        // fill="white"
      >
        <polygon
          id="Head_Back"
          title=""
          points="448,6,437,8,425,19,424,36,435,53,460,53,468,38,469,17,460,9"
          stroke="none"
        />
        <g
          id="upper back"
          className={
            musclesSelected == "upper back" ? "muscleGroupSelected" : ""
          }
          onClick={handleClick}
        >
          <polygon
            id="Left_Trapezius"
            title=""
            points="434,57,441,57,440,96,441,158,419,131,412,102,402,92,421,84,432,70"
          />
          <polygon
            id="Right_Trapezius"
            title=""
            points="452,57,460,57,462,70,472,83,491,92,481,101,474,131,452,158,454,96"
          />
          <polygon
            id="Left_Latissimus_Dorsi"
            title=""
            points="402,97,395,121,396,136,409,183,440,173,440,162,415,133,408,103"
          />
          <polygon
            id="Right_Latissimus_Dorsi"
            title=""
            points="491,97,498,122,497,138,484,183,453,173,453,162,478,134,485,104"
          />
        </g>
        <g
          id="shoulders"
          className={
            musclesSelected == "shoulders" ? "muscleGroupSelected" : ""
          }
          onClick={handleClick}
        >
          <polygon
            id="Left_Deltoids_Back"
            title=""
            points="398,93,383,98,370,110,372,132,386,122,393,115"
          />
          <polygon
            id="Right_Deltoids_Back"
            title=""
            points="496,93,513,99,523,111,521,132,505,121,499,112"
          />
        </g>
        <g
          id="triceps"
          className={musclesSelected == "triceps" ? "muscleGroupSelected" : ""}
          onClick={handleClick}
        >
          <polygon
            id="Left_Triceps_Lateral"
            title=""
            points="392,123,371,137,363,176,368,198,380,156,392,137"
          />
          <polygon
            id="Right_Triceps_Lateral"
            title=""
            points="502,124,522,137,531,178,525,199,512,154,501,137"
          />
          <polygon
            id="Left_Triceps_Medial"
            title=""
            points="393,143,383,158,375,188,384,183,393,168"
          />
          <polygon
            id="Right_Triceps_Medial"
            title=""
            points="500,143,510,158,518,188,509,183,500,168"
          />
        </g>
        <g
          id="lower back"
          className={
            musclesSelected == "lower back" ? "muscleGroupSelected" : ""
          }
          onClick={handleClick}
        >
          <polygon
            id="Left_Erector_Spinae"
            title=""
            points="441,177,410,187,412,202,445,246,439,201"
          />
          <polygon
            id="Right_Erector_Spinae"
            title=""
            points="452,177,483,187,481,202,448,246,454,203"
          />
        </g>
        <g
          id="forearms"
          className={musclesSelected == "forearms" ? "muscleGroupSelected" : ""}
          onClick={handleClick}
        >
          <polygon
            id="Right_Extensor_Digitorum"
            title=""
            points="532,184,543,202,548,227,564,256,555,251,536,216,527,203"
          />
          <polygon
            id="Right_Flexor_Carpi"
            title=""
            points="520,193,511,189,515,205,543,250,548,262,551,252"
          />
          <polygon
            id="Left_Extensor_Digitorum"
            title=""
            points="361,184,350,203,345,226,329,256,338,251,358,214,366,201"
          />
          <polygon
            id="Right_Flexor_Carpi"
            title=""
            points="373,193,381,189,378,204,351,248,345,261,341,252"
          />
        </g>
        <g
          id="glutes"
          className={musclesSelected == "glutes" ? "muscleGroupSelected" : ""}
          onClick={handleClick}
        >
          <polygon
            id="GLUTES"
            title=""
            points="434,240,400,261,399,285,403,302,440,291,445,276"
          />
          <polygon
            id="GLUTES"
            title=""
            points="459,239,449,275,452,290,489,302,493,286,492,261"
          />
        </g>
        <polygon
          id="GROINS"
          title=""
          points="442,295,434,295,426,301,435,345,443,325,444,310"
          stroke="none"
        />
        <polygon
          id="GROINS"
          title=""
          points="451,294,460,296,468,302,458,345,451,326,449,310"
          stroke="none"
        />
        <g
          id="hamstrings"
          className={
            musclesSelected == "hamstrings" ? "muscleGroupSelected" : ""
          }
          onClick={handleClick}
        >
          <polygon
            id="HAMSTRINGS"
            title=""
            points="397,293,402,310,415,302,412,324,410,359,398,378,397,351,394,338,393,315"
          />
          <polygon
            id="HAMSTRINGS"
            title=""
            points="497,292,492,309,479,302,483,327,485,359,496,378,497,353,500,340,502,316"
          />
          <polygon
            id="HAMSTRINGS"
            title=""
            points="420,301,433,349,424,398,414,365,416,324"
          />
          <polygon
            id="HAMSTRINGS"
            title=""
            points="474,301,478,326,480,366,470,398,461,350"
          />
        </g>
        <polygon
          id="Left_Knee_Back"
          title=""
          points="410,366,402,380,408,397,417,388"
          stroke="none"
        />
        <polygon
          id="Right_Knee_Back"
          title=""
          points="485,367,477,389,486,397,492,380"
          stroke="none"
        />
        <g
          id="calves"
          className={musclesSelected == "calves" ? "muscleGroupSelected" : ""}
          onClick={handleClick}
        >
          <polygon
            id="CALVES"
            title=""
            points="398,383,396,399,387,428,385,459,389,469,396,460,399,429,404,408,404,398"
          />
          <polygon
            id="CALVES"
            title=""
            points="417,394,412,400,407,410,402,430,400,457,409,476,420,454,421,403"
          />
          <polygon
            id="CALVES"
            title=""
            points="477,394,473,402,474,454,485,475,495,457,491,428,486,406"
          />
          <polygon
            id="CALVES"
            title=""
            points="495,383,499,402,507,427,509,459,504,468,499,461,495,428,489,401"
          />
        </g>
        <polygon
          id="CALVES"
          title=""
          points="396,466,400,466,408,480,401,523,396,508,392,472"
          stroke="none"
        />
        <polygon
          id="CALVES"
          title=""
          points="493,466,498,466,502,472,498,507,494,522,487,481"
          stroke="none"
        />
        <polygon
          id="PERONEALS"
          title=""
          points="390,484,395,521,390,528,387,518"
          stroke="none"
        />
        <polygon
          id="PERONEALS"
          title=""
          points="504,482,499,521,503,528,508,517"
          stroke="none"
        />
      </svg>
    </div>
  );
};

export default FullBodyBack;
