# WEEK 7<br>*Data Structures and Algorithms* {ignore=true}
________________________________________________________________________________

<!-- code_chunk_output -->

[**GitHub Profile and Projects Learning Objectives**](#github-profile-and-projects-learning-objectives)
- [Improving Your Profile Using GitHub](#improving-your-profile-using-github)
  - [Wikis (pre-project)](#wikis-pre-project)
  - [README files (post-project)](#readme-files-post-project)
  - [Wrap up](#wrap-up)
- [Your GitHub Identity](#your-github-identity)

[**Big O Learning Objectives**](#big-o-learning-objectives)
[**Memoization And Tabulation Learning Objectives**](#memoization-and-tabulation-learning-objectives)
- [Recursion Videos](#recursion-videos)
- [Curating Complexity: A Guide to Big-O Notation](#curating-complexity-a-guide-to-big-o-notation)
  - [Why Big-O?](#why-big-o)
  - [Big-O Notation](#big-o-notation)
- [Common Complexity Classes](#common-complexity-classes)
  - [The seven major classes](#the-seven-major-classes)
- [Memoization](#memoization)
  - [Memoizing factorial](#memoizing-factorial)
  - [Memoizing the Fibonacci generator](#memoizing-the-fibonacci-generator)
  - [The memoization formula](#the-memoization-formula)
- [Tabulation](#tabulation)
  - [Tabulating the Fibonacci number](#tabulating-the-fibonacci-number)
  - [Aside: Refactoring for O(1) Space](#aside-refactoring-for-o1-space)
- [Analysis of Linear Search](#analysis-of-linear-search)
- [Analysis of Binary Search](#analysis-of-binary-search)
- [Analysis of the Merge Sort](#analysis-of-the-merge-sort)
- [Analysis of Bubble Sort](#analysis-of-bubble-sort)
- [LeetCode.com](#leetcodecom)
- [Memoization Problems](#memoization-problems)
- [Tabulation Problems](#tabulation-problems)

[**Sorting Algorithms Learning Objectives**](#sorting-algorithms-learning-objectives)
- [Bubble Sort](#bubble-sort)
  - [_"But...then...why are we..."_](#_butthenwhy-are-we_)
  - [The algorithm bubbles up](#the-algorithm-bubbles-up)
  - [How does a pass of Bubble Sort work?](#how-does-a-pass-of-bubble-sort-work)
  - [Ending the Bubble Sort](#ending-the-bubble-sort)
  - [Pseudocode for Bubble Sort](#pseudocode-for-bubble-sort)
- [Selection Sort](#selection-sort)
  - [The algorithm: select the next smallest](#the-algorithm-select-the-next-smallest)
  - [The pseudocode](#the-pseudocode)
- [Insertion Sort](#insertion-sort)
  - [The algorithm: insert into the sorted region](#the-algorithm-insert-into-the-sorted-region)
  - [The Steps](#the-steps)
  - [The pseudocode](#the-pseudocode-1)
- [Merge Sort](#merge-sort)
  - [The algorithm: divide and conquer](#the-algorithm-divide-and-conquer)
- [Quick Sort](#quick-sort)
  - [How does it work?](#how-does-it-work)
  - [The algorithm: divide and conquer](#the-algorithm-divide-and-conquer-1)
  - [The pseudocode](#the-pseudocode-2)
- [Binary Search](#binary-search)
  - [The Algorithm: "check the middle and half the search space"](#the-algorithm-check-the-middle-and-half-the-search-space)
  - [The pseudocode](#the-pseudocode-3)
- [Bubble Sort Analysis](#bubble-sort-analysis)
  - [Time Complexity: O(n2)](#time-complexity-onsup2sup)
  - [Space Complexity: O(1)](#space-complexity-o1)
  - [When should you use Bubble Sort?](#when-should-you-use-bubble-sort)
- [Selection Sort Analysis](#selection-sort-analysis)
  - [Selection Sort JS Implementation](#selection-sort-js-implementation)
  - [Time Complexity Analysis](#time-complexity-analysis)
  - [Space Complexity Analysis: O(1)](#space-complexity-analysis-o1)
  - [When should we use Selection Sort?](#when-should-we-use-selection-sort)
- [Insertion Sort Analysis](#insertion-sort-analysis)
  - [Time and Space Complexity Analysis](#time-and-space-complexity-analysis)
  - [When should you use Insertion Sort?](#when-should-you-use-insertion-sort)
- [Merge Sort Analysis](#merge-sort-analysis)
  - [Full code](#full-code)
  - [Merging two sorted arrays](#merging-two-sorted-arrays)
  - [Divide and conquer, step-by-step](#divide-and-conquer-step-by-step)
  - [Time and Space Complexity Analysis](#time-and-space-complexity-analysis-1)
- [Quick Sort Analysis](#quick-sort-analysis)
  - [Time and Space Complexity Analysis](#time-and-space-complexity-analysis-2)
- [Binary Search Analysis](#binary-search-analysis)
  - [Time and Space Complexity Analysis](#time-and-space-complexity-analysis-3)
- [Practice: Bubble Sort](#practice-bubble-sort)
- [Practice: Selection Sort](#practice-selection-sort)
- [Practice: Insertion Sort](#practice-insertion-sort)
- [Practice: Merge Sort](#practice-merge-sort)
- [Practice: Quick Sort](#practice-quick-sort-2)
- [Practice: Binary Search](#practice-binary-search)

[**Lists, Stacks, and Queues Learning Objectives**](#lists-stacks-and-queues-learning-objectives)
- [Linked Lists](#linked-lists)
  - [What is a Linked List?](#what-is-a-linked-list)
  - [Types of Linked Lists](#types-of-linked-lists)
  - [Linked List Methods](#linked-list-methods)
  - [Time and Space Complexity Analysis](#time-and-space-complexity-analysis-4)
  - [Time Complexity - Access and Search](#time-complexity-access-and-search)
  - [Time Complexity - Insertion and Deletion](#time-complexity-insertion-and-deletion)
  - [Space Complexity](#space-complexity-1)
- [Stacks and Queues](#stacks-and-queues)
  - [What is a Stack?](#what-is-a-stack)
  - [What is a Queue?](#what-is-a-queue)
  - [Stack and Queue Properties](#stack-and-queue-properties)
  - [Stack Methods](#stack-methods)
  - [Queue Methods](#queue-methods)
  - [Time and Space Complexity Analysis](#time-and-space-complexity-analysis-5)
  - [When should we use Stacks and Queues?](#when-should-we-use-stacks-and-queues)
- [Linked List Project](#linked-list-project)
- [Stack Project](#stack-project)
- [Queue Project](#queue-project)

[**Graphs and Heaps Learning Objectives**](#graphs-and-heaps-learning-objectives)
- [Introduction to Heaps](#introduction-to-heaps)
  - [Binary Heap Implementation](#binary-heap-implementation)
  - [Heap Sort](#heap-sort)
  - [In-Place Heap Sort](#in-place-heap-sort)
- [Heaps Project](#heaps-project)

<!-- /code_chunk_output -->

________________________________________________________________________________
# WEEK-07 DAY-1<br>*Your GitHub Identity* {ignore=true}
________________________________________________________________________________
# GitHub Profile and Projects Learning Objectives

GitHub is a powerful platform that hiring managers and other developers can use
to see how you create software.

* You will be able to participate in the social aspects of GitHub by starring
  repositories, following other developers, and reviewing your followers
* You will be able to use Markdown to write code snippets in your README files
* You will craft your GitHub profile and contribute throughout the course by
  keeping your "gardens green"
* You will be able to identify the basics of a good Wiki entries for proposals
  and minimum viable products
* You will be able to identify the basics of a good project README that includes
  technologies at the top, images, descriptions and code snippetsing managers and other developers can use
to see how you create software.

* You will be able to participate in the social aspects of GitHub by starring
  repositories, following other developers, and reviewing your followers
* You will be able to use Markdown to write code snippets in your README files
* You will craft your GitHub profile and contribute throughout the course by
  keeping your "gardens green"
* You will be able to identify the basics of a good Wiki entries for proposals
  and minimum viable products
* You will be able to identify the basics of a good project README that includes
  technologies at the top, images, descriptions and code snippets

________________________________________________________________________________
# Improving Your Profile Using GitHub

By now you are likely familiar with certain aspects of GitHub. You know how to
create repos and add and commit code, but there is much, much more that GitHub
can do.

GitHub is an online community of software engineers - a place where we not only
house our code, but share ideas, express feedback, gain inspiration, and present
ourselves as competent, qualified software engineers. Yes, this is a place to
manage version control and collaborate on projects, but in this module we are
going to discuss how to harness the power of GitHub to your advantage.

Aside from your actual code repositories, there are several other sections that
represent who you are as a developer.

* **Followers and Following**: Think of this as your “friends’ list on GitHub.
  If you see a social media profile of a person with two friends, what are you
  going to think? Though you’re not expected to have hundreds of followers on
  GitHub, you should follow your peers and encourage them to follow you to show
  industry engineers that there are people who would vouch for your skillset.
* **Stars**: These are the “likes” on your GitHub profile. Similar to
  encouraging others to follow you and following them, you should also “star”
  their popular repositories. By the end of the curriculum, you should have
  several stars on each of your portfolio projects.
* **Green Gardens**: This is birds-eye view of your “newsfeed” if your newsfeed
  reflected the number of commits that you were making. If you are very active
  on GitHub, your activity squares, AKA “green gardens” will be verdant and
  green. This tells anyone who views your profile that you are actively coding
  and engaged with your identity as a software engineer. However, if your “green
  gardens” are not green, this suggests that you are not actively coding and
  therefore perhaps not the best candidates for a development job.
* **Photo and brief intro**: This is fairly straight-forward and should mirror
  the photo from you LinkedIn. Choose a professional photo and brief description
  that highlights the fact that you are a software engineer.

Your followers, stars, green gardens, and photo represent who you are as a
developer and should be constantly monitored and updated. It can be easy to fall
into the trap of not pushing commits to GitHub or keeping your commits on your
local machine - be careful to avoid these tendencies because they are
counter-productive to your candidacy as a software engineer.

Not only is GitHub as representation of you as a developer, but it is also a
place to present proposals, recaps, and provide additional project context. Two
features that you will soon become familiar with are Wikis and READMEs.

## Wikis (pre-project)

Wikis are features of PUBLIC repositories on GitHub and are where your design
documents, explanation of technologies used and insight into what your repo
contains will live.

Wikis are created at the beginning of any significant project and should be
updated as your project evolves.

To create or update your repository’s Wiki, click on the “Wiki” tab in your repo
header and click “Edit” to update your home page and “New Page” to add a new
section.

![Wiki tab on GitHub](images/github-repo-menu-bar-wiki.png)

Best practices for Wiki creation:

* List of technologies in a visually accessible place
* Separate design documents into their own sections
* Write clearly and concisely - grammar and spelling matters!

Design documents will become very important when you begin your projects, but
for now  just know that you will spend time creating a solid Wiki in order to
facilitate a smooth development process. One of the most important aspects of
your Wiki will be the outline of your project’s features and the **minimum
viable product** (MVP).

As you begin any project, you will consider what constitutes a “final product”
and break down features into bite-sized “minimum viable products.” For example,
if you intend to create an a/A version of Twitter, your list of MVPs may
include:

* Users are able to log into application
* Users are able to create, edit, and delete tweets
* Users are able to follow other users and see their tweets
* Users are able to like other users tweets
* Users are able to comment on other users tweets

In order for your project to stay on track, it is very important to break down
your features and tackle one MVP at a time. All of the MVPs combined result in a
final application.

Your MVP breakdown will live in your project’s Wiki and is subject to evolution.
As your project comes to life, your MVPs may merge, divide, or become
irrelevant. Update your Wiki as things change and continue to referring to it as
your go through the development process.

## README files (post-project)

READMEs are text files that introduce and explain a project. Typically, READMEs
are created and completed when you are ready to roll your application into
production. READMEs should contain information about two impressive features
that you implemented in your project, the technologies used, how to install the
program, and anything else that makes you stand out as a software developer.

Think of READMEs as the “first impression” that prospective employers,
colleagues, and peers will have of you as a developer. You want their first
impression to be “wow, this person is thorough and this project sounds
interesting,” not “oh no, typos, missing instructions, and snores-galore.”

When it is time to create your README, you should allocate about three hours to
guarantee you have enough time to make your project shine.

README.md files are written using markdown syntax (.md) which makes them appear
nicely on-screen. Markdown is a lightweight markup language with plain text
formatting syntax. It’s a very simple language used to create beautiful and
presentable README and Wiki files for GitHub. There are many good resources out
there for creating markdown documents, but here are two of our favorite:

* GitHub's guide to [Mastering Markdown]
* [Repository with a collection of examples]
* [Browser side-by-side markdown and on-screen program] (this is a favorite, code
  here and copy markdown into GitHub).

README Best Practices

* Divide your README into distinct sections
* List the technologies used at the top of your README for increased visibility
* Include nice pictures or Gifs to show and/or demonstrate how things work
* Include code snippets
* Provide instructions for how to install project (if applicable)
* Include link to the live site

## Wrap up

The bottom line is that the way you represent yourself on GitHub matters! Take
the time you need to write clearly, accurately reflect your process and
applications, and immerse yourself in the diverse and interesting pool of
software professionals who work and play on GitHub.



[Mastering Markdown]: https://guides.github.com/features/mastering-markdown/
[Repository with a collection of examples]: https://github.com/matiassingers/awesome-readme
[Browser side-by-side markdown and on-screen program]: https://stackedit.io/app#

________________________________________________________________________________
# Your GitHub Identity

It is hard to write about yourself. But, today, you need to do that. This is a
day of starting to establish how other software developers and hiring managers
will perceive you.

Go to your GitHub profile page. Edit your profile to contain your description,
" (@)" as your current company, your location (if you
desire), and your Web site.

Now, make a personal Web site for your GitHub profile. You can do that using
GitHub Pages. Follow the instructions at [Getting Started with GitHub Pages] to
create your site, add a theme, create a custom 404, and use HTTPS (if you want).

Spend time writing about yourself. Like you read earlier, this is hard. But,
tell the story of you in a way that will engage people.

Now, go follow all of your class mates and star their personal Web site
repository, if they created one.

If you want to get really fancy and set up a blog, you can use a "static site
generator" known as **Jekyll** to do that. It's a Ruby-based program; however,
you don't need to know Ruby to use it. All you have to be able to do is use
command line programs, something you're really getting to be a pro at! To do
this, follow the well-documented instructions at [Setting up a GitHub Pages site
with Jekyll].

[Getting Started with GitHub Pages]: https://help.github.com/en/github/working-with-github-pages/getting-started-with-github-pages
[Setting up a GitHub Pages site with Jekyll]: https://help.github.com/en/github/working-with-github-pages/setting-up-a-github-pages-site-with-jekyll

________________________________________________________________________________
# WEEK-07 DAY-2<br>*Big-O and Optimizations* {ignore=true}
________________________________________________________________________________
# Big O Learning Objectives

**The objective of this lesson** is get you comfortable with identifying the
time and space complexity of code you see. Being able to diagnose time
complexity for algorithms is an essential for interviewing software engineers.

At the end of this, you will be able to

1. Order the common complexity classes according to their growth rate
2. Identify the complexity classes of common sort methods
3. Identify complexity classes of codeable with identifying the
time and space complexity of code you see. Being able to diagnose time
complexity for algorithms is an essential for interviewing software engineers.

At the end of this, you will be able to

1. Order the common complexity classes according to their growth rate
2. Identify the complexity classes of common sort methods
3. Identify complexity classes of code

________________________________________________________________________________
# Memoization And Tabulation Learning Objectives

**The objective of this lesson** is to give you a couple of ways to optimize a
computation (algorithm) from a higher complexity class to a lower complexity
class. Being able to optimize algorithms is an essential for interviewing
software engineers.

At the end of this, you will be able to

1. Apply memoization to recursive problems to make them less than polynomial
   time.
2. Apply tabulation to iterative problems to make them less than polynomial
   time.** is to give you a couple of ways to optimize a
computation (algorithm) from a higher complexity class to a lower complexity
class. Being able to optimize algorithms is an essential for interviewing
software engineers.

At the end of this, you will be able to

1. Apply memoization to recursive problems to make them less than polynomial
   time.
2. Apply tabulation to iterative problems to make them less than polynomial
   time.

________________________________________________________________________________
# Recursion Videos

A lot of algorithms that we use in the upcoming days will use recursion. The
next two videos are just helpful reminders about recursion so that you can get
that thought process back into your brain.

________________________________________________________________________________
# Big-O By Colt Steele

Colt Steele provides a very nice, non-mathy introduction to Big-O notation.
Please watch this so you can get the easy introduction. Big-O is, by its very
nature, math based. It's good to get an understanding before jumping in to
math expressions.

[Complete Beginner's Guide to Big O Notation] by Colt Steele.

[Complete Beginner's Guide to Big O Notation]: https://www.youtube.com/embed/kS_gr2_-ws8

________________________________________________________________________________
# Curating Complexity: A Guide to Big-O Notation

As software engineers, our goal is not just to solve problems. Rather, our goal
is to solve problems efficiently and elegantly. Not all solutions are made
equal! In this section we'll explore how to analyze the efficiency of algorithms
in terms of their speed (_time complexity_) and memory consumption (_space
complexity_).

> In this article, we'll use the word _efficiency_ to describe the amount of
> resources a program needs to execute. The two resources we are concerned with
> are _time_ and _space_. Our goal is to _minimize_ the amount of time and space
> that our programs use.

When you finish this article you will be able to:

- explain why computer scientists use Big-O notation
- simplify a mathematical function into Big-O notation

## Why Big-O?

Let's begin by understanding what method we should _not_ use when describing the
efficiency of our algorithms. Most importantly, we'll want to avoid using
absolute units of time when describing speed. When the software engineer
exclaims, "My function runs in 0.2 seconds, it's so fast!!!", the computer
scientist is not impressed. Skeptical, the computer scientist asks the following
questions:

1. What computer did you run it on? _Maybe the credit belongs to the hardware
   and not the software. Some hardware architectures will be better for certain
   operations than others._
2. Were there other background processes running on the computer that could have
   effected the runtime? _It's hard to control the environment during
   performance experiments._
3. Will your code still be performant if we increase the size of the input? _For
   example, sorting 3 numbers is trivial; but how about a million numbers?_

The job of the software engineer is to focus on the software detail and not
necessarily the hardware it will run on. Because we can't answer points 1 and 2
with total certainty, we'll want to avoid using concrete units like
"milliseconds" or "seconds" when describing the efficiency of our algorithms.
Instead, we'll opt for a more abstract approach that focuses on point 3. This
means that we should focus on how the performance of our algorithm is affected
by increasing the size of the input. **In other words, how does our performance
scale?**

> The argument above focuses on _time_, but a similar argument could also be
> made for _space_. For example, we should not analyze our code in terms of the
> amount of absolute kilobytes of memory it uses, because this is dependent on
> the programming language.

## Big-O Notation

In Computer Science, we use Big-O notation as a tool for describing the
efficiency of algorithms with respect to the size of the input argument(s). We
use mathematical functions in Big-O notation, so there are a few big picture
ideas that we'll want to keep in mind:

1. The function should be defined in terms of the size of the input(s).
2. A _smaller_ Big-O function is more desirable than a larger one. Intuitively,
   we want our algorithms to use a minimal amount of time and space.
3. Big-O describes the worst-case scenario for our code, also known as the
   upper bound. We prepare our algorithm for the worst case, because the
   best case is a luxury that is not guaranteed.
4. A Big-O function should be simplified to show only its most dominant
   mathematical term.

The first 3 points are conceptual, so they are easy to swallow. However, point 4
is typically the biggest source of confusion when learning the notation. Before
we apply Big-O to our code, we'll need to first understand the underlying math
and simplification process.

### Simplifying Math Terms

We want our Big-O notation to describe the performance of our algorithm with
respect to the input size and nothing else. Because of this, we should to
simplify our Big-O functions using the following rules:

- **Simplify Products:** if the function is a product of many terms, we drop the
  terms that _don't_ depend on the size of the input.
- **Simplify Sums:** if the function is a sum of many terms, we keep the term
  with the _largest_ growth rate and drop the other terms.

We'll look at these rules in action, but first we'll define a few things:

- **n** is the size of the input
- **T(f)** refers to an unsimplified mathematical **f**unction
- **O(f)** refers to the Big-O simplified mathematical **f**unction

### Simplifying a Product

If a function consists of a product of many factors, we drop the factors that
don't depend on the size of the input, n. The factors that we drop are called
constant factors because their size remains consistent as we increase the size
of the input. The reasoning behind this simplification is that we make the input
large enough, the non-constant factors will overshadow the constant ones. Below
are some examples:

| Unsimplified            | Big-O Simplified   |
| ----------------------- | ------------------ |
| T( 5 \* n<sup>2</sup> ) | O( n<sup>2</sup> ) |
| T( 100000 \* n )        | O( n )             |
| T( n / 12 )             | O( n )             |
| T( 42 \* n \* log(n) )  | O( n \* log(n) )   |
| T( 12 )                 | O( 1 )             |

Note that in the third example, we can simplify `T( n / 12 )` to `O( n )`
because we can rewrite a division into an equivalent multiplication. In other
words, `T( n / 12 ) = T( 1/12 * n ) = O( n )`.

### Simplifying a Sum

If the function consists of a sum of many terms, we only need to show the term
that grows the fastest, relative to the size of the input. The reasoning behind
this simplification is that if we make the input large enough, the fastest
growing term will overshadow the other, smaller terms. To understand which term
to keep, you'll need to recall the relative size of our common math terms from
the previous section. Below are some examples:

| Unsimplified                           | Big-O Simplified   |
| -------------------------------------- | ------------------ |
| T( n<sup>3</sup> + n<sup>2</sup> + n ) | O( n<sup>3</sup> ) |
| T( log(n) + 2<sup>n</sup> )            | O( 2<sup>n</sup> ) |
| T( n + log(n) )                        | O( n )             |
| T( n! + 10<sup>n</sup> )               | O( n! )            |

### Putting it all together

The _product_ and _sum_ rules are all we'll need to Big-O simplify any math
functions. We just apply the _product rule_ to drop all constants, then apply the
_sum rule_ to select the single most dominant term.

| Unsimplified                          | Big-O Simplified   |
| ------------------------------------- | ------------------ |
| T( 5n<sup>2</sup> + 99n )             | O( n<sup>2</sup> ) |
| T( 2n + nlog(n) )                     | O( nlog(n) )       |
| T( 2<sup>n</sup> + 5n<sup>1000</sup>) | O( 2<sup>n</sup> ) |

> Aside: We'll often omit the multiplication symbol in expressions as a form of
> shorthand. For example, we'll write _O( 5n<sup>2</sup> )_ in place of _O( 5 \*
> n<sup>2</sup> )_.

## What you've learned

In this reading we:

- explained why Big-O is the preferred notation used to describe the efficiency
  of algorithms
- used the product and sum rules to simplify mathematical functions into Big-O
  notation

________________________________________________________________________________
# Common Complexity Classes

Analyzing the efficiency of our code seems like a daunting task because there
are many different possibilities in how we may choose to implement something.
Luckily, most code we write can be categorized into one of a handful of common
complexity classes. In this reading, we'll identify the common classes and
explore some of the code characteristics that will lead to these classes.

When you finish this reading, you should be able to:

- name _and_ order the seven common complexity classes
- identify the time complexity class of a given code snippet

## The seven major classes

There are seven complexity classes that we will encounter most often. Below is a
list of each complexity class as well as its Big-O notation. This list is
ordered from _smallest to largest_. Bear in mind that a "more efficient"
algorithm is one with a smaller complexity class, because it requires fewer
resources.

| Big-O                                                       | Complexity Class Name                |
| ----------------------------------------------------------- | ------------------------------------ |
| O(1)                                                        | constant                             |
| O(log(n))                                                   | logarithmic                          |
| O(n)                                                        | linear                               |
| O(n \* log(n))                                              | loglinear, linearithmic, quasilinear |
| O(n<sup>c</sup>) - O(n<sup>2</sup>), O(n<sup>3</sup>), etc. | polynomial                           |
| O(c<sup>n</sup>) - O(2<sup>n</sup>), O(3<sup>n</sup>), etc. | exponential                          |
| O(n!)                                                       | factorial                            |

There are more complexity classes that exist, but these are most common. Let's
take a closer look at each of these classes to gain some intuition on what
behavior their functions define. We'll explore famous algorithms that correspond
to these classes further in the course.

For simplicity, we'll provide small, generic code examples that illustrate the
complexity, although they may not solve a practical problem.

### O(1) - Constant

Constant complexity means that the algorithm takes roughly the same number of
steps for any size input. In a constant time algorithm, there is no relationship
between the size of the input and the number of steps required. For example,
this means performing the algorithm on a input of size 1 takes the same number
of steps as performing it on an input of size 128.

#### Constant growth

The table below shows the growing behavior of a constant function. Notice that
the behavior stays _constant_ for all values of n.

| n   | O(1) |
| --- | ---- |
| 1   | ~1   |
| 2   | ~1   |
| 3   | ~1   |
| ... | ...  |
| 128 | ~1   |

#### Example Constant code

Below is are two examples of functions that have constant runtimes.

```javascript
// O(1)
function constant1(n) {
  return n * 2 + 1;
}

// O(1)
function constant2(n) {
  for (let i = 1; i <= 100; i++) {
    console.log(i);
  }
}
```

The runtime of the `constant1` function does not depend on the size of the
input, because only two arithmetic operations (multiplication and addition) are
always performed. The runtime of the `constant2` function also does not depend
on the size of the input because one-hundred iterations are always performed,
irrespective of the input.

### O(log(n)) - Logarithmic

Typically, the hidden base of O(log(n)) is 2, meaning O(log<sub>2</sub>(n)).
Logarithmic complexity algorithms will usual display a sense of continually
"halving" the size of the input. Another tell of a logarithmic algorithm is that
we don't have to access every element of the input. O(log<sub>2</sub>(n)) means
that every time we double the size of the input, we only require one additional
step. Overall, this means that a large increase of input size will increase the
number of steps required by a small amount.

#### Logarithmic growth

The table below shows the growing behavior of a logarithmic runtime function.
Notice that doubling the input size will only require only one additional
"step".

| n   | O(log<sub>2</sub>(n)) |
| --- | --------------------- |
| 2   | ~1                    |
| 4   | ~2                    |
| 8   | ~3                    |
| 16  | ~4                    |
| ... | ...                   |
| 128 | ~7                    |

#### Example logarithmic code

Below is an example of two functions with logarithmic runtimes.

```javascript
// O(log(n))
function logarithmic1(n) {
  if (n <= 1) return;
  logarithmic1(n / 2);
}

// O(log(n))
function logarithmic2(n) {
  let i = n;
  while (i > 1) {
    i /= 2;
  }
}
```

The `logarithmic1` function has O(log(n)) runtime because the recursion will
half the argument, n, each time. In other words, if we pass 8 as the original
argument, then the recursive chain would be 8 -> 4 -> 2 -> 1. In a similar way,
the `logarithmic2` function has O(log(n)) runtime because of the number of
iterations in the while loop. The while loop depends on the variable `i`, which
will be divided in half each iteration.

### O(n) - Linear

Linear complexity algorithms will access each item of the input "once" (in the
Big-O sense). Algorithms that iterate through the input without nested loops or
recurse by reducing the size of the input by "one" each time are typically
linear.

#### Linear growth

The table below shows the growing behavior of a linear runtime function. Notice
that a change in input size leads to similar change in the number of steps.

| n   | O(n) |
| --- | ---- |
| 1   | ~1   |
| 2   | ~2   |
| 3   | ~3   |
| 4   | ~4   |
| ... | ...  |
| 128 | ~128 |

#### Example linear code

Below are examples of three functions that each have linear runtime.

```javascript
// O(n)
function linear1(n) {
  for (let i = 1; i <= n; i++) {
    console.log(i);
  }
}

// O(n), where n is the length of the array
function linear2(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(i);
  }
}

// O(n)
function linear3(n) {
  if (n === 1) return;
  linear3(n - 1);
}
```

The `linear1` function has O(n) runtime because the for loop will iterate n
times. The `linear2` function has O(n) runtime because the for loop iterates
through the array argument. The `linear3` function has O(n) runtime because each
subsequent call in the recursion will decrease the argument by one. In other
words, if we pass 8 as the original argument to `linear3`, the recursive chain
would be 8 -> 7 -> 6 -> 5 -> ... -> 1.

### O(n \* log(n)) - Loglinear

This class is a combination of both linear and logarithmic behavior, so features
from both classes are evident. Algorithms the exhibit this behavior use both
recursion and iteration. Typically, this means that the recursive calls will
halve the input each time (logarithmic), but iterations are also performed on
the input (linear).

#### Loglinear growth

The table below shows the growing behavior of a loglinear runtime function.

| n   | O(n \* log<sub>2</sub>(n)) |
| --- | -------------------------- |
| 2   | ~2                         |
| 4   | ~8                         |
| 8   | ~24                        |
| ... | ...                        |
| 128 | ~896                       |

#### Example loglinear code

Below is an example of a function with a loglinear runtime.

```javascript
// O(n * log(n))
function loglinear(n) {
  if (n <= 1) return;

  for (let i = 1; i <= n; i++) {
    console.log(i);
  }

  loglinear(n / 2);
  loglinear(n / 2);
}
```

The `loglinear` function has O(n \* log(n)) runtime because the for loop
iterates linearly (n) through the input and the recursive chain behaves
logarithmically (log(n)).

### O(n<sup>c</sup>) - Polynomial

Polynomial complexity refers to complexity of the form O(n<sup>c</sup>) where
`n` is the size of the input and `c` is some fixed constant. For example,
O(n<sup>3</sup>) is a larger/worse function than O(n<sup>2</sup>), but they
belong to the same complexity class. Nested loops are usually the indicator of
this complexity class.

#### Polynomial growth

Below are tables showing the growth for O(n<sup>2</sup>) and O(n<sup>3</sup>).

| n   | O(n<sup>2</sup>) |
| --- | ---------------- |
| 1   | ~1               |
| 2   | ~4               |
| 3   | ~9               |
| ... | ...              |
| 128 | ~16,384          |

| n   | O(n<sup>3</sup>) |
| --- | ---------------- |
| 1   | ~1               |
| 2   | ~8               |
| 3   | ~27              |
| ... | ...              |
| 128 | ~2,097,152       |

#### Example polynomial code

Below are examples of two functions with polynomial runtimes.

```javascript
// O(n^2)
function quadratic(n) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {}
  }
}

// O(n^3)
function cubic(n) {
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      for (let k = 1; k <= n; k++) {}
    }
  }
}
```

The `quadratic` function has O(n<sup>2</sup>) runtime because there are nested
loops. The outer loop iterates n times and the inner loop iterates n times. This
leads to n \* n total number of iterations. In a similar way, the `cubic`
function has O(n<sup>3</sup>) runtime because it has triply nested loops that
lead to a total of n \* n \* n iterations.

### O(c<sup>n</sup>) - Exponential

Exponential complexity refers to Big-O functions of the form O(c<sup>n</sup>)
where `n` is the size of the input and `c` is some fixed constant. For example,
O(3<sup>n</sup>) is a larger/worse function than O(2<sup>n</sup>), but they both
belong to the exponential complexity class. A common indicator of this
complexity class is recursive code where there is a constant number of recursive
calls in each stack frame. The `c` will be the number of recursive calls made in
each stack frame. Algorithms with this complexity are considered quite slow.

#### Exponential growth

Below are tables showing the growth for O(2<sup>n</sup>) and O(3<sup>n</sup>).
Notice how these grow large, quickly.

| n   | O(2<sup>n</sup>)           |
| --- | -------------------------- |
| 1   | ~2                         |
| 2   | ~4                         |
| 3   | ~8                         |
| 4   | ~16                        |
| ... | ...                        |
| 128 | ~3.4028 \* 10<sup>38</sup> |

| n   | O(3<sup>n</sup>)           |
| --- | -------------------------- |
| 1   | ~3                         |
| 2   | ~9                         |
| 3   | ~27                        |
| 3   | ~81                        |
| ... | ...                        |
| 128 | ~1.1790 \* 10<sup>61</sup> |

#### Exponential code example

Below are examples of two functions with exponential runtimes.

```javascript
// O(2^n)
function exponential2n(n) {
  if (n === 1) return;
  exponential_2n(n - 1);
  exponential_2n(n - 1);
}

// O(3^n)
function exponential3n(n) {
  if (n === 0) return;
  exponential_3n(n - 1);
  exponential_3n(n - 1);
  exponential_3n(n - 1);
}
```

The `exponential2n` function has O(2<sup>n</sup>) runtime because each call will
make two more recursive calls. The `exponential3n` function has O(3<sup>n</sup>)
runtime because each call will make three more recursive calls.

### O(n!) - Factorial

Recall that `n! = (n) * (n - 1) * (n - 2) * ... * 1`. This complexity is
typically the largest/worst that we will end up implementing. An indicator of
this complexity class is recursive code that has a variable number of recursive
calls in each stack frame. Note that _factorial_ is worse than _exponential_
because _factorial_ algorithms have a _variable_ amount of recursive calls in
each stack frame, whereas _exponential_ algorithms have a _constant_ amount of
recursive calls in each frame.

#### Factorial growth

Below is a table showing the growth for O(n!). Notice how this has a more
aggressive growth than exponential behavior.

| n   | O(n!)                       |
| --- | --------------------------- |
| 1   | ~1                          |
| 2   | ~2                          |
| 3   | ~6                          |
| 4   | ~24                         |
| ... | ...                         |
| 128 | ~3.8562 \* 10<sup>215</sup> |

#### Factorial code example

Below is an example of a function with factorial runtime.

```javascript
// O(n!)
function factorial(n) {
  if (n === 1) return;

  for (let i = 1; i <= n; i++) {
    factorial(n - 1);
  }
}
```

The `factorial` function has O(n!) runtime because the code is _recursive_ but
the number of recursive calls made in a single stack frame depends on the input.
This contrasts with an _exponential_ function because exponential functions have
a _fixed_ number of calls in each stack frame.

You may it difficult to identify the complexity class of a given code snippet,
especially if the code falls into the loglinear, exponential, or factorial
classes. In the upcoming videos, we'll explain the analysis of these functions
in greater detail. For now, you should focus on the _relative order_ of these
seven complexity classes!

## What you've learned

In this reading, we listed the seven common complexity classes and saw some
example code for each. In order of ascending growth, the seven classes are:

1. Constant
2. Logarithmic
3. Linear
4. Loglinear
5. Polynomial
6. Exponential
7. Factorial

________________________________________________________________________________
# Memoization

**Memoization** is a design pattern used to reduce the overall number of
calculations that can occur in algorithms that use recursive strategies to
solve.

Recall that recursion solves a large problem by dividing it into smaller
sub-problems that are more manageable. Memoization will store the results of
the sub-problems in some other data structure, meaning that you avoid duplicate
calculations and only "solve" each subproblem once. There are two features that
comprise memoization:

+ the function is recursive
+ the additional data structure used is typically an object (we refer to this as
  the memo!)

This is a trade-off between the time it takes to run an algorithm (without
memoization) and the memory used to run the algorithm (with memoization).
Usually memoization is a good trade-off when dealing with large data or
calculations.

You cannot always apply this technique to recursive problems. The problem must
have an "overlapping subproblem structure" for memoization to be effective.

Here's an example of a problem that has such a structure:

> Using pennies, nickels, dimes, and quarters, what is the smallest combination
> of coins that total 27 cents?

You'll explore this exact problem in depth later on. For now, here is some food
for thought. Along the way to calculating the smallest coin combination of 27
cents, you should also calculate the smallest coin combination of say, 25 cents
as a component of that problem. This is the essence of an overlapping subproblem
structure.

## Memoizing factorial

Here's an example of a function that computes the factorial of the number passed
into it.

```javascript
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}

factorial(6);       // => 720, requires 6 calls
factorial(6);       // => 720, requires 6 calls
factorial(5);       // => 120, requires 5 calls
factorial(7);       // => 5040, requires 7 calls
```

From this plain `factorial` above, it is clear that every time you call
`factorial(6)` you should get the same result of `720` each time. The code is
somewhat inefficient because you must go down the full recursive stack for each
top level call to `factorial(6)`. It would be great if you could store the result
of `factorial(6)` the first time you calculate it, then on subsequent calls to
`factorial(6)` you simply fetch the stored result in constant time. You can
accomplish exactly this by memoizing with an object!

```javascript
let memo = {}

function factorial(n) {
  // if this function has calculated factorial(n) previously,
  // fetch the stored result in memo
  if (n in memo) return memo[n];
  if (n === 1) return 1;

  // otherwise, it havs not calculated factorial(n) previously,
  // so calculate it now, but store the result in case it is
  // needed again in the future
  memo[n] = n * factorial(n - 1);
  return memo[n]
}

factorial(6);       // => 720, requires 6 calls
factorial(6);       // => 720, requires 1 call
factorial(5);       // => 120, requires 1 call
factorial(7);       // => 5040, requires 2 calls

memo;   // => { '2': 2, '3': 6, '4': 24, '5': 120, '6': 720, '7': 5040 }
```

The `memo` object above will map an argument of `factorial` to its return
value. That is, the keys will be arguments and their values will be the
corresponding results returned. By using the memo, you are able to avoid
duplicate recursive calls!

Here's some food for thought: By the time your first call to `factorial(6)`
returns, you will not have just the argument `6` stored in the memo. Rather, you will
have _all_ arguments 2 to 6 stored in the memo.

Hopefully you sense the efficiency you can get by memoizing your functions, but
maybe you are not convinced by the last example for two reasons:

+ You didn't improve the speed of the algorithm by an order of Big-O (it is
  still O(n)).
+ The code uses some global variable, so it's kind of ugly.

Both of those points are true, so take a look at a more advanced example that
benefits from memoization.

## Memoizing the Fibonacci generator

Here's a _naive_ implementation of a function that calculates the Fibonacci
number for a given input.

```javascript
function fib(n) {
  if (n === 1 || n === 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

fib(6);     // => 8
```

Before you optimize this, ask yourself what complexity class it falls into in
the first place.

The time complexity of this function is not super intuitive to describe because
the code branches twice recursively. Fret not! You'll find it useful to
visualize the calls needed to do this with a tree. When reasoning about the time
complexity for recursive functions, draw a tree that helps you see the calls.
Every node of the tree represents a call of the recursion:

![fib_tree](images/fib_tree.png)

In general, the height of this tree will be `n`. You derive this by following
the path going straight down the left side of the tree. You can also see that
each internal node leads to two more nodes. Overall, this means that the tree
will have roughly 2<sup>n</sup> nodes which is the same as saying that the `fib`
function has an exponential time complexity of 2<sup>n</sup>. That is very slow!
See for yourself, try running `fib(50)` -  you'll be waiting for quite a while
(it took 3 minutes on the author's machine).

Okay. So the `fib` function is slow. Is there anyway to speed it up? Take a look
at the tree above. Can you find any repetitive regions of the tree?

![fib_tree_duplicates](images/fib_tree_duplicates.png)

As the `n` grows bigger, the number of duplicate sub-trees grows exponentially.
Luckily you can fix this using memoization by using a similar object strategy as
before. You can use some JavaScript default arguments to clean things up:

```javascript
function fastFib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n === 1 || n === 2) return 1;

  memo[n] = fastFib(n - 1, memo) + fastFib(n - 2, memo);
  return memo[n];
}

fastFib(6);     // => 8
fastFib(50);    // => 12586269025
```

The code above can calculate the 50th Fibonacci number almost instantly! Thanks
to the `memo` object, you only need to explore a subtree fully once. Visually,
the `fastFib` recursion has this structure:

![fib_memoized](images/fib_memoized.png)

You can see the marked nodes (function calls) that access the memo in green.
It's easy to see that this version of the Fibonacci generator will do far less
computations as `n` grows larger! In fact, this memoization has brought the time
complexity down to linear `O(n)` time because the tree only branches on the left
side. This is an enormous gain if you recall the complexity class hierarchy.

## The memoization formula

Now that you understand memoization, when should you apply it? Memoization is
useful when attacking recursive problems that have many overlapping
sub-problems. You'll find it most useful to draw out the visual tree first. If
you notice duplicate sub-trees, time to memoize. Here are the hard and fast
rules you can use to memoize a slow function:

1. Write the unoptimized, brute force recursion and make sure it works.
2. Add the memo object as an additional argument to the function. The keys will
   represent unique arguments to the function, and their values will represent
   the results for those arguments.
3. Add a base case condition to the function that returns the stored value if
   the function's argument is in the memo.
4. Before you return the result of the recursive case, store it in the memo as a
   value and make the function's argument it's key.

## What you learned

You learned a secret to possibly changing an algorithm of one complexity class
to a lower complexity class by using memory to store intermediate results. This
is a powerful technique to use to make sure your programs that must do recursive
calculations can benefit from running much faster.

________________________________________________________________________________
# Tabulation

Now that you are familiar with _memoization_, you can explore a related method
of algorithmic optimization: **Tabulation**. There are two main features that
comprise the Tabulation strategy:

* the function is iterative and *not* recursive
* the additional data structure used is typically an array, commonly referred to
  as the table

Many problems that can be solved with memoization can also be solved with
tabulation as long as you convert the recursion to iteration. The first example
is the canonical example of recursion, calculating the Fibonacci number for an
input. However, in the example, you'll see the iteration version of it for a
fresh start!

## Tabulating the Fibonacci number

Tabulation is all about creating a table (array) and filling it out with
elements. In general, you will complete the table by filling entries from "left
to right". This means that the first entry of the table (first element of the
array) will correspond to the smallest subproblem. Naturally, the final entry of
the table (last element of the array) will correspond to the largest problem,
which is also the final answer.

Here's a way to use tabulation to store the intermediary calculations so that
later calculations can refer back to the table.

```javascript
function tabulatedFib(n) {
  // create a blank array with n reserved spots
  let table = new Array(n);

  // seed the first two values
  table[0] = 0;
  table[1] = 1;

  // complete the table by moving from left to right,
  // following the fibonacci pattern
  for (let i = 2; i <= n; i += 1) {
    table[i] = table[i - 1] + table[i - 2];
  }

  return table[n];
}

console.log(tabulatedFib(7));      // => 13
```

When you initialized the table and seeded the first two values, it looked like
this:

| i          | 0   | 1   | 2 | 3 | 4 | 5 | 6 | 7 |
|------------|-----|-----|---|---|---|---|---|---|
| `table[i]` | `0` | `1` |   |   |   |   |   |   |


After the loop finishes, the final table will be:

| i          | 0   | 1   | 2   | 3   | 4   | 5   | 6   | 7    |
|------------|-----|-----|-----|-----|-----|-----|-----|------|
| `table[i]` | `0` | `1` | `1` | `2` | `3` | `5` | `8` | `13` |

Similar to the previous `memo`, by the time the function completes, the `table`
will contain the final solution as well as all sub-solutions calculated along
the way.

To compute the complexity class of this `tabulatedFib` is very straightforward
since the code is iterative. The dominant operation in the function is the loop
used to fill out the entire table. The length of the table is roughly `n`
elements long, so the algorithm will have an _O(n)_ runtime. The space taken by
our algorithm is also _O(n)_ due to the size of the table. Overall, this should
be a satisfying solution for the efficiency of the algorithm.

## Aside: Refactoring for O(1) Space

You may notice that you can cut down on the space used by the function. At any
point of the loop, the calculation really only need the previous two
subproblems' results. There is little utility to storing the full array. This
refactor is easy to do by using two variables:

```javascript
function fib(n) {
  let mostRecentCalcs = [0, 1];

  if (n === 0) return mostRecentCalcs[0];

  for (let i = 2; i <= n; i++) {
    const [ secondLast, last ] = mostRecentCalcs;
    mostRecentCalcs = [ last, secondLast + last ];
  }

  return mostRecentCalcs[1];
}
```

Bam! You now have O(n) runtime and O(1) space. This is the most optimal
algorithm for calculating a Fibonacci number. Note that this strategy is a pared
down form of tabulation, since it uses only the last two values.

### The Tabulation Formula

Here are the general guidelines for implementing the tabulation strategy. This
is just a general recipe, so adjust for taste depending on your problem:

1. Create the table array based off of the size of the input, which isn't always
   straightforward if you have multiple input values
2. Initialize some values in the table that "answer" the trivially small
   subproblem usually by initializing the first entry (or entries) of the table
3. Iterate through the array and fill in remaining entries, using previous
   entries in the table to perform the current calculation
4. Your final answer is (usually) the last entry in the table

## What you learned

You learned another way of possibly changing an algorithm of one complexity
class to a lower complexity class by using memory to store intermediate results.
This is a powerful technique to use to make sure your programs that must do
iterative calculations can benefit from running much faster.

________________________________________________________________________________
# Analysis of Linear Search

Consider the following search algorithm known as **linear search**.

```javascript
function search(array, term) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] == term) {
      return i;
    }
  }
  return -1;
}
```

Most Big-O analysis is done on the "worst-case scenario" and provides an upper
bound. In the worst case analysis, you calculate the upper bound on running time
of an algorithm. You must know the case that causes the maximum number of
operations to be executed.

For _linear search_, the worst case happens when the element to be searched
(`term` in the above code) is not present in the array. When `term` is not
present, the `search` function compares it with all the elements of `array` one
by one. Therefore, the worst-case time complexity of linear search would be
O(n).

________________________________________________________________________________
# Analysis of Binary Search

Consider the following search algorithm known as the **binary search**. This
kind of search only works if the array is already sorted.

```javascript
function binarySearch(arr, x, start, end) {
  if (start > end) return false;

  let mid = Math.floor((start + end) / 2);
  if (arr[mid] === x) return true;

  if (arr[mid] > x) {
    return binarySearch(arr, x, start, mid - 1);
  } else {
    return binarySearch(arr, x, mid + 1, end);
  }
}
```

For the _binary search_, you cut the search space in half every time. This means
that it reduces the number of searches you must do by half, every time. That
means the number of steps it takes to get to the desired item (if it exists in
the array), in the worst case takes the same amount of steps for every number
within a range defined by the powers of 2.

* 7 -> 4 -> 2 -> 1
* 8 -> 4 -> 2 -> 1
* 9 -> 5 -> 3 -> 2 -> 1
* 15 -> 8 -> 4 -> 2 -> 1
* 16 -> 8 -> 4 -> 2 -> 1
* 17 -> 9 -> 5 -> 3 -> 2 -> 1
* 31 -> 16 -> 8 -> 4 -> 2 -> 1
* 32 -> 16 -> 8 -> 4 -> 2 -> 1
* 33 -> 17 -> 9 -> 5 -> 3 -> 2 -> 1

So, for any number of items in the sorted array between 2<sup>n-1</sup> and
2<sup>n</sup>, it takes _n_ number of steps. That means if you have _k_ items in
the array, then it will take <i>log</i><sub><i>2</i></sub><i>k</i>.

Binary searches are <i>O</i>(<i>log</i><sub><i>2</i></sub><i>n</i>).

________________________________________________________________________________
# Analysis of the Merge Sort

Consider the following divide-and-conquer sort method known as the **merge
sort**.

```javascript
function merge(leftArray, rightArray) {
  const sorted = [];
  while (leftArray.length > 0 && rightArray.length > 0) {
    const leftItem = leftArray[0];
    const rightItem = rightArray[0];

    if (leftItem > rightItem) {
      sorted.push(rightItem);
      rightArray.shift();
    } else {
      sorted.push(leftItem);
      leftArray.shift();
    }
  }

  while (leftArray.length !== 0) {
    const value = leftArray.shift();
    sorted.push(value);
  }

  while (rightArray.length !== 0) {
    const value = rightArray.shift();
    sorted.push(value);
  }

  return sorted
}

function mergeSort(array) {
  const length = array.length;
  if (length == 1) {
    return array;
  }

  const middleIndex = Math.ceil(length / 2);
  const leftArray = array.slice(0, middleIndex);
  const rightArray = array.slice(middleIndex, length);

  leftArray = mergeSort(leftArray);
  rightArray = mergeSort(rightArray);

  return merge(leftArray, rightArray);
}
```


For the _merge sort_, you cut the sort space in half every time. In each of
those halves, you have to loop through the number of items in the array. That
means that, for the worst case, you get that same
<i>log</i><sub><i>2</i></sub><i>n</i> but it must be multiplied by the number of
elements in the array, _n_.

Merge sorts are <i>O</i>(<i>n*log</i><sub><i>2</i></sub><i>n</i>).

________________________________________________________________________________
# Analysis of Bubble Sort

Consider the following sort algorithm known as the **bubble sort**.

```javascript
function bubbleSort(items) {
  var length = items.length;
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < (length - i - 1); j++) {
      if (items[j] > items[j + 1]) {
        var tmp = items[j];
        items[j] = items[j + 1];
        items[j + 1] = tmp;
      }
    }
  }
}
```


For the _bubble sort_, the worst case is the same as the best case because it
always makes nested loops. So, the outer loop loops the number of times of the
items in the array. For each one of those loops, the inner loop loops again a
number of times for the items in the array. So, if there are _n_ values in the
array, then a loop inside a loop is _n_ * _n_. So, this is O(n<sup>2</sup>).
That's polynomial, which ain't that good.

________________________________________________________________________________
# LeetCode.com

Some of the problems in the projects ask you to use the LeetCode platform to
check your work rather than relying on local mocha tests. If you don't already
have an account at LeetCode.com, please click
https://leetcode.com/accounts/signup/ to sign up for a free account.

After you sign up for the account, please verify the account with the email
address that you used so that you can actually run your solution on
LeetCode.com.

In the projects, you will see files that are named "leet_code_«number».js".
When you open those, you will see a link in the file that you can use to go
directly to the corresponding problem on LeetCode.com.

Use the local JavaScript file in Visual Studio Code to collaborate on the
solution. Then, you can run the proposed solution in the LeetCode.com code
runner to validate its correctness.

________________________________________________________________________________
# Memoization Problems

This project contains two test-driven problems and one problem on LeetCode.com.

* Clone the project from
  https://github.com/-starters/algorithms-memoization-project.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npx test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib` files to pass all specs.
  * In `problems.js`, you will write code to make the `lucasNumberMemo` and
    `minChange` functions pass.
  * In `leet_code_518.js`, you will use that file as a scratch pad to work on
    the LeetCode.com problem at https://leetcode.com/problems/coin-change-2/.

________________________________________________________________________________
# Tabulation Problems

This project contains two test-driven problems and one problem on LeetCode.com.

* Clone the project from
  https://github.com/-starters/algorithms-tabulation-project.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npx test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib` files to pass all specs.
  * In `problems.js`, you will write code to make the `stepper`,
    `maxNonAdjacentSum`, and `minChange` functions pass.
  * In `leet_code_64.js`, you will use that file as a scratch pad to work on the
    LeetCode.com problem at https://leetcode.com/problems/minimum-path-sum/.
  * In `leet_code_70.js`, you will use that file as a scratch pad to work on the
    LeetCode.com problem at https://leetcode.com/problems/climbing-stairs/.

________________________________________________________________________________
# WEEK-07 DAY-3<br>*Sorting Algorithms* {ignore=true}
________________________________________________________________________________
# Sorting Algorithms Learning Objectives

**The objective of this lesson** is for you to get experience implementing
common sorting algorithms that will come up during a lot of interviews. It is
also important for you to understand how different sorting algorithms behave
when given output.

At the end of this, you will be able to

1. Explain the complexity of and write a function that performs `bubble sort` on
   an array of numbers.
2. Explain the complexity of and write a function that performs `selection sort`
   on an array of numbers.
3. Explain the complexity of and write a function that performs `insertion sort`
   on an array of numbers.
4. Explain the complexity of and write a function that performs `merge sort` on
   an array of numbers.
5. Explain the complexity of and write a function that performs `quick sort` on
   an array of numbers.
6. Explain the complexity of and write a function that performs a binary search
   on a sorted array of numbers.nce implementing
common sorting algorithms that will come up during a lot of interviews. It is
also important for you to understand how different sorting algorithms behave
when given output.

At the end of this, you will be able to

1. Explain the complexity of and write a function that performs `bubble sort` on
   an array of numbers.
2. Explain the complexity of and write a function that performs `selection sort`
   on an array of numbers.
3. Explain the complexity of and write a function that performs `insertion sort`
   on an array of numbers.
4. Explain the complexity of and write a function that performs `merge sort` on
   an array of numbers.
5. Explain the complexity of and write a function that performs `quick sort` on
   an array of numbers.
6. Explain the complexity of and write a function that performs a binary search
   on a sorted array of numbers.

________________________________________________________________________________
# Bubble Sort

Bubble Sort is generally the first major sorting algorithm to come up in most
introductory programming courses. Learning about this algorithm is useful
educationally, as it provides a good introduction to the challenges you face
when tasked with converting unsorted data into sorted data, such as conducting
logical comparisons, making swaps while iterating, and making optimizations.
It's also quite simple to implement, and can be done quickly.

Bubble Sort is _almost never_ a good choice in production. simply because:

- It is not efficient
- It is not commonly used
- There is a stigma attached to using it

## _"But...then...why are we..."_

It is _quite useful_ as an educational base for you, and as a conversational
base for you while interviewing, because you can discuss how other more elegant
and efficient algorithms improve upon it. Taking naive code and improving upon
it by weighing the technical tradeoffs of your other options is 100% the name of
the game when trying to level yourself up from a junior engineer to a senior
engineer.

## The algorithm bubbles up

As you progress through the algorithms and data structures of this course,
you'll eventually notice that there are some recurring funny terms. "Bubbling
up" is one of those terms.

When someone writes that an item in a collection "bubbles up," you should infer
that:

- The item is _in motion_
- The item is moving _in some direction_
- The item _has some final resting destination_

When invoking Bubble Sort to sort an array of integers in ascending order, the
largest integers will "bubble up" to the "top" (the end) of the array, one at a
time.

The largest values are captured, put into motion in the direction defined by the
desired sort (ascending right now), and traverse the array until they arrive at
their end destination. See if you can observe this behavior in the following
animation (courtesy http://visualgo.net):

![bubble sort](images/BubbleSort.gif)

As the algorithm iterates through the array, it compares each element to the
element's right neighbor. If the current element is larger than its neighbor,
the algorithm swaps them. This continues until all elements in the array are
sorted.

## How does a pass of Bubble Sort work?

Bubble sort works by performing multiple *passes* to move elements closer to
their final positions. A single pass will iterate through the entire array once.

A pass works by scanning the array from left to right, two elements at a time,
and checking if they are ordered correctly. To be ordered correctly the first
element must be less than or equal to the second. If the two elements are not
ordered properly, then we swap them to correct their order. Afterwards, it scans
the next two numbers and continue repeat this process until we have gone through
the entire array.

See one pass of bubble sort on the array `[2, 8, 5, 2, 6]`. On each step the
elements currently being scanned are in **bold**.

* [**2**, **8**, 5, 2, 6] - ordered, so leave them alone
* [2, **8**, **5**, 2, 6] - not ordered, so swap
* [2, 5, **8**, **2**, 6] - not ordered, so swap
* [2, 5, 2, **8**, **6**] - not ordered, so swap
* [2, 5, 2, 6, 8]         - the first pass is complete

Because at least one swap occurred, the algorithm knows that it wasn't sorted.
It needs to make another pass. It starts over again at the first entry and goes
to the next-to-last entry doing the comparisons, again. It only needs to go to
the next-to-last entry because the previous "bubbling" put the largest entry in
the last position.

* [**2**, **5**, 2, 6, 8] - ordered, so leave them alone
* [2, **5**, **2**, 6, 8] - not ordered, so swap
* [2, 2, **5**, **6**, 8] - ordered, so leave them alone
* [2, 2, 5, 6, 8]         - the second pass is complete

Because at least one swap occurred, the algorithm knows that it wasn't sorted.
Now, it can bubble from the first position to the last-2 position because the
last two values are sorted.

* [**2**, **2**, 5, 6, 8] - ordered, so leave them alone
* [2, **2**, **5**, 6, 8] - ordered, so leave them alone
* [2, 2, 5, 6, 8]         - the third pass is complete

No swap occurred, so the Bubble Sort stops.

## Ending the Bubble Sort

During Bubble Sort, you can tell if the array is in sorted order by checking if
a swap was made during the previous pass performed. If a swap was not performed
during the previous pass, then the array must be totally sorted and the
algorithm can stop.

You're probably wondering why that makes sense. Recall that a pass of Bubble
Sort checks if any adjacent elements are **out of order** and swaps them if they
are. If we don't make any swaps during a pass, then everything must be already
**in order**, so our job is done. Let that marinate for a bit.

## Pseudocode for Bubble Sort

```
Bubble Sort: (array)
  n := length(array)
  repeat
  swapped = false
  for i := 1 to n - 1 inclusive do

      /* if this pair is out of order */
      if array[i - 1] > array[i] then

        /* swap them and remember something changed */
        swap(array, i - 1, i)
        swapped := true

      end if
    end for
  until not swapped
```

________________________________________________________________________________
# Selection Sort

Selection Sort is very similar to Bubble Sort. The major difference between the
two is that Bubble Sort bubbles the _largest_ elements up to the end of the
array, while Selection Sort selects the _smallest_ elements of the array and
directly places them at the beginning of the array in sorted position. Selection
sort will utilize swapping just as bubble sort did. Let's carefully break this
sorting algorithm down.

## The algorithm: select the next smallest

Selection sort works by maintaining a sorted region on the left side of the
input array; this sorted region will grow by one element with every "pass" of
the algorithm. A single "pass" of selection sort will select the next smallest
element of unsorted region of the array and move it to the sorted region.
Because a single pass of selection sort will move an element of the unsorted
region into the sorted region, this means a single pass will shrink the unsorted
region by 1 element whilst increasing the sorted region by 1 element. Selection
sort is complete when the sorted region spans the entire array and the unsorted
region is empty!

![selection sort](images/SelectionSort.gif)

The algorithm can be summarized as the following:

1. Set MIN to location 0
2. Search the minimum element in the list
3. Swap with value at location MIN
4. Increment MIN to point to next element
5. Repeat until list is sorted

## The pseudocode

In pseudocode, the Selection Sort can be written as this.

```
procedure selection sort
   list  : array of items
   n     : size of list

   for i = 1 to n - 1
   /* set current element as minimum*/
      min = i

      /* check the element to be minimum */

      for j = i+1 to n
         if list[j] < list[min] then
            min = j;
         end if
      end for

      /* swap the minimum element with the current element*/
      if indexMin != i  then
         swap list[min] and list[i]
      end if
   end for
end procedure
```

________________________________________________________________________________
# Insertion Sort

With Bubble Sort and Selection Sort now in your tool box, you're starting to
get some experience points under your belt! Time to learn one more "naive"
sorting algorithm before you get to the efficient sorting algorithms.

## The algorithm: insert into the sorted region

Insertion Sort is similar to Selection Sort in that it gradually builds up a
larger and larger sorted region at the left-most end of the array.

However, Insertion Sort differs from Selection Sort because this algorithm does
not focus on searching for the right element to place (the next smallest in our
Selection Sort) on each pass through the array. Instead, it focuses on sorting
each element in the order they appear from left to right, regardless of their
value, and inserting them in the most appropriate position in the sorted region.

See if you can observe the behavior described above in the following animation:

![insertion sort](images/InsertionSort.gif)

## The Steps

Insertion Sort grows a sorted array on the left side of the input array by:

1. If it is the first element, it is already sorted. return 1;
2. Pick next element
3. Compare with all elements in the sorted sub-list
4. Shift all the elements in the sorted sub-list that is greater than the
   value to be sorted
5. Insert the value
6. Repeat until list is sorted

These steps are easy to confuse with selection sort, so you'll want to watch the
video lecture and drawing that accompanies this reading as always!

## The pseudocode

```
procedure insertionSort( A : array of items )
   int holePosition
   int valueToInsert

   for i = 1 to length(A) inclusive do:

      /* select value to be inserted */
      valueToInsert = A[i]
      holePosition = i

      /*locate hole position for the element to be inserted */

      while holePosition > 0 and A[holePosition-1] > valueToInsert do:
         A[holePosition] = A[holePosition-1]
         holePosition = holePosition -1
      end while

      /* insert the number at hole position */
      A[holePosition] = valueToInsert

   end for

end procedure
```

________________________________________________________________________________
# Merge Sort

You've explored a few sorting algorithms already, all of them being quite slow
with a runtime of O(n<sup>2</sup>). It's time to level up and learn your first
time-efficient sorting algorithm! You'll explore **merge sort** in detail soon,
but first, you should jot down some key ideas for now. The following points are
not steps to an algorithm yet; rather, they are ideas that will motivate how you
can derive this algorithm.

* it is easy to merge elements of two sorted arrays into a single sorted array
* you can consider an array containing only a single element as already
  trivially sorted
* you can also consider an empty array as trivially sorted

## The algorithm: divide and conquer

You're going to need a helper function that solves the first major point from
above. How might you merge two sorted arrays? In other words you want a `merge`
function that will behave like so:

```javascript
let arr1 = [1, 5, 10, 15];
let arr2 = [0, 2, 3, 7, 10];
merge(arr1, arr2); // => [0, 1, 2, 3, 5, 7, 10, 10, 15]
```

Once you have that, you get to the "divide and conquer" bit.

The algorithm for merge sort is actually _really_ simple.

1. if there is only one element in the list, it is already sorted. return that
   array.
2. otherwise, divide the list recursively into two halves until it can no more
   be divided.
3. merge the smaller lists into new list in sorted order.

The process is visualized below. When elements are moved to the bottom of the
picture, they are going through the `merge` step:

![merge sort](images/MergeSort.gif)

The pseudocode for the algorithm is as follows.

```
procedure mergesort( a as array )
   if ( n == 1 ) return a

   /* Split the array into two */
   var l1 as array = a[0] ... a[n/2]
   var l2 as array = a[n/2+1] ... a[n]

   l1 = mergesort( l1 )
   l2 = mergesort( l2 )

   return merge( l1, l2 )
end procedure

procedure merge( a as array, b as array )
   var result as array
   while ( a and b have elements )
      if ( a[0] > b[0] )
         add b[0] to the end of result
         remove b[0] from b
      else
         add a[0] to the end of result
         remove a[0] from a
      end if
   end while

   while ( a has elements )
      add a[0] to the end of result
      remove a[0] from a
   end while

   while ( b has elements )
      add b[0] to the end of result
      remove b[0] from b
   end while

   return result
end procedure
```

________________________________________________________________________________
# Quick Sort

Quick Sort has a similar "divide and conquer" strategy to Merge Sort. Here are a
few key ideas that will motivate the design:

* it is easy to sort elements of an array relative to a particular target value
* an array of 0 or 1 elements is already trivially sorted

Regarding that first point, for example given `[7, 3, 8, 9, 2]` and a target of
`5`, we know `[3, 2]` are numbers less than `5` and `[7, 8, 9]` are numbers
greater than `5`.

## How does it work?

In general, the strategy is to divide the input array into two subarrays: one
with the smaller elements, and one with the larger elements. Then, it
recursively operates on the two new subarrays. It continues this process until
of dividing into smaller arrays until it reaches subarrays of length 1 or
smaller. As you have seen with Merge Sort, arrays of such length are
automatically sorted.

The steps, when discussed on a high level, are simple:

1. choose an element called "the pivot", how that's done is up to the
   implementation
2. take two variables to point left and right of the list excluding pivot
3. left points to the low index
4. right points to the high
5. while value at left is less than pivot move right
6. while value at right is greater than pivot move left
7. if both step 5 and step 6 does not match swap left and right
8. if left ≥ right, the point where they met is new pivot
9. repeat, recursively calling this for smaller and smaller arrays

Before we move forward, see if you can observe the behavior described above in
the following animation:

![quick sort](images/QuickSort.gif)

## The algorithm: divide and conquer

Formally, we want to partition elements of an array relative to a pivot value.
That is, we want elements less than the pivot to be separated from elements that
are greater than or equal to the pivot. Our goal is to create a function with
this behavior:

```javascript
let arr = [7, 3, 8, 9, 2];
partition(arr, 5);  // => [[3, 2], [7,8,9]]
```

### Partition

Seems simple enough! Let's implement it in JavaScript:

```javascript
// nothing fancy
function partition(array, pivot) {
  let left = [];
  let right = [];

  array.forEach(el => {
    if (el < pivot) {
      left.push(el);
    } else {
      right.push(el);
    }
  });

  return [ left, right ];
}

// if you fancy
function partition(array, pivot) {
  let left = array.filter(el => el < pivot);
  let right = array.filter(el => el >= pivot);
  return [ left, right ];
}
```

You don't have to use an explicit `partition` helper function in your Quick Sort
implementation; however, we will borrow heavily from this pattern. As you design
algorithms, it helps to think about key patterns in isolation, although your
solution may not feature that exact helper. Some would say we like to divide and
conquer.

## The pseudocode

It is _so_ small, this algorithm. It's amazing that it performs so well with so
little code!

```
procedure quickSort(left, right)

  if the length of the array is 0 or 1, return the array

  set the pivot to the first element of the array
  remove the first element of the array

  put all values less than the pivot value into an array called left
  put all values greater than the pivot value into an array called right

  call quick sort on left and assign the return value to leftSorted
  call quick sort on right and assign the return value to rightSorted

  return the concatenation of leftSorted, the pivot value, and rightSorted

end procedure
```

________________________________________________________________________________
# Binary Search

We've explored many ways to sort arrays so far, but why did we go through all of
that trouble? By sorting elements of an array, we are organizing the data in a
way that gives us a quick way to look up elements later on. For simplicity, we
have been using arrays of numbers up until this point. However, these sorting
concepts can be generalized to other data types. For example, it would be easy
to modify our comparison-based sorting algorithms to sort strings: instead of
leveraging facts like `0 < 1`, we can say `'A' < 'B'`.

Think of a dictionary. A dictionary contains alphabetically sorted words and
their definitions. A dictionary is pretty much only useful if it is ordered in
this way. Let's say you wanted to look up the definition of "stupendous." What
steps might you take?

+ you open up the dictionary at the roughly middle page
    + you land in the "m" section
+ you know "s" comes somewhere after "m" in the book, so you disregard all pages
  before the "m" section. Instead, you flip to the roughly middle page between
  "m" and "z"
    + you land in the "u" section
+ you know "s" comes somewhere before "u", so you can disregard all pages after
  the "u" section. Instead, you flip to the roughly middle page between the
  previous "m" page and "u"
+ ...

You are essentially using the `binarySearch` algorithm in the real world.

## The Algorithm: "check the middle and half the search space"

Formally, our `binarySearch` will seek to solve the following problem:

```
Given a sorted array of numbers and a target num, return a boolean indicating whether or not that target is contained in the array.
```

Programmatically, we want to satisfy the following behavior:

```javascript
binarySearch([5, 10, 12, 15, 20, 30, 70], 12);  // => true
binarySearch([5, 10, 12, 15, 20, 30, 70], 24);  // => false
```

Before we move on, really internalize the fact that `binarySearch` will only
work on **sorted** arrays! Obviously we can search any array, sorted or
unsorted, in `O(n)` time. But now our goal is be able to search the array with a
sub-linear time complexity (less than `O(n)`).

## The pseudocode

```
procedure binary search (list, target)
  parameter list: a list of sorted value
  parameter target: the value to search for

  if the list has zero length, then return false

  determine the slice point:
    if the list has an even number of elements,
      the slice point is the number of elements
      divided by two
    if the list has an odd number of elements,
      the slice point is the number of elements
      minus one divided by two

  create an list of the elements from 0 to the
    slice point, not including the slice point,
    which is known as the "left half"
  create an list of the elements from the
    slice point to the end of the list which is
    known as the "right half"

  if the target is less than the value in the
    original array at the slice point, then
    return the binary search of the "left half"
    and the target
  if the target is greater than the value in the
    original array at the slice point, then
    return the binary search of the "right half"
    and the target
  if neither of those is true, return true
end procedure binary search
```

________________________________________________________________________________
# Bubble Sort Analysis

Bubble Sort manipulates the array by swapping the position of two elements. To
implement Bubble Sort in JS, you'll need to perform this operation. It helps to
have a function to do that. A key detail in this function is that you need an
extra variable to store one of the elements since you will be overwriting them
in the array:

```js
function swap(array, idx1, idx2) {
  let temp = array[idx1];     // save a copy of the first value
  array[idx1] = array[idx2];  // overwrite the first value with the second value
  array[idx2] = temp;         // overwrite the second value with the first value
}
```

Note that the swap function does not create or return a new array. It mutates
the original array:

```js
let arr1 = [2, 8, 5, 2, 6];
swap(arr1, 1, 2);
arr1; // => [ 2, 5, 8, 2, 6 ]
```

### Bubble Sort JS Implementation

Take a look at the snippet below and try to understand how it corresponds to the
conceptual understanding of the algorithm. Scroll down to the commented version
when you get stuck.

```js
function bubbleSort(array) {
  let swapped = true;

  while(swapped) {
    swapped = false;

    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] > array[i+1]) {
        swap(array, i, i+1);
        swapped = true;
      }
    }
  }

  return array;
}
```

```js
// commented
function bubbleSort(array) {
  // this variable will be used to track whether or not we
  // made a swap on the previous pass. If we did not make
  // any swap on the previous pass, then the array must
  // already be sorted
  let swapped = true;

  // this while will keep doing passes if a swap was made
  // on the previous pass
  while(swapped) {
    swapped = false;  // reset swap to false

    // this for will perform a single pass
    for (let i = 0; i < array.length; i++) {

      // if the two value are not ordered...
      if (array[i] > array[i+1]) {

        // swap the two values
        swap(array, i, i+1);

        // since you made a swap, remember that you did so
        // b/c we should perform another pass after this one
        swapped = true;
      }
    }
  }

  return array;
}
```

## Time Complexity: O(n<sup>2</sup>)

Picture the worst case scenario where the input array is completely unsorted.
Say it's sorted in fully decreasing order, but the goal is to sort it in
increasing order:

+ n is the length of the input array
+ The inner `for` loop along contributes _O(n)_ in isolation
+ The outer while loop contributes _O(n)_ in isolation because a single
  iteration of the while loop will bring one element to its final resting
  position. In other words, it keeps running the while loop until the array is
  fully sorted. To fully sort the array we will need to bring all `n` elements
  into their final resting positions.
+ Those two loops are nested so the total time complexity is O(n * n) =
  O(n<sup>2</sup>).

It's worth mentioning that the best case scenario is when the input array is
already fully sorted. This will cause our for loop to conduct a single pass
without performing any swap, so the `while` loop will not trigger further
iterations. This means best case time complexity is _O(n)_ for bubble sort. This
best case linear time is probably the only advantage of bubble sort. Programmers
are usually interested only in the worst-case analysis and ignore best-case
analysis.

## Space Complexity: O(1)

Bubble Sort is a constant space, O(1), algorithm. The amount of memory consumed
by the algorithm does not increase relative to the size of the input array. It
uses the same amount of memory and create the same amount of variables
regardless of the size of the input, making this algorithm quite space
efficient. The space efficiency mostly comes from the fact that it mutates the
input array in-place. This is known as a **destructive sort** because it
"destroys" the positions of the values in the array.

## When should you use Bubble Sort?

Nearly never, but it may be a good choice in the following list of special
cases:

- When sorting really small arrays where run time will be negligible no matter
  what algorithm you choose.
- When sorting arrays that you expect to already be nearly sorted.
- At parties

________________________________________________________________________________
# Selection Sort Analysis

Since a component of Selection Sort requires us to locate the smallest value in
the array, let's focus on that pattern in isolation:

```javascript
function minumumValueIndex(arr) {
    let minIndex = 0;

    for (let j = 0; j < arr.length; j++) {
        if (arr[minIndex] > arr[j]) {
            minIndex = j;
        }
    }

    return minIndex;
}
```

Pretty basic code right? We won't use this explicit helper function to solve
selection sort, however we will borrow from this pattern soon.

## Selection Sort JS Implementation

We'll also utilize the classic swap pattern that we introduced in the bubble sort. To
refresh:

```javascript
function swap(arr, index1, index2) {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
}
```

Now for the punchline! Take a look at the snippet below and try to understand
how it corresponds to our conceptual understanding of the selection sort
algorithm. Scroll down to the commented version when you get stuck.

```javascript
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j;
      }
    }

    swap(arr, i, minIndex);
  }
  return arr;
}
```

```javascript
// commented
function selectionSort(arr) {
    // the `i` loop will track the index that points to the first element of the unsorted region:
    //    this means that the sorted region is everything left of index i
    //    and the unsorted region is everything to the right of index i
    for (let i = 0; i < arr.length; i++) {
        let minIndex = i;

        // the `j` loop will iterate through the unsorted region and find the index of the smallest element
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j;
            }
        }

        // after we find the minIndex in the unsorted region,
        // swap that minIndex with the first index of the unsorted region
        swap(arr, i, minIndex);
    }
    return arr;
}
```


## Time Complexity Analysis

Selection Sort runtime is O(n<sup>2</sup>) because:

+ `n` is the length of the input array
+ The outer loop i contributes O(n) in isolation, this is plain to see
+ The inner loop j is more complicated, it will make one less iteration for
  every iteration of i.
    + for example, let's say we have an array of 10 elements, `n = 10`.
    + the first full cycle of `j` will have 9 iterations
    + the second full cycle of `j` will have 8 iterations
    + the third full cycle of `j` will have 7 iterations
    + ...
    + the last full cycle of `j` will have 1 iteration
    + This means that the inner loop j will contribute roughly O(n / 2) on
      average
+ The two loops are nested so our total time complexity is O(n * n / 2) =
  O(n<sup>2</sup>)

You'll notice that during this analysis we said something silly like O(n / 2).
In some analyses such as this one, we'll prefer to drop the constants only at
the end of the sketch so you understand the logical steps we took to derive a
complicated time complexity.

## Space Complexity Analysis: O(1)

The amount of memory consumed by the algorithm does not increase relative to the
size of the input array. We use the same amount of memory and create the same
amount of variables regardless of the size of our input. A quick indicator of
this is the fact that we don't create any arrays.

## When should we use Selection Sort?

There is really only one use case where Selection Sort becomes superior to
Bubble Sort. Both algorithms are quadratic in time and constant in space, but
the point at which they differ is in the _number of swaps_ they make.

Bubble Sort, in the worst case, invokes a swap on every single comparison.
Selection Sort only swaps once our inner loop has completely finished traversing
the array. Therefore, Selection Sort is optimized to make the least possible
number of swaps.

Selection Sort becomes advantageous when making a swap is the most expensive
operation in your system. You will likely rarely encounter this scenario, but in
a situation where you've built (or have inherited) a system with suboptimal
write speed ability, for instance, maybe you're sorting data in a specialized
database tuned strictly for fast read speeds at the expense of slow write
speeds, using Selection Sort would save you a ton of expensive operations that
could potential crash your system under peak load.

Though in industry this situation is very rare, the insights above make for a
fantastic conversational piece when weighing technical tradeoffs while
strategizing solutions in an interview setting. This commentary may help deliver
the impression that you are well-versed in system design and technical analysis,
a key indicator that someone is prepared for a senior level position.

________________________________________________________________________________
# Insertion Sort Analysis

Take a look at the snippet below and try to understand how it corresponds to our
conceptual understanding of the Insertion Sort algorithm. Scroll down to the
commented version when you get stuck:

```javascript
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currElement = arr[i];
    for (var j = i - 1; j >= 0 && currElement < arr[j]; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = currElement;
  }
  return arr;
}
```

```javascript
function insertionSort(arr) {
    // the `i` loop will iterate through every element of the array
    // we begin at i = 1, because we can consider the first element of the array as a
    // trivially sorted region of only one element
    // insertion sort allows us to insert new elements anywhere within the sorted region
    for (let i = 1; i < arr.length; i++) {
        // grab the first element of the unsorted region
        let currElement = arr[i];

        // the `j` loop will iterate left through the sorted region,
        // looking for a legal spot to insert currElement
        for (var j = i - 1; j >= 0 && currElement < arr[j]; j--) {
            // keep moving left while currElement is less than the j-th element

            arr[j + 1] = arr[j];
            // the line above will move the j-th element to the right,
            // leaving a gap to potentially insert currElement
        }
        // insert currElement into that gap
        arr[j + 1] = currElement;
    }
    return arr;
}
```

There are a few key pieces to point out in the above solution before moving
forward:

1. The outer `for` loop starts at the 1st index, not the 0th index, and moves to
   the right.

2. The inner `for` loop starts immediately to the left of the current element,
   and moves to the left.

3. The condition for the inner `for` loop is complicated, and behaves similarly
   to a while loop!
    - It continues iterating to the left toward `j = 0`, _only while_ the
      `currElement` is less than `arr[j]`.
    - It does this over and over until it finds the proper place to insert
      `currElement`, and then we exit the inner loop!

4. When shifting elements in the sorted region to the right, it _does not_
   replace the value at their old index! If the input array is `[1, 2, 4, 3]`,
   and `currElement` is `3`, after comparing `4` and `3`, but before inserting
   `3` between `2` and `4`, the array will look like this: `[1, 2, 4, 4]`.

If you are currently scratching your head, that is perfectly okay because when
this one clicks, it clicks for good.

If you're struggling, you should try taking out a pen and paper and step through
the solution provided above one step at a time. Keep track of `i`, `j`,
`currElement`, `arr[j]`, and the input `arr` itself _at every step_. After going
through this a few times, you'll have your "ah HA!" moment.

## Time and Space Complexity Analysis

Insertion Sort runtime is O(n<sup>2</sup>) because:

In the **worst case scenario** where our input array is entirely unsorted, since
this algorithm contains a nested loop, its run time behaves similarly to
`bubbleSort` and `selectionSort`. In this case, we are forced to make a comparison
at each iteration of the inner loop. Not convinced? Let's derive the complexity.
We'll use much of the same argument as we did in `selectionSort`. Say we had the
worst case scenario where are input array is sorted in full decreasing order,
but we wanted to sort it in increasing order:

+ `n` is the length of the input array
+ The outer loop i contributes O(n) in isolation, this is plain to see
+ The inner loop j is more complicated. We know j will iterate until it finds an
  appropriate place to insert the `currElement` into the sorted region. However,
  since we are discussing the case where the data is already in decreasing
  order, the element must travel the maximum distance to find it's insertion
  point! We know this insertion point to be index 0, since every `currElement`
  will be the next smallest of the array. So:
    + the 1st element travels 1 distance to be inserted
    + the 2nd element travels 2 distance to be inserted
    + the 3rd element travels 3 distance to be inserted
    + ...
    + the n-1th element travels n-1 distance to be inserted
    + This means that our inner loop j will contribute roughly O(n / 2) on
      average
+ The two loops are nested so our total time complexity is O(n * n / 2) =
  O(n<sup>2</sup>)

### Space Complexity: O(1)

The amount of memory consumed by the algorithm does not increase relative to the
size of the input array. We use the same amount of memory and create the same
amount of variables regardless of the size of our input. A quick indicator of
this is the fact that we don't create any arrays.

## When should you use Insertion Sort?

Insertion Sort has one advantage that makes it absolutely supreme in one special
case. Insertion Sort is what's known as an "online" algorithm. Online algorithms
are great when you're dealing with _streaming data_, because they can sort the
data live _as it is received_.

If you must sort a set of data that is ever-incoming, for example, maybe you are
sorting the most relevant posts in a social media feed so that those posts that
are most likely to impact the site's audience always appear at the top of the
feed, an online algorithm like Insertion Sort is a great option.

Insertion Sort works well in this situation because the left side of the array
is always sorted, and in the case of nearly sorted arrays, it can run in linear
time. The absolute best case scenario for Insertion Sort is when there is only
one unsorted element, and it is located all the way to the right of the array.

Well, if you have data constantly being pushed to the array, it will always be
added to the right side. If you keep your algorithm constantly running, the left
side will always be sorted. Now you have linear time sort.

Otherwise, Insertion Sort is, in general, useful in all the same situations as
Bubble Sort. It's a good option when:

- You are sorting really small arrays where run time will be negligible no
  matter what algorithm we choose.
- You are sorting an array that you expect to already be nearly sorted.

________________________________________________________________________________
# Merge Sort Analysis

You needed to come up with two pieces of code to make merge sort work.

## Full code

```javascript
function merge(array1, array2) {
  let merged = [];

  while (array1.length || array2.length) {
    let ele1 = array1.length ? array1[0] : Infinity;
    let ele2 = array2.length ? array2[0] : Infinity;

    let next;
    if (ele1 < ele2) {
      next = array1.shift();
    } else {
      next = array2.shift();
    }

    merged.push(next);
  }

  return merged;
}

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  let midIdx = Math.floor(array.length / 2);
  let leftHalf = array.slice(0, midIdx);
  let rightHalf = array.slice(midIdx);

  let sortedLeft = mergeSort(leftHalf);
  let sortedRight = mergeSort(rightHalf);

  return merge(sortedLeft, sortedRight);
}
```

## Merging two sorted arrays

Merging two sorted arrays is simple. Since both arrays are sorted, we know the
smallest numbers to always be at the front of the arrays. We can construct the
new array by comparing the first elements of both input arrays. We remove the
smaller element from it's respective array and add it to our new array. Do this
until both input arrays are empty:

```javascript
function merge(array1, array2) {
  let merged = [];

  while (array1.length || array2.length) {
    let ele1 = array1.length ? array1[0] : Infinity;
    let ele2 = array2.length ? array2[0] : Infinity;

    let next;
    if (ele1 < ele2) {
      next = array1.shift();
    } else {
      next = array2.shift();
    }

    merged.push(next);
  }

  return merged;
}
```

Remember the following about JavaScript to understand the above code.

+ `0` is considered a falsey value, meaning it acts like `false` when used in
  Boolean expressions. All other numbers are truthy.
+ `Infinity` is a value that is guaranteed to be greater than any other quantity
+ `shift` is an array method that removes and returns the first element

Here's the annotated version.

```javascript
// commented
function merge(array1, array2) {
  let merged = [];

  // keep running while either array still contains elements
  while (array1.length || array2.length) {
    // if array1 is nonempty, take its the first element as ele1
    // otherwise array1 is empty, so take Infinity as ele1
    let ele1 = array1.length ? array1[0] : Infinity;

    // do the same for array2, ele2
    let ele2 = array2.length ? array2[0] : Infinity;

    let next;
    // remove the smaller of the eles from it's array
    if (ele1 < ele2) {
      next = array1.shift();
    } else {
      next = array2.shift();
    }

    // and add that ele to the new array
    merged.push(next);
  }

  return merged;
}
```

By using `Infinity` as the default element when an array is empty, we are able to
elegantly handle the scenario where one array empties before the other. We know
that any actual element will be less than `Infinity` so we will continually take
the other element into our merged array.

In other words, we can safely handle this edge case:

```javascript
merge([10, 13, 15, 25], []);  // => [10, 13, 15, 25]
```

Nice! We now have a way to merge two sorted arrays into a single sorted array.
It's worth mentioning that `merge` will have a `O(n)` runtime where `n` is the
combined length of the two input arrays. This is what we meant when we said it
was "easy" to merge two sorted arrays; linear time is fast! We'll find fact this
useful later.

## Divide and conquer, step-by-step

Now that we satisfied the merge idea, let's handle the second point. That is, we
say an array of 1 or 0 elements is already sorted. This will be the base case of
our recursion. Let's begin adding this code:

```javascript
function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }
    // ....
}
```

If our base case pertains to an array of a very small size, then the design of
our recursive case should make progress toward hitting this base scenario. In
other words, we should recursively call `mergeSort` on smaller and smaller
arrays. A logical way to do this is to take the input array and split it into
left and right halves.

```javascript
function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let midIdx = Math.floor(array.length / 2);
    let leftHalf = array.slice(0, midIdx);
    let rightHalf = array.slice(midIdx);

    let sortedLeft = mergeSort(leftHalf);
    let sortedRight = mergeSort(rightHalf);
    // ...
}
```

Here is the part of the recursion where we do a lot of hand waving and we take
things on faith. We know that `mergeSort` will take in an array and return the
sorted version; we assume that it works. That means the two recursive calls will
return the `sortedLeft` and `sortedRight` halves.

Okay, so we have two sorted arrays. We want to return one sorted array. So
`merge` them! Using the `merge` function we designed earlier:

```javascript
function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let midIdx = Math.floor(array.length / 2);
    let leftHalf = array.slice(0, midIdx);
    let rightHalf = array.slice(midIdx);

    let sortedLeft = mergeSort(leftHalf);
    let sortedRight = mergeSort(rightHalf);

    return merge(sortedLeft, sortedRight);
}
```

Wow. that's it. Notice how light the implementation of `mergeSort` is. Much of
the heavy lifting (the actually comparisons) is done by the `merge` helper.

`mergeSort` is a classic example of a "Divide and Conquer" algorithm. In other
words, we keep breaking the array into smaller and smaller sub arrays. This is
the same as saying we take the problem and break it down into smaller and
smaller subproblems. We do this until the subproblems are so small that we
trivially know the answer to them (an array length 0 or 1 is already sorted).
Once we have those subanswers we can combine to reconstruct the larger problems
that we previously divided (merge the left and right subarrays).


## Time and Space Complexity Analysis

### Time Complexity: O(n log(n))

+ `n` is the length of the input array
+ We must calculate how many recursive calls we make. The number of recursive
  calls is the number of times we must split the array to reach the base case.
  Since we split in half each time, the number of recursive calls is
  `O(log(n))`.
    + for example, say we had an array of length `32`
    + then the length would change as `32 -> 16 -> 8 -> 4 -> 2 -> 1`, we have to
      split 5 times before reaching the base case, `log(32) = 5`
    + in our algorithm, **log(n)** describes how many times we must halve **n**
      until the quantity reaches 1.
+ Besides the recursive calls, we must consider the while loop within the
  `merge` function, which contributes `O(n)` in isolation
+ We call `merge` in every recursive `mergeSort` call, so the total complexity
  is **O(n * log(n))**

### Space Complexity: O(n)

Merge Sort is the first non-O(1) space sorting algorithm we've seen thus far.

The larger the size of our input array, the greater the number of subarrays we
must create in memory. These are not free! They each take up finite space, and
we will need a new subarray for each element in the original input. Therefore,
Merge Sort has a linear space complexity, O(n).

### When should you use Merge Sort?

Unless we, the engineers, have access in advance to some unique, exploitable
insight about our dataset, it turns out that O(n log n) time is _the best_ we
can do when sorting unknown datasets.

That means that Merge Sort is fast! It's way faster than Bubble Sort, Selection
Sort, and Insertion Sort. However, due to its linear space complexity, we must
always weigh the trade off between speed and memory consumption when making the
choice to use Merge Sort. Consider the following:

- If you have unlimited memory available, use it, it's fast!
- If you have a decent amount of memory available and a medium sized dataset,
  run some tests first, but use it!
- In other cases, maybe you should consider other options.

________________________________________________________________________________
# Quick Sort Analysis

Let's begin structuring the recursion. The base case of any recursive problem is
where the input is so trivial, we immediately know the answer without
calculation. If our problem is to sort an array, what is the trivial array? An
array of 1 or 0 elements! Let's establish the code:

```javascript
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }
    // ...
}
```

If our base case pertains to an array of a very small size, then the design of
our recursive case should make progress toward hitting this base scenario. In
other words, we should recursively call `quickSort` on smaller and smaller
arrays. This is very similar to our previous `mergeSort`, except we don't just
split the array down the middle. Instead we should arbitrarily choose an element
of the array as a pivot and partition the remaining elements relative to this
pivot:

```javascript
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array.shift();
    let left = array.filter(el => el < pivot);
    let right = array.filter(el => el >= pivot);
    // ...
```

Here is what to notice about the partition step above:
1. the pivot is an element of the array; we arbitrarily chose the first element
2. we removed the pivot from the master array before we filter into the left and
   right partitions

Now that we have the two subarrays of `left` and `right` we have our
subproblems! To solve these subproblems we must sort the subarrays. I wish we
had a function that sorts an array...oh wait we do, `quickSort`! Recursively:

```javascript
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array.shift();
    let left = array.filter(el => el < pivot);
    let right = array.filter(el => el >= pivot);

    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);
    // ...
```

Okay, so we have the two sorted partitions. This means we have the two
subsolutions. But how do we put them together? Think about how we partitioned
them in the first place. Everything in `leftSorted` is **guaranteed** to be less
than everything in `rightSorted`. On top of that, `pivot` should be placed after
the last element in `leftSorted`, but before the first element in `rightSorted`.
So all we need to do is to combine the elements in the order "left, pivot,
right"!

```javascript
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array.shift();
    let left = array.filter(el => el < pivot);
    let right = array.filter(el => el >= pivot);

    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);

    return leftSorted.concat([pivot]).concat(rightSorted);
}
```

That last `concat` line is a bit clunky. Bonus JS Lesson: we can use the spread
`...` operator to elegantly concatenate arrays. In general:

```javascript
let one = ['a', 'b']
let two = ['d', 'e', 'f']
let newArr = [ ...one, 'c', ...two  ];
newArr; // =>  [ 'a', 'b', 'c', 'd', 'e', 'f' ]
```

Utilizing that spread pattern gives us this final implementation:

```javascript
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array.shift();
    let left = array.filter(el => el < pivot);
    let right = array.filter(el => el >= pivot);

    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);

    return [ ...leftSorted, pivot, ...rightSorted ];
}
```

### Quicksort Sort JS Implementation

That code was so clean we should show it again. Here's the complete code for
your reference, for when you `ctrl+F "quicksort"` the night before an interview:

```javascript
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    }

    let pivot = array.shift();
    let left = array.filter(el => el < pivot);
    let right = array.filter(el => el >= pivot);

    let leftSorted = quickSort(left);
    let rightSorted = quickSort(right);

    return [ ...leftSorted, pivot, ...rightSorted ];
}
```

## Time and Space Complexity Analysis

Here is a summary of the complexity.

### Time Complexity

+ Avg Case: O(n log(n))
+ Worst Case: O(n<sup>2</sup>)

The runtime analysis of `quickSort` is more complex than `mergeSort`

+ `n` is the length of the input array
+ The partition step alone is `O(n)`
+ We must calculate how many recursive calls we make. The number of recursive
  calls is the number of times we must split the array to reach the base case.
  This is dependent on how we choose the pivot. Let's analyze the best and worst
  case:
    + **Best Case:** We are lucky and always choose the median as the pivot.
      This means the left and right partitions will have equal length. This will
      halve the array length at every step of the recursion. We benefit from
      this halving with `O(log(n))` recursive calls to reach the base case.
    + **Worst Case:** We are unlucky and always choose the min or max as the
      pivot. This means one partition will contain everything, and the other
      partition is empty. This will decrease the array length by 1 at every step
      of the recursion. We suffer from `O(n)` recursive calls to reach the base
      case.
+ The partition step occurs in every recursive call, so our total complexities
  are:
    + **Best Case:** O(n * log(n))
    + **Worst Case:** O(n<sup>2</sup>)

Although we typically take the worst case when describing Big-O for an
algorithm, much research on `quickSort` has shown the worst case to be an
exceedingly rare occurrence even if we choose the pivot at random. Because of
this we still consider `quickSort` an efficient algorithm. This is a common
interview talking point, so you should be familiar with the relationship between
the choice of pivot and efficiency of the algorithm.

Just in case: A somewhat common question a student may ask when studying
`quickSort` is, "If the median is the best pivot, why don't we always just
choose the median when we partition?" Don't overthink this. To know the median
of an array, it must be sorted in the first place.

### Space Complexity

Our implementation of `quickSort` uses `O(n)` space because of the partition
arrays we create. There is an in-place version of `quickSort` that uses
`O(log(n))` space. `O(log(n))` space is not huge benefit over `O(n)`. You'll
also find our version of `quickSort` as easier to remember, easier to implement.
Just know that a `O(logn)` space `quickSort` exists.

### When should you use Quick Sort?

+ When you are in a pinch and need to throw down an efficient sort (on average).
  The recursive code is light and simple to implement; much smaller than
  `mergeSort`.
+ When constant space is important to you, use the in-place version. This will
  of course trade off some simplicity of implementation.

If you know some constraints about dataset you can make some modifications to
optimize pivot choice. Here's some food for thought. Our implementation of
`quickSort` will always take the first element as the pivot. This means we will
suffer from the worst case time complexity in the event that we are given an
already sorted array (ironic isn't it?). If you know your input data to be
mostly already sorted, randomize the choice of pivot - this is a very easy
change. Bam. Solved like a true engineer.

________________________________________________________________________________
# Binary Search Analysis

We'll implement binary search recursively. As always, we start with a base case
that captures the scenario of the input array being so trivial, that we know the
answer without further calculation. If we are given an empty array and a target,
we can be certain that the target is not inside of the array:

```javascript
function binarySearch(array, target) {
    if (array.length === 0) {
        return false;
    }
    // ...
}
```

Now for our recursive case. If we want to get a time complexity less than
`O(n)`, we must avoid touching all `n` elements. Adopting our dictionary
strategy, let's find the middle element and grab references to the left and
right halves of the sorted array:

```javascript
function binarySearch(array, target) {
    if (array.length === 0) {
        return false;
    }

    let midIdx = Math.floor(array.length / 2);
    let leftHalf = array.slice(0, midIdx);
    let rightHalf = array.slice(midIdx + 1);
    // ...
}
```

It's worth pointing out that the left and right halves do not contain the middle
element we chose.

Here is where we leverage the sorted property of the array. If the target is
less than the middle, then the target must be in the left half of the array. If
the target is greater than the middle, then the target must be in the right half
of the array. So we can narrow our search to one of these halves, and ignore the
other. Luckily we have a function that can search the half, its `binarySearch`:

```javascript
function binarySearch(array, target) {
    if (array.length === 0) {
        return false;
    }

    let midIdx = Math.floor(array.length / 2);
    let leftHalf = array.slice(0, midIdx);
    let rightHalf = array.slice(midIdx + 1);

    if (target < array[midIdx]) {
        return binarySearch(leftHalf, target);
    } else if (target > array[midIdx]) {
        return binarySearch(rightHalf, target);
    }
    // ...
}
```

We know `binarySeach` will return the correct Boolean, so we just pass that
result up by returning it ourselves. However, something is lacking in our code.
It is only possible to get a false from the literal `return false` line, but
there is no `return true`. Looking at our conditionals, we handle the cases
where the target is less than middle or the target is greater than the middle,
but what if the product is **equal** to the middle? If the target is equal to
the middle, then we found the target and should `return true`! This is easy to
add with an `else`:

```javascript
function binarySearch(array, target) {
    if (array.length === 0) {
        return false;
    }

    let midIdx = Math.floor(array.length / 2);
    let leftHalf = array.slice(0, midIdx);
    let rightHalf = array.slice(midIdx + 1);

    if (target < array[midIdx]) {
        return binarySearch(leftHalf, target);
    } else if (target > array[midIdx]) {
        return binarySearch(rightHalf, target);
    } else {
        return true;
    }
}
```

To wrap up, we have confidence of our base case will eventually be hit because
we are continually halving the array. We halve the array until it's length is 0
or we actually find the target.

### Binary Search JS Implementation

Here is the code again for your quick reference:

```javascript
function binarySearch(array, target) {
    if (array.length === 0) {
        return false;
    }

    let midIdx = Math.floor(array.length / 2);
    let leftHalf = array.slice(0, midIdx);
    let rightHalf = array.slice(midIdx + 1);

    if (target < array[midIdx]) {
        return binarySearch(leftHalf, target);
    } else if (target > array[midIdx]) {
        return binarySearch(rightHalf, target);
    } else {
        return true;
    }
}
```

## Time and Space Complexity Analysis

The complexity analysis of this algorithm is easier to explain through visuals,
so we **highly encourage** you to watch the lecture that accompanies this
reading. In any case, here is a summary of the complexity:

### Time Complexity: O(log(n))

+ `n` is the length of the input array
+ We have no loops, so we must only consider the number of recursive calls it
  takes to hit the base case
+ The number of recursive calls is the number of times we must halve the array
  until it's length becomes 0. This number can be described by `log(n)`
    + for example, say we had an array of 8 elements, `n = 8`
    + the length would halve as `8 -> 4 -> 2 -> 1`
    + it takes 3 calls, `log(8) = 3`

### Space Complexity: O(n)

Our implementation uses `n` space due to half arrays we create using slice. Note
that JavaScript `slice` creates a new array, so it requires additional memory to
be allocated.


### When should we use Binary Search?

Use this algorithm when the input data is sorted!!! This is a heavy requirement,
but if you have it, you'll have an insanely fast algorithm. Of course, you can
use one of your high-functioning sorting algorithms to sort the input and _then_
perform the binary search!

________________________________________________________________________________
# Practice: Bubble Sort

This project contains a skeleton for you to implement Bubble Sort. In the
file **lib/bubble_sort.js**, you should implement the Bubble Sort. This is a
description of how the Bubble Sort works (and is also in the code file).

```
Bubble Sort: (array)
  n := length(array)
  repeat
    swapped = false
    for i := 1 to n - 1 inclusive do

      /* if this pair is out of order */
      if array[i - 1] > array[i] then

        /* swap them and remember something changed */
        swap(array, i - 1, i)
        swapped := true

      end if
    end for
  until not swapped
```

## Instructions

* Clone the project from
  https://github.com/-starters/algorithms-bubble-sort-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/bubble_sort.js` that implements the Bubble Sort.

________________________________________________________________________________
# Practice: Selection Sort

This project contains a skeleton for you to implement Selection Sort. In the
file **lib/selection_sort.js**, you should implement the Selection Sort. You
can use the same `swap` function from Bubble Sort; however, try to implement it
on your own, first.

The algorithm can be summarized as the following:

1. Set MIN to location 0
2. Search the minimum element in the list
3. Swap with value at location MIN
4. Increment MIN to point to next element
5. Repeat until list is sorted

This is a description of how the Selection Sort works (and is also in the code
file).

```
procedure selection sort(list)
   list  : array of items
   n     : size of list

   for i = 1 to n - 1
   /* set current element as minimum*/
      min = i

      /* check the element to be minimum */

      for j = i+1 to n
         if list[j] < list[min] then
            min = j;
         end if
      end for

      /* swap the minimum element with the current element*/
      if indexMin != i  then
         swap list[min] and list[i]
      end if
   end for
end procedure
```

## Instructions

* Clone the project from
  https://github.com/-starters/algorithms-selection-sort-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/selection_sort.js` that implements the Selection Sort.

________________________________________________________________________________
# Practice: Insertion Sort

This project contains a skeleton for you to implement Insertion Sort. In the
file **lib/insertion_sort.js**, you should implement the Insertion Sort.

The algorithm can be summarized as the following:

1. If it is the first element, it is already sorted. return 1;
2. Pick next element
3. Compare with all elements in the sorted sub-list
4. Shift all the elements in the sorted sub-list that is greater than the
   value to be sorted
5. Insert the value
6. Repeat until list is sorted

This is a description of how the Insertion Sort works (and is also in the code
file).

```
procedure insertionSort( A : array of items )
   int holePosition
   int valueToInsert

   for i = 1 to length(A) inclusive do:

      /* select value to be inserted */
      valueToInsert = A[i]
      holePosition = i

      /*locate hole position for the element to be inserted */

      while holePosition > 0 and A[holePosition-1] > valueToInsert do:
         A[holePosition] = A[holePosition-1]
         holePosition = holePosition -1
      end while

      /* insert the number at hole position */
      A[holePosition] = valueToInsert

   end for

end procedure
```

## Instructions

* Clone the project from
  https://github.com/-starters/algorithms-insertion-sort-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/insertion_sort.js` that implements the Insertion Sort.

________________________________________________________________________________
# Practice: Merge Sort

This project contains a skeleton for you to implement Merge Sort. In the
file **lib/merge_sort.js**, you should implement the Merge Sort.

The algorithm can be summarized as the following:

1. if there is only one element in the list, it is already sorted. return that
   array.
2. otherwise, divide the list recursively into two halves until it can no more
   be divided.
3. merge the smaller lists into new list in sorted order.

This is a description of how the Merge Sort works (and is also in the code
file).

```
procedure mergesort( a as array )
   if ( n == 1 ) return a

   /* Split the array into two */
   var l1 as array = a[0] ... a[n/2]
   var l2 as array = a[n/2+1] ... a[n]

   l1 = mergesort( l1 )
   l2 = mergesort( l2 )

   return merge( l1, l2 )
end procedure

procedure merge( a as array, b as array )
   var result as array
   while ( a and b have elements )
      if ( a[0] > b[0] )
         add b[0] to the end of result
         remove b[0] from b
      else
         add a[0] to the end of result
         remove a[0] from a
      end if
   end while

   while ( a has elements )
      add a[0] to the end of result
      remove a[0] from a
   end while

   while ( b has elements )
      add b[0] to the end of result
      remove b[0] from b
   end while

   return result
end procedure
```

## Instructions

* Clone the project from
  https://github.com/-starters/algorithms-merge-sort-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/merge_sort.js` that implements the Merge Sort.

________________________________________________________________________________
# Practice: Quick Sort

This project contains a skeleton for you to implement Quick Sort. In the
file **lib/quick_sort.js**, you should implement the Quick Sort. This is a
description of how the Quick Sort works (and is also in the code file).

```
procedure quick sort (array)
  if the length of the array is 0 or 1, return the array

  set the pivot to the first element of the array
  remove the first element of the array

  put all values less than the pivot value into an array called left
  put all values greater than the pivot value into an array called right

  call quick sort on left and assign the return value to leftSorted
  call quick sort on right and assign the return value to rightSorted

  return the concatenation of leftSorted, the pivot value, and rightSorted
end procedure quick sort
```

## Instructions

* Clone the project from
  https://github.com/-starters/algorithms-quick-sort-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/quick_sort.js` that implements the Quick Sort.

________________________________________________________________________________
# Practice: Binary Search

This project contains a skeleton for you to implement Binary Search. In the
file **lib/binary_search.js**, you should implement the Binary Search and its
cousin Binary Search Index.

The Binary Search algorithm can be summarized as the following:

1. If the array is empty, then return false
2. Check the value in the middle of the array against the target value
3. If the value is equal to the target value, then return true
4. If the value is less than the target value, then return the binary search on
   the left half of the array for the target
5. If the value is greater than the target value, then return the binary search
   on the right half of the array for the target

This is a description of how the Binary Search works (and is also in the code
file).

```
procedure binary search (list, target)
  parameter list: a list of sorted value
  parameter target: the value to search for

  if the list has zero length, then return false

  determine the slice point:
    if the list has an even number of elements,
      the slice point is the number of elements
      divided by two
    if the list has an odd number of elements,
      the slice point is the number of elements
      minus one divided by two

  create an list of the elements from 0 to the
    slice point, not including the slice point,
    which is known as the "left half"
  create an list of the elements from the
    slice point to the end of the list which is
    known as the "right half"

  if the target is less than the value in the
    original array at the slice point, then
    return the binary search of the "left half"
    and the target
  if the target is greater than the value in the
    original array at the slice point, then
    return the binary search of the "right half"
    and the target
  if neither of those is true, return true
end procedure binary search
```

Then you need to adapt that to return _the index_ of the found item rather than
a Boolean value. The pseudocode is also in the code file.

```
procedure binary search index(list, target, low, high)
  parameter list: a list of sorted value
  parameter target: the value to search for
  parameter low: the lower index for the search
  parameter high: the upper index for the search

  if low is equal to high, then return -1 to indicate
    that the value was not found

  determine the slice point:
    if the list between the high index and the low index
    has an even number of elements,
      the slice point is the number of elements
      between high and low divided by two
    if the list between the high index and the low index
    has an odd number of elements,
      the slice point is the number of elements
      between high and low minus one, divided by two

  if the target is less than the value in the
    original array at the slice point, then
    return the binary search of the array,
    the target, low, and the slice point
  if the target is greater than the value in the
    original array at the slice point, then return
    the binary search of the array, the target,
    the slice point plus one, and high
  if neither of those is true, return the slice point
end procedure binary search index
```

## Instructions

* Clone the project from
  https://github.com/-starters/algorithms-binary-search-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/binary_search.js` that implements the Binary Search and Binary
  Search Index.

________________________________________________________________________________
# WEEK-07 DAY-4<br>*Lists, Stacks, Queues* {ignore=true}
________________________________________________________________________________
# Lists, Stacks, and Queues Learning Objectives

**The objective of this lesson** is for you to become comfortable with
implementing common data structures. This is important because questions about
data structures are incredibly likely to be interview questions for software
engineers from junior to senior levels. Moreover, understanding how different
data structures work will influence the libraries and frameworks that you choose
when writing software.

When you are done, you will be able to:

1. Explain and implement a List.
2. Explain and implement a Stack.
3. Explain and implement a Queue.me comfortable with
implementing common data structures. This is important because questions about
data structures are incredibly likely to be interview questions for software
engineers from junior to senior levels. Moreover, understanding how different
data structures work will influence the libraries and frameworks that you choose
when writing software.

When you are done, you will be able to:

1. Explain and implement a List.
2. Explain and implement a Stack.
3. Explain and implement a Queue.

________________________________________________________________________________
# Linked Lists

In the university setting, it’s common for Linked Lists to appear early on in an
undergraduate’s Computer Science coursework. While they don't always have the
most practical real-world applications in industry, Linked Lists make for an
important and effective educational tool in helping develop a student's mental
model on what data structures actually are to begin with.

Linked lists are simple. They have many compelling, reoccurring edge cases to
consider that emphasize to the student the need for care and intent while
implementing data structures. They can be applied as the underlying data
structure while implementing a variety of other prevalent abstract data types,
such as Lists, Stacks, and Queues, and they have a level of versatility high
enough to clearly illustrate the value of the Object Oriented Programming
paradigm.

They also come up in software engineering interviews quite often.

## What is a Linked List?

A Linked List data structure represents a linear sequence of "vertices" (or
"nodes"), and tracks three important properties.

<p align="center">
  <b>Linked List Properties:</b>
</p>

| Property    | Description                                         |
| :---------: | :-------------------------------------------------: |
| `head`      | The first node in the list.                         |
| `tail`      | The last node in the list.                          |
| `length`    | The number of nodes in the list; the list's length. |

The data being tracked by a particular Linked List does not live inside the
Linked List instance itself. Instead, each vertex is actually an instance of an
even simpler, smaller data structure, often referred to as a "Node".

Depending on the type of Linked List (there are many), Node instances track some
very important properties as well.

<p align="center">
  <b>Linked List Node Properties:</b>
</p>

| Property    | Description                                            |
| :---------: | :----------------------------------------------------: |
| `value`     | The actual value this node represents.                 |
| `next`      | The next node in the list (relative to this node).     |
| `previous`  | The previous node in the list (relative to this node). |

<p align="center">
  <b>NOTE:</b> The <code>previous</code> property is for Doubly Linked Lists only!
</p>

Linked Lists contain _ordered_ data, just like arrays. The first node in the
list is, indeed, first. From the perspective of the very first node in the list,
the _next_ node is the second node. From the perspective of the second node in
the list, the _previous_ node is the first node, and the _next_ node is the
third node. And so it goes.

#### _"So...this sounds a lot like an Array..."_

Admittedly, this does _sound_ a lot like an Array so far, and that's because
Arrays and Linked Lists are both implementations of the List ADT. However, there
is an incredibly important distinction to be made between Arrays and Linked
Lists, and that is how they _physically store_ their data. (As opposed to how
they _represent_ the order of their data.)

Recall that Arrays contain _contiguous_ data. Each element of an array is
actually stored _next to_ it's neighboring element _in the actual hardware of
your machine_, in a single continuous block in memory.

![Array in Memory](images/array-in-memory.png)
<p align="center">
  <i>An Array's contiguous data being stored in a continuous block of addresses in memory.</i>
</p>
<br>

Unlike Arrays, Linked Lists contain _non-contiguous_ data. Though Linked Lists
_represent_ data that is ordered linearly, that mental model is just that - an
interpretation of the _representation_ of information, not reality.

In reality, in the actual hardware of your machine, whether it be in disk or in
memory, a Linked List's Nodes are not stored in a single continuous block of
addresses. Rather, Linked List Nodes live at randomly distributed addresses
throughout your machine! The only reason we know which node comes next in the
list is because we've assigned its reference to the current node's `next`
pointer.

![Array in
Memory](images/SLL-diagram.png)
<p align="center">
  <i>A Singly Linked List's non-contiguous data (Nodes) being stored at randomly distributed addresses in memory.</i>
</p>
<br>

For this reason, Linked List Nodes have _no indices_, and no _random access_.
Without random access, we do not have the ability to look up an individual
Linked List Node in constant time. Instead, to find a particular Node, we have
to start at the very first Node and iterate through the Linked List one node at
a time, checking each Node's _next_ Node until we find the one we're interested
in.

So when implementing a Linked List, we actually must implement both the Linked
List class _and_ the Node class. Since the actual data lives in the Nodes, it's
simpler to implement the Node class first.

## Types of Linked Lists

There are four flavors of Linked List you should be familiar with when walking
into your job interviews.

<p align="center">
  <b>Linked List Types:</b>
</p>

| List Type             | Description                                                                       | Directionality                |
| :-------------------: | :-------------------------------------------------------------------------------: | :--------------------------:  |
| Singly Linked         | Nodes have a single pointer connecting them in a single direction.                | Head→Tail                     |
| Doubly Linked         | Nodes have two pointers connecting them bi-directionally.                         | Head⇄Tail                     |
| Multiply Linked       | Nodes have two or more pointers, providing a variety of potential node orderings. | Head⇄Tail, A→Z, Jan→Dec, etc. |
| Circularly Linked     | Final node's `next` pointer points to the first node, creating a non-linear, circular version of a Linked List.   | Head→Tail→Head→Tail|

<p align="center">
  <b>NOTE:</b> These Linked List types are not always mutually exclusive.
</p>

For instance:

- Any type of Linked List can be implemented Circularly (e.g. A Circular
  Doubly Linked List).
- A Doubly Linked List is actually just a special case of a Multiply Linked
  List.

You are most likely to encounter Singly and Doubly Linked Lists in your upcoming
job search, so we are going to focus exclusively on those two moving forward.
However, in more senior level interviews, it is very valuable to have some
familiarity with the other types of Linked Lists. Though you may not actually
code them out, _you will win extra points by illustrating your ability to weigh
the tradeoffs of your technical decisions_ by discussing how your choice of
Linked List type may affect the efficiency of the solutions you propose.

## Linked List Methods

Linked Lists are great foundation builders when learning about data structures
because they share a number of similar methods (and edge cases) with many other
common data structures. You will find that many of the concepts discussed here
will repeat themselves as we dive into some of the more complex non-linear data
structures later on, like Trees and Graphs.

In the project that follows, we will implement the following Linked List
methods:

| Type      | Name         | Description                                                                     | Returns             |
| :-------: | :----------: | :-----------------------------------------------------------------------------: | :-----------------: |
| Insertion | `addToTail`  | Adds a new node to the tail of the Linked List.                                 | Updated Linked List |
| Insertion | `addToHead`  | Adds a new node to the head of the Linked List.                                 | Updated Linked List |
| Insertion | `insertAt`   | Inserts a new node at the "index", or position, specified.                      | Boolean             |
| Deletion  | `removeTail` | Removes the node at the tail of the Linked List.                                | Removed node        |
| Deletion  | `removeHead` | Removes the node at the head of the Linked List.                                | Removed node        |
| Deletion  | `removeFrom` | Removes the node at the "index", or position, specified.                        | Removed node        |
| Search    | `contains`   | Searches the Linked List for a node with the value specified.                   | Boolean             |
| Access    | `get`        | Gets the node at the "index", or position, specified.                           | Node at index       |
| Access    | `set`        | Updates the value of a node at the "index", or position, specified.             | Boolean             |
| Meta      | `size`       | Returns the current size of the Linked List.                                    | Integer             |


## Time and Space Complexity Analysis

Before we begin our analysis, here is a quick summary of the Time and Space
constraints of each Linked List Operation. The complexities below apply to both
Singly and Doubly Linked Lists:

| Data Structure Operation | Time Complexity (Avg) | Time Complexity (Worst) | Space Complexity (Worst) |
| :----------------------: | :-------------------: | :---------------------: | :----------------------: |
| Access                   | `Θ(n)`                | `O(n)`                  | `O(n)`                   |
| Search                   | `Θ(n)`                | `O(n)`                  | `O(n)`                   |
| Insertion                | `Θ(1)`                | `O(1)`                  | `O(n)`                   |
| Deletion                 | `Θ(1)`                | `O(1)`                  | `O(n)`                   |

Before moving forward, see if you can reason to yourself why each operation has
the time and space complexity listed above!

## Time Complexity - Access and Search:

### Scenarios:

1. We have a Linked List, and we'd like to find the 8th item in the list.
2. We have a Linked List of sorted alphabet letters, and we'd like to see if the
   letter "Q" is inside that list.

### Discussion:

Unlike Arrays, Linked Lists Nodes are not stored contiguously in memory, and
thereby do not have an indexed set of memory addresses at which we can quickly
lookup individual nodes in constant time. Instead, we must begin at the head of
the list (or possibly at the tail, if we have a Doubly Linked List), and iterate
through the list until we arrive at the node of interest.

In Scenario 1, we'll know we're there because we've iterated 8 times. In
Scenario 2, we'll know we're there because, while iterating, we've checked each
node's value and found one that matches our target value, "Q".

In the worst case scenario, we may have to traverse the entire Linked List until
we arrive at the final node. This makes both Access & Search **Linear Time**
operations.

## Time Complexity - Insertion and Deletion:

### Scenarios:

1. We have an empty Linked List, and we'd like to insert our first node.
2. We have a Linked List, and we'd like to insert or delete a node at the Head
   or Tail.
3. We have a Linked List, and we'd like to insert or delete a node from
   somewhere in the middle of the list.

### Discussion:

Since we have our Linked List Nodes stored in a non-contiguous manner that
relies on pointers to keep track of where the next and previous nodes live,
Linked Lists liberate us from the linear time nature of Array insertions and
deletions. We no longer have to adjust the position at which each node/element
is stored after making an insertion at a particular position in the list.
Instead, if we want to insert a new node at position `i`, we can simply:

1. Create a new node.
2. Set the new node's `next` and `previous` pointers to the nodes that live at
   positions `i` and `i - 1`, respectively.
3. Adjust the `next` pointer of the node that lives at position `i - 1` to point
   to the new node.
4. Adjust the `previous` pointer of the node that lives at position `i` to point
   to the new node.

And we're done, in Constant Time. No iterating across the entire list necessary.

"But hold on one second," you may be thinking. "In order to insert a new node in
the middle of the list, don't we have to lookup its position? Doesn't that take
linear time?!"

Yes, it is tempting to call insertion or deletion in the middle of a Linked List
a linear time operation since there is lookup involved. However, it's usually
the case that you'll already have a reference to the node where your desired
insertion or deletion will occur.

For this reason, we separate the Access time complexity from the
Insertion/Deletion time complexity, and formally state that Insertion and
Deletion in a Linked List are **Constant Time** across the board.

### NOTE:

Without a reference to the node at which an insertion or deletion will occur,
due to linear time lookup, an insertion or deletion _in the middle_ of a Linked
List will still take Linear Time, sum total.

## Space Complexity:

### Scenarios:

1. We're given a Linked List, and need to operate on it.
2. We've decided to create a new Linked List as part of strategy to solve some
   problem.

### Discussion:

It's obvious that Linked Lists have one node for every one item in the list, and
for that reason we know that Linked Lists take up Linear Space in memory.
However, when asked in an interview setting what the Space Complexity _of your
solution_ to a problem is, it's important to recognize the difference between
the two scenarios above.

In Scenario 1, we _are not_ creating a new Linked List. We simply need to
operate on the one given. Since we are not storing a _new_ node for every node
represented in the Linked List we are provided, our solution is _not
necessarily_ linear in space.

In Scenario 2, we _are_ creating a new Linked List. If the number of nodes we
create is linearly correlated to the size of our input data, we are now
operating in Linear Space.

### NOTE:

Linked Lists can be traversed both iteratively and recursively. _If you choose
to traverse a Linked List recursively_, there will be a recursive function call
added to the call stack for every node in the Linked List. Even if you're
provided the Linked List, as in Scenario 1, you will still use Linear Space in
the call stack, and that counts.

________________________________________________________________________________
# Stacks and Queues

Stacks and Queues aren't really "data structures" by the strict definition of
the term. The more appropriate terminology would be to call them abstract data
types (ADTs), meaning that their definitions are more conceptual and related to
the rules governing their user-facing behaviors rather than their core
implementations.

For the sake of simplicity, we'll refer to them as data structures and ADTs
interchangeably throughout the course, but the distinction is an important one
to be familiar with as you level up as an engineer.

Now that that's out of the way, Stacks and Queues represent a linear collection
of nodes or values. In this way, they are quite similar to the Linked List data
structure we discussed in the previous section. In fact, you can even use a
modified version of a Linked List to implement each of them. (Hint, hint.)

These two ADTs are similar to each other as well, but each obey their own
special rule regarding the order with which Nodes can be added and removed from
the structure.

Since we've covered Linked Lists in great length, these two data structures will
be quick and easy. Let's break them down individually in the next couple of
sections.

## What is a Stack?

Stacks are a Last In First Out (LIFO) data structure. The last Node added to a
stack is always the first Node to be removed, and as a result, the first Node
added is always the last Node removed.

The name Stack actually comes from this characteristic, as it is helpful to
visualize the data structure as a vertical stack of items. Personally, I like to
think of a Stack as a stack of plates, or a stack of sheets of paper. This seems
to make them more approachable, because the analogy relates to something in our
everyday lives.

If you can imagine adding items to, or removing items from, a Stack
of...literally anything...you'll realize that every (sane) person naturally
obeys the LIFO rule.

We add things to the _top_ of a stack. We remove things from the _top_ of a
stack. We never add things to, or remove things from, the _bottom_ of the stack.
That's just crazy.

Note: We can use JavaScript Arrays to implement a basic stack. `Array#push` adds
to the top of the stack and `Array#pop` will remove from the top of the stack.
In the exercise that follows, we'll build our own Stack class from scratch
(without using any arrays). In an interview setting, your evaluator may be okay
with you using an array as a stack.

## What is a Queue?

Queues are a First In First Out (FIFO) data structure. The first Node added to
the queue is always the first Node to be removed.

The name Queue comes from this characteristic, as it is helpful to visualize
this data structure as a horizontal line of items with a beginning and an end.
Personally, I like to think of a Queue as the line one waits on for an amusement
park, at a grocery store checkout, or to see the teller at a bank.

If you can imagine a queue of humans waiting...again, for literally
anything...you'll realize that _most_ people (the civil ones) naturally obey the
FIFO rule.

People add themselves to the _back_ of a queue, wait their turn in line, and
make their way toward the _front_. People exit from the _front_ of a queue, but
only when they have made their way to being first in line.

We never add ourselves to the front of a queue (unless there is no one else in
line), otherwise we would be "cutting" the line, and other humans don't seem to
appreciate that.

Note: We can use JavaScript Arrays to implement a basic queue. `Array#push` adds
to the back (enqueue) and `Array#shift` will remove from the front (dequeue). In
the exercise that follows, we'll build our own Queue class from scratch (without
using any arrays). In an interview setting, your evaluator may be okay with you
using an array as a queue.

## Stack and Queue Properties

Stacks and Queues are so similar in composition that we can discuss their
properties together. They track the following three properties:
<p align="center">
  <b>Stack Properties | Queue Properties:</b>
</p>

  | Stack Property | Description                                           | Queue Property | Description                                           |
  | :------------: | :---------------------------------------------------: | :------------: | :---------------------------------------------------: |
  | `top`          | The first node in the Stack                           | `front`        | The first node in the Queue.                          |
  | ----           | Stacks do not have an equivalent                      | `back`         | The last node in the Queue.                           |
  | `length`       | The number of nodes in the Stack; the Stack's length. | `length`       | The number of nodes in the Queue; the Queue's length. |

  Notice that rather than having a `head` and a `tail` like Linked Lists, Stacks
  have a `top`, and Queues have a `front` and a `back` instead. Stacks don't
  have the equivalent of a `tail` because you only ever push or pop things off the
  top of Stacks.
  These properties are essentially the same; pointers to the end points of the
  respective List ADT where important actions way take place. The differences in
  naming conventions are strictly for human comprehension.

<hr/>

  Similarly to Linked Lists, the values stored inside a Stack or a Queue are
  actually contained within Stack Node and Queue Node instances. Stack, Queue,
  and Singly Linked List Nodes are all identical, but just as a reminder and for
  the sake of completion, these List Nodes track the following two properties:

<p align="center">
  <b>Stack & Queue Node Properties:</b>
</p>

  | Property    | Description                                            |
  | :---------: | :----------------------------------------------------: |
  | `value`     | The actual value this node represents.                 |
  | `next`      | The next node in the Stack (relative to this node).    |


## Stack Methods

In the exercise that follows, we will implement a Stack data structure along
with the following Stack methods:

  | Type      | Name         | Description                                | Returns                        |
  | :-------: | :----------: | :----------------------------------------: | :----------------------------: |
  | Insertion | `push`       | Adds a Node to the top of the Stack.       | Integer - New size of stack    |
  | Deletion  | `pop`        | Removes a Node from the top of the Stack.  | Node removed from top of Stack |
  | Meta      | `size`       | Returns the current size of the Stack.     | Integer                        |

## Queue Methods

In the exercise that follows, we will implement a Queue data structure along
with the following Queue methods:

  | Type      | Name         | Description                                  | Returns                          |
  | :-------: | :----------: | :------------------------------------------: | :------------------------------: |
  | Insertion | `enqueue`    | Adds a Node to the front of the Queue.       | Integer - New size of Queue      |
  | Deletion  | `dequeue`    | Removes a Node from the front of the Queue.  | Node removed from front of Queue |
  | Meta      | `size`       | Returns the current size of the Queue.       | Integer                          |

## Time and Space Complexity Analysis

Before we begin our analysis, here is a quick summary of the Time and Space
constraints of each Stack Operation.

  | Data Structure Operation | Time Complexity (Avg) | Time Complexity (Worst) | Space Complexity (Worst) |
  | :----------------------: | :-------------------: | :---------------------: | :----------------------: |
  | Access                   | `Θ(n)`                | `O(n)`                  | `O(n)`                   |
  | Search                   | `Θ(n)`                | `O(n)`                  | `O(n)`                   |
  | Insertion                | `Θ(1)`                | `O(1)`                  | `O(n)`                   |
  | Deletion                 | `Θ(1)`                | `O(1)`                  | `O(n)`                   |

Before moving forward, see if you can reason to yourself why each operation has
the time and space complexity listed above!

#### Time Complexity - Access and Search:

When the Stack ADT was first conceived, its inventor definitely did not
prioritize searching and accessing individual Nodes or values in the list. The
same idea applies for the Queue ADT. There are certainly better data structures
for speedy search and lookup, and if these operations are a priority for your
use case, it would be best to choose something else!

Search and Access are both linear time operations for Stacks and Queues, and
that shouldn't be too unclear. Both ADTs are nearly identical to Linked Lists in
this way. The only way to find a Node somewhere in the middle of a Stack or a
Queue, is to start at the `top` (or the `back`) and traverse downward (or
forward) toward the `bottom` (or `front`) one node at a time via each Node's
`next` property.

This is a linear time operation, O(n).

#### Time Complexity - Insertion and Deletion:

For Stacks and Queues, insertion and deletion is what it's all about. If there
is one feature a Stack absolutely must have, it's constant time insertion and
removal to and from the `top` of the Stack (FIFO). The same applies for Queues,
but with insertion occurring at the `back` and removal occurring at the `front`
(LIFO).

Think about it. When you add a plate to the top of a stack of plates, do you
have to iterate through all of the other plates first to do so? Of course not.
You simply add your plate to the top of the stack, and that's that. The concept
is the same for removal.

Therefore, Stacks and Queues have constant time Insertion and Deletion via their
`push` and `pop` or `enqueue` and `dequeue` methods, O(1).

#### Space Complexity:

The space complexity of Stacks and Queues is very simple. Whether we are
instantiating a new instance of a Stack or Queue to store a set of data, or we
are using a Stack or Queue as part of a strategy to solve some problem, Stacks
and Queues always store one Node for each value they receive as input.

For this reason, we always consider Stacks and Queues to have a linear space
complexity, O(n).


## When should we use Stacks and Queues?

At this point, we've done a lot of work understanding the ins and outs of Stacks
and Queues, but we still haven't really discussed what we can use them for. The
answer is actually...a lot!

For one, Stacks and Queues can be used as intermediate data structures while
implementing some of the more complicated data structures and methods we'll see
in some of our upcoming sections.

For example, the implementation of the breadth-first Tree traversal algorithm
takes advantage of a Queue instance, and the depth-first Graph traversal
algorithm exploits the benefits of a Stack instance.

Additionally, Stacks and Queues serve as the essential underlying data
structures to a wide variety of applications you use all the time. Just to name
a few:

#### Stacks:

- The Call Stack is a Stack data structure, and is used to manage the order of
  function invocations in your code.
- Browser History is often implemented using a Stack, with one great example
  being the browser history object in the very popular React Router module.
- Undo/Redo functionality in just about any application. For example:
  - When you're coding in your text editor, each of the actions you take on your
    keyboard are recorded by `push`ing that event to a Stack.
  - When you hit [cmd + z] to undo your most recent action, that event is
    `pop`ed off the Stack, because the last event that occured should be the
    first one to be undone (LIFO).
  - When you hit [cmd + y] to redo your most recent action, that event is
    `push`ed back onto the Stack.

#### Queues:

- Printers use a Queue to manage incoming jobs to ensure that documents are
  printed in the order they are received.
- Chat rooms, online video games, and customer service phone lines use a Queue
  to ensure that patrons are served in the order they arrive.
  - In the case of a Chat Room, to be admitted to a size-limited room.
  - In the case of an Online Multi-Player Game, players wait in a lobby until
    there is enough space and it is their turn to be admitted to a game.
  - In the case of a Customer Service Phone Line...you get the point.
- As a more advanced use case, Queues are often used as components or services
  in the system design of a service-oriented architecture. A very popular and
  easy to use example of this is Amazon's Simple Queue Service (SQS), which is a
  part of their Amazon Web Services (AWS) offering.
  - You would add this service to your system between two other services, one
    that is sending information for processing, and one that is receiving
    information to be processed, when the volume of incoming requests is high
    and the integrity of the order with which those requests are processed must
    be maintained.

________________________________________________________________________________
# Linked List Project

This project contains a skeleton for you to implement a linked list. This is a
test-driven project. Run the tests and read the top-most error. If it's not
clear what is failing, open the **test/test.js** file to figure out what the
test is expecting. Make the top-most test pass.

Keep making the top-most test pass until all tests pass.

## Instructions

* Clone the project from
  https://github.com/-starters/data-structures-linked-list-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/linked_list.js` that implements the `Node` and `LinkedList` classes
  to make the tests pass.

________________________________________________________________________________
# Stack Project

This project contains a skeleton for you to implement a stack. This is a
test-driven project. Run the tests and read the top-most error. If it's not
clear what is failing, open the **test/test.js** file to figure out what the
test is expecting. Make the top-most test pass.

Keep making the top-most test pass until all tests pass.

## Instructions

* Clone the project from
  https://github.com/-starters/data-structures-stack-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/stack.js` that implements the `Node` and `Stack` classes
  to make the tests pass.

________________________________________________________________________________
# Queue Project

This project contains a skeleton for you to implement a queue. This is a
test-driven project. Run the tests and read the top-most error. If it's not
clear what is failing, open the **test/test.js** file to figure out what the
test is expecting. Make the top-most test pass.

Keep making the top-most test pass until all tests pass.

## Instructions

* Clone the project from
  https://github.com/-starters/data-structures-queue-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `/test/test.js`. Your job is to write code in
  the `/lib/queue.js` that implements the `Node` and `Queue` classes
  to make the tests pass.

________________________________________________________________________________
# WEEK-07 DAY-5<br>*Heaps* {ignore=true}
________________________________________________________________________________
# Graphs and Heaps Learning Objectives

**The objective of this lesson** is for you to become comfortable with
implementing common data structures. This is important because questions about
data structures are incredibly likely to be interview questions for software
engineers from junior to senior levels. Moreover, understanding how different
data structures work will influence the libraries and frameworks that you choose
when writing software.

When you are done, you will be able to:

1. Explain and implement a Heap.
2. Explain and implement a Graph.table with
implementing common data structures. This is important because questions about
data structures are incredibly likely to be interview questions for software
engineers from junior to senior levels. Moreover, understanding how different
data structures work will influence the libraries and frameworks that you choose
when writing software.

When you are done, you will be able to:

1. Explain and implement a Heap.
2. Explain and implement a Graph.

________________________________________________________________________________
# Introduction to Heaps

Let's explore the **Heap** data structure! In particular, we'll explore **Binary
Heaps**. A binary heap is a type of binary tree. However, a heap is not a binary
*search* tree. A heap is a partially ordered data structure, whereas a BST has
full order. In a heap, the root of the tree will be the maximum (max heap) or
the minimum (min heap). Below is an example of a max heap:

![max_heap](images/max_heap.png)

Notice that the heap above does not follow search tree property where all values
to the left of a node are less and all values to the right are greater or equal.
Instead, the max heap invariant is:

+ given any node, its children must be less than or equal to the node

This constraint makes heaps much more relaxed in structure compared to a search
tree. There is no guaranteed order among "siblings" or "cousins" in a heap. The
relationship only flows down the tree from parent to child. In other words, in a
max heap, a node will be greater than all of it's children, it's grandchildren,
its great-grandchildren, and so on. A consequence of this is the root being the
absolute maximum of the entire tree. We'll be exploring max heaps together, but
these arguments are symmetric for a min heap.

### Complete Trees

We'll eventually implement a max heap together, but first we'll need to take a
quick detour. Our design goal is to implement a data structure with efficient
operations. Since a heap is a type of binary tree, recall the circumstances
where we had a "best case" binary tree. We'll need to ensure our heap has
minimal height, that is, it must be a balanced tree!

Our heap implementation will not only be balanced, but it will also be
**complete**. To clarify, **every complete tree is also a balanced tree**, but
not every balanced tree is also complete. Our definition of a complete tree is:

+ a tree where all levels have the maximal number of nodes, except the bottom
  the level
+ AND the bottom level has all nodes filled as far left as possible

Here are few examples of the definition:

![complete_tree](images/complete_tree.png)

Notice that the tree is on the right fails the second point of our definition
because there is a gap in the last level. Informally, you can think about a
complete tree as packing its nodes as closely together as possible. This line of
thinking will come into play when we code heaps later.


### When to Use Heaps?

Heaps are the most useful when attacking problems that require you to "partially
sort" data. This usually takes form in problems that have us calculate the
largest or smallest n numbers of a collection. For example: What if you were
asked to find the largest 5 numbers in an array in linear time, O(n)? The
fastest sorting algorithms are O(n logn), so none of those algorithms will be
good enough. However, we can use a heap to solve this problem in linear time.

We'll analyze this in depth when we implement a heap in the next section!

One of the most common uses of a binary heap is to implement a "[priority queue]".
We learned before that a queue is a FIFO (First In, First Out) data structure.
With a priority queue, items are removed from the queue based on a priority number.
The priority number is used to place the items into the heap and pull them out
in the correct priority order!

[priority queue]:https://en.wikipedia.org/wiki/Priority_queue

________________________________________________________________________________
## Binary Heap Implementation

Now that we are familiar with the structure of a heap, let's implement one! What
may be surprising is that the usual way to implement a heap is by simply using an
array. That is, we won't need to create a node class with pointers. Instead,
each index of the array will represent a node, with the root being at index 1.
We'll avoid using index 0 of the array so our math works out nicely. From this
point, we'll use the following rules to interpret the array as a heap:

+ index `i` represents a node in the heap
+ the left child of node `i` can be found at index `2 * i`
+ the right child of code `i` can be found at index `2 * i + 1`

In other words, the array `[null, 42, 32, 24, 30, 9, 20, 18, 2, 7]` represents
the heap below. Take a moment to analyze how the array indices work out to
represent left and right children.

![max_heap](https://s3-us-west-1.amazonaws.com/-open-assets/data_structures_algorithms/heaps/images/max_heap.png)

Pretty clever math right? We can also describe the relationship from child to
parent node. Say we are given a node at index `i` in the heap, then it's parent
is found at index `Math.floor(i / 2)`.

It's useful to visualize heap algorithms using the classic image of nodes and
edges, but we'll translate that into array index operations.

### Insert

What's a heap if we can't add data into it? We'll need a `insert` method
that will add a new value into the heap without voiding our heap property. In
our `MaxHeap`, the property states that a node must be greater than its
children.

#### Visualizing our heap as a tree of nodes:
1. We begin an insertion by adding the new node to the bottom leaf level of the
   heap, preferring to place the new node as far left in the level as possible.
   This ensures the tree remains complete.
2. Placing the new node there may momentarily break our heap property, so we
   need to restore it by moving the node up the tree into a legal position.
   Restoring the heap property is a matter of continually swapping the new node
   with it's parent while it's parent contains a smaller value. We refer to this
   process as `siftUp`

#### Translating that into array operations:
1. `push` the new value to the end of the array
2.  continually swap that value toward the front of the array (following our
    child-parent index rules) until heap property is restored

### DeleteMax

This is the "fetch" operation of a heap. Since we maintain heap property
throughout, the root of the heap will always be the maximum value. We want to
delete and return the root, whilst keeping the heap property.

#### Visualizing our heap as a tree of nodes:
1. We begin the deletion by saving a reference to the root value (the max) to
   return later. We then locate the right most node of the bottom level and copy
   it's value into the root of the tree. We easily delete the duplicate node at
   the leaf level. This ensures the tree remains complete.
2. Copying that value into the root may momentarily break our heap property, so
   we need to restore it by moving the node down the tree into a legal position.
   Restoring the heap property is a matter of continually swapping the node with
   the greater of it's two children. We refer to this process as `siftDown`.

#### Translating that into array operations:
1. The root is at index 1, so save it to return later. The right most node of
   the bottom level would just be the very last element of the array. Copy the
   last element into index 1, and pop off the last element (since it now appears
   at the root).
2. Continually swap the new root toward the back of the array (following our
   parent-child index rules) until heap property is restored. A node can have
   two children, so we should always prefer to swap with the greater child.


### Time Complexity Analysis

+ insert: `O(log(n))`
+ deleteMax: `O(log(n))`

Recall that our heap will be a complete/balanced tree. This means it's height is
`log(n)` where `n` is the number of items. Both `insert` and `deleteMax` have a
time complexity of `log(n)` because of `siftUp` and `siftDown` respectively. In
worst case `insert`, we will have to `siftUp` a leaf all the way to the root of
the tree. In the worst case `deleteMax`, we will have to `siftDown` the new root
all the way down to the leaf level. In either case, we'll have to traverse the
full height of the tree, `log(n)`.

#### Array Heapify Analysis

Now that we have established `O(log(n))` for a single insertion, let's analyze
the time complexity for turning an array into a heap (we call this heapify,
coming in the next project :)). The algorithm itself is simple, just perform an
`insert` for every element. Since there are `n` elements and each insert
requires `log(n)` time, our total complexity for heapify is `O(nlog(n))`... Or
is it? There is actually a tighter bound on heapify. The proof requires some
math that you won't find valuable in your job search, but do understand that the
true time complexity of heapify is amortized `O(n)`. Amortized refers to the
fact that our analysis is about performance over many insertions.

### Space Complexity Analysis

+ `O(n)`, since we use a single array to store heap data.heap, let's implement one! What
may be surprising is that the usual way to implement a heap is by simply using an
array. That is, we won't need to create a node class with pointers. Instead,
each index of the array will represent a node, with the root being at index 1.
We'll avoid using index 0 of the array so our math works out nicely. From this
point, we'll use the following rules to interpret the array as a heap:

+ index `i` represents a node in the heap
+ the left child of node `i` can be found at index `2 * i`
+ the right child of code `i` can be found at index `2 * i + 1`

In other words, the array `[null, 42, 32, 24, 30, 9, 20, 18, 2, 7]` represents
the heap below. Take a moment to analyze how the array indices work out to
represent left and right children.

![max_heap](https://s3-us-west-1.amazonaws.com/-open-assets/data_structures_algorithms/heaps/images/max_heap.png)

Pretty clever math right? We can also describe the relationship from child to
parent node. Say we are given a node at index `i` in the heap, then it's parent
is found at index `Math.floor(i / 2)`.

It's useful to visualize heap algorithms using the classic image of nodes and
edges, but we'll translate that into array index operations.

### Insert

What's a heap if we can't add data into it? We'll need a `insert` method
that will add a new value into the heap without voiding our heap property. In
our `MaxHeap`, the property states that a node must be greater than its
children.

#### Visualizing our heap as a tree of nodes:
1. We begin an insertion by adding the new node to the bottom leaf level of the
   heap, preferring to place the new node as far left in the level as possible.
   This ensures the tree remains complete.
2. Placing the new node there may momentarily break our heap property, so we
   need to restore it by moving the node up the tree into a legal position.
   Restoring the heap property is a matter of continually swapping the new node
   with it's parent while it's parent contains a smaller value. We refer to this
   process as `siftUp`

#### Translating that into array operations:
1. `push` the new value to the end of the array
2.  continually swap that value toward the front of the array (following our
    child-parent index rules) until heap property is restored

### DeleteMax

This is the "fetch" operation of a heap. Since we maintain heap property
throughout, the root of the heap will always be the maximum value. We want to
delete and return the root, whilst keeping the heap property.

#### Visualizing our heap as a tree of nodes:
1. We begin the deletion by saving a reference to the root value (the max) to
   return later. We then locate the right most node of the bottom level and copy
   it's value into the root of the tree. We easily delete the duplicate node at
   the leaf level. This ensures the tree remains complete.
2. Copying that value into the root may momentarily break our heap property, so
   we need to restore it by moving the node down the tree into a legal position.
   Restoring the heap property is a matter of continually swapping the node with
   the greater of it's two children. We refer to this process as `siftDown`.

#### Translating that into array operations:
1. The root is at index 1, so save it to return later. The right most node of
   the bottom level would just be the very last element of the array. Copy the
   last element into index 1, and pop off the last element (since it now appears
   at the root).
2. Continually swap the new root toward the back of the array (following our
   parent-child index rules) until heap property is restored. A node can have
   two children, so we should always prefer to swap with the greater child.


### Time Complexity Analysis

+ insert: `O(log(n))`
+ deleteMax: `O(log(n))`

Recall that our heap will be a complete/balanced tree. This means it's height is
`log(n)` where `n` is the number of items. Both `insert` and `deleteMax` have a
time complexity of `log(n)` because of `siftUp` and `siftDown` respectively. In
worst case `insert`, we will have to `siftUp` a leaf all the way to the root of
the tree. In the worst case `deleteMax`, we will have to `siftDown` the new root
all the way down to the leaf level. In either case, we'll have to traverse the
full height of the tree, `log(n)`.

#### Array Heapify Analysis

Now that we have established `O(log(n))` for a single insertion, let's analyze
the time complexity for turning an array into a heap (we call this heapify,
coming in the next project :)). The algorithm itself is simple, just perform an
`insert` for every element. Since there are `n` elements and each insert
requires `log(n)` time, our total complexity for heapify is `O(nlog(n))`... Or
is it? There is actually a tighter bound on heapify. The proof requires some
math that you won't find valuable in your job search, but do understand that the
true time complexity of heapify is amortized `O(n)`. Amortized refers to the
fact that our analysis is about performance over many insertions.

### Space Complexity Analysis

+ `O(n)`, since we use a single array to store heap data.

________________________________________________________________________________
## Heap Sort

We've emphasized heavily that heaps are a *partially ordered* data structure. However, we can still leverage heaps in a sorting algorithm to end up with fully sorted array. The strategy is simple using our previous `MaxHeap` implementation:

1. build the heap: `insert` all elements of the array into a `MaxHeap`
2. construct the sorted list: continue to `deleteMax` until the heap is empty, every deletion will return the next element in decreasing order

The code is straightforward:

```javascript
// assuming our `MaxHeap` from the previous section

function heapSort(array) {
    // Step 1: build the heap
    let heap = new MaxHeap();
    array.forEach(num => heap.insert(num));

    // Step 2: constructed the sorted array
    let sorted = [];
    while (heap.array.length > 1) {
        sorted.push(heap.deleteMax());
    }

    return sorted;
}
```

### Time Complexity Analysis: O(nlog(n))

+ `n` is the size of the input array
+ step-1 requires `O(n)` time as previously discussed
+ step-2's while loop requires `n` steps in isolation and each `deleteMax` will require `log(n)` steps to restore max heap property (due to sifting-down). This means step 2 costs `O(nlog(n))`
+ the total time complexity of the algorithm is `O(n + nlog(n)) = O(nlog(n))`

### Space Complexity Analysis:

So `heapSort` performs as fast as our other efficient sorting algorithms, but how does it fair in space complexity? Our implementation above requires an extra `O(n)` amount of space because the heap is maintained separately from the input array. If we can figure out a way to do all of these heap operations in-place we can get constant `O(1)` space! Let's work on this now.

## In-Place Heap Sort

The in-place algorithm will have the same 2 steps, but it will differ in the implementation details. Since we need to have all operations take place in a single array, we're going to have to denote two regions of the array. That is, we'll need a heap region and a sorted region. We begin by turning the entire region into a heap. Then we continually delete max to get the next element in increasing order. As the heap region shrinks, the sorted region will grow.

### Heapify

Let's focus on designing step-1 as an in-place algorithm. In other words, we'll need to reorder elements of the input array so they follow max heap property. This is usually refered to as `heapify`. Our `heapify` will use much of the same logic as `MaxHeap#siftDown`.

```javascript
// swap the elements at indices i and j of array
function swap(array, i, j) {
    [ array[i], array[j] ] = [ array[j], array[i] ];
}

// sift-down the node at index i until max heap property is restored
// n represents the size of the heap
function heapify(array, n, i) {
    let leftIdx = 2 * i + 1;
    let rightIdx = 2 * i + 2;

    let leftVal = array[leftIdx];
    let rightVal = array[rightIdx];

    if (leftIdx >= n) leftVal = -Infinity;
    if (rightIdx >= n) rightVal = -Infinity;

    if (array[i] > leftVal && array[i] > rightVal) return;

    let swapIdx;
    if (leftVal < rightVal) {
        swapIdx = rightIdx;
    } else {
        swapIdx = leftIdx;
    }
    swap(array, i, swapIdx);
    heapify(array, n, swapIdx);
}
```

We weren't kidding when we said this would be similar to `MaxHeap#siftDown`. If you are not convinced, flip to the previous section and take a look! The few differences we want to emphasize are:

+ Given a node at index `i`, it's left index is `2 * i + 1` and it's right index is `2 * i + 2`
    + Using these as our child index formulas will allow us to avoid using a placeholder element at index 0. The root of the heap will be at index 0.
+ The parameter `n` represents the number of nodes in the heap
    + You may feel that `array.length` also represents the number of nodes in the heap. That is true, but only in step-1. Later we will need to dynamically state the size of the heap. Remember, we are trying to do this without creating any extra arrays. We'll need to separate the heap and sorted regions of the array and `n` will dictate the end of the heap.
+ We created a separate `swap` helper function.
    + Nothing fancy here. Swapping will be valuable in step-2 of the algorithm as well, so we'll want to keep our code DRY (don't repeat yourself).

To correctly convert the input array into a heap, we'll need to call `heapify` on children nodes before their parents. This is easy to do, just call `heapify` on each element right-to-left in the array:

```javascript
function heapSort(array) {
    // heapify the tree from the bottom up
    for (let i = array.length - 1; i >= 0; i--) {
        heapify(array, array.length, i);
    }
    // the entire array is now a heap
    // ...
}
```

Nice! Now the elements of the array have been moved around to obey max heap property.

### Construct the Sorted Array

To put everything together, we'll need to continually "delete max" from our heap. From our previous lecture, we learned the steps for deletion are to swap the last node of the heap into the root and then sift the new root down to restore max heap property. We'll follow the same logic here, except we'll need to account for the sorted region of the array. The array will contain the heap region in the front and the sorted region at the rear:

```javascript
function heapSort(array) {
    // heapify the tree from the bottom up
    for (let i = array.length - 1; i >= 0; i--) {
        heapify(array, array.length, i);
    }
    // the entire array is now a heap

    // until the heap is empty, continue to "delete max"
    for (let endOfHeap = array.length - 1; endOfHeap >= 0; endOfHeap--) {
        // swap the root of the heap with the last element of the heap,
        // this effecively shrinks the heap by one and grows the sorted array by one
        swap(array, endOfHeap, 0);

        // sift down the new root, but not past the end of the heap
        heapify(array, endOfHeap, 0);
    }
    return array;
}
```

You'll definitely want to watch the lecture that follows this reading to get a visual of how the array is divided into the heap and sorted regions.

### In-Place Heap Sort JavaScript Implementation

Here is the full code for your reference:

```javascript
function heapSort(array) {
    for (let i = array.length - 1; i >= 0; i--) {
        heapify(array, array.length, i);
    }

    for (let endOfHeap = array.length - 1; endOfHeap >= 0; endOfHeap--) {
        swap(array, endOfHeap, 0);
        heapify(array, endOfHeap, 0);
    }
    
    return array;
}

function heapify(array, n, i) {
    let leftIdx = 2 * i + 1;
    let rightIdx = 2 * i + 2;

    let leftVal = array[leftIdx];
    let rightVal = array[rightIdx];

    if (leftIdx >= n) leftVal = -Infinity;
    if (rightIdx >= n) rightVal = -Infinity;

    if (array[i] > leftVal && array[i] > rightVal) return;

    let swapIdx;
    if (leftVal < rightVal) {
        swapIdx = rightIdx;
    } else {
        swapIdx = leftIdx;
    }
    swap(array, i, swapIdx);
    heapify(array, n, swapIdx);
}

function swap(array, i, j) {
    [ array[i], array[j] ] = [ array[j], array[i] ];
}
```


________________________________________________________________________________
# Heaps Project

This project contains a skeleton for you to implement a max heap. This is a
test-driven project. Run the tests and read the top-most error. If it's not
clear what is failing, open the **test/test.js** file to figure out what the
test is expecting. Make the top-most test pass.

Keep making the top-most test pass until all tests pass.

## Instructions

* Clone the project from
  https://github.com/-starters/data-structures-max-heap-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `test/test.js`. Your job is to write code in
  * **lib/max_heap.js** to implement the `MaxHeap` class
  * **lib/is_heap.js** to implement the `isMaxHeap` function
  * **lib/leet_code_215.js** to implement the `findKthLargest` function located
    at https://leetcode.com/problems/kth-largest-element-in-an-array/
