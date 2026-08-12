const RECENT_EXERCISES_KEY = "recentExercises";
const RECENT_EXERCISES_EVENT = "recentExercisesChanged";
const MAX_RECENT_EXERCISES = 8;

export const getRecentExercises = () => {
  try {
    const exercises = JSON.parse(
      localStorage.getItem(RECENT_EXERCISES_KEY) ?? "[]"
    );
    return Array.isArray(exercises)
      ? exercises.filter((exercise) => exercise?.id)
      : [];
  } catch {
    return [];
  }
};

const notifyRecentExercisesChanged = () => {
  window.dispatchEvent(new Event(RECENT_EXERCISES_EVENT));
};

export const recordRecentlyViewedExercise = (exercise) => {
  if (!exercise?.id) {
    return;
  }

  const exerciseId = String(exercise.id);
  const nextExercises = [
    exercise,
    ...getRecentExercises().filter(
      (recentExercise) => String(recentExercise.id) !== exerciseId
    ),
  ].slice(0, MAX_RECENT_EXERCISES);

  localStorage.setItem(RECENT_EXERCISES_KEY, JSON.stringify(nextExercises));
  notifyRecentExercisesChanged();
};

export const removeRecentExercise = (exerciseId) => {
  const normalizedId = String(exerciseId);
  const nextExercises = getRecentExercises().filter(
    (exercise) => String(exercise.id) !== normalizedId
  );

  localStorage.setItem(RECENT_EXERCISES_KEY, JSON.stringify(nextExercises));
  notifyRecentExercisesChanged();
};

export const clearRecentExercises = () => {
  localStorage.removeItem(RECENT_EXERCISES_KEY);
  notifyRecentExercisesChanged();
};

export const subscribeToRecentExercises = (listener) => {
  const handleStorage = (event) => {
    if (event.key === RECENT_EXERCISES_KEY) {
      listener();
    }
  };

  window.addEventListener(RECENT_EXERCISES_EVENT, listener);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(RECENT_EXERCISES_EVENT, listener);
    window.removeEventListener("storage", handleStorage);
  };
};
