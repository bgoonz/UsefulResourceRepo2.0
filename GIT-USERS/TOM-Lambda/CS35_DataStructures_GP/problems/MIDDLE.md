# How do you find and return the middle node of a singly linked list in one pass? 
- You do not have access to the length of the list. 
- If the list is even, you should return the second of the two "middle" nodes. 
- You may not store the nodes in another data structure.

## Plan
- take 2 pointers label 1 `middle` and 1 to be `end`
- start a loop putting both pointer at the initial node
- while `end` pointer is not `None`
- increment the `end` pointer to the next node
- if the `end` pointer is not none
- increment the `end` pointer and increment the `middle` pointer to their next node respectively
- When the while loop ends print out the value of the node that the `middle` pointer is pointing to