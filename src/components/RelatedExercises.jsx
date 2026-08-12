import { useEffect, useState } from "react";
import HorizontalScrollBar from "./HorizontalScrollBar";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import "./SimilarExercises.css";

const uniqueExercises = (exercises, currentExerciseId) => {
  const seenIds = new Set([currentExerciseId]);

  return (Array.isArray(exercises) ? exercises : []).filter((exercise) => {
    if (!exercise?.id || seenIds.has(exercise.id)) {
      return false;
    }

    seenIds.add(exercise.id);
    return true;
  });
};

const RelatedExercises = ({ target, equipment, currentExerciseId }) => {
  const [activeType, setActiveType] = useState("target");
  const [related, setRelated] = useState({ target: [], equipment: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryKey, setRetryKey] = useState(0);

  useEffect(() => {
    let isSubscribed = true;

    const loadCollection = async (type, value) => {
      const cacheKey = `related_${type}_${value}`;
      const cached = sessionStorage.getItem(cacheKey);

      if (cached) {
        try {
          return JSON.parse(cached);
        } catch {
          sessionStorage.removeItem(cacheKey);
        }
      }

      const response = await fetchData(
        `https://exercisedb.p.rapidapi.com/exercises/${type}/${encodeURIComponent(
          value
        )}?limit=12`,
        exerciseOptions
      );
      sessionStorage.setItem(cacheKey, JSON.stringify(response));
      return response;
    };

    const loadRelated = async () => {
      setIsLoading(true);
      setError("");

      const results = await Promise.allSettled([
        loadCollection("target", target),
        loadCollection("equipment", equipment),
      ]);

      if (!isSubscribed) {
        return;
      }

      const targetExercises =
        results[0].status === "fulfilled" ? results[0].value : [];
      const equipmentExercises =
        results[1].status === "fulfilled" ? results[1].value : [];

      setRelated({
        target: uniqueExercises(targetExercises, currentExerciseId),
        equipment: uniqueExercises(equipmentExercises, currentExerciseId),
      });

      if (results.every((result) => result.status === "rejected")) {
        setError("Related exercises are unavailable right now.");
      }

      setIsLoading(false);
    };

    loadRelated();

    return () => {
      isSubscribed = false;
    };
  }, [currentExerciseId, equipment, retryKey, target]);

  const visibleExercises = related[activeType] ?? [];

  return (
    <section
      className="similarExercises relatedExercises"
      id="related-exercises"
      aria-labelledby="related-exercises-heading"
    >
      <div className="relatedHeader">
        <div className="sectionHeader">
          <p className="sectionEyebrow">Keep exploring</p>
          <h2 className="scrollHeading" id="related-exercises-heading">
            Exercise alternatives
          </h2>
          <p className="similarSectionDescription">
            Switch between movements for the same primary muscle and options
            that use the same equipment.
          </p>
        </div>
        <div className="relatedTabs" role="tablist" aria-label="Alternative type">
          <button
            type="button"
            role="tab"
            aria-selected={activeType === "target"}
            className={activeType === "target" ? "isActive" : ""}
            onClick={() => setActiveType("target")}
          >
            Same muscle
            <span>{related.target.length}</span>
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeType === "equipment"}
            className={activeType === "equipment" ? "isActive" : ""}
            onClick={() => setActiveType("equipment")}
          >
            Same equipment
            <span>{related.equipment.length}</span>
          </button>
        </div>
      </div>

      <div className="scrollBarContainer" role="tabpanel">
        {isLoading ? (
          <div className="emptyState">Loading exercise alternatives...</div>
        ) : error ? (
          <div className="relatedError">
            <p>{error}</p>
            <button type="button" onClick={() => setRetryKey((key) => key + 1)}>
              Try again
            </button>
          </div>
        ) : visibleExercises.length > 0 ? (
          <HorizontalScrollBar
            componentToDisplay="exerciseBox"
            data={visibleExercises}
          />
        ) : (
          <div className="emptyState">
            No additional exercises were found for this filter.
          </div>
        )}
      </div>
    </section>
  );
};

export default RelatedExercises;
