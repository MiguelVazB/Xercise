import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../assets/XerciseLogo_transparent.png";
import {
  getSavedExerciseIds,
  subscribeToSavedExercises,
} from "../utils/savedExercises";
import { getWorkoutItems, subscribeToWorkout } from "../utils/workout";
import "./NavBar.css";

const NavBar = () => {
  const location = useLocation();
  const lastScrollPosition = useRef(0);
  const [isHidden, setIsHidden] = useState(false);
  const [savedCount, setSavedCount] = useState(
    () => getSavedExerciseIds().length
  );
  const [workoutCount, setWorkoutCount] = useState(
    () => getWorkoutItems().length
  );

  useEffect(() => {
    lastScrollPosition.current = window.scrollY;
    setIsHidden(false);

    const handleScroll = () => {
      const currentScrollPosition = Math.max(window.scrollY, 0);
      const scrollDifference =
        currentScrollPosition - lastScrollPosition.current;

      if (currentScrollPosition < 80) {
        setIsHidden(false);
      } else if (scrollDifference > 8) {
        setIsHidden(true);
      } else if (scrollDifference < -8) {
        setIsHidden(false);
      }

      if (Math.abs(scrollDifference) > 8) {
        lastScrollPosition.current = currentScrollPosition;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(
    () =>
      subscribeToSavedExercises(() =>
        setSavedCount(getSavedExerciseIds().length)
      ),
    []
  );

  useEffect(
    () =>
      subscribeToWorkout(() => setWorkoutCount(getWorkoutItems().length)),
    []
  );

  return (
    <nav
      className={`siteNav ${isHidden ? "navHidden" : ""}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <Link to="/" className="logoContainer" aria-label="Xercise home">
        <img
          src={Logo}
          alt="Xercise Logo"
          width="180"
          height="66"
          loading="eager"
          decoding="async"
        />
        <span className="brandSubtext">Training library</span>
      </Link>
      <div className="navLinks">
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="/muscles">Muscles</NavLink>
        <NavLink to="/saved">
          Saved
          {savedCount > 0 ? (
            <span className="navSavedCount" aria-label={`${savedCount} saved`}>
              {savedCount > 99 ? "99+" : savedCount}
            </span>
          ) : null}
        </NavLink>
        <NavLink to="/workout">
          Workout
          {workoutCount > 0 ? (
            <span
              className="navSavedCount"
              aria-label={`${workoutCount} exercises in workout`}
            >
              {workoutCount > 99 ? "99+" : workoutCount}
            </span>
          ) : null}
        </NavLink>
      </div>
      <Link to="/workout" className="navCta">
        Quick Workout
      </Link>
    </nav>
  );
};

export default NavBar;
