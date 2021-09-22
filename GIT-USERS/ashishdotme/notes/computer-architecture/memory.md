---
id: memory
title: Memory
---

Heap and stack are generic terms for ways in which memory can be allocated. Stack is more faster than heap because

## Stack

In Stack, the items sit on top of the other in they order they are are placed and you can only remove the top one.
No table is needed to maintain stack, we just need pointer to the top of stack. Programs have call stack which stores information about which functions call other functions and return. It also stores local variables.

## Heap

In Heap, there is no particular order to the way items are placed. You can remove item in any order. Heap allocation requires maintaining what memory is allocated and what isn't. Memory is allocated dynamically and randomly.
