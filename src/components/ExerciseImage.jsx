import { useEffect, useRef, useState } from "react";
import {
  getExerciseMediaUrl,
  isLegacyExerciseMedia,
  refreshExerciseMedia,
} from "../utils/exerciseMedia";

const ExerciseImage = ({
  exercise,
  alt,
  className = "",
  onLoad,
  ...imageProps
}) => {
  const onLoadRef = useRef(onLoad);
  onLoadRef.current = onLoad;
  const initialUrl = getExerciseMediaUrl(exercise);
  const [source, setSource] = useState(
    isLegacyExerciseMedia(initialUrl) ? "" : initialUrl
  );
  const [isUnavailable, setIsUnavailable] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    const nextUrl = getExerciseMediaUrl(exercise);

    setIsUnavailable(false);
    if (nextUrl && !isLegacyExerciseMedia(nextUrl)) {
      setSource(nextUrl);
      return () => {
        isSubscribed = false;
      };
    }

    setSource("");
    refreshExerciseMedia(exercise, nextUrl)
      .then((refreshedExercise) => {
        if (!isSubscribed) {
          return;
        }

        const refreshedUrl = getExerciseMediaUrl(refreshedExercise);
        if (refreshedUrl && refreshedUrl !== nextUrl) {
          setSource(refreshedUrl);
        } else {
          setIsUnavailable(true);
          onLoadRef.current?.();
        }
      })
      .catch(() => {
        if (isSubscribed) {
          setIsUnavailable(true);
          onLoadRef.current?.();
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [exercise, initialUrl]);

  const handleError = async () => {
    const failedUrl = source;
    setSource("");

    try {
      const refreshedExercise = await refreshExerciseMedia(
        exercise,
        failedUrl
      );
      const refreshedUrl = getExerciseMediaUrl(refreshedExercise);

      if (refreshedUrl && refreshedUrl !== failedUrl) {
        setSource(refreshedUrl);
      } else {
        setIsUnavailable(true);
        onLoad?.();
      }
    } catch {
      setIsUnavailable(true);
      onLoad?.();
    }
  };

  if (isUnavailable) {
    return (
      <div
        className={`exerciseMediaFallback ${className}`}
        role="img"
        aria-label={alt}
      >
        <span aria-hidden="true">Media unavailable</span>
      </div>
    );
  }

  if (!source) {
    return (
      <div
        className={`exerciseMediaFallback exerciseMediaLoading ${className}`}
        aria-hidden="true"
      ></div>
    );
  }

  return (
    <img
      {...imageProps}
      className={className}
      src={source}
      alt={alt}
      onLoad={onLoad}
      onError={handleError}
    />
  );
};

export default ExerciseImage;
