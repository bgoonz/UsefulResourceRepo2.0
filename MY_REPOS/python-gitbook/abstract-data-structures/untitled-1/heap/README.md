# Heap

{% page-ref page="heap-examples.md" %}

## 1. Overview of heap <a id="6d32"></a>

A heap is one common implementation of [a priority queue](https://en.wikipedia.org/wiki/Priority_queue). A priority queue contains items with some priority. You can always take an item out in the priority order from a priority queue. It is important to take an item out based on the priority. When you look around poster presentations at an academic conference, it is very possible you have set in order to pick some presentations. Or you will make a priority list before you go sight-seeing \(In this case, an item will be a tourist spot.\). A stack and a queue also contain items. You can take an item out from a stack if the item is the last one added to the stack. This is first in, last out \(FILO\). As for a queue, you can take an item out from the queue if this item is the first one added to the queue. This is first in, first out \(FIFO\). You can regard these as a specific type of a priority queue. This is because the priority of an inserted item in stack increases and the priority of an inserted item in a queue decreases.![](https://miro.medium.com/max/60/1*oN767xTYckRTUjTIyS3oyw.png?q=20)

![](https://miro.medium.com/max/409/1*oN767xTYckRTUjTIyS3oyw.png)

## 2. Representation <a id="b367"></a>

A heap is one of the tree structures and represented as a binary tree. I put the image of heap below. You can implement a tree structure by a pointer or an array. In this post, I choose to use the array implementation like below. In terms of space complexity, the array implementation has more benefits than the pointer implementation. The indices of the array correspond to the node number in the below image.![](https://miro.medium.com/max/60/1*ds0JXOw3lLqNo6hw__NtZw.png?q=20)

![](https://miro.medium.com/max/564/1*ds0JXOw3lLqNo6hw__NtZw.png)

The heap above is called _a min heap_, and **each value of nodes is less than or equal to the value of child nodes**_**.**_ We call this condition the heap property.![](https://miro.medium.com/max/60/1*MaIob54cy5Z7iL1TAEDt1A.png?q=20)

![](https://miro.medium.com/max/258/1*MaIob54cy5Z7iL1TAEDt1A.png)

In a min heap, when you look at the parent node and its child nodes, the parent node always has the smallest value. When a heap has an opposite definition, we call it _a max heap_. For the following discussions, we call a min heap a heap.

You can access a parent node or a child nodes in the array with indices below.

* A root node｜_i_ = 1, the first item of the array
* A parent node｜parent\(_i_\) = _i_ / 2
* A left child node｜left\(_i_\) = 2_i_
* A right child node｜right\(_i_\)=2_i_+1

When you look at the node of index 4, the relation of nodes in the tree corresponds to the indices of the array below.![](https://miro.medium.com/max/60/1*ysSV1xV0OMm-1amWBpFb0A.png?q=20)

![](https://miro.medium.com/max/552/1*ysSV1xV0OMm-1amWBpFb0A.png)

The parent node corresponds to the item of index 2 by parent\(_i_\) = 4 / 2 = 2. The child nodes correspond to the items of index 8 and 9 by left\(_i_\) = 2 \* 2 = 4, right\(_i_\) = 2 \* 2 + 1 = 5, respectively.

## 3. The way how to build a heap <a id="5173"></a>

You need two operations to build a heap from an arbitrary array.

1. `min_heapify`｜make some node and its descendant nodes meet the heap property.
2. `build_min_heap`｜produce a heap from an arbitrary array.

We can build a heap by applying _min\_heapify_ to each node repeatedly.

### 3.1 min\_heapify <a id="ebe4"></a>

In _min\_heapify_, we exchange some nodes with its child nodes to satisfy the heap property under these two features below;

1. Some node and its child nodes don’t satisfy the heap property,
2. That child nodes and its descendant nodes satisfy the property.

A tree structure has the two features below.![](https://miro.medium.com/max/60/1*7GdM58KmWHBgEE-yOSRy4Q.png?q=20)

![](https://miro.medium.com/max/519/1*7GdM58KmWHBgEE-yOSRy4Q.png)

Look at the nodes surrounded by the orange square. We find that 9 is larger than both of 2 and 3, so these three nodes don’t satisfy the heap property \(The value of node should be less than or equal to the values of its child nodes\). Please check the orange nodes below.![](https://miro.medium.com/max/60/1*iDBRhJGiIyCBIAdVOMQnyg.png?q=20)

![](https://miro.medium.com/max/507/1*iDBRhJGiIyCBIAdVOMQnyg.png)

However, look at the blue nodes. These nodes satisfy the heap property.![](https://miro.medium.com/max/60/1*8DJyn5AJMYp4DqWgv0dJAg.png?q=20)

![](https://miro.medium.com/max/559/1*8DJyn5AJMYp4DqWgv0dJAg.png)

Here we define _min\_heapify_\(_array_, _index_\). This method takes two arguments, _array,_ and _index_. We assume this method exchange the node of _array_\[_index_\] with its child nodes to satisfy the heap property.

Let’s check the way how _min\_heapify_ works by producing a heap from the tree structure above. First, we call _min\_heapify_\(_array_, 2\) to exchange the node of index 2 with the node of index 4.![](https://miro.medium.com/max/60/1*6ZsaVxXdLu0fyOz99GD1vg.png?q=20)

![](https://miro.medium.com/max/522/1*6ZsaVxXdLu0fyOz99GD1vg.png)

After apply _min\_heapify_\(_array_, 2\) to the subtree, the subtree changes below and meets the heap property. This subtree colored blue.![](https://miro.medium.com/max/60/1*Pg5r3aNAcMluu2YafmcOEw.png?q=20)

![](https://miro.medium.com/max/530/1*Pg5r3aNAcMluu2YafmcOEw.png)

If the subtree exchanged the node of index 2 with the node of index5, the subtree won’t meet the heap property like below. So the subtree exchange the node has the smallest value in the subtree with the parent node to satisfy the heap property.![](https://miro.medium.com/max/60/1*1MXtFjQWaWTqNTGakj4DNg.png?q=20)

![](https://miro.medium.com/max/527/1*1MXtFjQWaWTqNTGakj4DNg.png)

Get back to the tree correctly exchanged. When we look at the orange nodes, this subtree doesn’t satisfy the heap property.![](https://miro.medium.com/max/60/1*sE-XfLcquAc8u1Xzxe5PmA.png?q=20)

![](https://miro.medium.com/max/564/1*sE-XfLcquAc8u1Xzxe5PmA.png)

So call _min\_heapify_\(_array_, 4\) to make the subtree meet the heap property.![](https://miro.medium.com/max/60/1*NGqt-gG64O_X1GJei_MdJQ.png?q=20)

![](https://miro.medium.com/max/532/1*NGqt-gG64O_X1GJei_MdJQ.png)

Now, this subtree satisfies the heap property by exchanging the node of index 4 with the node of index 8.

These operations above produce the heap from the unordered tree \(the array\).

### 3.2 build\_min\_heap <a id="caed"></a>

The pseudo-code below stands for how _build\_min\_heap_ works.

```text
build_min_heap(array)
    for i=n/2 downto 1
        do min_heapify(array, i)
```

This function iterates the nodes except the leaf nodes with the for-loop and applies _min\_heapify_ to each node. We don’t need to apply _min\_heapify_ to the items of indices after _n_/2+1, which are all the leaf nodes. We apply _min\_heapify in_ the orange nodes below.![](https://miro.medium.com/max/60/1*Qa4zV-Ys8iXRbPCt2Xt3Zw.png?q=20)

![](https://miro.medium.com/max/591/1*Qa4zV-Ys8iXRbPCt2Xt3Zw.png)

Each node can satisfy the heap property with meeting the conditions to be able to apply _min\_heapfiy._ This is because this function iterates the nodes from the bottom \(the second last level\) to the top \(the root node level\). For instance, this function first applies _min\_heapify_ to the nodes both of index 4 and index 5 and then applying _min\_heapify_ to the node of index 2. So the node of the index and its descendent nodes satisfy the heap property when applying _min\_heapify._

## 4. Time complexity <a id="afb9"></a>

Let’s think about the time complexity of _build\_min\_heap._ First of all, we think the time complexity of _min\_heapify_, which is a main part of _build\_min\_heap._

_min\_heapify_ repeats the operation of exchanging the items in an array, which runs in constant time. So the time complexity of _min\_heapify_ will be in proportional to the number of repeating. In the worst case, _min\_heapify_ should repeat the operation the height of the tree times. This is because in the worst case, min\_heapify will exchange the root nodes with the most depth leaf node. Assuming _h_ as the height of the root node, the time complexity of _min\_heapify_ will take _O_\(_h_\) time.

The time complexities of _min\_heapify_ in each depth are shown below. The number of the nodes is also showed in right.![](https://miro.medium.com/max/60/1*a-h1jgMmLuIFq_ZhuMmBnw.png?q=20)

![](https://miro.medium.com/max/591/1*a-h1jgMmLuIFq_ZhuMmBnw.png)

From the figure, the time complexity of _build\_min\_heap_ will be the sum of the time complexity of inner nodes. The final time complexity becomes:![](https://miro.medium.com/max/60/1*nlTVz17IMbUwcrs6SxEWrw.png?q=20)![](https://miro.medium.com/max/591/1*nlTVz17IMbUwcrs6SxEWrw.png)

So we should know the height of the tree to get the time complexity.

The sum of the number of nodes in each depth will become _n_. So we will get this equation below.![](https://miro.medium.com/max/60/1*OA6ZyHHxwRFMDdspJooQ1A.png?q=20)![](https://miro.medium.com/max/451/1*OA6ZyHHxwRFMDdspJooQ1A.png)

The equation above stands for the geometric sequence, so we can deform it and get the height of the tree as follow:![](https://miro.medium.com/max/60/1*etWYXqoPtFIl5C7j-K_TiA.png?q=20)![](https://miro.medium.com/max/591/1*etWYXqoPtFIl5C7j-K_TiA.png)

Finally, we get _O_\(_n_\) as the time complexity of _build\_min\_heap_. Also, we get _O_\(log_n_\) as the time complexity of _min\_heapify_.

## 5. Implementation <a id="5c96"></a>

Here we implement _min\_heapify_ and _build\_min\_heap_ with Python. the implementation of _min\_heapify_ will be as follow.

```python
def min_heapify(array, i):
    left = 2 * i + 1
    right = 2 * i + 2
    length = len(array) - 1
    smallest = i    if left <= length and array[i] > array[left]:
        smallest = left
    if right <= length and array[smallest] > array[right]:
        smallest = right
    if smallest != i:
        array[i], array[smallest] = array[smallest], array[i]
        min_heapify(array, smallest)
```

First, this method computes the node of the smallest value among the node of index _i_ and its child nodes and then exchange the node of the smallest value with the node of index _i_. When the exchange happens, this method applies _min\_heapify_ to the node exchanged.

Index of a list \(an array\) in Python starts from 0, the way to access the nodes will change as follow.

* The root node｜_i_ = 0
* The parent node｜parent\(_i_\) = \(_i_-1\) / 2
* The left child node｜left\(_i_\) = 2_i_ + 1
* The right child node｜right\(_i_\)=2_i_+2

The variable, _smallest_ has the index of the node of the smallest value. If the _smallest_ doesn’t equal to the _i_, which means this subtree doesn’t satisfy the heap property, this method exchanges the nodes and executes _min\_heapify_ to the node of the _smallest_.

The implementation of _build\_min\_heap_ is almost the same as the pseudo-code.

```python
def build_min_heap(array):
    for i in reversed(range(len(array)//2)):
        min_heapify(array, i)
```

The for-loop differs from the pseudo-code, but the behavior is the same. This for-loop also iterates the nodes from the second last level of nodes to the root nodes.

## 6. Heapsort <a id="91ea"></a>

Heapsort is one sort algorithm with a heap. It’s really easy to implement it with _min\_heapify_ and _build\_min\_heap._ The flow of sort will be as follow. Please note that the order of sort is ascending.

1. Build a heap from an arbitrary array with _build\_min\_heap._
2. Swap the first item with the last item in the array.
3. Remove the last item from the array.
4. Run _min\_heapify_ to the first item.
5. Back to step 2.

In a heap, the smallest item is the first item of an array. The array after step 3 satisfies the conditions to apply _min\_heapify_ because we remove the last item after we swap the first item with the last item. By this nature, we can sort an array by repeating steps 2 to 4.

The implementation of heapsort will become as follow.

```python
def heapsort(array):
    array = array.copy()
    build_min_heap(array)    sorted_array = []
    for _ in range(len(array)):
        array[0], array[-1] = array[-1], array[0]
        sorted_array.append(array.pop())
        min_heapify(array, 0)    return sorted_array
```

The time complexity of heapsort is _O_\(_n\_log\_n_\) because in the worst case, we should repeat _min\_heapify_ the number of items in array times, which is _n_.

In [the heapq module](https://docs.python.org/3/library/heapq.html) of Python, it has already implemented some operation for a heap. I followed the method in MIT’s lecture, the implementation differs from Python’s. If you’d like to know Python’s detail implementation, please visit [the source code here](https://github.com/python/cpython/blob/master/Lib/heapq.py). For example, these methods are implemented in Python.

* `heapq.heapify` \| corresponds to _build\_min\_heap_
* `heapq.heapop` \| corresponds to swapping items, remove the last item, and _min\_heapify_ at once_._

By using those methods above, we can implement heapsort as follow. Please note that it differs from [the implementation of heapsort in the official documents](https://docs.python.org/3/library/heapq.html#basic-examples).

```python
import heapqdef heapsort(array):
    h = array.copy()
    heapq.heapify(h)
    return [heapq.heappop(h) for _ in range(len(array))]
```

So that’s all for this post. Thank you for reading!

### References <a id="9803"></a>

* [MIT OpenCourseWare 4. Heaps and Heap Sort](https://www.youtube.com/watch?v=B7hVxCmfPtM)

## Implementation

```python
"""
Heaps (priority queues)
"""
# the maximum number of items that can be stored in the heap
CAPACITY = 10

"""
*** Max Heap ***
----------------
"""


# define the heap class
class Heap(object):

    def __init__(self):
        # create array with as many slots as the CAPACITY
        self.heap = [0] * CAPACITY
        # track the size of the heap (the number of items in the heap)
        self.heap_size = 0

    # insertion takes O(1) running time BUT we have to make sure that hte
    # heap properties are not violated (it takes O(logN) because of the
    # fixUp() method)
    def insert(self, item):
        # if the heap is at CAPACITY already we can not insert any more items
        if CAPACITY == self.heap_size:
            return

        # insert the item at the index of the size of the heap (the last
        # empty spot) and then increment the counter
        self.heap[self.heap_size] = item
        self.heap_size += 1

        # after insert check to see if the heap properties were violated and
        # if so fix them
        self.fix_up(self.heap_size - 1)

    # we consider the last item and check whether swaps are needed or not
    # running time O(logN)
    def fix_up(self, index):

        # get the parent index of the given node in the heap
        parent_index = (index - 1) // 2

        # while the index > 0 means until we consider all the items "above"
        # the one we inserted we have to swap the node with the parent if the
        # heap property is violated
        # this is a MAX HEAP: largest items are in the higher layers (max
        # item == root node)
        if index > 0 and self.heap[index] > self.heap[parent_index]:
            self.swap(index, parent_index)
            # run the check again after the swap on the parent
            self.fix_up(parent_index)

    # Get max, return the root node.  Because this is a max heap the root is
    # the max item.  Because this is an array it takes O(1) time
    # this is the peek() method
    def get_max(self):
        return self.heap[0]

    # Get poll, returns the max item and also REMOVES the item from the heap
    # note: we just dont care about that item anymore but because we have an
    # array with fixed size we aren't able to get rid of it completely
    # O(logN) running time
    def poll(self):

        max = self.get_max()

        # first swap the first item with the last item
        self.swap(0, self.heap_size - 1)
        # then decrement the heap size ( excludes the last item from the heap
        # going forward thus 'removing it')
        self.heap_size = self.heap_size - 1

        # nex check if the heap properties have been violated and if so fix
        # them ( fix down is similar to fix up but works from the root down )
        self.fix_down(0)

        # finally return the max item removed
        return max

    # fix down, we have a given item in the heap and we consider all the
    # items below and check whether the heap properties are violated or not
    def fix_down(self, index):

        # every node has 2 children so in the array the node i has left child
        # with index *i+1 and right child with index 2*i+2
        index_left = 2 * index + 1
        index_right = 2 * index + 2
        # this is a max heap so the parent is always greater than the children
        index_largest = index

        # if the left child is greater than the parent: largest is the left node
        if index_left < self.heap_size and self.heap[index_left] > self.heap[
            index]:
            index_largest = index_left

        # figure out if the left child or right child is the greater one
        # first check if the given index is valid ( not larger than the heap
        # size)
        # if the right child is greater than the left child: largest is the
        # right node
        if index_right < self.heap_size and self.heap[index_right] > \
                self.heap[index_largest]:
            index_largest = index_right

        # we don't want to swap items with themselves
        if index != index_largest:
            self.swap(index, index_largest)
            # recursively check down the tree for any other heap violations
            # and fix them as needed
            self.fix_down(index_largest)

    # we have N items and we want to sort them with a heap
    # every poll operation takes O(logN) time because of the fix down
    # method thats why the overall running time is O(NlogN) for heapsort
    def heap_sort(self):

        # we decrease the size of hte heap in the poll method so we have to
        # store it
        size = self.heap_size

        for i in range(0, size):
            max = self.poll()
            print(max)

    # swap two items with (index1, index2) in the heap array
    def swap(self, index1, index2):
        self.heap[index2], self.heap[index1] = self.heap[index1], self.heap[index2]

heap = Heap()
heap.insert(10)
heap.insert(8)
heap.insert(12)
heap.insert(20)
heap.insert(-2)
heap.insert(0)
heap.insert(1)
heap.insert(321)

heap.heap_sort()
```

```python
# Implements a min-heap. For max-heap, simply reverse all comparison orders.
#
# Note on alternate subroutine namings (used in some textbooks):
#     - _bubble_up = siftdown
#     - _bubble_down = siftup

def _bubble_up(heap, i):
    while i > 0:
        parent_i = (i - 1) // 2
        if heap[i] < heap[parent_i]:
            heap[i], heap[parent_i] = heap[parent_i], heap[i]
            i = parent_i
            continue
        break

def _bubble_down(heap, i):
    startpos = i
    newitem = heap[i]
    left_i = 2 * i + 1
    while left_i < len(heap):
        # Pick the smaller of the L and R children
        right_i = left_i + 1
        if right_i < len(heap) and not heap[left_i] < heap[right_i]:
            child_i = right_i
        else:
            child_i = left_i

        # Break if heap invariant satisfied
        if heap[i] < heap[child_i]:
            break

        # Move the smaller child up.
        heap[i], heap[child_i] = heap[child_i], heap[i]
        i = child_i
        left_i = 2 * i + 1

def heapify(lst):
    for i in reversed(range(len(lst) // 2)):
        _bubble_down(lst, i)

def heappush(heap, item):
    heap.append(item)
    _bubble_up(heap, len(heap) - 1)

def heappop(heap):
    if len(heap) == 1:
        return heap.pop()
    min_value = heap[0]
    heap[0] = heap[-1]
    del heap[-1]
    _bubble_down(heap, 0)
    return min_value



# Example usage
heap = [3, 2, 1, 0]
heapify(heap)
print('Heap(0, 1, 2, 3):', heap)
heappush(heap, 4)
heappush(heap, 7)
heappush(heap, 6)
heappush(heap, 5)
print('Heap(0, 1, 2, 3, 4, 5, 6, 7):', heap)

sorted_list = [heappop(heap) for _ in range(8)]
print('Heap-sorted list:', sorted_list)

# Large test case, for randomized tests
import random

# Heapify 0 ~ 99
heap = list(range(100))
random.shuffle(heap)
heapify(heap)

# Push 100 ~ 199 in random order
new_elems = list(range(100, 200))
random.shuffle(new_elems)
for elem in new_elems:
    heappush(heap, elem)

sorted_list = [heappop(heap) for _ in range(200)]
print(sorted_list == sorted(sorted_list))
```

{% page-ref page="../array/" %}

{% page-ref page="../tree/binary-search-tree/" %}

{% page-ref page="../untitled-4/" %}

{% page-ref page="../array/extra-array.md" %}

{% page-ref page="../stack/" %}

{% page-ref page="../tree/binary-tree/" %}

{% page-ref page="../untitled-6/" %}

{% page-ref page="../untitled-5/" %}

{% page-ref page="../untitled-2/" %}

{% page-ref page="../untitled-3/" %}

{% page-ref page="../queue/queue-sandbox.md" %}

{% page-ref page="../untitled-5/" %}

{% page-ref page="../untitled-4/double-linked-list.md" %}

{% page-ref page="../untitled-1/" %}

{% page-ref page="../untitled/" %}

{% page-ref page="./" %}

