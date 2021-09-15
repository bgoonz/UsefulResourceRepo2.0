const getNextItem = ({ items, currId }) => {
  const array = Object.values(items);
  const currIndex = array.findIndex((e) => e.id === currId);
  const nextItem = array[currIndex + 1] || array[0];
  return nextItem;
};

export default getNextItem;
