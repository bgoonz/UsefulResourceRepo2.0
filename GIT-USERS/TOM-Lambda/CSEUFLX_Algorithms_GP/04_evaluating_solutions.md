# Gold Scavenging Problem
```
After escaping the pirate's cave without drowning, you stumble upon a
field where it's rumored a lot of gold can be found. You even have a map that
shows where all of the biggest deposits are located!

Unfortunately, the sun is going down, so you don't have a ton of time to 
search. You decide to take one quick pass through the field. You choose 
only to move one of three ways:
-diagonally northeast
-diagonally southeast
-straight east

If you start at the northwest corner of the field, how should you move to 
maximize the gold you collect?

Can you write a function that finds the best path through a square  
field of any size?

Ex. 
                N
Input =    [[2, 4, 1],
        W   [0, 3, 2],    E
            [1, 2, 6] 
            ]
                S

Output = '27.098 can be acquired by moving
['se', 'se']'  

(based on the Gold Mine Problem at 
https://www.geeksforgeeks.org/gold-mine-problem/?ref=lbp)
```

## Naive Solution
Let's work on a naive solution for scavenging.

This solution should generate all possible sequences of directions we may move. Then, it sums up the values, counts how many sequences produce the     target sum, and calculates the odds that someone rolling `n` dice will end up with a sum equal to 3 times the number of dice.



##  Memoization and Heuristics to Improve a Solution

**Key Points**
- Reducing repitition or duplicate work is a key part of optimizing our solutions.
- This may or may not guarantee that we get the best solution, however, we are often OK with a solution that is "good enough".

This function should utilize dynamic programming to reduce the number of duplicate calculations that are performed (compared to the naive approach). After a coordinate is visited, we save both i) the max   amount of gold that can be picked up from that coordinate and ii) the path you'd have to travel to pick up maximum gold from that point.

Subpaths on the eastern side of the field that we visited multiple times in the naive approach are only visited once using dynamic programming.

