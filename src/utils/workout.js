const WORKOUT_KEY = "quickWorkout";
const WORKOUT_EVENT = "quickWorkoutChanged";
const DEFAULT_SETS = 3;
const DEFAULT_REPS = 10;

const notifyWorkoutChanged = () => {
  window.dispatchEvent(new Event(WORKOUT_EVENT));
};

export const getWorkoutItems = () => {
  try {
    const items = JSON.parse(localStorage.getItem(WORKOUT_KEY) ?? "[]");
    return Array.isArray(items)
      ? items.filter((item) => item?.exercise?.id)
      : [];
  } catch {
    return [];
  }
};

export const isExerciseInWorkout = (exerciseId) =>
  getWorkoutItems().some(
    (item) => String(item.exercise.id) === String(exerciseId)
  );

export const addExerciseToWorkout = (exercise) => {
  if (!exercise?.id || isExerciseInWorkout(exercise.id)) {
    return;
  }

  const nextItems = [
    ...getWorkoutItems(),
    {
      exercise,
      sets: DEFAULT_SETS,
      reps: DEFAULT_REPS,
      completed: false,
    },
  ];

  localStorage.setItem(WORKOUT_KEY, JSON.stringify(nextItems));
  notifyWorkoutChanged();
};

export const removeExerciseFromWorkout = (exerciseId) => {
  const normalizedId = String(exerciseId);
  const nextItems = getWorkoutItems().filter(
    (item) => String(item.exercise.id) !== normalizedId
  );

  localStorage.setItem(WORKOUT_KEY, JSON.stringify(nextItems));
  notifyWorkoutChanged();
};

export const updateWorkoutItem = (exerciseId, updates) => {
  const normalizedId = String(exerciseId);
  const nextItems = getWorkoutItems().map((item) =>
    String(item.exercise.id) === normalizedId
      ? { ...item, ...updates }
      : item
  );

  localStorage.setItem(WORKOUT_KEY, JSON.stringify(nextItems));
  notifyWorkoutChanged();
};

export const resetWorkoutProgress = () => {
  const nextItems = getWorkoutItems().map((item) => ({
    ...item,
    completed: false,
  }));

  localStorage.setItem(WORKOUT_KEY, JSON.stringify(nextItems));
  notifyWorkoutChanged();
};

export const clearWorkout = () => {
  localStorage.removeItem(WORKOUT_KEY);
  notifyWorkoutChanged();
};

export const subscribeToWorkout = (listener) => {
  const handleStorage = (event) => {
    if (event.key === WORKOUT_KEY) {
      listener();
    }
  };

  window.addEventListener(WORKOUT_EVENT, listener);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(WORKOUT_EVENT, listener);
    window.removeEventListener("storage", handleStorage);
  };
};
