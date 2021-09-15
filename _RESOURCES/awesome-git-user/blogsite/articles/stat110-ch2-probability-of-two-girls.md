---
title: "Probability of Two Girls Example: Stat 110"
date: "2020-11-06"
published: true
tags: ["mathematics", "probability", "stat-110"]
image: ../src/images/silhouette.jpg
pagetype: "article"
---

**Note:** This puzzle dates back to the 1950s, so old-fashioned assumptions were made. This is stated in the textbook as well.

(a) A couple has two children. The older child is a girl. What is the probability that both children are girls?

Not knowing anything else, we there are four ways in which the couple could have had two children (Here, we use the convention that the letter on the left represents the firstborn child):

- BB
- BG
- GB
- GG

G - Girl, B - Boy

Considering the above four scenarios, only two of them allow for the older child to be a girl:

- GB
- GG

It's easy to see that the probability that both of the couple's children are girls is 1/2.

(b) A couple has two children. At least one of them is a girl. What is the probability that both children are girls?

Again, with no information, the four possibilites for the children are:

- BB
- BG
- GB
- GG

BB is invalid since at least one of the children must be a girl. This leaves us with 3 possible scenarios:

- BG
- GB
- GG

GG represents 1/3 of the possible scenarios, so it's easy to see that the probability of both children being girls is 1/3.

Now, consider another example:

**Example 2.2.6** (Random child is a girl). A family has two children. You randomly run into one of the two, and learn that she is a girl. With our old-fashioned assumptions (as used in the previous example), what is the conditional probability that both are girls? Also, assume that you are equally likely to run into either child, and that which one you run into has nothing to do with gender.

Without thinking too much, we might be tempted to say that this is just the same problem as (b) above; we know there are two children, and since we ran into one and found one of them to be a girl, we might say that we know at least one of the children is a girl and conclude the probability of both children being girls is 1/3, as above.

However, in problem (b) above, we were dealing with knowing only two things about the family: that there were two children and at least one was a girl. We thought in terms of events, one child being born, then another. Without any other information, we made our calculation. In this case, at the moment we learn that at least one of the children is a girl, our encounter gives us a little more 'knowledge'. Take some time to think about this before reading on...

Consider two scenarios, one in which we run into the older child, and one in which we run into the younger child.

Recall that there were three possible combinations of children given that at least one is a girl:

- (Older)(Younger)
- BG
- GB
- GG

**Scenario 1 (we run into the older child)**

There are 2 out of 3 possibilities above for us to run into an older girl:

- GB
- GG

So, the probability of two girls is 1/2.

**Scenario 2 (we run into the younger child)**

Just like the older-child scenario, we have two possibilities:

- BG
- GG

So, again, the probability of two girls is 1/2.
