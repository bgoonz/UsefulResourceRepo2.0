function commonPrefix(strings) {
  if (strings.length === 1) {
    return strings[0];
  }
  const sorted = ArrayPrototypeSort(ArrayPrototypeSlice(strings));
  const min = sorted[0];
  const max = sorted[sorted.length - 1];
  for (let i = 0; i < min.length; i++) {
    if (min[i] !== max[i]) {
      return StringPrototypeSlice(min, 0, i);
    }
  }
  return min;
}
