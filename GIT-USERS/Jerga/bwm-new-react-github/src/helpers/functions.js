export const capitalize = (value) => {
  if (!value || typeof value !== "string") {
    return "";
  }

  // San Francisco
  return value
    .split(" ") // ['san', 'francisco']
    .map((word) => word[0].toUpperCase() + word.slice(1)) // ['San', 'Francisco']
    .join(" "); // San Francisco
};
