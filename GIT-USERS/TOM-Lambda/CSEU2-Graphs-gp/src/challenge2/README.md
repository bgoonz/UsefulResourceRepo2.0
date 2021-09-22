# Island Counter

Try solving the islands matrix problem:
```python
# Write a function that takes a 2D binary array and returns the number of 1 islands. 
# An island consists of 1s that are connected to the north, south, east or west. For example:

islands = [[0, 1, 0, 1, 0],
           [1, 1, 0, 1, 1],
           [0, 0, 1, 0, 0],
           [1, 0, 1, 0, 0],
           [1, 1, 0, 0, 0]]

island_counter(islands) # returns 4

```
*Remember these steps to solve almost any graphs problem:*
1. Translate the problem into terminology you've learned this week
    - any element that holds a 1 is a vertex
    - a connection to north, south, east or west is an edge
2. Build your graph
3. Traverse your graph

```python
islands = [[0, 1, 0, 1, 0],
           [1, 1, 0, 1, 1],
           [0, 0, 1, 0, 0],
           [1, 0, 1, 0, 0],
           [1, 1, 0, 0, 0]]

for x in range(len(islands[0])):
    for y in range(len(islands)):
        islands[y][x]
````
