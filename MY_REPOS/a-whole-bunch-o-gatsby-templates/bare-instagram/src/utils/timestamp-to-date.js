export const timestampToDate = (timestamp) =>
  new Date(timestamp * 1000).toLocaleDateString(`de-DE`)
