# White-Boarding Tips
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Why do companies whiteboard?](#why-do-companies-whiteboard)
- [Correct steps](#correct-steps)
  - [Clarification](#clarification)
  - [Test I/O](#test-io)
  - [Pseudocode](#pseudocode)
  - [During the Problem](#during-the-problem)
  - [Walk through an example input](#walk-through-an-example-input)
  - [Time and space complexity](#time-and-space-complexity)
- [Alternative Approach: REACTO](#alternative-approach-reacto)
  - [Repeat](#repeat)
  - [Example](#example)
  - [Approach](#approach)
  - [Code](#code)
  - [Test](#test)
  - [Optimize](#optimize)
- [Strategies](#strategies)
- [Don't be Sly](#dont-be-sly)
- [How to handle questions you’ve seen before.](#how-to-handle-questions-youve-seen-before)

<!-- /code_chunk_output -->
________________________________________________________________________________

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

### Clarification

Before you jump into coding, ask questions. Don't rush, it's a problem-solving
demo, not a speed-coding test.

* What are we coding?
* Are there any constraints on the input/output?
* What edge cases can we expect?

### Test I/O

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

### Pseudocode

Never skip this step! Companies expect you to be able to pseudocode because it
is the English version of your approach to the problem. You need to lay out your
strategy step by step, so that when you code, you have something to refer back
to. It's easy to be lost in the intricacies of implementation, so you as well as
the interviewer need pseudocode to refer back to when you lose track of your
thoughts.

* Be as detailed as possible
* Spend as much time as you want, within reason
* Make sure you can reason about implementation of every step

### During the Problem

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

### Walk through an example input

* Initiate this step - don't wait to be prompted.
* Track all of your variables.
* Draw stacks if you're using a recursive method.
* Follow each iteration of your loops.
* Reason through your code from input to output.

### Time and space complexity

* You should know how to do this - refer back to Big O reading if you need to.
* Remember time is expensive and space is cheap.
* If your approach is naive, attempt to optimize.
* If not, ask your interviewer if they'd like you to optimize.

<!-- MIRA Added REACTO alternative, suggested by Victoria -->
## Alternative Approach: REACTO
There are various different approaches one can take to whiteboarding a problem.
They will usually follow similar steps overall, but may differ in the details.
Here is one white-boarding strategy based on the acronym REACTO.

### Repeat
Repeat the clarify the problem, potential restrictions, and any details or
uncertainties before starting on finding a solution to the problem.

### Example
Create an example that you can refer to throughout the problem-solving process.
Think of example inputs, expected results, potential edge cases, etc.

### Approach
Formulate an approach with ideas for algorithms or data structures to use, then
pseudocode out the idea you settle on before you start actually coding.

### Code
Actually code the final solution, working closely off your pseudocode blueprint.

### Test
Test the solution with some examples, such as the example(s) created before
making the approach on the problem itself. Walk through the example input to demonstrate the logic and steps of the process.

### Optimize
Think of ways to optimize the code, or explain your reasoning for the
optimization choices you'd already made while approaching and coding the
solution. Explain your understanding of how well your code is currently
optimized.

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
