---
title: "Stat 110 Ch 2, Ex 14: Tversky and Kahneman Burglar Alarm Problem"
date: "2020-11-22"
published: true
tags: ["mathematics", "probability", "stat-110"]
image: ../src/images/security_camera.jpg
pagetype: "article"
---

**Warning: Spoilers Follow**

**Ex 2.14:** _Consider the following scenario, from Tversky and Kahneman:_<br>
_Let A be the event that before the end of next year, Peter will have installed a burglar alarm system in his home. Let B denote the event that Peter's home will be burglarized before the end of next year._

_(a) Intuitively, which do you think is bigger, $P(A|B)$ or $P(A|B^{c})$? Explain your intuition._

$$
P(A|B) > P(A|B^{c})
$$

We're not given any information about Peter's situation at all. Information such as whether or not Peter has considered installing a burglar alarm previously, whether or not his home has been burglarized previously, how much money Peter has to invest in an alarm, or what he stands to lose in case of a burglary; if he has little in the way of valuable possessions, an alarm wouldn't seem worth the financial investment. And, there are many other questions you could ask about Peter's situation. Keeping things simple, though, we could say intuitively that the average person wouldn't be motivated to install a burglar alarm without having suffered a burglary first. Of course, there are people who have a strong desire to protect their homes and families, and who might think proactively and install an alarm before ever being burglarized, but it would be reasonable to assume that if Peter were such a person, he would have already installed such an alarm.

_(b) Intuitively, which do you think is bigger, $P(B|A)$ or $P(B|A^{c})$? Explain your intuition._

$$
P(B|A) > P(B|^{c})
$$

The event A can happen anytime before the end of next year, which means there are more than 365 days on which a burglary could happen. The same is true for the event B. There's no information about the chronology of the events. It helps to read out the probability expressions:

$P(A|B)$ - The probability that A will occur in a time period that stretches between now and the end of next year given that B will occur in the same time period.<br>
$P(B|A)$ - The probability that B will occur in a time period that stretches between now and the end of next year given that A will occur in the same time period.

Consider the extreme case in which the following is true:<br>
_Peter will install an alarm immediately if and only if his home is burglarized._

Fast forward to the end of next year. We're told that Peter's home was burglarized, which means we know that he has installed an alarm system. Or, say we fast forward to the end of next year, and we're told Peter has installed an alarm system. This means we know his home has been burglarized. If we think it's more likely to be the case that he will install an alarm system if his home has been burglarized, we should conclude that if his home will have been burglarized by the end of next year, that his home will have had an alarm installed.

_(c) Show that for any events A and B (with probabilities not equal to 0 or 1), the inequality $P(A|B) > P(A|B^{c})$ is equivalent to $P(B|A) > P(B|A^{c})$._

The sample space can be thought of as the collection of the following 4 pieces:

$$
a = P(A^{c} \cap B)
$$

$$
b = P(A \cap B)
$$

$$
c = P(A \cap B^{c})
$$

$$
d = P(A^{c} \cap B^{c})
$$

We start with the inequality $P(A|B) > P(A|B^{c})$

(1) $\frac {P(A \cap B)}{P(B)} >\frac {P(A \cap B^{c})}{P(B^{c})}$

$P(B) = P(B \cap A) + P(B \cap A^{c}) = b + a$<br>
$P(B^{c}) = P(B^{c} \cap A) + P(B^{c} \cap A^{c}) = c + d$

Cross multiplying and using a, b, c, and d above gives

(2) $b(c + d) > c(a + b)$<br>

(3) $bc + bd > ac + bc$<br>

(4) $bd > ac$<br>

(5) $\frac{b}{c} > \frac{a}{d}$<br>

(6) $\frac{P(B \cap A)}{P(A \cap B^{c})} > \frac{P(B \cap A^{c})}{P(A^{c} \cap B^{c})}$

To get us where we need to be, the left and right denominators need to be, respectively,

$P(A)$ and $P(A^{c})$

$P(A) = P(A \cap B) + P(A \cap B^{c}) = b + c$<br>
$P(A^{c}) = P(A^{c} \cap B) + P(A^{c} \cap B^{c}) = a + d$

To achieve this, we can add $ab$ to both sides of (4) above

$ab + bd > ab + ac$<br>

$b(a + d) > a(b + c)$<br>

$\frac{b}{b + c} > \frac{a}{a + d}$<br>

$\frac{P(B \cap A)}{P(A)} > \frac{P(B \cap A^{c})}{P(A^{c})}$<br>

$P(B|A) > P(B|A^{c})$<br>
**QED**

_(d) Tversky and Kahneman report that 131 out of 162 people whom they posed (a) and (b) to said that $P(A|B) > P(A|B^{c})$ and $P(B|A) < P(B|A^{c})$. What is a plausible explanation for why this was such a popular opinion despite (c) showing that it is impossible for both inequalities to hold?_

$P(B|A^{c})$ given the definitions of A and B in the original problem statement is the probability that Peter will suffer a burglary before the end of the year given that he will have a burglar alarm installed by the end of the year. The chronology of the events is not specified, so it is possible that he will suffer a burglary before he has the alarm installed. So, if you think he will install a burglar alarm after having suffered a burglary, it makes sense to say $P(B|A) > P(B|A^{c})$. But, it seems many respondents took $P(B|A^{c})$ to be the probability of suffering a burglary given that he didn't have an alarm installed prior to the burglary and $P(B|A)$ to be the probability that he had a burglary after having an alarm installed. In that case, there's a good chance they would say $P(B|A) < P(B|A^{c})$ meaning that it's more likely Peter will suffer a burglary without an alarm than with one. This seems like a problem of not having parsed the language of the original problem statement thoroughly.
