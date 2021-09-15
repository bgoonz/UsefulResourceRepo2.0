const search = (arr, target) => {
  for (let i = 0; i < arr.length; i++) {
    // console.log("i: ", i);
    // console.log("arr: ", arr);

    let curEle = arr[i];

    // console.log("curEle: ", curEle);

    if (curEle === target) {
      //   console.log("target: ", target);
      return true;
    }
  }
  return false;
};

//search([5, 10, 12, 15, 20, 30, 70], 12);
console.log(
  "search([5, 10, 12, 15, 20, 30, 70], 12): ",
  search([5, 10, 12, 15, 20, 30, 70], 12)
);

console.log(
  "search([5, 10, 12, 15, 20, 30, 70], 24): ",
  search([5, 10, 12, 15, 20, 30, 70], 24)
);

// search([5, 10, 12, 15, 20, 30, 70], 12):  true
// search([5, 10, 12, 15, 20, 30, 70], 24):  false
