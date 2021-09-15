# WEEK-08 DAY-1<br>*White-Boarding Tips and Tricks* {ignore=true}
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=2 orderedList=false} -->
________________________________________________________________________________
________________________________________________________________________________
# White-Boarding Tips

## Why do companies whiteboard?

Steps to solving white-boarding questions are identical to the steps necessary to
solve real-world practical problems.

Companies want to see how you perform as a team member in a real team.

Things the interviewer will be looking for:
* Can you think algorithmically? Can you think about efficiency?
* Are you a good communicator? Are you someone I want to think through a new
  feature with?
* Can you code? Can you code neatly and correctly?

## Correct steps

1. Clarify the problem & test I/O and edge cases
2. Formulate your approach(es)
3. Pseudocode best approach
4. Code it
5. Walk through an example input
6. Determine the Big O time and space complexity

## Clarification

Before you jump into coding, ask questions. Don't rush, it's a problem-solving
demo, not a speed-coding test.

* What are we coding?
* Are there any constraints on the input/output?
* What edge cases can we expect?

## Test I/O

You should start with simple inputs and then slowly build up size or complexity
of inputs. Look for patterns and things that remind you of problems you know how
to solve.

If you draw a blank, use the following strategies to get started.

* Make up a sample input and compute it. Do this two or three times.
* Go through data structures in your head. Go through algorithms you know
  simultaneously. If you find one that works for this problem, run with it.
* If not, find a naive solution, any solution, to get started. Then you can
  optimize.
* Come up with a simpler version of the problem, solve it, then progressively
  add complexity.
* Think aloud about the likely bounds on efficiency for your solution.
  * This is an easy way to score points.
  * "What's sure is I'll have to iterate through all the points, so it's at
    least linear time."
  * "The problem is trivial when the set is sorted. So it can definitely be done
    in nLOGn time. Let's see if we can do better than n Log n."

## Pseudocode

Never skip this step! Companies expect you to be able to pseudocode because it
is the English version of your approach to the problem. You need to lay out your
strategy step by step, so that when you code, you have something to refer back
to. It's easy to be lost in the intricacies of implementation, so you as well as
the interviewer need pseudocode to refer back to when you lose track of your
thoughts.

* Be as detailed as possible
* Spend as much time as you want, within reason
* Make sure you can reason about implementation of every step

## During the Problem

At this point, you should have spent at least 60% of your time. If you sprinted
to coding, you most likely didn't spend enough time planning and will struggle
here. If planned properly, this section should be the easiest part.

* The nice thing about white boards is you and the interviewer are facing the
  same direction.
* Convince yourself that you are solving the problem together. Say "we" instead
  of "I".
* Don't stop until they tell you to.

Your style definitely makes an impact. Here are tips to how to handle your
bearing.

* Be confident; even if you don't know the answer, try to engage the problem,
  don't give up. If you keep telling an interviewer you don't know how to do
  something, they'll start to believe you.
* Talk through the problem; they want to see the process going on in your head.
  If you don't talk, the interviewer doesn't learn how you break-down and
  analyze a problem. If you can write and talk at the same time, great! If not,
  tell the interviewer what you're about to write, write it, and explain what
  you wrote.
* The interviewer may give you hints. They will ask questions to keep you on
  track. Don't be flustered or think you're failing; this is normal.
* If they ask you "does this work", take a moment to think. Walk through the
  steps; out loud is fine. If you say yes, say it like you believe it;
  interviewers don't like to think people are just praying they'll get the
  answer right.
* Listen to the interviewer. They are trying to help you. No one likes someone
  who doesn't listen.

## Walk through an example input

* Initiate this step - don't wait to be prompted.
* Track all of your variables.
* Draw stacks if you're using a recursive method.
* Follow each iteration of your loops.
* Reason through your code from input to output.

## Time and space complexity

* You should know how to do this - refer back to Big O reading if you need to.
* Remember time is expensive and space is cheap.
* If your approach is naive, attempt to optimize.
* If not, ask your interviewer if they'd like you to optimize.

## Strategies

Keep a mental list of general strategies you can turn to. Here are a few:

1. Bucketizing with a hash: If the input set is bounded, try organizing it into
   a hash.
   * Ex: Sort an array of 100,000 integers that are all in the range 1-100
2. Dynamic programming, or "divide and conquer": Divide into smaller and smaller
   but equal subproblems.
   * Ex: See [this solution](http://www.careercup.com/question?id=19286747) for
     a Google interview question.
3. Look for useful mathematical properties.
   * Sometimes you have individual values when really what you care about is
     their sums.
   * Ex: For an array of integers 1 - 100 where all elements appear once except
     one that appears twice, find the repeat.
4. [Amortized analysis](http://en.wikipedia.org/wiki/Amortized_analysis): it's
   ok to do something memory- or space-intensive if you can prove that this cost
   comes with a greater payoff.
   * Ex: Implement a queue using two stacks.
5. Keep a stack or a queue on the side to track values as your algorithm goes
   through the problem.
6. Keep two pointers for the same iteration.
   * Ex: Reverse a string in place (ie. using no more memory space than the
     length of the string).
7. Perform an operation twice.
   * Ex: Reverse the word order of a string, but not the letters within the
     words.
8. Sort the input.
   * Ex: Finding anagrams.
9. Approach the problem from the other end.
   * Ex: see [this
     solution](http://www.techinterview.org/post/526325766/pirates) for a Fog
     Creek interview question.
10. Use binary numbers instead of decimal numbers.
    * Ex: see the [famous Bad
      King](http://www.techinterview.org/post/526313890/bad-king) problem.
11. For efficiency, use binary search instead of incrementation. Esp. good for
    implementing math operators.
    * Ex: Implement division without using "/", in less than O(n) time.

## Don't be Sly

If you don't understand the problem, ask for clarification. A well-formulated
question is as impressive as a good answer. If you don't know something, don't
make it up. Tell the interviewer you don't know and then try your best guess.
Many interviewers will really like this. Same thing when you hit a snag. Don't
try to cover things up and make it look like you were on the right track.
Explain to the interviewer why you think the current hypothesis actually won't
work.

## How to handle questions you’ve seen before.

What if you get a whiteboard problem you already know the solution to? Obviously
the ethical thing is to tell your interviewer you’ve seen the problem before and
you’ll get points for that. Put on a sad face to show you were excited about
solving a new problem.

Furthermore, you won’t necessarily perform better on a question you’ve seen.
You’ll probably solve it faster, but speed is overrated. On the other hand, it’s
much harder to show your interviewer how you think when you’re really just
recalling a solution. Note that the easiest parts of a problem are also the
hardest to remember. So even if you confound your interviewer, they’ll be left
wondering why you breezed through the hardest part of the problem while
stumbling on the rest. That’s a failure to demonstrate how you think, which is
the real purpose of a whiteboard problem.

________________________________________________________________________________
# White Boarding Exercises

Work together to "white board" answers to the following problems. Your pair will
present one of them at the end of the day.

You may not have real white boards on which to draw. If not, use the Zoom
white board or just pen and paper. Talk through the answers. Determine if you
are right.

When white boarding, you don't have to necessarily draw images. You can write
code or pseudocode or draw circles and arrows. Just something to indicate that
you understand the problem and what it would take to solve it.

## Mirror image trees

Google asks in its interview process for you to draw an algorithm on a board
that would return true if a binary tree is a mirror image of another binary
tree.

## Reverse a linked list

Amazon and Microsoft ask you to show an algorithm that will reverse a
singly-linked list, that is, a list that is made of nodes between which there is
a unidirectional association as in the following image.

![singly-linked list](images/Singly-linked-list.svg)

## The missing value

Amazon and Microsoft ask you to derive an algorithm that will inspect an
array of of numbers that contains the values between 0 and the length
of the list, inclusive, and find the missing value. For example, you may be
given an array that of length 6 that contains

```
[0, 2, 3, 4, 5, 6]
```

It is your job to determine that the missing value from the array is 1.

## Stack min

Google and Apple ask you to design a stack that, in addition to the `push` and
`pop` functions, has a function `min` that returns the minimum element in the
stack _without_ removing it. All three functions `push`, `pop`, and `min` should
operate in O(1) time.

## Test a retractable ballpoint pen

Facebook asks you to write the tests cases for testing a ballpoint pen. What
would you consider to be good tests for the pen? Try to be as exhaustive as
possible.

## OOParking Lot

Amazon and Microsoft ask you to specify the classes that it would take to write
software to manage a paid parking lot. It should know where cars are parked,
be able to identify the cars, know where the keys are hanging, how many cars
are in the lot, what time the cars come and go, and how much it costs someone
when they leave the parking lot based on the following schedule:

| Time       | Rate per hour |
|------------|---------------|
| 8pm - 6am  | $3            |
| 6am - noon | $10           |
| noon - 6pm | $8            |
| 6pm - 8pm  | $6            |
