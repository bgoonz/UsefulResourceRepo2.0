---
title: "Exit Poll: Stat 110"
date: "2020-11-18"
published: true
tags: ["mathematics", "probability", "stat-110"]
image: ../src/images/exit_poll.jpg
pagetype: "article"
---

**Warning: Spoilers Follow**

From Unit 2 of _Blitzstein/Hwang Probability_ (Harvard's Stat 110 probability course)

**Ex. 2.11**<br>
_An exit poll in an election is a survey taken of voters just after they have voted. One major use of exit polls has been so that news organizations can try to figure out as soon as possible who won the election, before the votes are officially counted. This has been notoriously innacurate in various elections, sometimes because of selection bias: the sample of people who are invited to and agree to participate in the survey may not be similar enough to the overall population of voters._<br>
_Consider an election with two candidates, Candidate A and Candidate B. Every voter is invited to participate in an exit poll, where they are asked whom they voted for; some accept and some refuse. For a randomly selected voter, let A be the event that they voted for A, and W be the event that they are willing to participate in the exit poll. Suppose that $P(W|A) = 0.7$ but $P(W|A^{c}) = 0.3$. In the exit poll, 60% of the respondents say they voted for A (assume that they are all honest), suggesting a comfortable victory for A. Find $P(A)$, the true proportion of people who voted for A._

Let $P(A)$ = p. Considering events A and W, the Law of Total Probability (LOTP) says:

$$
p = P(A|W)P(W) + P(A|W^{c})P(W^{c})
$$

Unfortunately, we don't have a way of determining $P(W)$, and by extension $P(W^{c})$, given the information above, so we'll need to come up with a different route to a solution.

60% of the respondents say they voted for A, and we are told the respondents are all honest, so we can say $P(A|W) = 0.6$. Baye's Theorem gives us:

$$
P(A|W) = \frac{P(W|A)p}{P(W)}
$$

Applying LOTP to $P(W)$ gives us:

$$
P(W) = P(W|A)p + P(W|A^{c})(1 - p)
$$

(Remember, $P(A) = p$)

Now for a little algebraic kung-fu:

$P(A|W) = \frac{P(W|A)p}{P(W|A)p + P(W|A^{c})(1 - p)}$

$P(A|W)[P(W|A)p + P(W|A^{c})(1 - p)] = P(W|A)p$

$P(A|W)P(W|A)p + P(A|W)P(W|A^{c})(1 - p) = P(W|A)p$

$P(A|W)P(W|A)p + P(A|W)P(W|A^{c}) - P(A|W)P(W|A^{c})p = P(W|A)p$

$P(A|W)P(W|A^{c}) = P(W|A)p + P(A|W)P(W|A^{c})p - P(A|W)P(W|A)p$

$\frac{P(A|W)P(W|A^{c})}{P(W|A) + P(A|W)P(W|A^{c}) - P(A|W)P(W|A)} = p$

Substituting in the appropriate values gives:

$$
\frac{\frac{6}{10} * \frac{3}{10}}{\frac{7}{10} + \frac{6}{10} * \frac{3}{10} - \frac{6}{10} * \frac{7}{10}} = p
$$

$$
\frac{\frac{18}{100}}{\frac{70}{100} + \frac{18}{100} - \frac{42}{100}} = p
$$

$$
\frac{\frac{18}{100}}{\frac{46}{100}} = \frac{18}{100} * \frac{100}{46} = p
$$

$$
\frac{9}{23} = p
$$
