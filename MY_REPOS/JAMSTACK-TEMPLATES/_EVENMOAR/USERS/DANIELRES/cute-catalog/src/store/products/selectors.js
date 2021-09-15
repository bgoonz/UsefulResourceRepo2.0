export const selectProducts = ({ products: { items } }) =>
  Object.entries(items)
    .map(([k, v]) => ({ id: k, ...v }))
    .sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
