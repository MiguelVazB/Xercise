import MainPic from "../assets/manExercising.webp";
import { Link } from "react-router-dom";

const HeroComponent = () => {
  return (
    <section className="heroComponent" aria-label="Hero section">
      <div className="heroGlow" aria-hidden="true"></div>
      <div className="heroContent">
        <p className="sectionEyebrow">Modern exercise discovery</p>
        <h1 className="homePageHook">
          <span className="brandName">Xercise</span>
          Build better sessions with a cleaner exercise library.
        </h1>
        <p className="tagline">
          Search movements by muscle group, equipment, and training goal, then
          dive into clear technique details and related variations.
        </p>
        <div className="heroActions">
          <Link
            to="/muscles"
            className="exploreBtn"
            aria-label="Explore all exercises organized by muscle groups"
          >
            Explore exercises
          </Link>
          <a href="#exercise-search" className="secondaryBtn">
            Search the library
          </a>
        </div>
        <div className="heroStats" aria-label="Xercise features">
          <div className="heroStat">
            <span>Muscle map</span>
            <strong>Front and back views</strong>
          </div>
          <div className="heroStat">
            <span>Exercise details</span>
            <strong>Targets, equipment, and steps</strong>
          </div>
          <div className="heroStat">
            <span>Video support</span>
            <strong>External walkthroughs on demand</strong>
          </div>
        </div>
      </div>
      <div className="heroVisual">
        <div className="heroCard heroCardPrimary">
          <div className="heroCardTop">
            <span className="heroCardLabel">Search flow</span>
            <span className="heroCardValue">By muscle</span>
          </div>
          <p>
            Jump from body-part filters to a focused exercise grid in a few
            taps.
          </p>
        </div>
        <div className="heroImageFrame">
          <img
            className="mainPic"
            src={MainPic}
            alt="Athletic person performing dumbbell renegade row exercise"
            width="1093"
            height="1062"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />
        </div>
        <div className="heroCard heroCardSecondary">
          <div className="heroCardTop">
            <span className="heroCardLabel">Detail pages</span>
            <span className="heroCardValue">Clear steps</span>
          </div>
          <p>
            Review instructions, equipment, and similar movements before you
            train.
          </p>
        </div>
      </div>
      <p className="backSlogan" aria-hidden="true">
        TRAIN SMARTER
      </p>
    </section>
  );
};

export default HeroComponent;
