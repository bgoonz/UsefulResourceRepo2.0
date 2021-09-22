---
title: "Capturing and Tagging Elk: Stat 110 Ch 1"
date: "2020-11-28"
published: true
tags: ["mathematics", "probability", "stat-110"]
image: ../src/images/elk.jpg
pagetype: "article"
---

**Warning: Spoilers Follow**

From Stat 110, Chapter 1

**Ex 1.31**<br>
_Elk dwell in acertain forest. There are N elk, of which a simple random sample of size n are captured and tagged ("simple random sample" means that all $\binom{N}{n}$ sets of n elk are equally likely). The captured elk are returned to the population, and then a new sample is drawn, this time with size m. This is an important method that is widely used in ecology, known as capture-recapture. What is the probability that exactly k of the m elk in the new sample were previously tagged? (Assume that an elk that was captured before doesn't become more or less likely to be captured again.)_

### Answer

---

The number of ways you can have m elk is $\binom{N}{m}$. The number of ways that k of the n tagged elk can be chosen is given by $\binom{n}{k}$. And, the number of ways you can have the rest of the sample not be from the n tagged elk is given by $\binom{N-n}{m-k}$. So, our probability is given by:

$$
P(k_{tagged}) = \frac{\binom{n}{k}\binom{N-n}{m-k}}{\binom{N}{m}}
$$

considering k for which $0 \leq k \leq n$ and $0 \leq m-k \leq N-n$.

---
