# CSEUFLEX_Data_Structures_GP

## Arrays
Arrays are contiguous blocks of memory that are addressable by a relative indexing where the array is grafted in to an empty space in memory. To talk about arrays I will be framing them in context to memory (RAM) and in their relation to this memory
```Python
# Arrays

```

## Python Lists
For our purposes python lists could be thought of as arrays but they work more like a linked list. we will talk about their relationship with memory also. and we will look at the sim,ilarities and differences to arrays in a slightly abstract way.

## Linked Lists
The Linked list is a slightly more disjoined version of an array where it follows similar to a python list but it is disjoined from the middle parts of the list. we will go in to a little more detail for this concept

### add an item to our linked list
1. Create a new Node from a passed in value
2. Move the current Tails next reference to point to the new Node
3. Change the Tail Ref to be the current Tails Next




Lets run through some operations on a linked list

```Python

# lets draw these operations out on the whiteboard
my_list = new LinkedList()
my_list.add_to_head(1)
my_list.add_to_head(2)
my_list.add_to_tail(3)

# and then this
my_list.add_to_head(4)
my_list.remove_from_tail()

# now lets see what this looks like
my_list.add_to_tail(5)
my_list.remove_from_tail() 
my_list.remove_from_head() # here

# 1. set the listhead to the current heads next
my_list.add_to_tail(6)

```