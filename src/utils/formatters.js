export const formatLabel = (value = "") =>
  String(value)
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

export const formatViews = (views) => Number(views || 0).toLocaleString();
