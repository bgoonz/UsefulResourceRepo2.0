function mean(arr) {
  return (arr.reduce((a, b) => a + b)) / arr.length;
};

// console.log(mean([1, 2, 3, 4, 5]))
// console.log(mean([5, 5, 5, 5, 5]))

function median(arr) {
  let sorted = arr.sort((a, b) => a - b);
  if (arr.length % 2 !== 0) {
    return arr[Math.floor(arr.length / 2)];
  } else {
    let sum = arr[Math.floor(arr.length / 2)] + arr[Math.floor(arr.length / 2) - 1];
    return sum / 2;
  }
};

// console.log(median([5, 2, 3, 4, 1]))
// console.log(median([8, 2, 6, 4]))


// the mode is the number or numbers that appear the most often
// if all numbers appear the same number of times, there is no mode.
function findMode(arr) {
  let valMap = {};
  for (let i = 0; i < arr.length; i++) {
    if (!valMap[arr[i]]) {
      valMap[arr[i]] = 1;
    } else {
      valMap[arr[i]] += 1;
    }
  }

  let sorted = Object.values(valMap).sort((a, b) => b - a);
  let sortedSet = new Set(sorted);
  let modeExists = false;

  if ([...sortedSet].length > 1) {
    modeExists = true;
    mode = Object.keys(valMap).map(el => parseInt(el)).filter(key => valMap[key] === sorted[0]);
  }

  return modeExists ? mode : []
};

// console.log(findMode([1, 2, 3, 4, 4, 5, 5]))
// console.log(findMode([1, 1, 2, 2, 3, 3, 4, 4]))

function mode(array) {
  const table = {};
  array.forEach(value => (table[value] = table[value] + 1 || 1));

  let modes = [];
  let max = 0;
  for (const key in table) {
    const value = parseFloat(key);
    const count = table[key];
    if (count > max) {
      modes = [value];
      max = count;
    } else if (count === max) {
      modes.push(value);
      console.log(modes)
    }
  }

  if (modes.length === Object.keys(table).length) modes = [];

  return modes
}

console.log(mode([1, 2, 3, 4, 4, 5, 5]))
console.log(mode([1, 1, 2, 2, 3, 3, 4, 4]))