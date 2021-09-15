# Heap Examples

{% tabs %}
{% tab title="Python" %}
```python
"""
Binary Heap. A min heap is a complete binary tree where each node is smaller than
its children. The root, therefore, is the minimum element in the tree. The min
heap uses an array to represent the data and operation. For example a min heap:

     4
   /   \
  50    7
 / \   /
55 90 87

Heap [0, 4, 50, 7, 55, 90, 87]

Method in class: insert, remove_min
For example insert(2) in a min heap:

     4                     4                     2
   /   \                 /   \                 /   \
  50    7      -->     50     2       -->     50    4
 / \   /  \           /  \   / \             /  \  /  \
55 90 87   2         55  90 87  7           55  90 87  7

For example remove_min() in a min heap:

     4                     87                    7
   /   \                 /   \                 /   \
  50    7      -->     50     7       -->     50    87
 / \   /              /  \                   /  \
55 90 87             55  90                 55  90

"""
from abc import ABCMeta, abstractmethod


class AbstractHeap(metaclass=ABCMeta):
    """Abstract Class for Binary Heap."""

    def __init__(self):
        pass

    @abstractmethod
    def perc_up(self, i):
        pass

    @abstractmethod
    def insert(self, val):
        pass

    @abstractmethod
    def perc_down(self, i):
        pass

    @abstractmethod
    def min_child(self, i):
        pass

    @abstractmethod
    def remove_min(self):
        pass


class BinaryHeap(AbstractHeap):
    def __init__(self):
        self.currentSize = 0
        self.heap = [(0)]

    def perc_up(self, i):
        while i // 2 > 0:
            if self.heap[i] < self.heap[i // 2]:
                # Swap value of child with value of its parent
                self.heap[i], self.heap[i // 2] = self.heap[i // 2], self.heap[i]
            i = i // 2

    """
        Method insert always start by inserting the element at the bottom.
        It inserts rightmost spot so as to maintain the complete tree property.
        Then, it fixes the tree by swapping the new element with its parent,
        until it finds an appropriate spot for the element. It essentially
        perc_up the minimum element
        Complexity: O(logN)
    """

    def insert(self, val):
        self.heap.append(val)
        self.currentSize = self.currentSize + 1
        self.perc_up(self.currentSize)

    """
        Method min_child returns the index of smaller of 2 children of parent at index i
    """

    def min_child(self, i):
        if 2 * i + 1 > self.currentSize:  # No right child
            return 2 * i
        else:
            # left child > right child
            if self.heap[2 * i] > self.heap[2 * i + 1]:
                return 2 * i + 1
            else:
                return 2 * i

    def perc_down(self, i):
        while 2 * i < self.currentSize:
            min_child = self.min_child(i)
            if self.heap[min_child] < self.heap[i]:
                # Swap min child with parent
                self.heap[min_child], self.heap[i] = self.heap[i], self.heap[min_child]
            i = min_child

    """
        Remove Min method removes the minimum element and swap it with the last
        element in the heap( the bottommost, rightmost element). Then, it
        perc_down this element, swapping it with one of its children until the
        min heap property is restored
        Complexity: O(logN)
    """

    def remove_min(self):
        ret = self.heap[1]  # the smallest value at beginning
        self.heap[1] = self.heap[self.currentSize]  # Replace it by the last value
        self.currentSize = self.currentSize - 1
        self.heap.pop()
        self.perc_down(1)
        return ret

from .binary_heap import *
from .skyline import *
from .sliding_window_max import *
from .merge_sorted_k_lists import *
from .k_closest_points import *

"""Given a list of points, find the k closest to the origin.

Idea: Maintain a max heap of k elements.
We can iterate through all points.
If a point p has a smaller distance to the origin than the top element of a heap, we add point p to the heap and remove the top element.
After iterating through all points, our heap contains the k closest points to the origin.
"""


from heapq import heapify, heappushpop


def k_closest(points, k, origin=(0, 0)):
    # Time: O(k+(n-k)logk)
    # Space: O(k)
    """Initialize max heap with first k points.
    Python does not support a max heap; thus we can use the default min heap where the keys (distance) are negated.
    """
    heap = [(-distance(p, origin), p) for p in points[:k]]
    heapify(heap)

    """
    For every point p in points[k:],
    check if p is smaller than the root of the max heap;
    if it is, add p to heap and remove root. Reheapify.
    """
    for p in points[k:]:
        d = distance(p, origin)

        heappushpop(heap, (-d, p))  # heappushpop does conditional check
        """Same as:
            if d < -heap[0][0]:
                heappush(heap, (-d,p))
                heappop(heap)

        Note: heappushpop is more efficient than separate push and pop calls.
        Each heappushpop call takes O(logk) time.
        """

    return [p for nd, p in heap]  # return points in heap


def distance(point, origin=(0, 0)):
    return (point[0] - origin[0]) ** 2 + (point[1] - origin[1]) ** 2

"""
Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.
"""


from heapq import heappop, heapreplace, heapify
from queue import PriorityQueue


# Definition for singly-linked list.
class ListNode(object):
    def __init__(self, x):
        self.val = x
        self.next = None


def merge_k_lists(lists):
    dummy = node = ListNode(0)
    h = [(n.val, n) for n in lists if n]
    heapify(h)
    while h:
        v, n = h[0]
        if n.next is None:
            heappop(h)  # only change heap size when necessary
        else:
            heapreplace(h, (n.next.val, n.next))
        node.next = n
        node = node.next

    return dummy.next


def merge_k_lists(lists):
    dummy = ListNode(None)
    curr = dummy
    q = PriorityQueue()
    for node in lists:
        if node:
            q.put((node.val, node))
    while not q.empty():
        curr.next = q.get()[1]  # These two lines seem to
        curr = curr.next  # be equivalent to :-   curr = q.get()[1]
        if curr.next:
            q.put((curr.next.val, curr.next))
    return dummy.next


"""
I think my code's complexity is also O(nlogk) and not using heap or priority queue,
n means the total elements and k means the size of list.

The mergeTwoLists function in my code comes from the problem Merge Two Sorted Lists
whose complexity obviously is O(n), n is the sum of length of l1 and l2.

To put it simpler, assume the k is 2^x, So the progress of combination is like a full binary tree,
from bottom to top. So on every level of tree, the combination complexity is n,
because every level have all n numbers without repetition.
The level of tree is x, ie log k. So the complexity is O(n log k).

for example, 8 ListNode, and the length of every ListNode is x1, x2,
x3, x4, x5, x6, x7, x8, total is n.

on level 3: x1+x2, x3+x4, x5+x6, x7+x8 sum: n

on level 2: x1+x2+x3+x4, x5+x6+x7+x8 sum: n

on level 1: x1+x2+x3+x4+x5+x6+x7+x8 sum: n
"""

# -*- coding: utf-8 -*-
"""
A city's skyline is the outer contour of the silhouette formed by all the buildings
in that city when viewed from a distance.
Now suppose you are given the locations and height of all the buildings
as shown on a cityscape photo (Figure A),
write a program to output the skyline formed by these buildings collectively (Figure B).

The geometric information of each building is represented by a triplet of integers [Li, Ri, Hi],
where Li and Ri are the x coordinates of the left and right edge of the ith building, respectively,
and Hi is its height. It is guaranteed that 0 ≤ Li, Ri ≤ INT_MAX, 0 < Hi ≤ INT_MAX, and Ri - Li > 0.
You may assume all buildings are perfect rectangles grounded on an absolutely flat surface at height 0.

For instance, the dimensions of all buildings in Figure A are recorded as:
[ [2 9 10], [3 7 15], [5 12 12], [15 20 10], [19 24 8] ] .

The output is a list of "key points" (red dots in Figure B) in the format of
[ [x1,y1], [x2, y2], [x3, y3], ... ]
that uniquely defines a skyline.
A key point is the left endpoint of a horizontal line segment. Note that the last key point,
where the rightmost building ends,
is merely used to mark the termination of the skyline, and always has zero height.
Also, the ground in between any two adjacent buildings should be considered part of the skyline contour.

For instance, the skyline in Figure B should be represented as:[ [2 10], [3 15], [7 12], [12 0], [15 10], [20 8], [24, 0] ].

Notes:

The number of buildings in any input list is guaranteed to be in the range [0, 10000].
The input list is already sorted in ascending order by the left x position Li.
The output list must be sorted by the x position.
There must be no consecutive horizontal lines of equal height in the output skyline. For instance,
[...[2 3], [4 5], [7 5], [11 5], [12 7]...] is not acceptable; the three lines of height 5 should be merged
into one in the final output as such: [...[2 3], [4 5], [12 7], ...]

"""
import heapq


def get_skyline(lrh):
    """
    Wortst Time Complexity: O(NlogN)
    :type buildings: List[List[int]]
    :rtype: List[List[int]]
    """
    skyline, live = [], []
    i, n = 0, len(lrh)
    while i < n or live:
        if not live or i < n and lrh[i][0] <= -live[0][1]:
            x = lrh[i][0]
            while i < n and lrh[i][0] == x:
                heapq.heappush(live, (-lrh[i][2], -lrh[i][1]))
                i += 1
        else:
            x = -live[0][1]
            while live and -live[0][1] <= x:
                heapq.heappop(live)
        height = len(live) and -live[0][0]
        if not skyline or height != skyline[-1][1]:
            skyline += ([x, height],)
    return skyline

"""
Given an array nums, there is a sliding window of size k
which is moving from the very left of the array to the very right.
You can only see the k numbers in the window.
Each time the sliding window moves right by one position.

For example,
Given nums = [1,3,-1,-3,5,3,6,7], and k = 3.

Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7
Therefore, return the max sliding window as [3,3,5,5,6,7].
"""
import collections


def max_sliding_window(nums, k):
    """
    :type nums: List[int]
    :type k: int
    :rtype: List[int]
    """
    if not nums:
        return nums
    queue = collections.deque()
    res = []
    for num in nums:
        if len(queue) < k:
            queue.append(num)
        else:
            res.append(max(queue))
            queue.popleft()
            queue.append(num)
    res.append(max(queue))
    return res


```
{% endtab %}

{% tab title="Heaps Explained " %}


A binary heap is a special data structure that resembles a binary tree. It differs in the sense that the root of any subtree should be the smallest or the largest element.

There are two main types of heaps.

* **Minheap** – In a minheap, the root of every subtree is the smallest element.
* **Maxheap** – In a maxheap, the root of every subtree is the largest element.

In this article, let’s take a look at heaps and dive into programming heaps in Python.

For more background on the different types of data structures in Python, check out the following articles:

* [Introduction to Data Structures](https://www.section.io/data-structures-python-part-1/)
* [List](https://www.section.io/list-data-structure-python/)
* [Stack](https://www.section.io/stack-data-structure-python/)
* [Queue](https://www.section.io/queue-data-structure-python/)
* [Linked Lists](https://www.section.io/linked-list-data-structure-python/)
* [Binary Trees](https://www.section.io/binary-tree-data-structure-python/)

_Note: Prerequisites – Make sure you have basic Python knowledge before diving into this article. It also might be a good idea to check out some linear data structures. \(links are given above\)_

#### Table of Contents <a id="table-of-contents"></a>

* [Heaps: Introduction](https://www.section.io/engineering-education/heap-data-structure-python/#heaps:-introduction)
* [Applications of Heaps](https://www.section.io/engineering-education/heap-data-structure-python/#applications-of-heaps)
* [Implementing a Heap](https://www.section.io/engineering-education/heap-data-structure-python/#implementing-a-heap)
* [Practice Heaps](https://www.section.io/engineering-education/heap-data-structure-python/#practice-heaps)
* [Conclusion](https://www.section.io/engineering-education/heap-data-structure-python/#conclusion)

#### Heaps: Introduction <a id="heaps-introduction"></a>

Heaps are complete binary trees. Complete binary trees satisfy the following conditions:

* All levels are filled, except the last.
* All the nodes are as far left as possible.

![Complete Binary Tree](https://www.section.io/engineering-education/heap-data-structure-python/complete-binary-tree.png)

[_Figure: Complete Binary Tree_](https://www.andrew.cmu.edu/course/15-121/lectures/Trees/trees.html)

Heaps satisfy the heap property. This means that the root of every subtree should be the greatest or smallest element in the subtree, recursively.

#### Applications of Heaps <a id="applications-of-heaps"></a>

* Priority Queues can be implemented using heaps. The root of a heap always contains the maximum or the minimum value, based on the heap type. Therefore, a min-priority queue is implemented using a minheap. A max-priority queue is implemented using a maxheap. The element with the highest priority can be retrieved in O\(1\) time.
* Statistics – If we want to get ordered statistics, heaps serve as a great choice. If we want the kth smallest or largest element, we can pop the heap k times to retrieve them.
* Heaps are used in implementing various graph algorithms like [Dijkstra’s algorithm](https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm) and [Prim’s algorithm](https://en.wikipedia.org/wiki/Prim%27s_algorithm).

#### Implementing a Heap <a id="implementing-a-heap"></a>

**Heap Operations**

A heap has the following methods:

* **`getMax()`**
  * This operation returns the root of the maxheap.
  * Time Complexity - O\(1\).
* **`insert(k)`**
  * This operation inserts the key **k** into the heap.
  * Then it rearranges the heap to restore the heap property.
  * Time Complexity - O\(log n\).
* **`heapify()`**
  * This operation restores the heap property by rearranging the heap.
  * Time complexity - O\(log n\).
* **`printHeap()`**
  * Prints the heap’s level order traversal.

**Maxheap using List**

We are going to do the list implementation of a heap. In this, the heap’s level-order traversal would be stored as an array/list.

![Level Order Traversal](https://www.section.io/engineering-education/heap-data-structure-python/level-order-traversal.png)

[_Figure: Level-Order Traversal_](https://qph.fs.quoracdn.net/main-qimg-0ddd0cbca44f70d7845cc2caba5a0853)

_Note - Level-Order Traversal is a recursive traversal where the root is processed first, followed by the children of the root. This is followed by the grandchildren of the root until all the nodes are processed. In the diagram above, the root node is processed first, followed by the left child, right child and so on. The final level order traversal would be: 10 4 8 50 24 5 12 18. For an overview of what a level order traversal is, check out_ [_this_](https://www.quora.com/What-is-level-order-traversal-in-a-binary-tree) _Quora page._

In the array representation of a heap, for an element in array index i,

* The Parent Node would be at position floor\(\(i-1\)/2\).
* The Left Child would be at position 2\*i + 1.
* The Right Child would be at position 2\*i + 2.

Let us first define the Heap class.

```python
class MaxHeap:
    def __init__(self):
        self.heap = []
```

This initiates a heap as a list. Now, let us define our methods.

```python
class MaxHeap:
    def __init__(self):
        # Initialize a heap using list
        self.heap = []

    def getParentPosition(self, i):
        # The parent is located at floor((i-1)/2)
        return int((i-1)/2)

    def getLeftChildPosition(self, i):
        # The left child is located at 2 * i + 1
        return 2*i+1

    def getRightChildPosition(self, i):
        # The right child is located at 2 * i + 2
        return 2*i+2

    def hasParent(self, i):
        # This function checks if the given node has a parent or not
        return self.getParentPosition(i) < len(self.heap)

    def hasLeftChild(self, i):
        # This function checks if the given node has a left child or not
        return self.getLeftChildPosition(i) < len(self.heap)

    def hasRightChild(self, i):
        # This function checks if the given node has a right child or not
        return self.getRightChildPosition(i) < len(self.heap)

    def insert(self, key):
        self.heap.append(key) # Adds the key to the end of the list
        self.heapify(len(self.heap) - 1) # Re-arranges the heap to maintain the heap property

    def getMax(self):
        return self.heap[0] # Returns the largest value in the heap in O(1) time.

    def heapify(self, i):
        while(self.hasParent(i) and self.heap[i] > self.heap[self.getParentPosition(i)]): # Loops until it reaches a leaf node
            self.heap[i], self.heap[self.getParentPosition(i)] = self.heap[self.getParentPosition(i)], self.heap[i] # Swap the values
            i = self.getParentPosition(i) # Resets the new position

    def printHeap(self):
        print(self.heap) # Prints the heap
```

**Minheap using Heapq**

We have successfully implemented a heap using a list. Now, let’s use the **`heapq`** library in Python to implement a minheap.

```python
import heapq
class MinHeap:
    def __init__(self, minheap): # minheap is the list that we can to convert to a heap
        heapq.heapify(minheap) # Use the heapify function to convert list to a heap
        self.minheap = minheap

    def insert(self, key):
        heapq.heappush(self.minheap, key) # Insert key into the heap (heapq automatically maintains the heap property)

    def getMin(self):
        return self.minheap[0] # Returns the smallest element of the heap in O(1) time

    def removeMin(self):
        heapq.heappop(self.minheap) # The heappop function removes the smallest element in the heap

    def printHeap(self):
        print(self.minheap) # Prints the heap
```
{% endtab %}
{% endtabs %}

