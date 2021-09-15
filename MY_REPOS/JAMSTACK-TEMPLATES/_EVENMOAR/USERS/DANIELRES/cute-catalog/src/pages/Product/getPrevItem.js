const getPrevItem = ({ items, currId }) => {
  const array = Object.values(items);
  const currIndex = array.findIndex((e) => e.id === currId);
  const prevItem = array[currIndex - 1] || array[array.length - 1];
  return prevItem;
};

export default getPrevItem;
