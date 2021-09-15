export const required = (value) => (value ? undefined : "Required");

const minLength = (min) => (value) =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const minLength6 = minLength(6);
