"use strict";

// A binary search tree must have everything to the left of a node being less than the node and vice versa to the right.
//For a binary heap structure this is not the case but the parent must always be greater than or equal to it's children nodes.
//Binary heap is less ordered than binary search tree but the heap can perform faster than the more well ordered binary search tree.
//Any complete tree is also balanced, and every level except the last level are complete.// If there are not children nodes filled as left most as possible, it may be balanced but it is not complete.
//! Inserting data into the heap:
//- 42,32,24,100,50,27
//* heap is initial empty.
//                                                     42
//  32 must be to the left of 42--->         32                  24  <-------- want to put as far left as possible and make sure it does not break heap property
// breaks the heap: //!              100
//-------------------------------------------so we must swap 32 with 100---------
//                                                     42
//  breaks the heap//!:                         100                  24  <-------- want to put as far left as possible and make sure it does not break heap property
//                             32
//------------------But 100 is still greater than new parent of 42 so we must swap again:----------------------------------
//^                                                     100
//  32 must be to the left of 42--->         42                  24  <-------- want to put as far left as possible and make sure it does not break heap property
//                            32
//----------------------------------------------------------------------------------------------------------------------------------
//^                                                     100
//                                             50                  24 
//                                       32        42            27
//*****************************Heap Implementation************************************************************** */
//* 2020-09-25-13-52-48.png
//* 2020-09-25-13-55-23.png
//class MaxHeap {
//    constructor() {
//        this.array = ( null ); //*  with the null:
//        //- value left child is idx * 2 ; 
//        //- right child is idx * 2 +1
//        //- 2020-09-25-13-57-35.png .... null acts as the zeroth index
//    }
//    insert( val ) {
//        this.siftUp( this.array.length - 1 );
//    }
//    //! total build time : O(n *log(n))\
//    //!insertion and deltition are O(log(n))
//    //!traverse through every node O(n)
//    //*    [null,100,50,27,32,42,24]
//    siftUp( idx ) {
//        if ( idx === 1 ) return;
//        let parentIdx = Math.floor( idx / 2 );
//        if ( this.array[ idx ] > this.array[ parentIdx ] ) {
//            [ this.array[ idx ], this.array[ parentIdx ] ] = [ this.array[ parentIdx ], this.array[ idx ] ]
//            this.siftUp( parentIdx );
//        }
//    }
//    deleteMax() {
//        const max = this.store[ 1 ];
//        this.store[ 1 ] = this.store.pop();
//        this.siftDown( 1 );
//        return max;
//    }
//    siftDown( idx ) {
//        const li = this.store;
//        const curVal = li[ idx ]; //current parent
//        const leftChild = idx * 2;
//        const rightChild = idx * 2 + 1;
//        let leftVal = li[ leftChild ]; //left child
//        let rightVal = li[ rightChild ]; //right child
//        //need to set to -Infinity to make sure there is a comparison value
//        if ( leftVal === undefined ) leftVal = -Infinity;
//        if ( rightVal === undefined ) rightVal = -Infinity;
//        //- is parent larger than both children... then pick a swap index... and pick the larger of the two...
//        //50>27... swap index is left child index
//        if ( curVal > leftVal && curVal > rightVal ) return; //
//        let swapIdx;
//        //*    [null,100,50,27,32,42,24]
//        if ( leftVal > rightVal ) {
//            swapIdx = leftChild;
//        } else {
//            swapIdx = rightChild;
//        }
//    }
//}
//let heap = new MaxHeap();
//heap.insert( 42 );
//heap.insert( 32 );
//heap.insert( 24 );
//---------------------------------------Heap Sort-----------------------------------------
//-- want to apply heapify on elements of array... so we need to apply heapify to children nodes before we apply it to their parents...
//* )----->Iterate from right to left
function heapSort(array) {
  for (var i = array.length - 1; i >= 0; i--) {
    //-call heapify and pass in the length of the array and the same i that represents the current node... we are heapifying sub trees that make up the 
    heapify(array, array.length, i);
  }

  for (var endOfHeap = array.length - 1; endOfHeap >= 0; endOfHeap--) {
    swap(array, endOfHeap, 0);
    heapify(array, endOfHeap, 0);
  }

  console.log(array);
  return array;
}

function heapify(array, n, i) {
  //array is same as this.array; i is same as i; n will denote where heap ends and sorted part of array begins.
  //In the above siftDown:
  //        const leftChild = idx * 2;
  //        const rightChild = idx * 2 + 1;
  //-here root of heap is at index 0
  //
  var leftIdx = 2 * i + 1;
  var rightIdx = 2 * i + 2;
  var leftVal = array[leftIdx];
  var rightVal = array[rightIdx]; //if leftChild or rightchild index lie outside of the heap.... set to neg infinity so can do safe comparison

  if (leftIdx >= n) leftVal = -Infinity;
  if (rightIdx >= n) rightVal = -Infinity; //* if current node already has maxHeap value relative to it's children nodes.

  if (array[i] > leftVal && array[i] > rightVal) return;
  var swapIdx;

  if (leftVal < rightVal) {
    swapIdx = rightIdx;
  } else {
    swapIdx = leftIdx;
  }

  swap(array, i, swapIdx);
  heapify(array, n, swapIdx);
}

function swap(array, i, j) {
  var _ref = [array[j], array[i]];
  array[i] = _ref[0];
  array[j] = _ref[1];
}

var array = [7, 9, 6, 10, 20, 4, 8, 21];
heapSort(array);
/*
[
    4, 6, 7, 8,
    9, 10, 20, 21
]


 */