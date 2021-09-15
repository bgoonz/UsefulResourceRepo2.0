class MinHeap {
  constructor() {
    this.array = [null];
  }

  getParent(idx) {
    return Math.floor(idx / 2);
  }

  getLeftChild(idx) {
    return idx * 2
  }

  getRightChild(idx) {
    return idx * 2 + 1
  }

  insert(val) {
    this.array.push(val);
    this.siftUp(this.array.length - 1)
  }

  siftUp(idx) {
    if (idx === 1) return;
    let parentIdx = this.getParent(idx);
    if (this.array[parentIdx] > this.array[idx]) {
      [this.array[parentIdx], this.array[idx]] = [this.array[idx], this.array[parentIdx]]
      this.siftUp(parentIdx)
    }
  }

  deleteMin() {
    if (this.array.length === 2) return this.array.pop();
    if (this.array.length === 1) return null;

    let toDelete = this.array[1];
    this.array[1] = this.array.pop();

    this.siftDown(1);
    return toDelete
  }

  siftDown(idx) {
    let arr = this.array;
    let leftIdx = this.getLeftChild(idx);
    let rightIdx = this.getRightChild(idx);
    let left = arr[leftIdx];
    let right = arr[rightIdx];

    // if there are no children, set them equal to Infinity
    // allows us to keep heap property, as any value will be less than Infinity
    // will also give us children values to compare later
    if (leftVal === undefined) leftVal = Infinity;
    if (rightVal === undefined) rightVal = Infinity;

    if (arr[idx] < leftVal && arr[idx] < rightVal) return;

    let swapIdx;
    if (leftVal < rightVal) {
      swapIdx = leftVal
    } else {
      swapIdx = rightVal
    }
    [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]]

    this.siftDown(swapIdx)
  }
}

let minHeap = new MinHeap;
minHeap.insert(24)
minHeap.insert(66)
minHeap.insert(832)
minHeap.insert(33)
minHeap.insert(91)
minHeap.insert(12)
minHeap.insert(102)
minHeap.insert(76)
console.log(minHeap);
console.log(minHeap.array[minHeap.getLeftChild(4)]);
console.log(minHeap.array[minHeap.getRightChild(3)]);