// TODO: Test me.
export const numberToIndex = (num: void | number, size: number, clamp: boolean = false): number => {
  if (typeof num === 'undefined') {
    return size - 1;
  } else if (num < 0) {
    return size + num;
  } else if (num < size || !clamp) {
    return num;
  } else {
    return size - 1;
  }
};
