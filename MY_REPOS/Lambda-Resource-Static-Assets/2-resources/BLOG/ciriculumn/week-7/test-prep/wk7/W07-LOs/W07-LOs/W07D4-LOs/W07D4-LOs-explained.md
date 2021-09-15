# Lists, Stacks, and Queues (W7D4) - Learning Objectives

## Lists, Stacks, and Queues

1. Explain and implement a Linked List.

    - A linked list are a collection of ordered data that track three main components:
      - head: beginning of the list
      - tail: end of the list
      - length: count of the number of elements in the list
    - The main differences between lists and arrays are that a list does not have random access or indices to signify where in the list an element is.
      - The only references to elements that we have in a list are the head and the tail.
      - If we want an element in the middle of the list, we would have to traverse the list until we encountered it.
    - The two main types of linked lists that we talked about are Singly Linked Lists and Doubly Linked Lists.
      - Singly Linked Lists are composed of nodes that only have a reference to the next node in the list. We can only traverse the list in one direction.
      - Doubly Linked Lists are composed of nodes that have a reference to both the next node and the previous node in the list. This allows us to traverse both forwards and backwards.
    - Methods of a linked list that we should know are:
      - addToTail: Adds a new node to the end of the list.
      - addToHead: Adds a new node to the front of the list.
      - insertAt: Adds a new node at the specified position (we need to traverse to that point, then update pointers)
      - removeTail: Removes the last node of the list.
      - removeHead: Removes the first node of the list.
      - removeFrom: Removes the node at the specified position.
      - contains: Traverses the list and returns a boolean to indicate if the value was found at any node.
      - get: Returns a reference to the node at the specified position.
      - set: Updates the value of the node at the specified position.
      - size: Returns the current length of the list.
    - Time complexities for these methods:
      - Accessing a node: O(n), because we may have to traverse the entire list.
      - Searching a list: O(n), because we may have to traverse the entire list.
      - Inserting a value: O(1), under the assumption that we have a reference to the node that we want to insert it after/before. If we don't have this reference we would first have to access it (O(n) from above), but the actual creation is O(1)
      - Deleting a node: O(1), for the same reasons as insertion. If we first need to find the previous and next nodes, we would need to access them (O(n) from above), but the actual deletion is O(1)
    - Be able to implement a Singly Linked List and a Doubly Linked List. This would require you to use a Node class with a value instance variable and an instance variable that points to the next (and possibly previous) Node instance(s). You should then be able to interact with these Nodes to perform all of the actions of a Linked List, as we defined above.

2. Explain and implement a Stack.

    - A Last In First Out (LIFO) Abstract Data Type (ADT).
      - LIFO: The last element put into the stack is the first thing removed from it. Think of it as a can of Pringles or a pile of dishes.
      - ADT: The actual implementation of the stack can vary as long as the main principles and methods associated with them are abided by. We could use Nodes like we did with Linked Lists, we could use an Array as an underlying instance variable as long as the methods we implement only interact with it in the way a stack should be interacted with, etc.
    - Methods of a Stack we should know are:
      - push: Adds an element to the top of the stack.
      - pop: Removes an element from the top of the stack.
      - peek: Returns the value of the top element of the stack.
      - size: Returns the number of elements in the stack.
    - Time Complexities:
      - Adding an element: O(1), since we are always adding it to the top and the addition doesn't affect any other elements.
      - Removing an element: O(1), we're always taking the top element of the stack.
      - Finding or Accessing a particular element: O(n), since we can only interact with our stack by removing elements from the top, we may have to remove every element to find what we're looking for.
  
3. Explain and implement a Queue.

    - A First In First Out (LIFO) Abstract Data Type (ADT).
      - LIFO: The first element put into the queue is the first thing removed from it. Think of it as if you are waiting in line at a store, first come, first serve.
      - ADT: The actual implementation of the queue can vary as long as the main principles and methods associated with them are abided by. We could use Nodes like we did with Linked Lists, we could use an Array as an underlying instance variable as long as the methods we implement only interact with it in the way a queue should be interacted with, etc.
    - Methods of a Queue we should know are:
      - enqueue: Adds an element to the back of the queue.
      - dequeue: Removes an element from the front of the queue.
      - peek: Returns the value of the front element of the queue.
      - size: Returns the number of elements in the queue.
    - Time Complexities:
      - Adding an element: O(1), since we are always adding it to the back. If we are using Nodes instead of a simple array, keeping a reference to the last node allows us to immediately update these pointers without having to do any traversal.
      - Removing an element: O(1), we're always taking the front element of the queue.
      - Finding or Accessing a particular element: O(n), since we can only interact with our queue by removing elements from the front, we may have to remove every element to find what we're looking for.
