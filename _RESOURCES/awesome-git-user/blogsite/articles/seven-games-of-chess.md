---
title: "Seven Games of Chess: Stat 110"
date: "2020-11-03"
published: true
tags: ["mathematics", "probability", "stat-110"]
image: ../src/images/chess-match.jpg
pagetype: "article"
---

**Warning: Spoilers Follow**

A homework problem from [Harvard's Stat 110](https://projects.iq.harvard.edu/stat110) course has two chess players ready to play 7 games. The possible outcomes for each game are Win (1 point), Draw (0.5 points), and Loss (0 points). If all seven games were to be played regardless of the outcomes of the individual games, it's possible that one player could have 7 points and the other 0 points. We'll call the two players A and B.

**(a) How many possible outcomes for the individual games are there, such that player A has a final result of 3 wins, 2 draws, and 2 losses?**

First, we consider the ways in which A can get 4 wins in 7 games, $\binom{7}{3}$. Next, we consider the ways in which A can get 2 draws in the remaining 3 games, $\binom{4}{2}$. Finally, we consider the ways in which A can get 2 losses in the remaining 2 games, $\binom{2}{2}$. This gives us

$$
\binom{7}{3}\binom{4}{2}\binom{2}{2} \ = \ \frac{7!}{3!2!2!} \ = \ 210
$$

Keeping in mind that there are n! permutations of n distinct objects, and that each chess game can be thought of as a distinct object (maybe with a particular event ID number for record-keeping), we can say there are 7! permutations of 7 games to be played. For example if games 1 - 7 are given IDs sequentially starting from 1, one permutation of the 7-game tournament is 1234567. Another is 7123456. It would be tedious and demotivating to have to list all of the permutations, of course.

Anyway, the middle term in the above equation $\frac{7!}{3!2!2!}$ can be read as the number of permutations of 7 games divided by the product of the number of permutations of games won by A, the number of games played to a draw, and the number of games lost by A.

**(b) How many possible outcomes for the individual games are there, such that A records 4 points and B records 3 points?**

Think of the ways in which A can get 4 points:

- 4 wins, 0 draws, 3 losses (possible result 1)
- 3 wins, 2 draws, 2 losses (possible result 2)
- 2 wins, 4 draws, 1 loss (possible result 3)
- 1 win, 6 draws, 0 losses (possible result 4)

Combining the possible results is straightforward.

$$
\frac{7!}{4!0!3!} \ + \ \frac{7!}{3!2!2!} \ + \ \frac{7!}{2!4!1!} \ + \ \frac{7!}{1!6!0!}
$$

$$
\ = \ 357
$$

**(c) Finally, consider the tournament as being a best-of-seven tournament in which the games will cease either when one player reaches a total of 4 points, or when 7 games have been played, whichever comes first. Of course, this means it's possible for the tournament to end in 4 games if one player wins the first four. How many possible outcomes are there if the tournament lasts 7 games and A wins by a score of 4 to 3?**

The key to this problem is implementing the fact that A cannont have 4 points until the 7th game, or in other words, A cannot have won the tournament (by achieving 4 points) after 6 games have been played. Now, consider the ways in which A can win in the last game:

- A finishes game 6 with a total of 3 points (needing a win in the 7th game to achieve 4 points)
  - 3 wins, 0 draws, 3 losses (possible result 1)
  - 2 wins, 2 draws, 2 losses (possible result 2)
  - 1 win, 4 draws, 1 loss (possible result 3)
  - 0 wins, 6 draws, 0 losses (possible result 4)
- A finishes game 6 with a total of 3.5 points (needing a draw in the 7th game to achieve 4 points)
  - 3 wins, 1 draw, 2 losses (possible result 5)
  - 2 wins, 3 draws, 1 loss (possible result 6)
  - 1 win, 5 draws, 0 losses (possible result 7)

Combining the possible results gives:

$$
\frac{6!}{3!0!3!} \ + \frac{6!}{2!2!2!} \ + \frac{6!}{1!4!1!} \ + \frac{6!}{0!6!0!}
$$

$$
\ + \ \frac{6!}{3!1!2!} \ + \frac{6!}{2!3!1!} \ + \frac{6!}{1!5!0!} \ = \ 267
$$
