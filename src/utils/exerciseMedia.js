import { exerciseOptions, fetchData } from "./fetchData";

const LEGACY_MEDIA_HOST = "v2.exercisedb.io";
const MEDIA_INDEX_URL = `${import.meta.env.BASE_URL}exercise-media.json`;
const mediaRequests = new Map();
let mediaIndexRequest;

export const getExerciseMediaUrl = (exercise) =>
  exercise?.gifUrl ||
  exercise?.gifUrls?.["480p"] ||
  exercise?.gifUrls?.["360p"] ||
  exercise?.imageUrl ||
  exercise?.imageUrls?.["480p"] ||
  exercise?.imageUrls?.["360p"] ||
  "";

export const isLegacyExerciseMedia = (url) => {
  try {
    return new URL(url).hostname === LEGACY_MEDIA_HOST;
  } catch {
    return false;
  }
};

const updateStoredCollection = (key, updateExercise) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? "null");
    if (!Array.isArray(value)) {
      return;
    }

    localStorage.setItem(
      key,
      JSON.stringify(value.map((exercise) => updateExercise(exercise)))
    );
  } catch {
    // Invalid cached data is ignored and can be replaced on the next API load.
  }
};

const persistRefreshedExercise = (exercise) => {
  const exerciseId = String(exercise.id);
  const updateExercise = (currentExercise) =>
    String(currentExercise?.id) === exerciseId
      ? { ...currentExercise, ...exercise }
      : currentExercise;

  updateStoredCollection("savedExercises", updateExercise);
  updateStoredCollection("recentExercises", updateExercise);

  try {
    const workout = JSON.parse(localStorage.getItem("quickWorkout") ?? "[]");
    if (Array.isArray(workout)) {
      localStorage.setItem(
        "quickWorkout",
        JSON.stringify(
          workout.map((item) => ({
            ...item,
            exercise: updateExercise(item.exercise),
          }))
        )
      );
    }
  } catch {
    // Invalid workout data is handled by the workout storage utility.
  }

  sessionStorage.setItem(
    `exerciseID_${exerciseId}`,
    JSON.stringify(exercise)
  );
  sessionStorage.setItem(
    `exerciseMedia_${exerciseId}`,
    getExerciseMediaUrl(exercise)
  );
};

const normalizeExerciseName = (name = "") =>
  name.trim().toLocaleLowerCase().replace(/\s+/g, " ");

const getMediaIndex = () => {
  if (!mediaIndexRequest) {
    mediaIndexRequest = fetch(MEDIA_INDEX_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Media index request failed with ${response.status}`);
        }

        return response.json();
      })
      .catch(() => ({}));
  }

  return mediaIndexRequest;
};

const findStableExerciseMedia = async (exercise) => {
  const exerciseName = exercise?.name?.trim();
  if (!exerciseName) {
    return null;
  }

  const mediaIndex = await getMediaIndex();
  const mediaUrl = mediaIndex[normalizeExerciseName(exerciseName)];
  if (!mediaUrl) {
    return null;
  }

  return {
    ...exercise,
    gifUrl: mediaUrl,
  };
};

export const refreshExerciseMedia = async (exercise, failedUrl = "") => {
  if (!exercise?.id) {
    return null;
  }

  const exerciseId = String(exercise.id);
  const cachedUrl = sessionStorage.getItem(`exerciseMedia_${exerciseId}`);
  if (
    cachedUrl &&
    cachedUrl !== failedUrl &&
    !isLegacyExerciseMedia(cachedUrl)
  ) {
    return { ...exercise, gifUrl: cachedUrl };
  }

  if (!mediaRequests.has(exerciseId)) {
    const refreshFromApi = async () => {
      if (
        isLegacyExerciseMedia(failedUrl) ||
        isLegacyExerciseMedia(getExerciseMediaUrl(exercise))
      ) {
        return findStableExerciseMedia(exercise);
      }

      try {
        const refreshedExercise = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises/exercise/${encodeURIComponent(
            exerciseId
          )}`,
          exerciseOptions
        );
        const refreshedUrl = getExerciseMediaUrl(refreshedExercise);

        if (
          refreshedExercise?.id &&
          refreshedUrl &&
          refreshedUrl !== failedUrl &&
          !isLegacyExerciseMedia(refreshedUrl)
        ) {
          return { ...exercise, ...refreshedExercise };
        }
      } catch {
        // The same-origin media index below provides a key-free fallback.
      }

      return findStableExerciseMedia(exercise);
    };

    mediaRequests.set(
      exerciseId,
      refreshFromApi()
        .then((refreshedExercise) => {
          const refreshedUrl = getExerciseMediaUrl(refreshedExercise);
          if (!refreshedExercise?.id || !refreshedUrl) {
            return null;
          }

          persistRefreshedExercise(refreshedExercise);
          return refreshedExercise;
        })
        .finally(() => {
          mediaRequests.delete(exerciseId);
        })
    );
  }

  return mediaRequests.get(exerciseId);
};
