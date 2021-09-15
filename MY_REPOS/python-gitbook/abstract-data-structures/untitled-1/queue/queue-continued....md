# Queue Continued...

## Queue <a id="5f3d"></a>

Similar to a stack, the queue also limits the position for inserting and removing am operation on a sequence of data. However, unlike a stack, a queue follows the first in, first out \(FIFO\) principle.

In Python, a queue can also be implemented using a list. To follow the FIFO principle, the inserting operation occurs at the tail of the list, while the removing operation occurs at the head of the list.Python implementation of a queue  


{% embed url="https://gist.github.com/bgoonz/5b89d56538fdbd8aa66cc44e79148bdf" %}



#### Table of Contents <a id="table-of-contents"></a>

* [Queue: Introduction](https://www.section.io/engineering-education/queue-data-structure-python/#queue:-introduction)
* [Uses of Queues](https://www.section.io/engineering-education/queue-data-structure-python/#uses-of-queues)
* [Implementing Queues](https://www.section.io/engineering-education/queue-data-structure-python/#implementing-queues)
* [Practice Queues](https://www.section.io/engineering-education/queue-data-structure-python/#practice-queues)
* [Conclusion](https://www.section.io/engineering-education/queue-data-structure-python/#conclusion)

#### Queue - An introduction <a id="queue---an-introduction"></a>

A Queue is a linear data structure in which data is stored in a **First In, First Out** manner. In a queue, the item that was added the earliest is removed first. The item that was added more recently is removed last. A queue can be compared to a real-life queue.

![Queue, Diagram](https://www.section.io/engineering-education/queue-data-structure-python/queue.png)

`enqueue` is a queue operation where you add an item at the back of a queue.

`dequeue` is a queue operation where you remove an item from the front of a queue.

#### Uses of Queues <a id="uses-of-queues"></a>

* **Operating Systems** - often maintain queues while implementing various low-level operations such as CPU Scheduling, Disk Scheduling, etc.
* **Hardware** - hardware interrupts are handled using queues.
* **Internet** - Website traffic handling.
* And all other scenarios where a First In, First Out priority has to be implemented.

#### Implementing Queues <a id="implementing-queues"></a>

**Queue Methods**

**queue.Enqueue\(\)**

* The `queue.Enqueue()` method adds an element at the rear of the queue.
* Time Complexity -&gt; O\(1\)

**queue.Dequeue\(\)**

* The `queue.Dequeue()` method removes an element from the front of the queue.
* Time Complexity -&gt; O\(1\)

**queue.Front\(\)**

* The `queue.Front()` method returns the front item from the queue.
* Time Complexity -&gt; O\(1\)

**queue.Rear\(\)**

* The `queue.Rear()` method returns the rear item from the queue.
* Time Complexity -&gt; O\(1\)

**queue.isEmpty\(\)**

* The `queue.isEmpty()` method returns `True` if the queue is empty, else returns `False`.
* Time Complexity -&gt; O\(1\)

Queues can be implemented in various ways. Let us look at how to implement a queue using a list and using the `collections.deque` module in Python.

**Queue using a List**

We can use the list methods `insert` and `pop` to implement a queue.

```python
class Queue:

    def __init__(self):
        """
        Initializing Queue.
        """
        self.queue = []

    def isEmpty(self) -> bool:
        return True if len(self.queue) == 0 else False

    def front(self) -> int:
        return self.queue[-1]

    def rear(self) -> int:
        return self.queue[0]

    def enqueue(self, x: int) -> None:
        self.x = x
        self.queue.insert(0, x)       

    def dequeue(self) -> None:
        self.queue.pop()
```

**Queue using collections.Deque**

The `deque` class from the python `collections` module can also be used to implement a queue. This method of implementing a queue is far more efficient because deque provides faster enqueue and dequeue operations.

```python
from collections import deque
class Queue:

    def __init__(self):
        """
        Initializing Queue.
        """
        self.queue = deque()

    def isEmpty(self) -> bool:
        return True if len(self.queue) == 0 else False

    def front(self) -> int:
        return self.queue[-1]

    def rear(self) -> int:
        return self.queue[0]

    def enqueue(self, x: int) -> None:
        self.x = x
        self.queue.append(x)       

    def dequeue(self) -> None:
        self.queue.popleft()
```

#### Practice Queues <a id="practice-queues"></a>

Try implementing the queue in Python first. Then once you’re done with the implementation, try solving these problems on [HackerRank](https://hackerrank.com/dashboard) and [LeetCode](https://leetcode.com/problems)

* Reversing a Queue - [GeeksforGeeks](https://www.geeksforgeeks.org/reversing-a-queue/?ref=rp)
* Sort the Queue using Recursion - [GeeksforGeeks](https://www.geeksforgeeks.org/sort-the-queue-using-recursion/?ref=rp)
* Reversing First K Elements of the Queue - [GeeksforGeeks](https://www.geeksforgeeks.org/reversing-first-k-elements-queue/?ref=rp)
* Implementing Stack using Queues - [GeeksforGeeks](https://www.geeksforgeeks.org/implement-stack-using-queue/)
* Queries with Fixed Length - [HackerRank](https://www.hackerrank.com/challenges/queries-with-fixed-length/problem)
* Truck Tour - [HackerRank](https://www.hackerrank.com/challenges/truck-tour/problem)
* Maximum Sum of Triangle No Less Than K - [LeetCode](https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/)
* Design Circular Queue - [LeetCode](https://leetcode.com/problems/design-circular-queue/)
* Design Circular Dequeue - [LeetCode](https://leetcode.com/problems/design-circular-deque/)

