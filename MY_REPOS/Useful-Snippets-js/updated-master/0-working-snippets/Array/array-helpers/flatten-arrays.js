let flatten;

flatten = array => {
  return array.reduce(
    (accum, ele) => {
      return accum.concat(Array.isArray(ele) ? flatten(ele) : ele);
    },
    []
  );
};
