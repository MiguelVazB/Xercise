const SAVED_IDS_KEY = "savedExerciseIds";
const SAVED_EXERCISES_KEY = "savedExercises";
const SAVED_EXERCISES_EVENT = "savedExercisesChanged";

const readArray = (key) => {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? "[]");
    return Array.isArray(value) ? value : [];
  } catch {
    return [];
  }
};

const normalizeIds = (ids) =>
  [...new Set(ids.filter(Boolean).map((id) => String(id)))];

const notifySavedExercisesChanged = () => {
  window.dispatchEvent(
    new CustomEvent(SAVED_EXERCISES_EVENT, {
      detail: { ids: getSavedExerciseIds() },
    })
  );
};

export const getSavedExerciseIds = () =>
  normalizeIds(readArray(SAVED_IDS_KEY));

export const getSavedExerciseSnapshots = () =>
  readArray(SAVED_EXERCISES_KEY).filter((exercise) => exercise?.id);

export const isExerciseSaved = (exerciseId) =>
  getSavedExerciseIds().includes(String(exerciseId));

export const saveExercise = (exercise) => {
  if (!exercise?.id) {
    return;
  }

  const exerciseId = String(exercise.id);
  const nextIds = [
    exerciseId,
    ...getSavedExerciseIds().filter((id) => id !== exerciseId),
  ];
  const nextSnapshots = [
    exercise,
    ...getSavedExerciseSnapshots().filter(
      (savedExercise) => String(savedExercise.id) !== exerciseId
    ),
  ];

  localStorage.setItem(SAVED_IDS_KEY, JSON.stringify(nextIds));
  localStorage.setItem(SAVED_EXERCISES_KEY, JSON.stringify(nextSnapshots));
  notifySavedExercisesChanged();
};

export const removeSavedExercise = (exerciseId) => {
  const normalizedId = String(exerciseId);
  const nextIds = getSavedExerciseIds().filter((id) => id !== normalizedId);
  const nextSnapshots = getSavedExerciseSnapshots().filter(
    (exercise) => String(exercise.id) !== normalizedId
  );

  localStorage.setItem(SAVED_IDS_KEY, JSON.stringify(nextIds));
  localStorage.setItem(SAVED_EXERCISES_KEY, JSON.stringify(nextSnapshots));
  notifySavedExercisesChanged();
};

export const cacheSavedExerciseSnapshots = (exercises) => {
  const savedIds = new Set(getSavedExerciseIds());
  const currentSnapshots = getSavedExerciseSnapshots();
  const snapshotMap = new Map(
    currentSnapshots.map((exercise) => [String(exercise.id), exercise])
  );

  exercises.forEach((exercise) => {
    if (exercise?.id && savedIds.has(String(exercise.id))) {
      snapshotMap.set(String(exercise.id), exercise);
    }
  });

  localStorage.setItem(
    SAVED_EXERCISES_KEY,
    JSON.stringify(
      [...snapshotMap.values()].filter((exercise) =>
        savedIds.has(String(exercise.id))
      )
    )
  );
};

export const clearSavedExercises = () => {
  localStorage.removeItem(SAVED_IDS_KEY);
  localStorage.removeItem(SAVED_EXERCISES_KEY);
  notifySavedExercisesChanged();
};

export const subscribeToSavedExercises = (listener) => {
  const handleStorage = (event) => {
    if (event.key === SAVED_IDS_KEY || event.key === SAVED_EXERCISES_KEY) {
      listener();
    }
  };

  window.addEventListener(SAVED_EXERCISES_EVENT, listener);
  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener(SAVED_EXERCISES_EVENT, listener);
    window.removeEventListener("storage", handleStorage);
  };
};
