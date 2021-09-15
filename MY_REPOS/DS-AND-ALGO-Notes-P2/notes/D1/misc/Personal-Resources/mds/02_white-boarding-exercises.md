# White-Boarding Exercises
________________________________________________________________________________
<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=6 orderedList=false} -->

<!-- code_chunk_output -->

- [Mirror image trees](#mirror-image-trees)
- [Reverse a linked list](#reverse-a-linked-list)
- [The missing value](#the-missing-value)
- [Stack min](#stack-min)
- [Test a retractable ballpoint pen](#test-a-retractable-ballpoint-pen)
- [OOParking Lot](#ooparking-lot)

<!-- /code_chunk_output -->
________________________________________________________________________________

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
