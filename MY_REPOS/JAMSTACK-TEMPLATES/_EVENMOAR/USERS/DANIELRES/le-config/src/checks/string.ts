type StringCheck = [
  (v: string | undefined) => string | undefined,
  (v: string | undefined) => boolean,
  string
];

const converter = (v) => v;

export const string: StringCheck = [
  converter,
  (v) => typeof v === "string",
  "should be a string",
];

export const min = (min: number): StringCheck => [
  converter,
  (v) => typeof v === "string" && min <= v.length,
  `should be a string ≥ ${min}`,
];

export const max = (max: number): StringCheck => [
  converter,
  (v) => typeof v === "string" && v.length <= max,
  `should be a string ≤ ${max}`,
];

export const within = (min: number, max: number): StringCheck => [
  converter,
  (v) => typeof v === "string" && min <= v.length && v.length <= max,
  `should be a string of length ≥ ${min} and ≤ ${max}`,
];

export const regexp = (regexp: RegExp): StringCheck => [
  converter,
  (v) => typeof v === "string" && regexp.test(v),
  `should be a string satisfying ${regexp}`,
];
