// you may assume that the array will always have a null element at the 0-th index

function isMaxHeap(array) {
    // check if the tree is complete, i.e. there are no gaps like [null, 50, undefined, 20]
    let isComplete = array.every(el => el !== undefined);
    return isComplete && _isMaxHeap(array);
}

function _isMaxHeap(array, idx=1) {
    if (array[idx] === undefined) return true;
    let leftIdx = 2 * idx;
    let rightIdx = 2 * idx + 1;
    let leftVal = array[leftIdx] === undefined ? -Infinity : array[leftIdx];
    let rightVal = array[rightIdx] === undefined ? -Infinity : array[rightIdx];
    return array[idx] > leftVal && array[idx] > rightVal 
        && _isMaxHeap(array, leftIdx) && _isMaxHeap(array, rightIdx);
}


module.exports = {
    isMaxHeap
};