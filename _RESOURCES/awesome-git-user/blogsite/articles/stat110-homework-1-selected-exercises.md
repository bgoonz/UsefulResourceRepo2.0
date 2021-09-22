---
title: Stat 110 Homework 1 - Selected Exercises Pt 1
date: "2020-11-04"
published: true
tags: ["mathematics", "probability", "stat-110"]
image: ../src/images/powerball.jpg
pagetype: "article"
---

**Warning: Spoilers Follow**

**1. How many ways are there to permute the letters in the word MISSISSIPPI?**

If each letter were to have its own unique ID and it were the case that only the IDs mattered, there would be 11! permutations of the word MISSISSIPPI. However, were not permuting unique IDs, but letters, some of which get used several times, which means that 11! permutations would include overcounting.

- M (1 time)
- I (4 times)
- S (4 times)
- P (2 times)

There are 4! ways in which the letters 'I' can be interchanged with each other, 4! ways in which the letters 'S' can be interchanged, and 2! ways in which the letters 'P' can be interchanged with each other. To adjust for overcounting, we divide 11! by these values (4!, 4!, 2!). Even though 'M' can't really be interchanged with itself, in an abstract mathematical way, we can imagine that it can be in order to make sense of the following calculation:

$$
\frac{11!}{1!4!4!2!} \ = \ 34650
$$

---

**12. Four players, named A, B, C, and D, are playing a card game. A standard, well-shuffled deck of cards is dealt to the players (so that each player receives a 13-card hand).**

**(a) How many possibilities are there for the hand that player A will get? (Within a hand, the order in which the cards were received doesn't matter.)**

Don't overthink this one. We know from examples in the text that the number of possible 5-card hands from a 52-card deck is $\binom{52}{5}$. Instead of a five-card poker hand, each player gets a 13-card hand, so the number of possible hands for a player is:

$$
\binom{52}{13}
$$

**(b) How many possibilities are there overall for what hands everyone will get, assuming that it matters which player gets which hand, but not the order of cards within a hand?**

Once you take into account the possible hands player A can get, player B has fewer possible hands since they cannot receive any of the cards that player A received. By the same logic, Player C has fewer possible hands than player B, and player D has fewer possible hands than everyone.

$$
\binom{52}{13} \binom{39}{13} \binom{26}{13} \binom{13}{13}
$$

**(c) Explain intuitively why the answer to Part (b) is not the fourth power of the answer to Part (a).**

If the answer to Part (b) were $\binom{52}{13}^4 \ = \ \binom{52}{13}\binom{52}{13}\binom{52}{13}\binom{52}{13}$,

that would mean that we were replacing the cards dealt to players with exact copies so that they may be dealt to other players, but if there's only one deck, this isn't happening. That's why $\binom{52}{13}^4$ is not the correct answer to Part (b).

---

**14. You are ordering two pizzas. A pizza can be small, medium, large, or extra-large, with any combinations of 8 possible toppings (getting no toppings is allowed, as is getting all 8). How many possibilities are there for your two pizzas?**

For each pizza, you have $\binom{4}{1}$ ways to choose a size. Then, you have 9 possible topping combinations, including the zero-toppings option.

$$
4\binom{8}{8} \ + \ 4\binom{8}{7} + \ 4\binom{8}{6} + \ 4\binom{8}{5}
$$

$$
+ \ 4\binom{8}{4} \ + \ 4\binom{8}{3}\ + \ 4\binom{8}{2}\ + \ 4\binom{8}{1}
$$

$$
\ + \ 4\binom{8}{0}
$$

Taking into account both pizzas and the fact that $\binom{n}{k} \ = \ \binom{n}{n-k}$, we have

$\left [4\left [2\binom{8}{8}+2\binom{8}{7}+2\binom{8}{6}+2\binom{8}{5}+\binom{8}{4} \right ] \right ]^2$

$= 1048576$.

Adjusting for overcounting since the order of pizzas doesn't matter, we finally have $\frac{1048576}{2} \ = \ 524288$
