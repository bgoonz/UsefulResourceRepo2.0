# Backtracking

1. Technique used to solve problems with a large search space, by systematically trying and eliminating possibilities.
2. Hence applied to problems not solvable in polynomial time and which are generally solvable using exhaustive search.

We use backtracking for NP Complete problem (Hard problem). As hard problem requires exponential time to solve it systematically.

- Each step tries to extend a partial solution by adding another element at the end.
- Tests if a solution is obtained. If yes, output, count and continue
- Otherwise checks, if it is extendible. If yes, continue.
- Otherwise backtracks.

### Steps

1. Construct the state space tree
2. Explore the state space tree using depth first search.
3. Prune non promising nodes.

### State space tree

1. A tree of choices being made.
2. Root represents an initial state.
3. Nodes of the first level represent the choices made for the first component of the solution.
4. Nodes of the second level represent the choices for the second component.
5. Thus each node represents a partial solution.
6. An edge from node x to y exists if y was created by advancing from x.

### Nodes

1. Node is promising if it corresponds to a partially constructed solution that may still lead to a complete solution.
2. Otherwise it is called non-promising.
3. Leaves represent either non-promising dead ends or complete solution found.

### Examples

1. Finding a hamiltonian circuit
2. Finding the most valuable subset of items in a knapsack
3. Going through a maze
4. Solving the 8-Queens problem
