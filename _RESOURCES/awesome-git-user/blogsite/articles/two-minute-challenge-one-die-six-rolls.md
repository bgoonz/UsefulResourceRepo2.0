---
title: Two-Minute Challenge - One Die, Six Rolls
date: "2020-11-24"
published: true
tags: ["mathematics", "probability"]
image: ../src/images/single_die.jpg
pagetype: "article"
---

**Warning: Spoilers Follow The Question**

If you roll a single die six times, what is the probability of a number being rolled more than once?

## Answer

---

There are six sides to a die, each side representing a unique number. A series of six rolls where no number is repeated could be

1, 2, 3, 4, 5, 6

or

5, 4, 3, 2, 1, 6

In fact there are 6! permutations of roll sequences where no number is repeated. And, there are $6^{6}$ possible roll sequences including ones with no repeats and ones with them. With this we can calculate the probability of rolling a sequence with no repeats:

$$
P(no \ repeats) = \frac{6!}{6^{6}} \approx 0.0154
$$

This means the probability of a repeated number in a sequence of six rolls is

$$
P(repeat) = 1 - \frac{6!}{6^{6}} \approx 0.9846
$$
