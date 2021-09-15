# Data Structures in JavaScript

> For Frontend Software Engineers

For Frontend Software Engineers
-------------------------------

[![Thon Ly](https://miro.medium.com/fit/c/96/96/1*GEKuz1L4KPVBovXQLXM6sA.jpeg)](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/@thonly?source=post_page-----1b9aed0ea17c--------------------------------)

![Image for post](https://miro.medium.com/max/60/1*hj2M1t554I3w8SBorwlM2A.jpeg?q=20)

![Image for post](https://miro.medium.com/max/2560/1*hj2M1t554I3w8SBorwlM2A.jpeg)

As _business logic_ moves from the back to the front more and more, expertise in _Frontend Engineering_ becomes ever more crucial. As **Frontend Engineers**, we depend on view libraries like **React** to be productive. View libraries in turn depend on state libraries like **Redux** to manage the data. Together, React and Redux subscribe to the _reactive programming_ paradigm in which UI updates _react_ to data changes. Increasingly, backends act simply as API servers, providing endpoints only to retrieve and update the data. In effect, the backend just “forwards" the _database_ to the frontend, expecting the Frontend Engineer to handle all the controller logic. The rising popularity of _microservices_ and **GraphQL** attest to this growing trend.

Now, in addition to having aesthetic understanding of HTML and CSS, Frontend Engineers are expected to master JavaScript as well. As datastores on the client become “replicas" of databases on the server, intimate knowledge of idiomatic data structures becomes pivotal. In fact, an engineer’s level of experience can be inferred from his or her ability to distinguish _when_ and _why_ to use a particular data structure.

> Bad programmers worry about the code. Good programmers worry about data structures and their relationships.
> 
> — Linus Torvalds, Creator of Linux and Git

At a high level, there are basically three types of data structures. **Stacks** and **Queues** are _array-like_ structures that differ only in how items are inserted and removed. **Linked Lists**, **Trees**, and **Graphs** are structures with _nodes_ that keep _references_ to other nodes. **Hash Tables** depend on _hash functions_ to save and locate data.

In terms of complexity, `Stacks` and `Queues` are the simplest and can be constructed from `Linked Lists`. `Trees` and `Graphs` are the most complex because they extend the concept of a linked list. `Hash Tables` need to utilize these data structures to perform reliably. In terms of efficiency, **Linked Lists** are most optimal for _recording_ and _storing_ of data, while **Hash Tables** are most performant for _searching_ and _retrieving_ of data.

To explain _why_ and illustrate _when_, this article will conform to the order of these dependencies. Let’s begin!

Arguably the most important `Stack` in JavaScript is the **call stack** where we push in the **scope** of a `function` whenever we execute it. Programmatically, it’s just an `array` with two principled operations: `push` and `pop`. **Push** _adds_ elements to the _top_ of the array, while **Pop** _removes_ them from the same location. In other words, **Stacks** follow the “Last In, First Out" protocol (LIFO).

Below is an example of a `Stack` in code. Notice that we can _reverse_ the order of the stack: the bottom becomes the top and the top becomes the bottom. As such, we can use the array’s `unshift` and `shift` methods in place of `push` and `pop`, respectively.

As the number of items grows, `push`/`pop` becomes increasingly more performant than `unshift`/`shift` because every item needs to be reindexed in the latter but not the former.

JavaScript is an **event-driven** programming language which makes it possible to support _non-blocking_ operations. Internally, the browser manages only _one thread_ to run the entire JavaScript code, using the **event queue** to _enqueue_ `listeners` and the **event loop** to _listen_ for the registered `events`. To support asynchronicity in a single-threaded environment (to save CPU resources and enhance the web experience), `listener functions` _dequeue_ and execute only when the **call stack** is empty. `Promises` depend on this _event-driven_ **architecture** to allow a “synchronous-style" execution of asynchronous code that does not block other operations.

Programmatically, `Queues` are just arrays with two primary operations: `unshift` and `pop`. **Unshift** _enqueues_ items to the _end_ of the array, while **Pop** _dequeues_ them from the _beginning_ of the array. In other words, **Queues** follow the “First In, First Out" protocol (FIFO). If the direction is reversed, we can replace `unshift` and `pop` with `push` and `shift`, respectively.

An example of a `Queue` in code:

Like arrays, `Linked Lists` store data elements in _sequential_ order. Instead of keeping indexes, linked lists hold _pointers_ to other elements. The _first_ _node_ is called the **head** while the _last_ _node_ is called the **tail**. In a **singly-linked list**, each node has only one pointer to the _next_ node. Here, the _head_ is where we begin our walk down the rest of the list. In a **doubly-linked list**, a pointer to the _previous_ node is also kept. Therefore, we can also start from the _tail_ and walk “backwards" toward the head.

Linked lists have **_constant-time_** _insertions_ and _deletions_ because we can just change the pointers. To do the same operations in arrays requires _linear time_ because subsequent items need to be shifted over. Also, linked lists can grow as long as there is space. However, even “dynamic" arrays that automatically resize could become unexpectedly expensive. Of course, there’s always a tradeoff. To lookup or edit an element in a linked list, we might have to walk the entire length which equates to linear time. With array indexes, however, such operations are trivial.

Like arrays, linked lists can operate as _stacks_. It’s as simple as having the head be the only place for insertion and removal. Linked lists can also operate as _queues_. This can be achieved with a doubly-linked list, where insertion occurs at the tail and removal occurs at the head, or vice versa. For large numbers of elements, this way of implementing queues is more performant than using arrays because `shift` and `unshift` operations at the beginning of arrays require linear time to re-index every subsequent element.

Linked lists are useful on both the client and server. On the client, state management libraries like **Redux** structure its middleware logic in a linked-list fashion. When _actions_ are dispatched, they are piped from one middleware to the next until all is visited before reaching the _reducers_. On the server, web frameworks like **Express** also structure its middleware logic in a similar fashion. When a _request_ is received, it is piped from one middleware to the next until a _response_ is issued.

An example of a `Doubly-Linked List` in code:

A `Tree` is like a _linked list_, except it keeps references to _many_ **child nodes** in a _hierarchical_ structure. In other words, each node can have no more than one parent. The **Document Object Model** (DOM) is such a structure, with a root `html` node that branches into the `head` and `body` nodes, which further subdivide into all the familiar _html tags_. Under the hood, _prototypal inheritance_ and _composition_ with React components also produce tree structures. Of course, as an in-memory representation of the DOM, React’s **Virtual DOM** is also a tree structure.

The **Binary Search Tree** is special because each node can have no more than _two children_. The **left child** must have a value that is _smaller than_ or equal to its parent, while the **right child** must have a _greater value_. Structured and balanced in this way, we can _search_ for any value in _logarithmic_ time because we can ignore one-half of the branching with each iteration. _Inserting_ and _deleting_ can also happen in logarithmic time. Moreover, the _smallest_ and _largest_ _value_ can easily be found at the _leftmost_ and _rightmost_ _leaf_, respectively.

Traversal through the tree can happen in a _vertical_ or _horizontal_ procedure. In **Depth-First Traversal** (DFT) in the vertical direction, a recursive algorithm is more elegant than an iterative one. Nodes can be traversed in _pre-order_, _in-order_, or _post-order_. If we need to explore the roots before inspecting the leaves, we should choose _pre-order_. But, if we need to explore the leaves before the roots, we should choose _post-order_. As its name implies, _in-order_ enables us to traverse the nodes in _sequential_ order. This property makes Binary Search Trees optimal for _sorting_.

In **Breadth-First Traversal** (BFT) in the horizontal direction, an iterative approach is more elegant than a recursive one. This requires the use of a `queue` to track all the children nodes with each iteration. The memory needed for such a queue might not be trivial, however. If the shape of a tree is wider than deep, BFT is a better choice than DFT. Also, the path that BFT takes between any two nodes is the shortest one possible.

An example of a `Binary Search Tree` in code:

If a tree is free to have more than one parent, it becomes a `Graph`. **Edges** that connect nodes together in a graph can be _directed_ or _undirected, weighted_ or _unweighted_. Edges that have both direction and weight are analogous to _vectors_.

Multiple inheritances in the form of _Mixins_ and data objects that have _many-to-many_ relationships produce graph structures. A social network and the Internet itself are also graphs. The most complicated graph in nature is our human brain, which **neural networks** attempt to replicate to give machines _superintelligence_.

An example of a `Graph` in code:

TK

A **Hash Table** is a dictionary-like structure that pairs _keys_ to _values_. The location in memory of each pair is determined by a `hash function`, which accepts a _key_ and returns the _address_ where the pair should be inserted and retrieved. Collisions can result if two or more keys convert to the same address. For robustness, `getters` and `setters` should anticipate these events to ensure that all data can be recovered and no data is overwritten. Usually, `linked lists` offer the simplest solution. Having very large tables also helps.

If we know our addresses will be in integer sequences, we can simply use `Arrays` to store our key-value pairs. For more complex address mappings, we can use `Maps` or `Objects`. Hash tables have insertion and lookup of _constant_ time on average. Because of collisions and resizing, this negligible cost could grow to linear time. In practice, however, we can assume that hash functions are clever enough that collisions and resizing are rare and cheap. If keys represent addresses, and therefore no hashing is needed, a simple `object literal` can suffice. Of course, there’s always a tradeoff. The simple correspondence between keys and values, and the simple associativity between keys and addresses, sacrifice relationships _between_ data. Thus, hash tables are suboptimal for _storing_ data.

If a tradeoff decision favors retrieval over storage, no other data structure can match the speed of hash tables for _lookup_, _insertion_, and _deletion_. It’s no surprise, therefore, that it’s used _everywhere_. From the database, to the server, to the client, _hash tables_, and in particular, _hash functions_, are crucial to the performance and security of software applications. The speed of **database** **queries** relies heavily upon keeping tables of _indexes_ that point to records in _sorted_ order. This way, _binary searches_ can be performed in _logarithmic_ time, a huge performance win especially for **Big Data**.

On both the client and server, many popular libraries utilize **memoization** to maximize performance. By keeping a record of the _inputs_ and _outputs_ in a hash table, functions run only once for the same inputs. The popular **Reselect** library uses this caching strategy to optimize `mapStateToProps` functions in **Redux**\-enabled applications. In fact, under the hood, the JavaScript engine also utilizes hash tables called _heaps_ to store all the `variables` and `primitives` we create. They are accessed from _pointers_ on the _call stack_.

The **Internet** itself also relies on _hashing algorithms_ to function securely. The structure of the internet is such that any computer can communicate with any other computer through a _web_ of interconnected devices. Whenever a device logs onto the internet, it also becomes a _router_ through which data streams can travel. However, it’s a double-edged sword. A _decentralized_ architecture means any device in the network can listen in and tamper with the data packages that it helps to relay. Hash functions such as MD5 and SHA256 play a critical role in preventing such _man-in-the-middle_ attacks. E-commerce over HTTPS is safe only because these hashing functions are used.

Inspired by the Internet, **blockchain** technologies seek to _open source_ the very structure of the web _at the protocol level_. By using hash functions to create _immutable_ _fingerprints_ for every _block_ _of data_, essentially the entire database can exist _openly_ on the web for anyone to see and contribute to. Structurally, blockchains are just singly-linked lists of binary trees of cryptographic hashes. The hashing is so cryptic that a database of financial transactions can be created and updated _out in the open_ by anyone! The incredible implication is the awesome power to create _money_ itself. What was once only possible for governments and central banks, now _anyone_ can securely create his or her own _currency_! This is the key insight realized by the founder of **Ethereum** and the pseudonymous founder of **Bitcoin**.

As more and more databases move out into the open, the need for Frontend Engineers who can abstract away all the low-level cryptographic complexities will compound as well. In this future, the _main differentiator_ will be the **user experience**.

An example of a `Hash Table` in code:

_For algorithm exercises using these data structures and more, check out:_ [**_Algorithms in JavaScript: 40 Problems, Solutions, and Explanations_**](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/siliconwat/algorithms-in-javascript-b0bed68f4038)

As logic moves increasingly from the server to the client, the _data layer_ on the frontend becomes paramount. The proper management of this layer entails mastery of the data structures upon which logic rests. No one data structure is perfect for every situation because optimizing for one property always equates to losing another. Some structures are more efficient at storing data while some others are more performant for searching through them. Usually, one is sacrificed for the other. At one extreme, **linked lists** are optimal for storage and can be made into **stacks** and **queues** (_linear_ time). At the other, no other structure can match the search speed of **hash tables** (_constant_ time). **Tree** structures lie somewhere in the middle (_logarithmic_ time), and only a **graph** can portray nature’s most complex structure: the human brain (_polynomial time_). Having the skillset to distinguish _when_ and articulate _why_ is a hallmark of a rockstar engineer.

Examples of these data structures can be found _everywhere_. From the database, to the server, to the client, and even the JavaScript engine itself, these data structures concretize what essentially are just _on_ and _off_ “switches" on silicon chips into lifelike “objects". Though only digital, the impact these objects have on society is tremendous. Your ability to read this article freely and securely attests to the awesome architecture of the internet and the structure of its data. Yet, this is only the beginning. Artificial intelligence and decentralized blockchains in the coming decades will redefine what it means to be human and the role of institutions that govern our lives. Existential insights and institutional disintermediation will be characteristics of an internet that has finally matured.

To help transition us towards this more equitable future, we at

channel networks of _artificial neurons_ to imbue our

with the power to issue money on the blockchain, coupled with the capacity to empathize the human condition. From the _anonymous_ _thanks_ we give and receive by writing to

,

learns about our _kindnesses_ and their _effects_, rewarding us in such a way that reduces the economic inequities between us, in a gradual and mysterious process that preserves our personal liberty and freedom. Perhaps the ultimate graph structure in nature is not the human brain, but the human ❤️, if only we can see the _heartstrings_ that connect us all.

_Interested in_ **_blockchain_**_?_ [_Learn Ethereum_](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/heartbankacademy/a-complete-mental-model-for-ethereum-dapp-development-5ce08598ed0a) _and come work for us!_


[Source](https://medium.com/siliconwat/data-structures-in-javascript-1b9aed0ea17c)
