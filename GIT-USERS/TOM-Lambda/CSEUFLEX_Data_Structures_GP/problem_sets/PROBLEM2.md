# How do you find and return the middle node of a singly linked list in one pass? 
- You do not have access to the length of the list. 
- If the list is even, you should return the first of the two "middle" nodes. 
- You may not store the nodes in another data structure.


## Plan
- take 2 pointers label 1 `middle` and one `end`
- start a loop putting both pointer at the initial node
- while the `end` pointer is not `None`
- increment the `end` poniter to the next node
- if the `end` pointer is not `None`
- increment `end` pointer and increment the `middle` pointer to the next node repsectively
- When loop ends print out the value of the node that the `middle` pointer is pointing to