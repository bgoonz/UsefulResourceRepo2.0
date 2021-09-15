function getElByPropVal(arr, prop, val) {
  for (let i = 0, length = arr.length; i < length; i++) {
    if (arr[i][prop] === val) {
      return arr[i]
    }
  }
}

export { getElByPropVal }
