# Data Structures: Understanding Graphs

> What is a graph? Graphs are used to represents relationships and hierarchies and are composed of nodes and edges.

[

![Rachel Hawa](https://miro.medium.com/fit/c/96/96/2*Ic7n4RxAJ20QbsEAZqEgWQ.jpeg)



](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/@rachel.hawa?source=post_page-----82509d35e6b5--------------------------------)

![Image for post](https://miro.medium.com/max/60/1*yIC0GHZA4SaNongRkRPw4Q.png?q=20)

![Image for post](https://miro.medium.com/max/1116/1*yIC0GHZA4SaNongRkRPw4Q.png)

**What is a graph?** Graphs are used to represents _relationships_ and _hierarchies_ and are composed of _nodes_ and _edges_.

**What is a node?** A node represents the objects in the graph. If Medium is the graph, users and posts are the objects.

**What is an edge?** An edge represents the connections between the objects. Nodes are connected by edges. If I post a blog on medium, there is an edge between me and my post. There is also an edge between me and another user I follow.

Graphs can be _directed_ or _undirected._

**Directed** A graph where an edge between nodes goes in one direction. On Instagram, John can follow Jane without Jane following John.

**Undirected** A graph where an edge between nodes goes in both directions. On Facebook, if John is friends with Jane, Jane must also be friends with John.

There are three ways to represent a graph. Most commonly an _adjacency list_ or _edge list_, less commonly a _grid_.

Given this simple flight map, where cities represent the nodes, and routes the edges, here are examples of adjacency and edge list representations.

![Image for post](https://miro.medium.com/max/60/0*n_NOe-n5Zt-6kz0m.png?q=20)

![Image for post](https://miro.medium.com/max/1120/0*n_NOe-n5Zt-6kz0m.png)

**Adjacency list:**

const flights = {  
    ‘ATL’ :  \[’NYC’, ‘DC’, ‘MIA’\],  
    ‘DC’ : \[‘ATL’\],  
    ‘MIA’ : \[‘ATL’\],  
    ‘NYC’ : \[‘ATL’, ‘SEA’\],  
    'SEA' : \['NYC'\]  
}

All the nodes ATL is connected to can be defined like this: `const ATLConnections = flights‘ATL’]`

An **edge List** is expressed as an array of all of the edges on the graph:

const flightsEdgeList = \[\[‘ATL’, ‘NYC’\], \[‘ATL’, ‘DC’\], \[‘ATL’, ‘MIA’\],   
    \[‘MIA’, ‘ATL’\], \[‘DC’, ‘ATL’\], \[‘NYC’, ‘ATL’\],   
    \[‘NYC’, ‘SEA’\], \[‘SEA’, ‘NYC’\]\]

There are two ways to traverse a graph — _breadth first search_ or _depth first search_.

**Breadth first search** uses a queue to move evenly through the graph, finding the shortest path between points, if a path exists.

![Image for post](https://miro.medium.com/freeze/max/60/1*RvpQLpcgmwuXCflaReQXpw.gif?q=20)

![Image for post](https://miro.medium.com/max/990/1*RvpQLpcgmwuXCflaReQXpw.gif)

View a sample problem [here](chrome-extension://cjedbglnccaioiolemnfhjncicchinao/javascript-in-plain-english/fewest-flights-a-breadth-first-search-sample-problem-and-solution-72c5224c71af?source=---------5------------------).

**Depth first search** uses a stack data structure to go down one path until it ends before looking at any other paths.

![Image for post](https://miro.medium.com/freeze/max/60/1*e7-q1XCpE19ODVkKx5fn3A.gif?q=20)

![Image for post](https://miro.medium.com/max/988/1*e7-q1XCpE19ODVkKx5fn3A.gif)


[Source](https://medium.com/javascript-in-plain-english/data-structures-understanding-graphs-82509d35e6b5)