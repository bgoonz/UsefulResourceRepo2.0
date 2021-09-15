export const add = (entries) =>
  Object.entries(entries).map(
    ([k, v]: [string, string]) => (process.env[k] = v)
  );

export const del = (entries) =>
  Object.entries(entries).map(([k]) => delete process.env[k]);
