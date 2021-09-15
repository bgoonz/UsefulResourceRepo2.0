# Heaps (W7D5) - Learning Objectives

## Heaps

1. What is a max (or min) heap?
    - A tree that has partially ordered nodes.
    - A heap must be a complete tree.
    - Each parent is greater than its children in a max heap, or less than them in a min heap.
    - Overall, the root is then either the maximum or minimum value of all of the nodes.

2. How is a binary heap different from a binary search tree?
    - Both represent trees with parents that have a maximum of two children.
    - The order of children is important in a BST. The left is less than the parent and the right is greater than the parent.
    - The only stipulation in a binary heap is that the parent is greater than (max heap) or less than (min heap) the children. There is no distinction between what must go left vs. right other than maintining a complete tree.

3. What is a complete tree? How does it relate to heaps?
    - A complete tree is balanced, with the bottom row having nodes as far left as possible.
    - This consequently means there are no gaps in the tree.
    - Heaps must be complete trees. This lends to an easy representation using basic JavaScript.

4. What is a commmon way to represent heaps in JavaScript?
    - We can use an array. Since there are no gaps in the heap, we can add elements to an array and they will represent the next valid position to be filled in the heap.

    ```javascript
    /*

                40
            /      \
          32          24
        /    \       /   \
      30      9    20     18
      /  \  
    2    7 

    */

    // our heap: [null, 40, 32, 24, 30,  9, 20, 18,  2,  7]
    //  indices: [   0,  1,  2,  3,  4,  5,  6,  7,  8,  9]
    ```

    - We typically use a `null` at index 0 because it allows for simpler calculations of child/parent indices, but this is not a strict requirement.

5. In this representation, how can we find any particular node's parent or children?
    - The left child of an element at index i is going to be at index (2 * i)
    - The right child of an element at index i is going to be at index (2 * i + 1)
    - Working backwards, the parent of an element at index i is at index Math.floor(i / 2)

6. What processes do we need to follow when we insert an element into a heap?
    - To maintain the heap structure, we insert it as far left as possible, then sift the newly inserted value up if necessary until it reaches an appropriate position. This sifting would be necessary if we are currently larger than our parent in a max heap, or smaller in a min heap.
    - When considering an array format, this would mean we can simply push our new element onto the end of the array, then compare our value with our parentIdx's value until a swap does not occur.
    - From our max_heap project:

    ```javascript
    insert(val) {
      this.array.push(val);
      this.siftUp(this.array.length - 1);
    }

    siftUp(idx) {
      // If we are already the root, we cannot sift up further
      if (idx === 1) return;

      let parentIdx = this.getParent(idx);

      // If our value is greater than our parents, swap, then call siftUp again
      // on the new location to see if we need to do further swaps.
      if (this.array[parentIdx] < this.array[idx]) {
        [ this.array[parentIdx], this.array[idx] ] = [ this.array[idx], this.array[parentIdx] ];
        this.siftUp(parentIdx);
      }
    }
    ```

7. What processes do we need to follow when we remove then root of a heap?
    - To maintain the heap structure, we replace our root with the node that is as far left as possible, then sift the newly replaced value down if necessary until it reaches an appropriate position. This sifting would be necessary if we are currently smaller than either child in a max heap, or greater in a min heap.
    - When considering an array format, this would mean we can pop our last element off of the array, then replace `array[1]` with this value (we hold on to the replaced value to return at the end of our algorithm). We compare our value with each childIdx's value until a swap does not occur.
    - From our max_heap project:

    ```javascript
    deleteMax() {
      // Since our first element is `null` we take the element at index 1.
      // We want to keep null in the array if there are no other elements,
      // which is why we are returning null instead of popping for a length of 1.
      if (this.array.length === 2) return this.array.pop();
      if (this.array.length === 1) return null;

      // Since we're overwriting our index 1, we keep a reference to its value
      // so that we can return it later.
      let max = this.array[1];
      // We reassign the root of our heap to be the last element in our array.
      // Using .pop() removes that element from the end for us as well.
      this.array[1] = this.array.pop();
      // We check to see if the element that took our root's spot needs to be
      // sifted down into an appropriate position.
      this.siftDown(1);
      // After our sifting is done, our heap has been reorganize into a valid
      // configuration. We can now return the value that we originally removed.
      return max;
    }

    siftDown(idx) {
      let ary = this.array;
      let leftIdx = this.getLeftChild(idx);
      let rightIdx = this.getRightChild(idx);
      let leftVal = ary[leftIdx];
      let rightVal = ary[rightIdx];

      // If we do not have a child, leftVal or rightVal would be `undefined`.
      // We can't perform comparisons to `undefined` so we reassign them to be
      // -Infinity, which will always result in our value being greater, indicating
      // we are in a correct position (we can't sift down when we're already a leaf)
      if (leftVal === undefined) leftVal = -Infinity;
      if (rightVal === undefined) rightVal = -Infinity;

      // If we are greater than both of our children, we are in our final spot.
      if (ary[idx] > leftVal && ary[idx] > rightVal) return;

      // If one of our children is greater, we made it past the previous conditional.
      // We determine which child is greater, then assign that index as the the
      // one that we need to swap with.
      let swapIdx;
      if (leftVal < rightVal) {
        swapIdx = rightIdx;
      } else {
        swapIdx = leftIdx;
      }

      // We swap our current element with our largest child.
      [ ary[idx], ary[swapIdx] ] = [ ary[swapIdx], ary[idx] ];
      // We invoke siftDown again with the new index to see if we need to sift further.
      this.siftDown(swapIdx);
    }
    ```

8. Given an array, determine if it represents a max (or min) heap.
    - For the array to represent a max heap, it would need to be complete (no `undefined` values, which would indicate a gap) and each parent would have to be greater than its children.
    - We can recursively call our function to see if each node is greater than its children.
    - Reference the is_heap problem for code example
