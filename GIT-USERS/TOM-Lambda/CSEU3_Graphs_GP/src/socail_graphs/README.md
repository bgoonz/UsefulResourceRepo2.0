# Social Graph
## Follow the steps of breaking down any Graphs problem

1. Translate the problem into terminology you've learned this week
  * Extended social network is the same as Connected Components
  * Social path is the same as shortest path (BFS)(BFT_PATH)
  * friend is a vertex
  * a user is a vertex
2. Build your graph
  * Done in `populate_graph()`
3. Traverse your graph
  * Do a BFT through user's social graph
  * Store the social path in a *dictionary* when you reach each user in the extended social network