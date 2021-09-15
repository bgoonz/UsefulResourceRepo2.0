---
description: >-
  Queues are a linear data structure that store data in a “first in, first out”
  (FIFO) order. Unlike arrays, you cannot access elements by index and instead
  can only pull the next oldest element. This m
---

# Queue

{% page-ref page="queue-sandbox.md" %}

{% page-ref page="queue-continued....md" %}

{% page-ref page="dequeue.md" %}



```python
# FIFO: first in first out

# create the abstract data type
class Queue:
    def __init__(self):
        # initialize it to a one dimensional array or linked list
        self.queue = []

    """
    Stack methods (enqueue, dequeue, peek, is_empty, size_queue)
    """

    # function to check if the queue is empty O(1)
    def is_empty(self):
        return self.queue == []

    # function to add data to the queue O(1)
    def enqueue(self, data):
        self.queue.append(data)

    # function to remove and return the first item inserted to the queue O(N)
    def dequeue(self):

        # first check to make sure its not an empty queue
        if self.size_queue()!= 0:
            # get the first item in the queue
            data = self.queue[0]
            # remove it
            del self.queue[0]
            # return the item
            return data
        else:
            return -1

    # function to return the first item in the queue without removing it
    # O(1)
    def peek(self):
        return self.queue[0]

    # function get the size of the queue O(1)
    def size_queue(self):
        return len(self.queue)


"""
Using the methods
"""
queue = Queue()
queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
print(f'Size: {queue.size_queue()}')
print(f'Dequeue: {queue.dequeue()}')
print(f'Size: {queue.size_queue()}')
print(f'Peeked item: {queue.peek()}')
print(f'Size: {queue.size_queue()}')

```

## Queue

* Implement a Queue class from scratch with an existing bug, the bug is that it cannot take more than 5 elements.
* Implement a Queue using two stacks. You may only use the standard `push()`, `pop()`, and `peek()` operations traditionally available to stacks. You do not need to implement the stack yourself \(i.e. an array can be used to simulate a stack\).

### Queues in Python

[Queues](https://www.educative.io/blog/data-structures-stack-queue-java-tutorial) are a linear data structure that store data in a “first in, first out” \(FIFO\) order. Unlike arrays, you cannot access elements by index and instead can **only pull the next oldest element**. This makes it great for order-sensitive tasks like online order processing or voicemail storage.

You can think of a queue as a line at the grocery store; the cashier does not choose who to check out next but rather processes the person who has stood in line the longest.

We could use a Python list with `append()` and `pop()` methods to implement a queue. However, this is inefficient because lists must shift all elements by one index whenever you add a new element to the beginning.

Instead, it’s best practice to use the `deque` class from Python’s `collections` module. Deques are optimized for the append and pop operations. The deque implementation also allows you to create double-ended queues, which can access both sides of the queue through the `popleft()` and `popright()` methods.





**Advantages:**

* Automatically orders data chronologically
* Scales to meet size requirements
* Time efficient with `deque` class

**Disadvantages:**

* Can only access data on the ends

**Applications:**

* Operations on a shared resource like a printer or [CPU core](https://www.educative.io/blog/beginners-guide-to-computers-and-programming)
* Serve as temporary storage for batch systems
* Provides an easy default order for tasks of equal importance

#### Common queue interview questions in Python

* Reverse first k elements of a queue
* Implement a queue using a linked list
* Implement a stack using a queue
* 
{% tabs %}
{% tab title="Implementation " %}
```python
"""Make a Queue class using a list!
Hint: You can use any Python list method
you'd like! Try to write each one in as
few lines as possible.
Make sure you pass the test cases too!"""

class Queue:
    def __init__(self, head=None):
        self.storage = [head]

    def enqueue(self, new_element):
        if(self.storage):
            self.storage.append(new_element)
        else:
            self.storage = [new_element]
        return new_element

    def peek(self):
        if(self.storage):
            return self.storage[0]
        else:
            return None

    def dequeue(self):
        if(self.storage):
            return self.storage.pop(0)
        else:
            return None

# Setup
q = Queue(1)
q.enqueue(2)
q.enqueue(3)

# Test peek
# Should be 1
print q.peek()

# Test dequeue
# Should be 1
print q.dequeue()

# Test enqueue
q.enqueue(4)
# Should be 2
print q.dequeue()
# Should be 3
print q.dequeue()
# Should be 4
print q.dequeue()
q.enqueue(5)
# Should be 5
print q.peek()

```
{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}

```python
"""Make a Queue class using a list!
Hint: You can use any Python list method
you'd like! Try to write each one in as
few lines as possible.
Make sure you pass the test cases too!"""

class Queue:
    def __init__(self, head=None):
        self.storage = [head]

    def enqueue(self, new_element):
        if(self.storage):
            self.storage.append(new_element)
        else:
            self.storage = [new_element]
        return new_element

    def peek(self):
        if(self.storage):
            return self.storage[0]
        else:
            return None

    def dequeue(self):
        if(self.storage):
            return self.storage.pop(0)
        else:
            return None

# Setup
q = Queue(1)
q.enqueue(2)
q.enqueue(3)

# Test peek
# Should be 1
print q.peek()

# Test dequeue
# Should be 1
print q.dequeue()

# Test enqueue
q.enqueue(4)
# Should be 2
print q.dequeue()
# Should be 3
print q.dequeue()
# Should be 4
print q.dequeue()
q.enqueue(5)
# Should be 5
print q.peek()

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

{% page-ref page="queue-sandbox.md" %}

{% page-ref page="../untitled-5/" %}

{% page-ref page="../untitled-4/double-linked-list.md" %}

{% page-ref page="../untitled-1/" %}

{% page-ref page="../untitled/" %}

{% page-ref page="../heap/" %}



