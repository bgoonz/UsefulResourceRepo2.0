type IntCheck = [
  (v: string) => number | undefined,
  (v: number | undefined) => boolean,
  string
];

export const int: IntCheck = [
  (v) => (v ? Number(v) : undefined),
  (v) => Number.isInteger(v),
  "should be an integer",
];

export const min = (min: number): IntCheck => [
  (v) => (v ? Number(v) : undefined),
  (v) => Number.isInteger(v) && min <= v,
  `should be an integer ≥ ${min}`,
];

export const within = (min: number, max: number): IntCheck => [
  (v) => (v ? Number(v) : undefined),
  (v) => Number.isInteger(v) && min <= v && v <= max,
  `should be an integer within ${min} and ${max}`,
];

export const port = (min: number = 1025, max: number = 65534): IntCheck =>
  within(min, max);
