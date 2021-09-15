# List of common complexities

In computer science, the performance of program is determined by total time and space taken to execute the program with respect to input.

Commonly used asymptotic notations for time and space complexity are below

1. Omega notation (Best Case)
2. Theta notation (Average Case)
3. Oh notation (Worst Case)

We mostly consider Oh notation because it will give the execution time in the worst case.

### Common Big O's

Let say if the input is N = 10 then the time taken by common asymptotic notations can be viewed from below table.

| Name         | Notation   | Time    |
| ------------ | ---------- | ------- |
| Constant     | O(1)       | 1       |
| Logarithmic  | O(log N)   | 3.3219  |
| Linear       | O(N)       | 10      |
| Linearithmic | O(N log N) | 33.219  |
| Polynomial   | O(N^2)     | 100     |
| Exponential  | O(2^N)     | 1024    |
| Factorial    | O(N!)      | 3628800 |

![Big O Graph](https://i.stack.imgur.com/WcBRI.png)

### O(n) Linear Time

An algorithm is said to run in linear time if its time execution is directly proportional to the input size, i.e. time grows linearly as input size increases.

Consider the following examples, below I am linearly searching for an element, this has a time complexity of O(n).

```c
int find = 66;
var numbers = new int[] { 33, 435, 36, 37, 43, 45, 66, 656, 2232 };
for (int i = 0; i < numbers.Length - 1; i++)
{
    if(find == numbers[i])
    {
        return;
    }
}
```

### O(log n) Logarithmic Time:

An algorithm is said to run in logarithmic time if its time execution is proportional to the logarithm of the input size. Binary search and all the operations of binary search tree have logarithmic time complexity has we discard half of the data on every iteration.

### O(n2) Quadratic Time

An algorithm is said to run in quadratic time if its time execution is proportional to the square of the input size.
