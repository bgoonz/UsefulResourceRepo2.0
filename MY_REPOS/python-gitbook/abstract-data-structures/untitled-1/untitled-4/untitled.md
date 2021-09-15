# Linked List Background



_For more background on the different types of data structures in Python, check out the following articles:_

* [Introduction](https://www.section.io/data-structures-python-part-1/)
* [List](https://www.section.io/list-data-structure-python/)
* [Stack](https://www.section.io/stack-data-structure-python)
* [Queue](https://www.section.io/queue-data-structure-python/)

### Table of Contents <a id="table-of-contents"></a>

* [Linked List: Introduction](https://www.section.io/engineering-education/linked-list-data-structure-python/#linked-list:-introduction)
* [Uses of Linked Lists](https://www.section.io/engineering-education/linked-list-data-structure-python/#uses-of-linked-lists)
* [Implementing Linked Lists](https://www.section.io/engineering-education/linked-list-data-structure-python/#implementing-linked-lists)
* [Practice Linked Lists](https://www.section.io/engineering-education/linked-list-data-structure-python/#practice-linked-lists)
* [Conclusion](https://www.section.io/engineering-education/linked-list-data-structure-python/#conclusion)

### Linked List: Introduction <a id="linked-list-introduction"></a>

A Linked List is a linear data structure. They are a sequence of data, **connected** together by links or **pointers**.

Linked Lists are a chain of **nodes**, connected together by links. Every node \(fundamental block of a linked list\) contains the following fields:

* **Data** -&gt; The item to be stored in the node.
* **Next** -&gt; The link or **reference** to the next node.

![Node, Linked List](https://www.section.io/engineering-education/linked-list-data-structure-python/nodell.png)  
In a linked list, the first node is called the **head** and the last node is determined by the condition that the **next** points to a null value.

![Null, Linked List](https://www.section.io/engineering-education/linked-list-data-structure-python/nonell.jpg)

### Uses of Linked Lists <a id="uses-of-linked-lists"></a>

* Due to their **dynamic size allocation** and ease of insertion/deletion, linked lists are applied in a lot of use cases.
* They’re used to implement a lot of complex data structures like the **adjacency list** in graphs.
* They are used for **lifecycle management** in operating systems.
* A playlist in a music application is implemented using a doubly linked list.
* **Blockchain**, a complex data structure that is used for cryptocurrencies and ledgers use a linked list at their core.

### Implementing Linked Lists <a id="implementing-linked-lists"></a>

There are two main types of Linked Lists:

* Singly Linked Lists
* Doubly Linked Lists

#### Singly Linked Lists <a id="singly-linked-lists"></a>

In the following example, we’ll implement a singly linked list from scratch in Python. This contains the following methods:

* **`ll.search(head, data)`** -&gt; Search the given element in the Linked List.
* **`ll.print_list()`** -&gt; Print the linked list.
* **`ll.size()`** -&gt; Return the length of the linked list.
* **`ll.insert(ele)`** -&gt; Insert the given node into the linked list.
* **`ll.delete(data)`** -&gt; Delete the given element from the linked list.

```python
class Node(object):
	def __init__(self, data):
		self.data = data
		self.next = None

# Class to create a Linked List
class LinkedList(object):
	def __init__(self, head=None):
		self.head = head

	# Search an element and print its index
	def search(self, head, data, index):
		if head.data == data:
			print (index)
		else:
			# Make recursive calls
			if head.next:
				return self.search(head.next, data, index+1)
			else:
				raise ValueError("Node not in linked list")

	# Print the linked list
	def print_list(self):
		if self.head == None:
			raise ValueError("List is empty")

		current = self.head 
		while(current):
			print (current.data, end="  ")
			current = current.next
		print ('\n')

	# Find length of Linked List
	def size(self):
		if self.head == None:
			return 0

		size = 0
		current = self.head
		while(current):
			size += 1
			current = current.next

		return size

	# Insert a node in a linked list
	def insert(self, data):
		node = Node(data)
		if not self.head:
			self.head = node
		else:
			node.next = self.head
			self.head = node

	# Delete a node in a linked list
	def delete(self, data):
		if not self.head:
			return
		
		temp = self.head
		
		# Check if head node is to be deleted
		if head.data == data:
			head = temp.next
			print ("Deleted node is " + str(head.data))
			return

		while(temp.next):
			if (temp.next.data == data):
				print ("Node deleted is " + str(temp.next.data))
				temp.next = temp.next.next
				return
			temp = temp.next
		print ("Node not found")
		return
```

#### Doubly Linked Lists <a id="doubly-linked-lists"></a>

A doubly linked list is similar to a singly linked list. It differs in that it also contains a link to the previous node.

![Doubly Linked List](https://www.section.io/engineering-education/linked-list-data-structure-python/doublyll.png)  
We implement the following methods for the Doubly Linked List data structure:

* **`dll.addNodeLast(x)`** -&gt; Adds a node at the right end of the linked list.
* **`dll.insertNode(pos, x)`** -&gt; Adds a node at the position specified.
* **`dll.removeNode(x)`** -&gt; Removes the specified node.
* **`dll.showReverse()`** -&gt; Prints the linked list in reverse.
* **`dll.show()`** -&gt; Prints the linked list.

```python
class Node:
    def __init__(self, val):
        self.value = val
        self.next = None
        self.prev = None
    
class DoublyList:
    def __init__(self, val):
        self.head = Node(val)
        self.tail = self.head

    def addNodeLast(self, val):
        current = self.head
        while current.next != None:
            current = current.next
        newNode = Node(val)
        current.next = newNode
        newNode.prev = current
        self.tail = newNode

    def insertNode(self, val, newVal):
        if self.tail.value == val:
            self.addNodeLast(newVal)
        elif self.head.value == val:
            newNode = Node(newVal)
            newNode.next = self.head.next
            newNode.prev = self.head
            newNode.next.prev = newNode
            self.head.next = newNode
        else:
            current = self.head.next
            while current.value != val:
                current = current.next
            newNode = Node(newVal)
            newNode.next = current.next
            newNode.next.prev = newNode 
            newNode.prev = current
            current.next = newNode

    def removeNode(self, val):
        if self.head.value == val:
            self.head = self.head.next
            self.head.prev = None
        elif self.tail.value == val:
            self.tail = self.tail.prev
            self.tail.next = None
        else:
            current = self.head.next
            while current.value != val:
                current = current.next
            current.prev.next = current.next
            current.next.prev = current.prev

    def showReverse(self):
        current = self.tail
        while current != None:
            print(current.value)
            current = current.prev

    def show(self):
        current = self.head
        while current != None:
            print(current.value)
            current = current.next
```

### Practice Linked Lists <a id="practice-linked-lists"></a>

First, try implementing the Linked Lists as shown above, and then try running them. Once you’ve mastered the implementation, try the given problem-sets to master linked lists.

* Merge Two Sorted Lists - [LeetCode](https://leetcode.com/problems/merge-two-sorted-lists/)
* Remove nth Node from the End of the List - [LeetCode](https://leetcode.com/problems/remove-nth-node-from-end-of-list/)
* Rotate List - [LeetCode](https://leetcode.com/problems/rotate-list/)
* Palindrome Linked List - [LeetCode](https://leetcode.com/problems/palindrome-linked-list/)
* Construct a Doubly Linked List from 2D Matrix - [GeeksforGeeks](https://www.geeksforgeeks.org/construct-a-doubly-linked-linked-list-from-2d-matrix/?ref=rp)
* Reverse a Doubly Linked List - [GeeksforGeeks](https://www.geeksforgeeks.org/reverse-a-doubly-linked-list/?ref=rp)

