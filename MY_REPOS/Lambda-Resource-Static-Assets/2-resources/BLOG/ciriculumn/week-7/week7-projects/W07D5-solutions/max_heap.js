class MaxHeap {
  constructor() {
    this.array = [null];
  }

  getParentIdx(idx) {
    return Math.floor(idx / 2);
  }

  getLeftChildIdx(idx) {
    return idx * 2;
  }

  getRightChildIdx(idx) {
    return idx * 2 + 1;
  }

  insert(val) {
    this.array.push(val);
    this.siftUp(this.array.length - 1);
  }

  siftUp(idx) {
    if (idx === 1) return;

    let parentIdx = this.getParentIdx(idx);

    if (this.array[parentIdx] < this.array[idx]) {
      [this.array[parentIdx], this.array[idx]] = [this.array[idx], this.array[parentIdx]];
      this.siftUp(parentIdx);
    }
  }

  deleteMax() {
    if (this.array.length === 1) return null; 
    if (this.array.length === 2) return this.array.pop();

    let max = this.array[1];
    this.array[1] = this.array.pop();
    this.siftDown(1);
    return max;
  }

  siftDown(idx) {
    let ary = this.array;
    let leftIdx = this.getLeftChildIdx(idx);
    let rightIdx = this.getRightChildIdx(idx);
    let leftVal = ary[leftIdx];
    let rightVal = ary[rightIdx];

    if (leftVal === undefined) leftVal = -Infinity;
    if (rightVal === undefined) rightVal = -Infinity;

    //the element is already in the right place
    if (ary[idx] > leftVal && ary[idx] > rightVal) return;

    let swapIdx;
    swapIdx = leftVal > rightVal ? leftChild : rightChild;

    [ary[idx], ary[swapIdx]] = [ary[swapIdx], ary[idx]];
    this.siftDown(swapIdx);
  }
}

module.exports = {
  MaxHeap
};
