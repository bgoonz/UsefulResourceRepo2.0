export const get = async resource =>
  await (await fetch(`/api/${resource}`)).json()
