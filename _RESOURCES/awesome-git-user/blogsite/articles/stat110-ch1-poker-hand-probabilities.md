---
title: "Poker Hand Probabilities: One Pair"
date: "2020-10-31"
published: true
tags: ["mathematics", "probability", "stat-110"]
image: ../src/images/playing_cards.jpg
pagetype: "article"
---

Calculating the probability of a full house is shown in chapter 1 of Harvard's _Stat 110 (Probability)_ [course](https://projects.iq.harvard.edu/stat110), and is pretty straightforward. First, get the number of ways to choose three of a kind, multiply it by the number of ways to choose a pair from the remaining cards, and divide that product by the total number of possible hands. The calculation is shown below.

$$
P(full \ house) = \frac{13\binom{4}{3}12\binom{4}{2}}{\binom{52}{5}}
$$

which gives ~0.00144. A small probability, as you'd expect for such a powerful poker hand.

Binomial coefficient calculations are done using the binomial coefficient formula:

$$
\binom{n}{k} \ = \ \frac{n!}{k!(n-k)!}
$$

Now, let's look at the example of calculating the probability of holding a single pair if dealt a 5-card poker hand.

There are 13 ranks in a deck of playing cards: _Ace, 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, King_. And there are 4 suits: _Hearts, Diamonds, Clubs, Spades_, with each suit being comprised of 13 cards, each one representing a rank. So, the total number in the deck is

$$
4 \ suits \ * \ \frac{13 \ cards}{suit} \ = \ 52 \ cards
$$

First, we think about the number of ways to choose any specific rank. There are 52 cards in a deck, so there are 52 ways to choose any card. Since each rank is repeated four times, there are 52/4 = 13 ways to choose a rank; If we were to consider a card of rank 7, we could pick any of the following four cards: 7 of hearts, 7 of diamonds, 7 of clubs, or 7 of spades.

Next, we think about the number of ways to choose two cards of a specific rank out of the four cards of that rank in the deck, which can be represented by the binomial coefficient $\binom{4}{2}$ (read "four choose two").

Then, considering the other three cards, none of which can be the same rank as the pair (otherwise, our hand would not be only a pair), we have 12 ranks to choose the other 3 cards from $\binom{12}{3}$. And, for each card, we consider the number of ways to choose its suit: $\binom{4}{1}$

Finally, we get the probability by dividing the number of ways to get a pair by the total number of ways to get a five-card hand from the deck, $\binom{52}{5}$.

So, the probability of holding a pair if dealt a 5-card hand is

$$
P(pair) \ = \ \frac{13\binom{4}{2}\binom{12}{3}\binom{4}{1}^{3}}{\binom{52}{5}} \approx \ 0.4225
$$

which is about 42%.

So, it seems that calculating the probability of a full house was a little more straightforward owing to the fact that all five cards are used to make our hand; with just a pair, there are three cards to consider that won't make our hand.
