function extend(baseObj, append) {
  // Don't do anything if append isn't an object
  if (!append || typeof append !== 'object') return baseObj;

  var keys = Object.keys(append);
  var i = keys.length;
  while (i--) {
    baseObj[keys[i]] = append[keys[i]];
  }
  return baseObj;
}
