export const isValidImage = (value) => {
  if (!value) return true;
  if (typeof value !== "string") return false;

  const validFormats = ["png", "jpeg", "jpg", "svg"];
  const extenstion = value.split(".").pop();
  return validFormats.includes(extenstion);
};

export const isValidUrl = (value) => {
  if (!value) return true;
  if (typeof value !== "string") return false;

  const exression =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
  const regex = new RegExp(exression);

  return value.match(regex) ? true : false;
};

export const sameAs = (getValues, field) => (value) => {
  if (!value) return true;
  if (typeof value !== "string") return false;
  debugger;

  const compareToValue = getValues()[field];
  return compareToValue === value;
};
