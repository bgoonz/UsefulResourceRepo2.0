# Graph Project

This project contains a skeleton for you to implement some graph functionality.
This is a test-driven project. Run the tests and read the top-most error. If
it's not clear what is failing, open the **test/test.js** file to figure out
what the test is expecting. Make the top-most test pass.

Keep making the top-most test pass until all tests pass.

After the instructions, there is an in-depth explanation of the "friends of"
problem.

## Instructions

* Clone the project from
  https://github.com/appacademy-starters/data-structures-graph-starter.
* `cd` into the project folder
* `npm install` to install dependencies in the project root directory
* `npm test` to run the specs
* You can view the test cases in `test/test.js`. Your job is to write code in
  * **lib/breadth_first_search.js** to implement the `breadthFirstSearch`
    function for graphs
  * **lib/max_value.js** to implement the `maxValue` function for graphs
  * **lib/num_regions.js** to implement the `numRegions` function for graphs
  * **lib/friends-of.js** to implement `friendsOf` and `friendsOfRecursion` to
    find connected nodes in a graph less than or equal to a specified distance
    away from the start node (please see the explanation after these
    instructions)
  * **lib/leet_code_207.js** to implement the `canFinish` function located
    at https://leetcode.com/problems/course-schedule/


## Friends of

The set of tests in **test/friends-of-spec.js** asks you to write a function
named `friendsOf` that finds the total set of friends a specified distance away
from a person. It will take as parameters

1. The adjacency list (which will always be an object with keys that always have
   arrays as values)
2. The name of the person whose friends you need to return
3. The distance away from the person that you'll use to collect the friends
   (this value will always be greater than or equal to 1)

The following table interprets the distance parameter:

| Distance | Meaning                                                                      |
|:--------:|------------------------------------------------------------------------------|
|    1     | Immediate friends                                                            |
|    2     | Immediate friends and friends of friends                                     |
|    3     | Immediate friends, friends of friends, and the friends of friends of friends |
|    n     | All the people accessible _n_ steps away from the indicated person           |

For example, say you had the following dependency graph.

```js
const graph = {
  'carrie':  ['humza', 'jun'],
  'farrah':  ['humza'],
  'humza':   ['carrie', 'farrah', 'jun', 'silla'],
  'jun':     ['carrie', 'silla'],
  'ophelia': ['travis'],
  'silla':   ['humza', 'yervand'],
  'travis':  ['ophelia'],
  'yervand': ['silla'],
};
```

Then, the following table shows the expected results for the person **jun** at
different distances.

| Distance | List of people returned by `friendsOf` |
|:--------:|----------------------------------------|
|    1     | carrie and silla                       |
|    2     | carrie, silla, humza, yervand          |
|    3     | carrie, silla, humza, yervand, farrah  |
|    4     | carrie, silla, humza, yervand, farrah  |

At distance 1, your traversal algorithm will find the friends of **jun**, carrie
and silla and return them.

At distance 2, your traversal algorithm will find carrie and silla, then find
their friends, humza and jun for carrie, and humza and yervand for silla. But,
jun is the person that you started with, so you don't include them in the return
value. Humza is both carrie's _and_ silla's friend, but you only include that
name once.

At a distance 3, you find carrie and silla, then humza and yervand. Then,
looking at humza's friends, you see that humza knows carrie, farrah, hun, and
silla. Only farrah is new, so that name will end up in the return value. When
your traversal looks at yervand, it sees that silla is that person's friend, but
is not a new value and does not end up getting added again to the return value.

At a distance four, you find carrie and silla, then humza and yervand, then
farrah. From there, you look at farrah's friends which is just humza. You
already have that name, so it doesn't get duplicated in the return value.

All distances 3 and greater will return the same list because you've exhausted
all of the distinct names of people. You've captured the entire circle of
friends.

The order in which you return the names is not important.

The tests also define edge cases that you also have to handle that are not in
this explanation.
