<!--
Created: Fri Oct 30 2020 17:46:04 GMT-0400 (Eastern Daylight Time)
Modified: Fri Oct 30 2020 17:46:04 GMT-0400 (Eastern Daylight Time)
-->

* [WEEK 8<br>*Getting to Know the Network* ](#week-8brgetting-to-know-the-network)
* [WEEK-08 <br>*Learning Objectives* ](#week-08-brlearning-objectives)
* [Binary Trees and Binary Search Trees](#binary-trees-and-binary-search-trees)
* [Graphs and Heaps](#graphs-and-heaps)
* [Network Models Objectives](#network-models-objectives)
* [Internet Protocol Suite Objectives](#internet-protocol-suite-objectives)
* [Network Tools](#network-tools)
* [WEEK-08 DAY-1<br>*White-Boarding Tips and Tricks* ](#week-08-day-1brwhite-boarding-tips-and-tricks)
* [White-Boarding Tips](#white-boarding-tips)
  + [Why do companies whiteboard?](#why-do-companies-whiteboard)
  + [Correct steps](#correct-steps)
  + [Clarification](#clarification)
  + [Test I/O](#test-io)
  + [Pseudocode](#pseudocode)
  + [During the Problem](#during-the-problem)
  + [Walk through an example input](#walk-through-an-example-input)
  + [Time and space complexity](#time-and-space-complexity)
  + [Strategies](#strategies)
  + [Don't be Sly](#dont-be-sly)
  + [How to handle questions you've seen before.](#how-to-handle-questions-youve-seen-before)
* [White Boarding Exercises](#white-boarding-exercises)
  + [Mirror image trees](#mirror-image-trees)
  + [Reverse a linked list](#reverse-a-linked-list)
  + [The missing value](#the-missing-value)
  + [Stack min](#stack-min)
  + [Test a retractable ballpoint pen](#test-a-retractable-ballpoint-pen)
  + [OOParking Lot](#ooparking-lot)

---
---

- [Binary Tree Level Order Traversal](#binary-tree-level-order-traversal)
  - [102. Binary Tree Level Order Traversal](#102-binary-tree-level-order-traversal)
    - [Problem:](#problem-1)
    - [Solution:](#solution-1)
- [Max Depth Of Binary Tree](#max-depth-of-binary-tree)
  - [104. Maximum Depth of Binary Tree](#104-maximum-depth-of-binary-tree)
    - [Problem:](#problem-2)
    - [Solution:](#solution-2)
  - ["Construct Binary Tree from Inorder and Postorder Traversal": https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal](#construct-binary-tree-from-inorder-and-postorder-traversal-httpsleetcodecomproblemsconstruct-binary-tree-from-inorder-and-postorder-traversal)
  - [105. Construct Binary Tree from Preorder and Inorder Traversal](#105-construct-binary-tree-from-preorder-and-inorder-traversal)
    - [Problem:](#problem-3)
    - [Solution:](#solution-3)
  - ["Average of Levels in Binary Tree": https://leetcode.com/problems/average-of-levels-in-binary-tree](#average-of-levels-in-binary-tree-httpsleetcodecomproblemsaverage-of-levels-in-binary-tree)
  - [107. Binary Tree Level Order Traversal II](#107-binary-tree-level-order-traversal-ii)
    - [Problem:](#problem-4)
    - [Solution:](#solution-4)
  - [2. "Maximum Depth of Binary Tree": https://leetcode.com/problems/maximum-depth-of-binary-tree](#2-maximum-depth-of-binary-tree-httpsleetcodecomproblemsmaximum-depth-of-binary-tree)
  - [111. Minimum Depth of Binary Tree](#111-minimum-depth-of-binary-tree)
    - [Solution:](#solution-5)
  - [114. Flatten Binary Tree to Linked List](#114-flatten-binary-tree-to-linked-list)
    - [Problem:](#problem-5)
    - [Solution:](#solution-6)
  - [<==============(BINARY SEARCH TREE)==================>](#binary-search-tree)
  - [1. Two Sum](#1-two-sum)
    - [Problem:](#problem-6)
    - [Solution:](#solution-7)
  - [94. Binary Tree Inorder Traversal](#94-binary-tree-inorder-traversal)
    - [Problem:](#problem-7)
    - [Solution:](#solution-8)
      - [ONE](#one-1)
      - [TWO](#two-1)
  - [108. Convert Sorted Array to Binary Search Tree](#108-convert-sorted-array-to-binary-search-tree)
    - [Problem:](#problem-8)
    - [Solution:](#solution-9)
  - [17. Letter Combinations of a Phone Number](#17-letter-combinations-of-a-phone-number)
    - [Problem:](#problem-9)
    - [Solution:](#solution-10)
      - [ONE](#one-2)
      - [TWO](#two-2)
  - [133. Clone Graph](#133-clone-graph)
    - [Problem:](#problem-10)
    - [Solution:](#solution-11)

---
---

* [WEEK-08 DAY-3<br>*Graphs* ](#week-08-day-3brgraphs)
* [Graphs and Heaps](#graphs-and-heaps-1)
* [Graphs](#graphs)
  + [What is a Graph?](#what-is-a-graph-1)
  + [Graph Implementations](#graph-implementations)
    - [GraphNode Class](#graphnode-class)
    - [Adjacency Matrix](#adjacency-matrix)
    - [Adjacency List](#adjacency-list)
* [Graph Traversal](#graph-traversal)
  + [Graph Traversal w/ GraphNode](#graph-traversal-w-graphnode)
    - [Graph Traversal w/ Adjacency List](#graph-traversal-w-adjacency-list)
* [Graph Project](#graph-project)
  + [Instructions](#instructions-2)
  + [Friends of](#friends-of)

---
---

* [WEEK-08 DAY-4<br>*Network Knowledge* ](#week-08-day-4brnetwork-knowledge)
* [Network Models Objectives](#network-models-objectives-1)
* [Internet Protocol Suite Objectives](#internet-protocol-suite-objectives-1)
* [Network Tools](#network-tools-1)
* [The OSI Network Model](#the-osi-network-model)
  + [More layers, ~~more~~ fewer problems?](#more-layers-smores-fewer-problems)
  + [The layers of the OSI model](#the-layers-of-the-osi-model)
    - [Application](#application)
    - [Presentation](#presentation)
    - [Session](#session)
    - [Transport](#transport)
    - [Network](#network)
    - [Data Link](#data-link)
    - [Physical](#physical)
  + [Which model do I use?](#which-model-do-i-use)
  + [What we've learned](#what-weve-learned)
* [TCP/IP: Four Layers](#tcpip-four-layers)
  + [A layered approach](#a-layered-approach)
  + [Layers of the TCP/IP model](#layers-of-the-tcpip-model)
    - [Application](#application-1)
    - [Transport](#transport-1)
    - [Internet](#internet)
    - [Link](#link)
  + [Translating layers to data](#translating-layers-to-data)
  + [What we've learned](#what-weve-learned-1)
* [A Crash Course in Binary and Hexadecimal Notation](#a-crash-course-in-binary-and-hexadecimal-notation)
  + [Binary](#binary)
    - [Bases](#bases)
    - [Base 2](#base-2)
  + [Bits and Bytes](#bits-and-bytes)
  + [Another useful base](#another-useful-base)
    - [The `0x` Notation](#the-0x-notation)
  + [In JavaScript](#in-javascript)
* [In conclusion](#in-conclusion)
* [Internet Protocol](#internet-protocol)
  + [History of IP](#history-of-ip)
    - [The great divide](#the-great-divide)
  + [So what is the Internet, exactly?](#so-what-is-the-internet-exactly)
  + [Packet-Switching](#packet-switching)
  + [IP Versions](#ip-versions)
    - [IPv4](#ipv4)
    - [IPv4 Addresses](#ipv4-addresses)
    - [IPv6](#ipv6)
    - [IPv6 Addresses](#ipv6-addresses)
    - [Special addresses](#special-addresses)
  + [What we've learned](#what-weve-learned-2)
* [Transport Protocols](#transport-protocols)
  + [What exactly are we transporting?](#what-exactly-are-we-transporting)
    - [Ports](#ports)
  + [TCP](#tcp)
  + [UDP](#udp)
  + [What we've learned](#what-weve-learned-3)
* [Surveying Your Domain](#surveying-your-domain)
  + [What is DNS?](#what-is-dns)
    - [Domains?](#domains)
  + [How The Magic Happens](#how-the-magic-happens)
  + [DNS Records](#dns-records)
    - [`SOA`](#soa)
    - [`NS`](#ns)
    - [`A` / `AAAA`](#a--aaaa)
    - [`CNAME`](#cname)
    - [`MX`](#mx)
    - [Metadata](#metadata)
  + [What we've learned](#what-weve-learned-4)
* [Networking Hardware: Getting Physical](#networking-hardware-getting-physical)
  + [Three levels of control](#three-levels-of-control)
    - [Hubs: keeping it simple](#hubs-keeping-it-simple)
    - [Switches: traffic control](#switches-traffic-control)
    - [Routers: thinking globally](#routers-thinking-globally)
  + [A practical example of network hardware](#a-practical-example-of-network-hardware)
  + [Integrated devices](#integrated-devices)
  + [What we've learned](#what-weve-learned-5)
* [TCP Connections](#tcp-connections)
  + [Segments](#segments)
    - [Segment Header Fields](#segment-header-fields)
  + [TCP Connection Lifecycle](#tcp-connection-lifecycle)
    - [Control Flag Options](#control-flag-options)
    - [Getting to know each other: the three-way handshake](#getting-to-know-each-other-the-three-way-handshake)
    - [Data transmission & error handling](#data-transmission--error-handling)
    - [Saying goodbye: closing the connection](#saying-goodbye-closing-the-connection)
    - [The TCP Socket State Lifecycle](#the-tcp-socket-state-lifecycle)
  + [What we've learned](#what-weve-learned-6)
* [Following The Trail With `traceroute`](#following-the-trail-with-traceroute)
  + [Where are we going?](#where-are-we-going)
  + [Reading a trace](#reading-a-trace)
    - [Metadata](#metadata-1)
    - [The Hop](#the-hop)
    - [Special cases](#special-cases)
  + [When should I run a trace?](#when-should-i-run-a-trace)
  + [What we've learned](#what-weve-learned-7)
* [Use Wireshark To Capture Network Traffic](#use-wireshark-to-capture-network-traffic)
  + [Installing Wireshark](#installing-wireshark)
  + [Capturing packets](#capturing-packets)
  + [Color coding](#color-coding)
  + [Sample captures](#sample-captures)
  + [Filtering packets](#filtering-packets)
  + [Inspecting packets](#inspecting-packets)
  + [Assignment](#assignment)
* [DIY Flashcards](#diy-flashcards)

---
---
END OF TABLE OF CONTENTS
---
---

* [Binary Trees and Binary Search Trees](#binary-trees-and-binary-search-trees)
* [Graphs and Heaps](#graphs-and-heaps)
* [Network Models Objectives](#network-models-objectives)
* [Internet Protocol Suite Objectives](#internet-protocol-suite-objectives)
* [Network Tools](#network-tools)
* [WEEK-08 DAY-1<br>*White-Boarding Tips and Tricks* ](#week-08-day-1brwhite-boarding-tips-and-tricks)
* [White-Boarding Tips](#white-boarding-tips)
  + [Why do companies whiteboard?](#why-do-companies-whiteboard)
  + [Correct steps](#correct-steps)
  + [Clarification](#clarification)
  + [Test I/O](#test-io)
  + [Pseudocode](#pseudocode)
  + [During the Problem](#during-the-problem)
  + [Walk through an example input](#walk-through-an-example-input)
  + [Time and space complexity](#time-and-space-complexity)
  + [Strategies](#strategies)
  + [Don't be Sly](#dont-be-sly)
  + [How to handle questions you've seen before.](#how-to-handle-questions-youve-seen-before)
* [White Boarding Exercises](#white-boarding-exercises)
  + [Mirror image trees](#mirror-image-trees)
  + [Reverse a linked list](#reverse-a-linked-list)
  + [The missing value](#the-missing-value)
  + [Stack min](#stack-min)
  + [Test a retractable ballpoint pen](#test-a-retractable-ballpoint-pen)
  + [OOParking Lot](#ooparking-lot)

---
---

- [Binary Tree Level Order Traversal](#binary-tree-level-order-traversal)
  - [102. Binary Tree Level Order Traversal](#102-binary-tree-level-order-traversal)
    - [Problem:](#problem-1)
    - [Solution:](#solution-1)
- [Max Depth Of Binary Tree](#max-depth-of-binary-tree)
  - [104. Maximum Depth of Binary Tree](#104-maximum-depth-of-binary-tree)
    - [Problem:](#problem-2)
    - [Solution:](#solution-2)
  - ["Construct Binary Tree from Inorder and Postorder Traversal": https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal](#construct-binary-tree-from-inorder-and-postorder-traversal-httpsleetcodecomproblemsconstruct-binary-tree-from-inorder-and-postorder-traversal)
  - [105. Construct Binary Tree from Preorder and Inorder Traversal](#105-construct-binary-tree-from-preorder-and-inorder-traversal)
    - [Problem:](#problem-3)
    - [Solution:](#solution-3)
  - ["Average of Levels in Binary Tree": https://leetcode.com/problems/average-of-levels-in-binary-tree](#average-of-levels-in-binary-tree-httpsleetcodecomproblemsaverage-of-levels-in-binary-tree)
  - [107. Binary Tree Level Order Traversal II](#107-binary-tree-level-order-traversal-ii)
    - [Problem:](#problem-4)
    - [Solution:](#solution-4)
  - [2. "Maximum Depth of Binary Tree": https://leetcode.com/problems/maximum-depth-of-binary-tree](#2-maximum-depth-of-binary-tree-httpsleetcodecomproblemsmaximum-depth-of-binary-tree)
  - [111. Minimum Depth of Binary Tree](#111-minimum-depth-of-binary-tree)
    - [Solution:](#solution-5)
  - [114. Flatten Binary Tree to Linked List](#114-flatten-binary-tree-to-linked-list)
    - [Problem:](#problem-5)
    - [Solution:](#solution-6)
  - [<==============(BINARY SEARCH TREE)==================>](#binary-search-tree)
  - [1. Two Sum](#1-two-sum)
    - [Problem:](#problem-6)
    - [Solution:](#solution-7)
  - [94. Binary Tree Inorder Traversal](#94-binary-tree-inorder-traversal)
    - [Problem:](#problem-7)
    - [Solution:](#solution-8)
      - [ONE](#one-1)
      - [TWO](#two-1)
  - [108. Convert Sorted Array to Binary Search Tree](#108-convert-sorted-array-to-binary-search-tree)
    - [Problem:](#problem-8)
    - [Solution:](#solution-9)
  - [17. Letter Combinations of a Phone Number](#17-letter-combinations-of-a-phone-number)
    - [Problem:](#problem-9)
    - [Solution:](#solution-10)
      - [ONE](#one-2)
      - [TWO](#two-2)
  - [133. Clone Graph](#133-clone-graph)
    - [Problem:](#problem-10)
    - [Solution:](#solution-11)

---
---

* [WEEK-08 DAY-3<br>*Graphs* ](#week-08-day-3brgraphs)
* [Graphs and Heaps](#graphs-and-heaps-1)
* [Graphs](#graphs)
  + [What is a Graph?](#what-is-a-graph-1)
  + [Graph Implementations](#graph-implementations)
    - [GraphNode Class](#graphnode-class)
    - [Adjacency Matrix](#adjacency-matrix)
    - [Adjacency List](#adjacency-list)
* [Graph Traversal](#graph-traversal)
  + [Graph Traversal w/ GraphNode](#graph-traversal-w-graphnode)
    - [Graph Traversal w/ Adjacency List](#graph-traversal-w-adjacency-list)
* [Graph Project](#graph-project)
  + [Instructions](#instructions-2)
  + [Friends of](#friends-of)

---
---

* [WEEK-08 DAY-4<br>*Network Knowledge* ](#week-08-day-4brnetwork-knowledge)
* [Network Models Objectives](#network-models-objectives-1)
* [Internet Protocol Suite Objectives](#internet-protocol-suite-objectives-1)
* [Network Tools](#network-tools-1)
* [The OSI Network Model](#the-osi-network-model)
  + [More layers, ~~more~~ fewer problems?](#more-layers-smores-fewer-problems)
  + [The layers of the OSI model](#the-layers-of-the-osi-model)
    - [Application](#application)
    - [Presentation](#presentation)
    - [Session](#session)
    - [Transport](#transport)
    - [Network](#network)
    - [Data Link](#data-link)
    - [Physical](#physical)
  + [Which model do I use?](#which-model-do-i-use)
  + [What we've learned](#what-weve-learned)
* [TCP/IP: Four Layers](#tcpip-four-layers)
  + [A layered approach](#a-layered-approach)
  + [Layers of the TCP/IP model](#layers-of-the-tcpip-model)
    - [Application](#application-1)
    - [Transport](#transport-1)
    - [Internet](#internet)
    - [Link](#link)
  + [Translating layers to data](#translating-layers-to-data)
  + [What we've learned](#what-weve-learned-1)
* [A Crash Course in Binary and Hexadecimal Notation](#a-crash-course-in-binary-and-hexadecimal-notation)
  + [Binary](#binary)
    - [Bases](#bases)
    - [Base 2](#base-2)
  + [Bits and Bytes](#bits-and-bytes)
  + [Another useful base](#another-useful-base)
    - [The `0x` Notation](#the-0x-notation)
  + [In JavaScript](#in-javascript)
* [In conclusion](#in-conclusion)
* [Internet Protocol](#internet-protocol)
  + [History of IP](#history-of-ip)
    - [The great divide](#the-great-divide)
  + [So what is the Internet, exactly?](#so-what-is-the-internet-exactly)
  + [Packet-Switching](#packet-switching)
  + [IP Versions](#ip-versions)
    - [IPv4](#ipv4)
    - [IPv4 Addresses](#ipv4-addresses)
    - [IPv6](#ipv6)
    - [IPv6 Addresses](#ipv6-addresses)
    - [Special addresses](#special-addresses)
  + [What we've learned](#what-weve-learned-2)
* [Transport Protocols](#transport-protocols)
  + [What exactly are we transporting?](#what-exactly-are-we-transporting)
    - [Ports](#ports)
  + [TCP](#tcp)
  + [UDP](#udp)
  + [What we've learned](#what-weve-learned-3)
* [Surveying Your Domain](#surveying-your-domain)
  + [What is DNS?](#what-is-dns)
    - [Domains?](#domains)
  + [How The Magic Happens](#how-the-magic-happens)
  + [DNS Records](#dns-records)
    - [`SOA`](#soa)
    - [`NS`](#ns)
    - [`A` / `AAAA`](#a--aaaa)
    - [`CNAME`](#cname)
    - [`MX`](#mx)
    - [Metadata](#metadata)
  + [What we've learned](#what-weve-learned-4)
* [Networking Hardware: Getting Physical](#networking-hardware-getting-physical)
  + [Three levels of control](#three-levels-of-control)
    - [Hubs: keeping it simple](#hubs-keeping-it-simple)
    - [Switches: traffic control](#switches-traffic-control)
    - [Routers: thinking globally](#routers-thinking-globally)
  + [A practical example of network hardware](#a-practical-example-of-network-hardware)
  + [Integrated devices](#integrated-devices)
  + [What we've learned](#what-weve-learned-5)
* [TCP Connections](#tcp-connections)
  + [Segments](#segments)
    - [Segment Header Fields](#segment-header-fields)
  + [TCP Connection Lifecycle](#tcp-connection-lifecycle)
    - [Control Flag Options](#control-flag-options)
    - [Getting to know each other: the three-way handshake](#getting-to-know-each-other-the-three-way-handshake)
    - [Data transmission & error handling](#data-transmission--error-handling)
    - [Saying goodbye: closing the connection](#saying-goodbye-closing-the-connection)
    - [The TCP Socket State Lifecycle](#the-tcp-socket-state-lifecycle)
  + [What we've learned](#what-weve-learned-6)
* [Following The Trail With `traceroute`](#following-the-trail-with-traceroute)
  + [Where are we going?](#where-are-we-going)
  + [Reading a trace](#reading-a-trace)
    - [Metadata](#metadata-1)
    - [The Hop](#the-hop)
    - [Special cases](#special-cases)
  + [When should I run a trace?](#when-should-i-run-a-trace)
  + [What we've learned](#what-weve-learned-7)
* [Use Wireshark To Capture Network Traffic](#use-wireshark-to-capture-network-traffic)
  + [Installing Wireshark](#installing-wireshark)
  + [Capturing packets](#capturing-packets)
  + [Color coding](#color-coding)
  + [Sample captures](#sample-captures)
  + [Filtering packets](#filtering-packets)
  + [Inspecting packets](#inspecting-packets)
  + [Assignment](#assignment)
* [DIY Flashcards](#diy-flashcards)

------
------
------
------

------
------
------
------

------
------
------
------

- [Binary Tree Level Order Traversal](#binary-tree-level-order-traversal)
  - [102. Binary Tree Level Order Traversal](#102-binary-tree-level-order-traversal)
    - [Problem:](#problem-1)
    - [Solution:](#solution-1)
- [Max Depth Of Binary Tree](#max-depth-of-binary-tree)
  - [104. Maximum Depth of Binary Tree](#104-maximum-depth-of-binary-tree)
    - [Problem:](#problem-2)
    - [Solution:](#solution-2)
  - ["Construct Binary Tree from Inorder and Postorder Traversal": https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal](#construct-binary-tree-from-inorder-and-postorder-traversal-httpsleetcodecomproblemsconstruct-binary-tree-from-inorder-and-postorder-traversal)
  - [105. Construct Binary Tree from Preorder and Inorder Traversal](#105-construct-binary-tree-from-preorder-and-inorder-traversal)
    - [Problem:](#problem-3)
    - [Solution:](#solution-3)
  - ["Average of Levels in Binary Tree": https://leetcode.com/problems/average-of-levels-in-binary-tree](#average-of-levels-in-binary-tree-httpsleetcodecomproblemsaverage-of-levels-in-binary-tree)
  - [107. Binary Tree Level Order Traversal II](#107-binary-tree-level-order-traversal-ii)
    - [Problem:](#problem-4)
    - [Solution:](#solution-4)
  - [2. "Maximum Depth of Binary Tree": https://leetcode.com/problems/maximum-depth-of-binary-tree](#2-maximum-depth-of-binary-tree-httpsleetcodecomproblemsmaximum-depth-of-binary-tree)
  - [111. Minimum Depth of Binary Tree](#111-minimum-depth-of-binary-tree)
    - [Solution:](#solution-5)
  - [114. Flatten Binary Tree to Linked List](#114-flatten-binary-tree-to-linked-list)
    - [Problem:](#problem-5)
    - [Solution:](#solution-6)
  - [<==============(BINARY SEARCH TREE)==================>](#binary-search-tree)
  - [1. Two Sum](#1-two-sum)
    - [Problem:](#problem-6)
    - [Solution:](#solution-7)
  - [94. Binary Tree Inorder Traversal](#94-binary-tree-inorder-traversal)
    - [Problem:](#problem-7)
    - [Solution:](#solution-8)
      - [ONE](#one-1)
      - [TWO](#two-1)
  - [108. Convert Sorted Array to Binary Search Tree](#108-convert-sorted-array-to-binary-search-tree)
    - [Problem:](#problem-8)
    - [Solution:](#solution-9)
  - [17. Letter Combinations of a Phone Number](#17-letter-combinations-of-a-phone-number)
    - [Problem:](#problem-9)
    - [Solution:](#solution-10)
      - [ONE](#one-2)
      - [TWO](#two-2)
  - [133. Clone Graph](#133-clone-graph)
    - [Problem:](#problem-10)
    - [Solution:](#solution-11)

  "Hash Table": https://leetcode.com/tag/hash-table

  1. "Stack": https://leetcode.com/tag/stack
  2. "Tree": https://leetcode.com/tag/tree
* SimilarQuestions:

  "Validate Binary Search Tree": https://leetcode.com/problems/validate-binary-search-tree
  "Binary Tree Preorder Traversal": https://leetcode.com/problems/binary-tree-preorder-traversal

  1. "Binary Tree Postorder Traversal": https://leetcode.com/problems/binary-tree-postorder-traversal
  2. "Binary Search Tree Iterator": https://leetcode.com/problems/binary-search-tree-iterator
  3. "Kth Smallest Element in a BST": https://leetcode.com/problems/kth-smallest-element-in-a-bst
  4. "Closest Binary Search Tree Value II": https://leetcode.com/problems/closest-binary-search-tree-value-ii
  5. "Inorder Successor in BST": https://leetcode.com/problems/inorder-successor-in-bst
  6. "Convert Binary Search Tree to Sorted Doubly Linked List": https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list
  7. "Minimum Distance Between BST Nodes": https://leetcode.com/problems/minimum-distance-between-bst-nodes
1. ---

1. ## [94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/description/)

### Problem:

Given a binary tree, return the *inorder* traversal of its nodes' values.

**Example:**

``` 
Input: [1,null,2,3]
   1
    \
     2
    /
   3

Output: [1,3,2]
```

**Follow up:** Recursive solution is trivial, could you do it iteratively?

### Solution:

#### ONE

"Trivial" recursive solution.

``` javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
let inorderTraversal = function(root) {
    const result = []
    _traversal(root)
    return result

    function _traversal(root) {
        if (!root) {
            return
        }
        _traversal(root.left)
        result.push(root.val)
        _traversal(root.right)
    }
};
```

#### TWO

Super fast iterative solution. Just like the recursive solution, store the node in stack, visit the left child, then come back (via popping the stack).

``` javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
let inorderTraversal = function(root) {
    const result = []
    const stack = []
    let node = root

    while (node || stack.length > 0) {
        if (node) {
            stack.push(node)
            node = node.left
        } else {
            node = stack.pop()
            result.push(node.val)
            node = node.right
        }
    }

    return result
};
```

# Binary Tree Level Order Traversal

Related Topics:

  1. "Tree": https://leetcode.com/tag/tree
  2. "Breadth-first Search": https://leetcode.com/tag/breadth-first-search
1. Similar Questions:
  3. "Binary Tree Zigzag Level Order Traversal": https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal
  4. "Binary Tree Level Order Traversal II": https://leetcode.com/problems/binary-tree-level-order-traversal-ii
  5. "Minimum Depth of Binary Tree": https://leetcode.com/problems/minimum-depth-of-binary-tree
  6. "Binary Tree Vertical Order Traversal": https://leetcode.com/problems/binary-tree-vertical-order-traversal
  7. "Average of Levels in Binary Tree": https://leetcode.com/problems/average-of-levels-in-binary-tree
  8. "N-ary Tree Level Order Traversal": https://leetcode.com/problems/n-ary-tree-level-order-traversal

---

## [102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/description/)

### Problem:

Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

For example:
Given binary tree `[3,9,20,null,null,15,7]` , 

``` 
3
   / \
  9  20
    /  \
   15   7
```

return its level order traversal as:

``` 
[
  [3],
  [9,20],
  [15,7]
]
```

### Solution:

The code should be self-evident.

``` javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
let levelOrder = function(root) {
    if (!root) {
        return []
    }

    const result = []
    const queue = [NaN, root]
    while (queue.length > 1) {
        const node = queue.shift()
        if (node !== node) {
            result.push(queue.map(n => n.val))
            queue.push(NaN)
        } else {
            if (node.left) {
                queue.push(node.left)
            }
            if (node.right) {
                queue.push(node.right)
            }
        }
    }

    return result
};
```

``` js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
const levelOrder = function(root) {
    const res = [];
    if (root == null) return res;
    let next = [root];
    while (next.length > 0) {
        next = tr(res, next);
    }
    return res;
};

function tr(res, nodeArr) {
    const arr = [];
    const nextLevelNodes = [];
    for (let i = 0; i < nodeArr.length; i++) {
        arr.push(nodeArr[i].val);
        if (nodeArr[i].left) {
            nextLevelNodes.push(nodeArr[i].left);
        }
        if (nodeArr[i].right) {
            nextLevelNodes.push(nodeArr[i].right);
        }
    }
    if (arr.length) res.push(arr);
    return nextLevelNodes;
}
```

# Max Depth Of Binary Tree

* Related Topics:
  1. "Tree": https://leetcode.com/tag/tree
  2. "Depth-first Search": https://leetcode.com/tag/depth-first-search

  3. 

* Similar Questions:

  1. "Balanced Binary Tree": https://leetcode.com/problems/balanced-binary-tree
  2. "Minimum Depth of Binary Tree": https://leetcode.com/problems/minimum-depth-of-binary-tree
  3. "Maximum Depth of N-ary Tree": https://leetcode.com/problems/maximum-depth-of-n-ary-tree

---

## [104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/description/)

### Problem:

Given a binary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Note:** A leaf is a node with no children.

**Example:**

Given binary tree `[3,9,20,null,null,15,7]` , 

``` 
    3
   / \
  9  20
    /  \
   15   7
```

return its depth = 3.

### Solution:

The code should be self-evident.

``` javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
let maxDepth = function(root) {
    return root === null ?
        0 :
        Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
};
```

``` js
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const maxDepth = function(root) {
    if (!root) return 0;
    const left = maxDepth(root.left);
    const right = maxDepth(root.right);
    let depth = left > right ? left : right;
    return (depth += 1);
};
```

Related Topics:
  "Array": https://leetcode.com/tag/array
  "Tree": https://leetcode.com/tag/tree
  "Depth-first Search": https://leetcode.com/tag/depth-first-search
Similar Questions:
  "Construct Binary Tree from Inorder and Postorder Traversal": https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal
---

## [105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/)

### Problem:

Given preorder and inorder traversal of a tree, construct the binary tree.

**Note:**
You may assume that duplicates do not exist in the tree.

For example, given

``` 
preorder = [3,9,20,15,7]
inorder = [9,3,15,20,7]
```

Return the following binary tree:

``` 
    3
   / \
  9  20
    /  \
   15   7
```

### Solution:

Pattern of preorder traversal result: `pre(root) = root + pre(root.left) + pre(root.right)`

Pattern of inorder traversal result: `in(root) = in(root.left) + root + in(root.right)`

There are no duplicates so get the first item in preorder result, pinpoint it in inorder result. Then we know the size of left and right subtree.

Repeat the process on subtrees.

``` javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
let buildTree = function(preorder, inorder) {
    return _buildTree(preorder, inorder, 0, preorder.length, 0, inorder.length)
};

function _buildTree(preorder, inorder, pStart, pEnd, iStart, iEnd) {
    if (pStart >= pEnd || iStart >= iEnd) {
        return null
    }
    const val = preorder[pStart]
    const node = new TreeNode(val)
    for (let i = iStart; i < iEnd; i++) {
        if (val === inorder[i]) {
            node.left = _buildTree(preorder, inorder, pStart + 1, i - iStart + (pStart + 1), iStart, i)
            node.right = _buildTree(preorder, inorder, (i + 1) - iEnd + pEnd, pEnd, i + 1, iEnd)
            break
        }
    }
    return node
}
```

Related Topics:
  "Tree": https://leetcode.com/tag/tree
  "Breadth-first Search": https://leetcode.com/tag/breadth-first-search
Similar Questions:
  "Binary Tree Level Order Traversal": https://leetcode.com/problems/binary-tree-level-order-traversal
  "Average of Levels in Binary Tree": https://leetcode.com/problems/average-of-levels-in-binary-tree
---

## [107. Binary Tree Level Order Traversal II](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/description/)

### Problem:

Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).

For example:
Given binary tree `[3,9,20,null,null,15,7]` , 

``` 
    3
   / \
  9  20
    /  \
   15   7
```

return its bottom-up level order traversal as:

``` 
[
  [15,7],
  [9,20],
  [3]
]
```

### Solution:

See [102. Binary Tree Level Order Traversal](./102.%20Binary%20Tree%20Level%20Order%20Traversal.md).

``` javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
let levelOrderBottom = function(root) {
    if (!root) {
        return []
    }

    const result = []
    const queue = [NaN, root]
    while (queue.length > 1) {
        const node = queue.shift()
        if (node !== node) {
            result.unshift(queue.map(n => n.val))
            queue.push(NaN)
        } else {
            if (node.left) {
                queue.push(node.left)
            }
            if (node.right) {
                queue.push(node.right)
            }
        }
    }

    return result
};
```

* Related Topics:
  "Tree": https://leetcode.com/tag/tree
  "Depth-first Search": https://leetcode.com/tag/depth-first-search
  "Breadth-first Search": https://leetcode.com/tag/breadth-first-search
* Similar Questions:
  1. "Binary Tree Level Order Traversal": https://leetcode.com/problems/binary-tree-level-order-traversal
  2. "Maximum Depth of Binary Tree": https://leetcode.com/problems/maximum-depth-of-binary-tree
---

## [111. Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/description/)

1. ### Problem:

Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

**Note:** A leaf is a node with no children.

**Example:**

Given binary tree `[3,9,20,null,null,15,7]` , 

``` 
    3
   / \
  9  20
    /  \
   15   7
```

return its minimum depth = 2.

### Solution:

Ignore `null` children.

``` javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
let minDepth = function(root) {
    if (!root) {
        return 0
    }
    if (root.left !== null && root.right !== null) {
        return Math.min(minDepth(root.left), minDepth(root.right)) + 1
    } else if (root.left !== null) {
        return minDepth(root.left) + 1
    } else {
        return minDepth(root.right) + 1
    }
};
```

## [114. Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/description/)

### Problem:

Given a binary tree, flatten it to a linked list in-place.

For example, given the following tree:

``` 
    1
   / \
  2   5
 / \   \
3   4   6
```

The flattened tree should look like:

``` 
1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
```

### Solution:

Return the leaf node of a flattened subtree for concatenation.

``` javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
let flatten = function(root) {
    _flatten(root)
};

/**
 * @param {TreeNode} root
 * @return {TreeNode} leaf node of a flattened subtree
 */
function _flatten(root) {
    if (!root) {
        return null
    }
    const leftLeaf = _flatten(root.left)
    const rightLeaf = _flatten(root.right)
    if (leftLeaf !== null) {
        leftLeaf.right = root.right
        root.right = root.left
    } else if (rightLeaf === null) {
        return root
    }

    root.left = null
    return rightLeaf || leftLeaf
}
```

------
------
 <==============(BINARY SEARCH TREE)==================>
------
------

## [1. Two Sum](https://leetcode.com/problems/two-sum/description/)

### Problem:

Given an array of integers, return **indices** of the two numbers such that they add up to a specific target.

You may assume that each input would have **exactly** one solution, and you may not use the *same* element twice.

**Example:**

```
Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
```

### Solution:

Map the numbers to their indices as we iterate, so that we can look them back up in O(1) time complexity.

```javascript
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
  const indicies = {}
  
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i]
    if (indicies[target - num] != null) {
      return [indicies[target - num], i]
    }
    indicies[num] = i
  }
};
```
## [94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/description/)

### Problem:

Given a binary tree, return the *inorder* traversal of its nodes' values.

**Example:**

```
Input: [1,null,2,3]
   1
    \
     2
    /
   3

Output: [1,3,2]
```

**Follow up:** Recursive solution is trivial, could you do it iteratively?

### Solution:

#### ONE

"Trivial" recursive solution.

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  const result = []
  _traversal(root)
  return result
  
  function _traversal (root) {
    if (!root) { return }
    _traversal(root.left)
    result.push(root.val)
    _traversal(root.right)
  }
};
```

#### TWO

Super fast iterative solution. Just like the recursive solution, store the node in stack, visit the left child, then come back (via popping the stack).

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function(root) {
  const result = []
  const stack = []
  let node = root

  while (node || stack.length > 0) {
    if (node) {
      stack.push(node)
      node = node.left
    } else {
      node = stack.pop()
      result.push(node.val)
      node = node.right
    }
  }

  return result
};
```
## [108. Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/description/)

### Problem:

Given an array where elements are sorted in ascending order, convert it to a height balanced BST.

For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of *every* node never differ by more than 1.

**Example:**

```
Given the sorted array: [-10,-3,0,5,9],

One possible answer is: [0,-3,9,-10,null,5], which represents the following height balanced BST:

      0
     / \
   -3   9
   /   /
 -10  5
```

### Solution:

Pick the middle item. If it is even, pick either one.

```javascript
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {
  return _sortedArrayToBST(nums, 0, nums.length)
};

function _sortedArrayToBST (nums, start, end) {
  if (start >= end) { return null }

  const mid = start + Math.floor((end - start) / 2)
  const node = new TreeNode(nums[mid])
  node.left = _sortedArrayToBST(nums, start, mid)
  node.right = _sortedArrayToBST(nums, mid + 1, end)

  return node
}

```



* [Graphs and Heaps](#graphs-and-heaps)

---
## [17. Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/)

### Problem:

Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

![200px-Telephone-keypad2](https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/200px-Telephone-keypad2.svg.png)

**Example:**

```
Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

**Note:**

Although the above answer is in lexicographical order, your answer could be in any order you want.

### Solution:

#### ONE

JavaScript specific optimization.

`Array.prototype.push` accepts arbitrary arguments which enables tighter loops.

Also, appending string is faster than prepending.

```javascript
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  if (digits.length <= 0) { return [] }

  const letters = [
    ,
    ,
    ['a', 'b', 'c'],
    ['d', 'e', 'f'],
    ['g', 'h', 'i'],
    ['j', 'k', 'l'],
    ['m', 'n', 'o'],
    ['p', 'q', 'r', 's'],
    ['t', 'u', 'v'],
    ['w', 'x', 'y', 'z'],
  ]

  let result = ['']

  for (let i = 0; i < digits.length; i++) {
    const arr = letters[digits[i]]
    let newResult = []
    arr.forEach(c => newResult.push(...result.map(r => r + c)))
    result = newResult
  }

  return result
};
```

#### TWO

General recursive DFS solution.

```javascript
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function(digits) {
  const letters = [,, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
  const result = []
  if (digits.length > 0) {
    dfs(digits, 0, '', letters, result)
  }
  return result
};

function dfs (digits, idigit, path, letters, result) {
  if (idigit >= digits.length) {
    result.push(path)
    return
  }
  const str = letters[digits[idigit]]
  for (let i = 0; i < str.length; i++) {
    dfs(digits, idigit + 1, path + str[i], letters, result)
  }
};
```
## [133. Clone Graph](https://leetcode.com/problems/clone-graph/description/)

### Problem:

Given the head of a graph, return a deep copy (clone) of the graph. Each node in the graph contains a `label` (`int`) and a list (`List[UndirectedGraphNode]`) of its `neighbors`. There is an edge between the given node and each of the nodes in its neighbors.

OJ's undirected graph serialization (so you can understand error output):

Nodes are labeled uniquely.

We use `#` as a separator for each node, and `,` as a separator for node label and each neighbor of the node.

As an example, consider the serialized graph `{0,1,2#1,2#2,2}`.

The graph has a total of three nodes, and therefore contains three parts as separated by `#`.

1. First node is labeled as `0`. Connect node `0` to both nodes `1` and `2`.
2. Second node is labeled as `1`. Connect node `1` to node `2`.
3. Third node is labeled as `2`. Connect node `2` to node `2` (itself), thus forming a self-cycle.

Visually, the graph looks like the following:

```
       1
      / \
     /   \
    0 --- 2
         / \
         \_/

```

**Note**: The information about the tree serialization is only meant so that you can understand error output if you get a wrong answer. You don't need to understand the serialization to solve the problem.

### Solution:

DFS. Cache the visited node before entering the next recursion.

```javascript
/**
 * Definition for undirected graph.
 * function UndirectedGraphNode(label) {
 *     this.label = label;
 *     this.neighbors = [];   // Array of UndirectedGraphNode
 * }
 */

/**
 * @param {UndirectedGraphNode} graph
 * @return {UndirectedGraphNode}
 */
var cloneGraph = function(graph) {
  const cache = {}
  return _clone(graph)

  function _clone (graph) {
    if (!graph) { return graph }
    const label = graph.label
    if (!cache[label]) {
      cache[label] = new UndirectedGraphNode(label)
      cache[label].neighbors = graph.neighbors.map(_clone)
    }
    return cache[label]
  }
};
```

---



* [Network Models Objectives](#network-models-objectives)

---

* [Internet Protocol Suite Objectives](#internet-protocol-suite-objectives)

---

* [Network Tools](#network-tools)

---

* [WEEK-08 DAY-1<br>*White-Boarding Tips and Tricks* ](#week-08-day-1brwhite-boarding-tips-and-tricks)

---

* [White-Boarding Tips](#white-boarding-tips)

---

  + [Why do companies whiteboard?](#why-do-companies-whiteboard)

---

  + [Correct steps](#correct-steps)

---

  + [Clarification](#clarification)

---

  + [Test I/O](#test-io)

---

  + [Pseudocode](#pseudocode)

---

  + [During the Problem](#during-the-problem)

---

  + [Walk through an example input](#walk-through-an-example-input)

---

  + [Time and space complexity](#time-and-space-complexity)

---

  + [Strategies](#strategies)

---

  + [Don't be Sly](#dont-be-sly)

---

  + [How to handle questions you've seen before.](#how-to-handle-questions-youve-seen-before)

---

* [White Boarding Exercises](#white-boarding-exercises)

---

  + [Mirror image trees](#mirror-image-trees)

---

  + [Reverse a linked list](#reverse-a-linked-list)

---

  + [The missing value](#the-missing-value)

---

  + [Stack min](#stack-min)

---

  + [Test a retractable ballpoint pen](#test-a-retractable-ballpoint-pen)

---

  + [OOParking Lot](#ooparking-lot)

---

---
---

* [WEEK-08 DAY-2<br>*Binary Trees* ](#week-08-day-2brbinary-trees)

---

- [Binary Tree Level Order Traversal](#binary-tree-level-order-traversal)
  - [102. Binary Tree Level Order Traversal](#102-binary-tree-level-order-traversal)
    - [Problem:](#problem-1)
    - [Solution:](#solution-1)
- [Max Depth Of Binary Tree](#max-depth-of-binary-tree)
  - [104. Maximum Depth of Binary Tree](#104-maximum-depth-of-binary-tree)
    - [Problem:](#problem-2)
    - [Solution:](#solution-2)
  - ["Construct Binary Tree from Inorder and Postorder Traversal": https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal](#construct-binary-tree-from-inorder-and-postorder-traversal-httpsleetcodecomproblemsconstruct-binary-tree-from-inorder-and-postorder-traversal)
  - [105. Construct Binary Tree from Preorder and Inorder Traversal](#105-construct-binary-tree-from-preorder-and-inorder-traversal)
    - [Problem:](#problem-3)
    - [Solution:](#solution-3)
  - ["Average of Levels in Binary Tree": https://leetcode.com/problems/average-of-levels-in-binary-tree](#average-of-levels-in-binary-tree-httpsleetcodecomproblemsaverage-of-levels-in-binary-tree)
  - [107. Binary Tree Level Order Traversal II](#107-binary-tree-level-order-traversal-ii)
    - [Problem:](#problem-4)
    - [Solution:](#solution-4)
  - [2. "Maximum Depth of Binary Tree": https://leetcode.com/problems/maximum-depth-of-binary-tree](#2-maximum-depth-of-binary-tree-httpsleetcodecomproblemsmaximum-depth-of-binary-tree)
  - [111. Minimum Depth of Binary Tree](#111-minimum-depth-of-binary-tree)
    - [Solution:](#solution-5)
  - [114. Flatten Binary Tree to Linked List](#114-flatten-binary-tree-to-linked-list)
    - [Problem:](#problem-5)
    - [Solution:](#solution-6)
  - [<==============(BINARY SEARCH TREE)==================>](#binary-search-tree)
  - [1. Two Sum](#1-two-sum)
    - [Problem:](#problem-6)
    - [Solution:](#solution-7)
  - [94. Binary Tree Inorder Traversal](#94-binary-tree-inorder-traversal)
    - [Problem:](#problem-7)
    - [Solution:](#solution-8)
      - [ONE](#one-1)
      - [TWO](#two-1)
  - [108. Convert Sorted Array to Binary Search Tree](#108-convert-sorted-array-to-binary-search-tree)
    - [Problem:](#problem-8)
    - [Solution:](#solution-9)
  - [17. Letter Combinations of a Phone Number](#17-letter-combinations-of-a-phone-number)
    - [Problem:](#problem-9)
    - [Solution:](#solution-10)
      - [ONE](#one-2)
      - [TWO](#two-2)
  - [133. Clone Graph](#133-clone-graph)
    - [Problem:](#problem-10)
    - [Solution:](#solution-11)

---

- [Binary Tree Level Order Traversal](#binary-tree-level-order-traversal)
  - [102. Binary Tree Level Order Traversal](#102-binary-tree-level-order-traversal)
    - [Problem:](#problem-1)
    - [Solution:](#solution-1)
- [Max Depth Of Binary Tree](#max-depth-of-binary-tree)
  - [104. Maximum Depth of Binary Tree](#104-maximum-depth-of-binary-tree)
    - [Problem:](#problem-2)
    - [Solution:](#solution-2)
  - ["Construct Binary Tree from Inorder and Postorder Traversal": https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal](#construct-binary-tree-from-inorder-and-postorder-traversal-httpsleetcodecomproblemsconstruct-binary-tree-from-inorder-and-postorder-traversal)
  - [105. Construct Binary Tree from Preorder and Inorder Traversal](#105-construct-binary-tree-from-preorder-and-inorder-traversal)
    - [Problem:](#problem-3)
    - [Solution:](#solution-3)
  - ["Average of Levels in Binary Tree": https://leetcode.com/problems/average-of-levels-in-binary-tree](#average-of-levels-in-binary-tree-httpsleetcodecomproblemsaverage-of-levels-in-binary-tree)
  - [107. Binary Tree Level Order Traversal II](#107-binary-tree-level-order-traversal-ii)
    - [Problem:](#problem-4)
    - [Solution:](#solution-4)
  - [2. "Maximum Depth of Binary Tree": https://leetcode.com/problems/maximum-depth-of-binary-tree](#2-maximum-depth-of-binary-tree-httpsleetcodecomproblemsmaximum-depth-of-binary-tree)
  - [111. Minimum Depth of Binary Tree](#111-minimum-depth-of-binary-tree)
    - [Solution:](#solution-5)
  - [114. Flatten Binary Tree to Linked List](#114-flatten-binary-tree-to-linked-list)
    - [Problem:](#problem-5)
    - [Solution:](#solution-6)
  - [<==============(BINARY SEARCH TREE)==================>](#binary-search-tree)
  - [1. Two Sum](#1-two-sum)
    - [Problem:](#problem-6)
    - [Solution:](#solution-7)
  - [94. Binary Tree Inorder Traversal](#94-binary-tree-inorder-traversal)
    - [Problem:](#problem-7)
    - [Solution:](#solution-8)
      - [ONE](#one-1)
      - [TWO](#two-1)
  - [108. Convert Sorted Array to Binary Search Tree](#108-convert-sorted-array-to-binary-search-tree)
    - [Problem:](#problem-8)
    - [Solution:](#solution-9)
  - [17. Letter Combinations of a Phone Number](#17-letter-combinations-of-a-phone-number)
    - [Problem:](#problem-9)
    - [Solution:](#solution-10)
      - [ONE](#one-2)
      - [TWO](#two-2)
  - [133. Clone Graph](#133-clone-graph)
    - [Problem:](#problem-10)
    - [Solution:](#solution-11)

---

  + [What is a Graph?](#what-is-a-graph)

---

    - [What is a Tree?](#what-is-a-tree)

---

  + [What is a Binary Tree?](#what-is-a-binary-tree)

---

    - [Representing a Binary Tree with Node Instances](#representing-a-binary-tree-with-node-instances)

---

    - [Basic Tree Terminology](#basic-tree-terminology)

---

  + [Traversing trees](#traversing-trees)

---

    - [Breadth-first search](#breadth-first-search)

---

    - [Depth-first searches](#depth-first-searches)

---

      - [Pre-order traversal](#pre-order-traversal)

---

      - [In-order traversal](#in-order-traversal)

---

      - [Post-order traversal](#post-order-traversal)

---

- [Binary Tree Level Order Traversal](#binary-tree-level-order-traversal)
  - [102. Binary Tree Level Order Traversal](#102-binary-tree-level-order-traversal)
    - [Problem:](#problem-1)
    - [Solution:](#solution-1)
- [Max Depth Of Binary Tree](#max-depth-of-binary-tree)
  - [104. Maximum Depth of Binary Tree](#104-maximum-depth-of-binary-tree)
    - [Problem:](#problem-2)
    - [Solution:](#solution-2)
  - ["Construct Binary Tree from Inorder and Postorder Traversal": https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal](#construct-binary-tree-from-inorder-and-postorder-traversal-httpsleetcodecomproblemsconstruct-binary-tree-from-inorder-and-postorder-traversal)
  - [105. Construct Binary Tree from Preorder and Inorder Traversal](#105-construct-binary-tree-from-preorder-and-inorder-traversal)
    - [Problem:](#problem-3)
    - [Solution:](#solution-3)
  - ["Average of Levels in Binary Tree": https://leetcode.com/problems/average-of-levels-in-binary-tree](#average-of-levels-in-binary-tree-httpsleetcodecomproblemsaverage-of-levels-in-binary-tree)
  - [107. Binary Tree Level Order Traversal II](#107-binary-tree-level-order-traversal-ii)
    - [Problem:](#problem-4)
    - [Solution:](#solution-4)
  - [2. "Maximum Depth of Binary Tree": https://leetcode.com/problems/maximum-depth-of-binary-tree](#2-maximum-depth-of-binary-tree-httpsleetcodecomproblemsmaximum-depth-of-binary-tree)
  - [111. Minimum Depth of Binary Tree](#111-minimum-depth-of-binary-tree)
    - [Solution:](#solution-5)
  - [114. Flatten Binary Tree to Linked List](#114-flatten-binary-tree-to-linked-list)
    - [Problem:](#problem-5)
    - [Solution:](#solution-6)
  - [<==============(BINARY SEARCH TREE)==================>](#binary-search-tree)
  - [1. Two Sum](#1-two-sum)
    - [Problem:](#problem-6)
    - [Solution:](#solution-7)
  - [94. Binary Tree Inorder Traversal](#94-binary-tree-inorder-traversal)
    - [Problem:](#problem-7)
    - [Solution:](#solution-8)
      - [ONE](#one-1)
      - [TWO](#two-1)
  - [108. Convert Sorted Array to Binary Search Tree](#108-convert-sorted-array-to-binary-search-tree)
    - [Problem:](#problem-8)
    - [Solution:](#solution-9)
  - [17. Letter Combinations of a Phone Number](#17-letter-combinations-of-a-phone-number)
    - [Problem:](#problem-9)
    - [Solution:](#solution-10)
      - [ONE](#one-2)
      - [TWO](#two-2)
  - [133. Clone Graph](#133-clone-graph)
    - [Problem:](#problem-10)
    - [Solution:](#solution-11)

---

  + [BST Definition](#bst-definition)

---

    - [A BST is a Sorted Data Structure](#a-bst-is-a-sorted-data-structure)

---

  + [A special traversal case](#a-special-traversal-case)

---

- [Binary Tree Level Order Traversal](#binary-tree-level-order-traversal)
  - [102. Binary Tree Level Order Traversal](#102-binary-tree-level-order-traversal)
    - [Problem:](#problem-1)
    - [Solution:](#solution-1)
- [Max Depth Of Binary Tree](#max-depth-of-binary-tree)
  - [104. Maximum Depth of Binary Tree](#104-maximum-depth-of-binary-tree)
    - [Problem:](#problem-2)
    - [Solution:](#solution-2)
  - ["Construct Binary Tree from Inorder and Postorder Traversal": https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal](#construct-binary-tree-from-inorder-and-postorder-traversal-httpsleetcodecomproblemsconstruct-binary-tree-from-inorder-and-postorder-traversal)
  - [105. Construct Binary Tree from Preorder and Inorder Traversal](#105-construct-binary-tree-from-preorder-and-inorder-traversal)
    - [Problem:](#problem-3)
    - [Solution:](#solution-3)
  - ["Average of Levels in Binary Tree": https://leetcode.com/problems/average-of-levels-in-binary-tree](#average-of-levels-in-binary-tree-httpsleetcodecomproblemsaverage-of-levels-in-binary-tree)
  - [107. Binary Tree Level Order Traversal II](#107-binary-tree-level-order-traversal-ii)
    - [Problem:](#problem-4)
    - [Solution:](#solution-4)
  - [2. "Maximum Depth of Binary Tree": https://leetcode.com/problems/maximum-depth-of-binary-tree](#2-maximum-depth-of-binary-tree-httpsleetcodecomproblemsmaximum-depth-of-binary-tree)
  - [111. Minimum Depth of Binary Tree](#111-minimum-depth-of-binary-tree)
    - [Solution:](#solution-5)
  - [114. Flatten Binary Tree to Linked List](#114-flatten-binary-tree-to-linked-list)
    - [Problem:](#problem-5)
    - [Solution:](#solution-6)
  - [<==============(BINARY SEARCH TREE)==================>](#binary-search-tree)
  - [1. Two Sum](#1-two-sum)
    - [Problem:](#problem-6)
    - [Solution:](#solution-7)
  - [94. Binary Tree Inorder Traversal](#94-binary-tree-inorder-traversal)
    - [Problem:](#problem-7)
    - [Solution:](#solution-8)
      - [ONE](#one-1)
      - [TWO](#two-1)
  - [108. Convert Sorted Array to Binary Search Tree](#108-convert-sorted-array-to-binary-search-tree)
    - [Problem:](#problem-8)
    - [Solution:](#solution-9)
  - [17. Letter Combinations of a Phone Number](#17-letter-combinations-of-a-phone-number)
    - [Problem:](#problem-9)
    - [Solution:](#solution-10)
      - [ONE](#one-2)
      - [TWO](#two-2)
  - [133. Clone Graph](#133-clone-graph)
    - [Problem:](#problem-10)
    - [Solution:](#solution-11)

---

  + [Instructions](#instructions)

---

- [Binary Tree Level Order Traversal](#binary-tree-level-order-traversal)
  - [102. Binary Tree Level Order Traversal](#102-binary-tree-level-order-traversal)
    - [Problem:](#problem-1)
    - [Solution:](#solution-1)
- [Max Depth Of Binary Tree](#max-depth-of-binary-tree)
  - [104. Maximum Depth of Binary Tree](#104-maximum-depth-of-binary-tree)
    - [Problem:](#problem-2)
    - [Solution:](#solution-2)
  - ["Construct Binary Tree from Inorder and Postorder Traversal": https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal](#construct-binary-tree-from-inorder-and-postorder-traversal-httpsleetcodecomproblemsconstruct-binary-tree-from-inorder-and-postorder-traversal)
  - [105. Construct Binary Tree from Preorder and Inorder Traversal](#105-construct-binary-tree-from-preorder-and-inorder-traversal)
    - [Problem:](#problem-3)
    - [Solution:](#solution-3)
  - ["Average of Levels in Binary Tree": https://leetcode.com/problems/average-of-levels-in-binary-tree](#average-of-levels-in-binary-tree-httpsleetcodecomproblemsaverage-of-levels-in-binary-tree)
  - [107. Binary Tree Level Order Traversal II](#107-binary-tree-level-order-traversal-ii)
    - [Problem:](#problem-4)
    - [Solution:](#solution-4)
  - [2. "Maximum Depth of Binary Tree": https://leetcode.com/problems/maximum-depth-of-binary-tree](#2-maximum-depth-of-binary-tree-httpsleetcodecomproblemsmaximum-depth-of-binary-tree)
  - [111. Minimum Depth of Binary Tree](#111-minimum-depth-of-binary-tree)
    - [Solution:](#solution-5)
  - [114. Flatten Binary Tree to Linked List](#114-flatten-binary-tree-to-linked-list)
    - [Problem:](#problem-5)
    - [Solution:](#solution-6)
  - [<==============(BINARY SEARCH TREE)==================>](#binary-search-tree)
  - [1. Two Sum](#1-two-sum)
    - [Problem:](#problem-6)
    - [Solution:](#solution-7)
  - [94. Binary Tree Inorder Traversal](#94-binary-tree-inorder-traversal)
    - [Problem:](#problem-7)
    - [Solution:](#solution-8)
      - [ONE](#one-1)
      - [TWO](#two-1)
  - [108. Convert Sorted Array to Binary Search Tree](#108-convert-sorted-array-to-binary-search-tree)
    - [Problem:](#problem-8)
    - [Solution:](#solution-9)
  - [17. Letter Combinations of a Phone Number](#17-letter-combinations-of-a-phone-number)
    - [Problem:](#problem-9)
    - [Solution:](#solution-10)
      - [ONE](#one-2)
      - [TWO](#two-2)
  - [133. Clone Graph](#133-clone-graph)
    - [Problem:](#problem-10)
    - [Solution:](#solution-11)

---

  + [Instructions](#instructions-1)

---

---
---

* [WEEK-08 DAY-3<br>*Graphs* ](#week-08-day-3brgraphs)

---

* [Graphs and Heaps](#graphs-and-heaps-1)

---

* [Graphs](#graphs)

---

  + [What is a Graph?](#what-is-a-graph-1)

---

  + [Graph Implementations](#graph-implementations)

---

    - [GraphNode Class](#graphnode-class)

---

    - [Adjacency Matrix](#adjacency-matrix)

---

    - [Adjacency List](#adjacency-list)

---

* [Graph Traversal](#graph-traversal)

---

  + [Graph Traversal w/ GraphNode](#graph-traversal-w-graphnode)

---

    - [Graph Traversal w/ Adjacency List](#graph-traversal-w-adjacency-list)

---

* [Graph Project](#graph-project)

---

  + [Instructions](#instructions-2)

---

  + [Friends of](#friends-of)

---

---
---

* [WEEK-08 DAY-4<br>*Network Knowledge* ](#week-08-day-4brnetwork-knowledge)

---

* [Network Models Objectives](#network-models-objectives-1)

---

* [Internet Protocol Suite Objectives](#internet-protocol-suite-objectives-1)

---

* [Network Tools](#network-tools-1)

---

* [The OSI Network Model](#the-osi-network-model)

---

  + [More layers, ~~more~~ fewer problems?](#more-layers-smores-fewer-problems)

---

  + [The layers of the OSI model](#the-layers-of-the-osi-model)

---

    - [Application](#application)

---

    - [Presentation](#presentation)

---

    - [Session](#session)

---

    - [Transport](#transport)

---

    - [Network](#network)

---

    - [Data Link](#data-link)

---

    - [Physical](#physical)

---

  + [Which model do I use?](#which-model-do-i-use)

---

  + [What we've learned](#what-weve-learned)

---

* [TCP/IP: Four Layers](#tcpip-four-layers)

---

  + [A layered approach](#a-layered-approach)

---

  + [Layers of the TCP/IP model](#layers-of-the-tcpip-model)

---

    - [Application](#application-1)

---

    - [Transport](#transport-1)

---

    - [Internet](#internet)

---

    - [Link](#link)

---

  + [Translating layers to data](#translating-layers-to-data)

---

  + [What we've learned](#what-weve-learned-1)

---

* [A Crash Course in Binary and Hexadecimal Notation](#a-crash-course-in-binary-and-hexadecimal-notation)

---

  + [Binary](#binary)

---

    - [Bases](#bases)

---

    - [Base 2](#base-2)

---

  + [Bits and Bytes](#bits-and-bytes)

---

  + [Another useful base](#another-useful-base)

---

    - [The `0x` Notation](#the-0x-notation)

---

  + [In JavaScript](#in-javascript)

---

* [In conclusion](#in-conclusion)

---

* [Internet Protocol](#internet-protocol)

---

  + [History of IP](#history-of-ip)

---

    - [The great divide](#the-great-divide)

---

  + [So what is the Internet, exactly?](#so-what-is-the-internet-exactly)

---

  + [Packet-Switching](#packet-switching)

---

  + [IP Versions](#ip-versions)

---

    - [IPv4](#ipv4)

---

    - [IPv4 Addresses](#ipv4-addresses)

---

    - [IPv6](#ipv6)

---

    - [IPv6 Addresses](#ipv6-addresses)

---

    - [Special addresses](#special-addresses)

---

  + [What we've learned](#what-weve-learned-2)

---

* [Transport Protocols](#transport-protocols)

---

  + [What exactly are we transporting?](#what-exactly-are-we-transporting)

---

    - [Ports](#ports)

---

  + [TCP](#tcp)

---

  + [UDP](#udp)

---

  + [What we've learned](#what-weve-learned-3)

---

* [Surveying Your Domain](#surveying-your-domain)

---

  + [What is DNS?](#what-is-dns)

---

    - [Domains?](#domains)

---

  + [How The Magic Happens](#how-the-magic-happens)

---

  + [DNS Records](#dns-records)

---

    - [`SOA`](#soa)

---

    - [`NS`](#ns)

---

    - [`A` / `AAAA`](#a--aaaa)

---

    - [`CNAME`](#cname)

---

    - [`MX`](#mx)

---

    - [Metadata](#metadata)

---

  + [What we've learned](#what-weve-learned-4)

---

* [Networking Hardware: Getting Physical](#networking-hardware-getting-physical)

---

  + [Three levels of control](#three-levels-of-control)

---

    - [Hubs: keeping it simple](#hubs-keeping-it-simple)

---

    - [Switches: traffic control](#switches-traffic-control)

---

    - [Routers: thinking globally](#routers-thinking-globally)

---

  + [A practical example of network hardware](#a-practical-example-of-network-hardware)

---

  + [Integrated devices](#integrated-devices)

---

  + [What we've learned](#what-weve-learned-5)

---

* [TCP Connections](#tcp-connections)

---

  + [Segments](#segments)

---

    - [Segment Header Fields](#segment-header-fields)

---

  + [TCP Connection Lifecycle](#tcp-connection-lifecycle)

---

    - [Control Flag Options](#control-flag-options)

---

    - [Getting to know each other: the three-way handshake](#getting-to-know-each-other-the-three-way-handshake)

---

    - [Data transmission & error handling](#data-transmission--error-handling)

---

    - [Saying goodbye: closing the connection](#saying-goodbye-closing-the-connection)

---

    - [The TCP Socket State Lifecycle](#the-tcp-socket-state-lifecycle)

---

  + [What we've learned](#what-weve-learned-6)

---

* [Following The Trail With `traceroute`](#following-the-trail-with-traceroute)

---

  + [Where are we going?](#where-are-we-going)

---

  + [Reading a trace](#reading-a-trace)

---

    - [Metadata](#metadata-1)

---

    - [The Hop](#the-hop)

---

    - [Special cases](#special-cases)

---

  + [When should I run a trace?](#when-should-i-run-a-trace)

---

  + [What we've learned](#what-weve-learned-7)

---

* [Use Wireshark To Capture Network Traffic](#use-wireshark-to-capture-network-traffic)

---

  + [Installing Wireshark](#installing-wireshark)

---

  + [Capturing packets](#capturing-packets)

---

  + [Color coding](#color-coding)

---

  + [Sample captures](#sample-captures)

---

  + [Filtering packets](#filtering-packets)

---

  + [Inspecting packets](#inspecting-packets)

---

  + [Assignment](#assignment)

---

* [- DIY Flashcards](#ullidiy-flashcardsliul)
* [END OF TABLE OF CONTENTS](#end-of-table-of-contents)

---
