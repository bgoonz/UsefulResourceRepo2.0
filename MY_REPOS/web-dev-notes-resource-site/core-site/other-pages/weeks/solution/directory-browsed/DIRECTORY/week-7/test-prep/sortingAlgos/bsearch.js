// ! There is several different ways to this

function recurBSearch(array, target) {
    // base case is if length = 0
    if (array.length === 0) return false;

    // defining variables
    // ! need var for midIdx, midEL
    const midIdx = Math.floor(array.length / 2);
    const midEl = array[midIdx];
    // ! need var for left and right half of array
    const rightHalf = array.slice(0, midIdx);
    const leftHalf = array.slice(midIdx + 1);
    
    if (target < midEl) return recurBSearch(leftHalf, target);
    if (target > midEl) return recurBSearch(rightHalf, target)
    else return true
}
console.log(recurBSearch(array = [12,23,3232,32,323,23,123,123,45,75,658,942,452,345,145254,], 452))