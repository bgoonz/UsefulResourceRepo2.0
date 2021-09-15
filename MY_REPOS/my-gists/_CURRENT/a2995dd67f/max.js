"use strict";

import forEach from "./forEach";

/**
 * Returns the maximum value from an iterable. It uses the optional callback
 * function to determine the value to compare.
 *
 * @param {Iterable} iterable
 * @param {function(?): ?} map
 * @return {?}
 */
export default function max(iterable, map) {
  let maxComparisonValue = -Infinity;
  let maxValue;

  forEach(iterable, (value) => {
    const comparisonValue = map ? map(value) : value;
    if (comparisonValue > maxComparisonValue) {
      maxComparisonValue = comparisonValue;
      maxValue = value;
    }
  });

  return maxValue;
}
