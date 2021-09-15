const groupBy = (items, key) =>
  items.reduce(
    (result, item) => ({
      ...result,
      [item[key]]: [...(result[item[key]] || []), item],
    }),
    {}
  )

const getLength = obj => {
  const arr = Object.keys(obj).map(o => ({
    [o]: obj[o].length,
  }))
  return Object.assign({}, ...arr)
}

export { groupBy, getLength }
