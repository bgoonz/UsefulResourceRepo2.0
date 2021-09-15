// Binary Heap
// type of Binary tree, but it's NOT a Binary Search Tree
// partially ordered:
//    the root will be the maximum element (max heap) 
//      or the minimum(min heap)
// given any node, it's children must the smaller than or equal to it

// in order to implement a heap with efficient operations, you want to have
//    a balanced and complete tree:
// all levels have the maximal number of nodes, except the bottom level
// bottom level has nodes filled in from the left.

// insertion: O(log n)
// deletion: O(log n)

// to implement, simply use an array
// each index position is a node, but start at idx position 1.
// left child of node i => 2 * i
// right child of node i => 2 * i + 1
// the parent of node i => Math.floor(i / 2)

class MaxHeap {
  constructor() {
    this.array = [null];
  }

  getParent(idx) {
    return Math.floor(idx / 2);
  }

  getLeftChild(idx) {
    return idx * 2;
  }

  getRightChild(idx) {
    return idx * 2 + 1
  }

  insert(val) {
    this.array.push(val);
    this.siftUp(this.array.length - 1);
  }

  siftUp(idx) {
    if (idx === 1) return;
    let parentIdx = this.getParent(idx);
    if (this.array[parentIdx] < this.array[idx]) {
      [this.array[parentIdx], this.array[idx]] = [this.array[idx], this.array[parentIdx]]
      this.siftUp(parentIdx)
    }
  }

  deleteMax() {
    if (this.array.length === 2) return this.array.pop();
    if (this.array.length === 1) return null;

    let toDelete = this.array[1];
    this.array[1] = this.array.pop();

    this.siftDown(1);
    return toDelete;
  }

  siftDown(idx) {
    let arr = this.array;
    let leftIdx = this.getLeftChild(idx);
    let rightIdx = this.getRightChild(idx);
    let leftVal = arr[leftIdx];
    let rightVal = arr[rightIdx];

    // if there are no children, set them equal to neg Infinity
    // allows us to keep heap property, as any value will be greater than neg Infinity
    // will also give us children values to compare later
    if (leftVal === undefined) leftVal = -Infinity;
    if (rigthVal === undefined) rigthVal = -Infinity;

    if (arr[idx] > leftVal && arr[idx] > rightVal) return;

    let swapIdx;
    if (leftVal < rightVal) {
      swapIdx = rightIdx;
    } else {
      swapIdx = leftIdx
    }
    [arr[idx], arr[swapIdx]] = [arr[swapIdx], arr[idx]]

    this.siftDown(swapIdx)
  }
}

let maxHeap = new MaxHeap;
maxHeap.insert(24)
maxHeap.insert(66)
maxHeap.insert(832)
maxHeap.insert(33)
maxHeap.insert(91)
maxHeap.insert(12)
maxHeap.insert(102)
maxHeap.insert(76)
console.log(maxHeap);
console.log(maxHeap.array[maxHeap.getLeftChild(4)]);
console.log(maxHeap.array[maxHeap.getRightChild(3)]);

