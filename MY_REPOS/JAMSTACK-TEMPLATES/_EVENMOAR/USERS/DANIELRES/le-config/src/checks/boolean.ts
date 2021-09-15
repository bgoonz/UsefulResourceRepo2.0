type BooleanCheck = [
  (v: string | boolean) => boolean | undefined,
  (v: boolean | undefined) => boolean,
  string
];

export const boolean: BooleanCheck = [
  (v) => {
    if (v === true) return true;
    if (v === false) return false;
    if (v === "true") return true;
    if (v === "false") return false;
    return undefined;
  },
  (v) => v === true || v === false,
  "should be a boolean",
];
