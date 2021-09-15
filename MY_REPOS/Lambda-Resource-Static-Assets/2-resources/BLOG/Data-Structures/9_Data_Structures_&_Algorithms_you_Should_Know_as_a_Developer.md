# 9 Data Structures & Algorithms you Should Know as a Developer

> Data Structures & Algorithms That Makes You a Better Developer

Data Structures & Algorithms That Makes You a Better Developer
--------------------------------------------------------------

[![Mohit](https://miro.medium.com/fit/c/96/96/1*BT86Q6lnVw8evF8qKJCHYQ.jpeg)](https://mohit19.medium.com/?source=post_page-----5e10946c95a0--------------------------------)

![](https://miro.medium.com/max/60/1*h9WlZAhEbvK-8gkGN_hE8A.png?q=20)

![](https://miro.medium.com/max/2702/1*h9WlZAhEbvK-8gkGN_hE8A.png)

If you already have some experience with programming then there are chances that you might have heard about Linked List, these are considered as a better alternative than Arrays for storing lists in memory, as there are many disadvantages and limitations of using an Array.

> What are Nodes?
> 
> Let's say in a restaurant you ordered some food, as the waiter comes to your table and notes your order, he has to carry two things with him, that is obviously your food and where you are located in the restaurant. Similarly in a Linked List, we have Nodes that contain two things, **Data** & **Link**. **_Data_** is your actual stored data and the **_Link_** contains the address to that next Node of the List.

**There are 3 types of Linked List where you need to look at.**

*   **Single Linked List:** It is simply made up of multiple Nodes, where every Node contains the Data and Link. **_For example,_** if we store 3 numbers **(10,20,30)** in a Single Linked List, now each Node contains the address to the Node with their associated Data, except the first Node doesn't have a Link and to access the first Node we have a **_pointer_** which contains its own address. Note that also the last Node won't have an address in a Single Linked List.

![](https://miro.medium.com/max/60/1*HGBdE6kdR0zMhNsjhRs4ZQ.png?q=20)

![](https://miro.medium.com/max/2234/1*HGBdE6kdR0zMhNsjhRs4ZQ.png)

**Single Linked List**

> Navigation is Forward Only

**Doubly Linked List:** As we have forward navigation in Single Linked List, Double Linked List are a bit different from a Singly Linked List in a way that each node has an extra pointer that points to the previous node similarly to a Singly Linked List. These extra pointers give the ability to move forwards and backward.

> **Note that we have to provide our null pointers at two positions in a Doubly Linked List.**

![](https://miro.medium.com/max/60/1*dC05E_RyBA70oCMhUqslkQ.png?q=20)

![](https://miro.medium.com/max/4676/1*dC05E_RyBA70oCMhUqslkQ.png)

**Doubly Linked List**

> Forward and Backward Navigation is Possible

*   **Circular Linked List:** In this case, you can understand easily if you have good knowledge of the Single Linked List & Doubly Linked List. Now there are two subtypes of Circular Linked List **(Circular Singly Linked List** & **Circular Doubly Linked List).** In the case of a **_Circular Singly Linked List_**, we have everything similar to a Singly Linked List except that the last node of the Circular Singly Linked List points to the first node.

> On the other hand, a Circular Doubly Linked List is similar to a Doubly Linked List except that the last node of the **_Circular Doubly Linked List_** points to the first node & the first node points to the last node. You’ll get a better understanding in the picture below.

![](https://miro.medium.com/max/60/1*OQEF9OnOgMAGbunQ_ZnJqg.png?q=20)

![](https://miro.medium.com/max/4676/1*OQEF9OnOgMAGbunQ_ZnJqg.png)

**Circular Linked List**

> The Last Element is Linked to the First Element

2\. Stack & Queue
-----------------

*   **Stack:** They are linear data structure which follows the particular order in which the operations are performed. There are many real-life examples of a Stack, for example: Let’s say the stack of books in a library, where books are stacked over one another.
*   **Queue:** A good example of Queue would be any queue of customers for any resource, where the customer who came first in the queue will be served first, and the moment the first customer leaves the queue, more customers can line up from the back of the queue.

![](https://miro.medium.com/max/60/1*Ex-syq-BAiDQDLbOp3KUMg.png?q=20)

![](https://miro.medium.com/max/2338/1*Ex-syq-BAiDQDLbOp3KUMg.png)

**Stack & Queue**

3\. Merge Sort
--------------

It is a **_Divide and Conquer algorithm_**, where we divide the input array into two halves, which calls itself for the two halves and then merges the two sorted halves. _Take a look at the example that I have shown below for a better understanding._

*   We have an input array as mentioned in the example, in merge-sort when we divide the input array into two halves, we need to calculate the index of the element in that array so that we can divide the array into two halves.
*   Here, as we can see we have 5 elements in the array, so we divide 5 by 2, and as result, we get the index of the element where we have to divide the array.
*   As we get an index of 2, we simply divide the array from the 2nd index, later after that, the array on the left **(8,2)** can’t be divided further so we sort it according to the order & the converted array is now **2,8**.
*   Now we are dealing with the array on the right, using the same terminology of division to obtain the index, we keep dividing the array where it can’t be divided further, and after that, we sort them according to their order.

![](https://miro.medium.com/max/56/1*_UcpP5LlXmODBvHYWNFFQg.png?q=20)

![](https://miro.medium.com/max/4676/1*_UcpP5LlXmODBvHYWNFFQg.png)

**Merge Sort**

4\. Binary Tree
---------------

There is a lot to learn in binary trees, so I will just focus on the basic things that you have to know before getting started.

_A binary tree is a type of tree where each node has a maximum of two children._

*   **Binary Search Tree:** There is plenty number of applications to trees in Computer Science as they are used in **Databases, Autocompletion, Compression Algorithms, etc.** The Binary Search Tree is a type of binary tree where every node follows a property that orders them. Such as all the descendants < = n < all right descendants & the same goes for the subtrees.

![](https://miro.medium.com/max/60/1*ZHn_5COi0jNTkxQ6NHlalA.png?q=20)

![](https://miro.medium.com/max/4676/1*ZHn_5COi0jNTkxQ6NHlalA.png)

**Binary Search Tree**

5\. Graphs
----------

This data structure consists of a finite set of nodes and a set of edges that connects them. **_For example_**, a pair **(x,y)** is referred to as an edge, which communicates that the **_x node_** connects to the **_y node_**.

Graphs are used a lot of times to solve real-life problems that contain the complexity of networks, such as a user in a social website database can be represented as a node while the connection with another user can be represented as an edge between nodes. **_Where each node can store information of users._**

> Types of Graphs

*   **Undirected Graphs:** Nodes are connected by edges in a bidirectional manner, so that if an edge connects two nodes then we can transverse from Node 1 to Node 2 or vice-versa.
*   **Directed Graphs:** Nodes are connected by directed edges only in a directional manner so that if an edge connects two nodes we can only transverse from Node 1 and Node 2 and not in the opposite direction.

![](https://miro.medium.com/max/60/1*42WIX_dHLenhgYeF9H1nPQ.png?q=20)

![](https://miro.medium.com/max/2800/1*42WIX_dHLenhgYeF9H1nPQ.png)

**Graphs**

6\. Hash Tables
---------------

If you are new to learning Data Structures & Algorithms, then Hash Tables are quite difficult to understand in practical cases, as they are more complex compared to the basic Data Structures. Hash Tables are used in building **Spell Checkers**, **Compilers, Dictionaries** & **Code Editors.**

Inside a Hash Table, the data is stored in key-value pairs, and the key is sent to a hash function that performs arithmetic operations on it & the results are called the **_hash value_** which is the index of the key-value pair in the Hash Table.

**_A basic Hash Table consists of two parts:_**

*   **Hash Function:** It determines the index of our key-value pair.
*   **Array:** It holds all the key-value entries in the table, where the size of the array is set according to the amount of data we expect.

![](https://miro.medium.com/max/60/1*Rqz1bgqudZmo4sKCTj9OtQ.png?q=20)

![](https://miro.medium.com/max/2800/1*Rqz1bgqudZmo4sKCTj9OtQ.png)

**Hash Tables**

7\. Big O Notation
------------------

In simple words, _Big O Notation_ describes the performance of an algorithm, which gives us an idea about how the algorithm will perform when provided a large number of input data.

**_For example,_** _we can easily access an array element through its index, it will be fast enough, but if we have to_ **_add_** _or_ **_delete_** _items in the array it gets costly if the input data is too big. Similarly, if we need to add or delete items we have_ **_Linked Lists_** _which can grow or shrink very quickly but_ **_accessing an item through its index is slow_**_. And that’s where Big O Notation comes into action when we have to choose our algorithm according to our required performance._

8\. Linear Search
-----------------

It finds a given element in a list of elements with **O(n)** time complexity where **n** represents the total number of elements in the list. This is considered as the simplest search algorithm as the process starts with comparing the search element with the first element in the list and if both are matched then we obtain the results otherwise it keeps comparing to the next element in the list.

![](https://miro.medium.com/max/60/1*c0wLsZreLODCFgqIOB55-w.png?q=20)

![](https://miro.medium.com/max/2800/1*c0wLsZreLODCFgqIOB55-w.png)

**Linear Search**

9\. Bubble Sort
---------------

A simple sorting algorithm that swaps adjacent elements if they are in the incorrect order and then iterates through the array multiple times until the elements are in the correct order.

**_For example:_**

*   We have an array of 4 elements having their associated index **(0,1,2,3)**, using Bubble Sort we sort the highest value by swapping the adjacent elements.
*   We compare the index **0** & **1**, arrange them in order and move on to the next swapping operation, and so on until we find the highest value in the correct order we have to keep iterating the array.

> The reason why it's called Bubble Sort is that after every iteration the elements having the highest value are moved to the most right position, which is called a bubble.

![](https://miro.medium.com/max/60/1*_JWBwFS5I8l6XvRzk58t2A.png?q=20)

![](https://miro.medium.com/max/3920/1*_JWBwFS5I8l6XvRzk58t2A.png)

**Bubble Sort**


[Source](https://javascript.plainenglish.io/9-data-structures-algorithms-you-should-know-as-a-developer-5e10946c95a0)