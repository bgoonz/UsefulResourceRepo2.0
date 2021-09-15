export const sameAs = (field, getValues) => (value) => {
  const compareTo = getValues()[field];
  return compareTo === value;
};
