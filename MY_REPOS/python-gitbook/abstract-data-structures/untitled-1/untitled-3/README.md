# Sorting

{% embed url="https://replit.com/@bgoonz/python-sorting\#main.py" %}



{% tabs %}
{% tab title="First Tab" %}
```python

This implementation is different than the ones in the referenced books, which are different from each other.
It uses methods and functions that do iteration versus for-loops. Just remember it's still O(n^2).
"""
from collections.abc import MutableSequence

from src.typehints import T


def selection_sort_iter(seq: MutableSequence[T]) -> None:
    """Use selection sort iteratively on a list in-place."""
    for i, val in enumerate(seq):
        min_val = min(seq[i:])
        min_val_i = seq.index(min_val, i)  # First index of min_val at or after i
        seq[i] = min_val
        seq[min_val_i] = val
```
{% endtab %}

{% tab title="Intro Sorting" %}
```python
# insertion sort

my_book = {'title': 'Food for thought', 'author': 'jon jones', 'genre': 'food'}
class Book:
    def __init__(self, title, author, genre):
        self.title = title
        self.author = author
        self.genre = genre

    def __str__(self):
        return f'{self.genre}: {self.title} by {self.author}'

b1 = Book('Food for thought', 'jon jones', 'food')
b2 = Book('My life in reality', 'don davis', 'life')
b3 = Book('Apples, how you like them?', 'stan simpson', 'food')
b4 = Book('Just Do It', 'shia le boeuf', 'inspirational')
b5 = Book('What is this code anyway', 'tom jones', 'programming')

books = [b1, b2, b3, b4, b5]

def in_sort(books):
    # loop through len - 1 elements
    for i in range(1, len(books)):

        # code up some logic
        # save current i to a temp var
        temp = books[i]
        j = i

        while j > 0 and temp.title < books[j - 1].title:
            # shift left until correct tile is found
            books[j] = books[j - 1]
            j -= 1
        # insert book in correct position
        books[j] = temp

    return books

# for b in books:
#     print(b)

# print('---------------------')

# in_sort(books)


# for b in books:
#     print(b)

"""
- **Insertion Sort** is an _in-place_ algorithm, meaning that it 
  does not require any additional memory to perform the sort operation.

- It works by conceptually dividing the array into _sorted_ and _unsorted_ pieces.

    1. Consider element at index 0 to be our  _sorted_ piece. The rest of the array is our _unsorted_ piece.

    2. Save the 1st element in the _unsorted_ piece in a temp variable.

    3. Shift elements in the _sorted_ piece over to the right until we find where the element 
       from step 2 should go.

    4. Insert the element from step 2 into its correct index within the _sorted_ piece.

    5. Repeat steps 2-4 until all elements have been processed.
"""

def in_sort2(lst):
    # loop over n - 1 elements
    for i in range(1, len(lst)):
        # save initial element to temp variable
        temp = lst[i]
        # set inner loop index to current index
        j = i
        # inner loop
        while j > 0 and temp < lst[j - 1]:
            # shift left until correct position found
            lst[j] = lst[j - 1]
            # decrement inner index
            j -= 1
        # insert temp at correct position
        lst[j] = temp
    # return our list
    return lst

my_nums = [23, 34, 60, 1, 4, 5, 2]
my_names = ['Dave', 'Steve', 'Bob']

print(my_nums)

in_sort2(my_nums)

print(my_nums)

print(my_names)

in_sort2(my_names)

print(my_names)

```
{% endtab %}

{% tab title="Quick Sort" %}
```python
"""
- start by choosing a pivot (could be first, last, middle, random etc)
- move all of the elements smaller than the pivot to LHS
- move all of the elements larger than the pivot to RHS
- invoke a recursive call to quick sort on LHS and RHS until base case 
    (a side only contains a single element)

[8, 3, 6, 4, 7, 9, 5, 2, 1]
[1, 2, 3, 4, 5, 6, 7, 8, 9]

pivot = [8] 
[3, 6, 4, 7, 9, 5, 2, 1]
lhs = [3, 6, 4, 7, 5, 2, 1]
rhs = [9]

[lhs call]
pivot [3] 
[6, 4, 7, 5, 2, 1]
lhs = [2, 1]
rhs = [6, 4, 7, 5]

[lhs2 call]
[2] [1]
lhs = [1]
rhs = []

[rhs2 call]
pivot = [6] 
[4, 7, 5]
lhs = [4,5]
rhs = [7]





[pivot call]
[8]

[rhs call]
[9]





"""

def partition(data):
    # make a new empty list for LHS
    lhs = []
    # make a pivot
    pivot = data[0]
    # make a new empty list for RHS
    rhs = []

    # loop over the data 
    for v in data[1:]:
        # if lower than or equal to pivot
        if v <= pivot:
            # append to LHS list
            lhs.append(v)
        # otherwise
        else:
            # append to RHS list
            rhs.append(v)
    
    # return a tuple containing the LHS list, the pivot, and the RHS list
    return lhs, pivot, rhs

def quicksort(data):
    # base case
    # if the data is empty we just return the empty list
    if data == []:
        return data

    # do something with the data
    # partition the data and set it to a tuple of left right and pivot
    left, pivot, right = partition(data)

    # do a recursive call
    # return the quicksort of left + the [pivot] + quick sort of right
    return quicksort(left) + [pivot] + quicksort(right)


lst = [8, 3, 5, 6, 4, 7, 9, 5, 2, 1]


slst = quicksort(lst)
print(lst)
print('-------------------------')
print(slst)
```
{% endtab %}

{% tab title="Quick Sort \(In Place\)" %}
```python

# Divide a problem in to subproblems (of the same type)
# Solve the subproblems
# Combine the results of the subproblems 
# to get the solution to the original problem

def quick_sort(data, low, high):
    # check base case
    # if low is greater than or equal to high
    if low >= high:
        # return the data
        return data
    # otherwise
    else:
        # divide
        pivot_index = low

    # for each element in sub list
    for i in range(low, high):
        # check if data at index is less than data at pivot index
        if data[i] < data[pivot_index]:
            # double swap to move smaller elements to the correct index
            # move current element to right of pivot
            temp = data[pivot_index + 1]
            data[pivot_index + 1] = data[i]
            data[i] = temp
            # swap the pivot with the element to its right
            temp = data[pivot_index]
            data[pivot_index] = data[pivot_index + 1]
            data[pivot_index + 1] = data[i]
            data[i] = temp

    # conqure
    # quick sort the left
    data = quick_sort(data, low, pivot_index)
    # quick sort the right
    data = quick_sort(data, pivot_index + 1, high)

    # return the data
    return data


lst = [8, 5, 6, 4, 3, 7, 9, 2, 1]
print(lst)
quick_sort(lst, 0, 9)
print('--------------------------')
print(lst)
```
{% endtab %}

{% tab title="Quick Sort Books" %}
```python
from book import Book
# Divide a problem in to subproblems (of the same type)
# Solve the subproblems
# Combine the results of the subproblems 
# to get the solution to the original problem

def quick_sort(data, low, high):
    # check base case
    # if low is greater than or equal to high
    if low >= high:
        # return the data
        return data
    # otherwise
    else:
        # divide
        pivot_index = low

    # for each element in sub list
    for i in range(low, high):
        # check if data at index is less than data at pivot index
        if data[i].genre < data[pivot_index].genre:
            # double swap to move smaller elements to the correct index
            # move current element to right of pivot
            temp = data[pivot_index + 1]
            data[pivot_index + 1] = data[i]
            data[i] = temp
            # swap the pivot with the element to its right
            temp = data[pivot_index]
            data[pivot_index] = data[pivot_index + 1]
            data[pivot_index + 1] = data[i]
            data[i] = temp

    # conqure
    # quick sort the left
    data = quick_sort(data, low, pivot_index)
    # quick sort the right
    data = quick_sort(data, pivot_index + 1, high)

    # return the data
    return data

b1 = Book('Food for thought', 'jon jones', 'food')
b2 = Book('My life in reality', 'don davis', 'life')
b3 = Book('Apples, how you like them?', 'stan simpson', 'food')
b4 = Book('Just Do It', 'shia le boeuf', 'inspirational')
b5 = Book('What is this code anyway', 'tom jones', 'programming')

books = [b1, b2, b3, b4, b5]

for b in books:
    print(b)

quick_sort(books, 0, 5)


print('----------------------------------------------------------')
for b in books:
    print(b)

```
{% endtab %}

{% tab title="Quick Sort Copy" %}
```python
# helper function conceptual partitioning
def partition(data):
    # takes in a single list and partitions it in to 3 lists left, pivot, right
    # create 2 empty lists (left, right)
    left = []
    right = []
    # create a pivot list containing the first element of the data
    pivot = data[0]

    # for each value in our data starting at index 1:
    for value in data[1:]:
        # check if value is less than or equal to the pivot
        if value <= pivot:
            # append our value to the left list
            left.append(value)
        # otherwise (the value must be greater than the pivot)
        else:
            # append our value to the right list
            right.append(value)

    # returns the tuple of (left, pivot, right)
    return left, pivot, right

# quick sort that uses the partitioned data
def quicksort(data):
    # base case if the data is an empty list return an empty list
    if data == []:
        return data

    # partition the data in to 3 variables (left, pivot, right)
    left, pivot, right = partition(data)

    # recursive call to quicksort using the left
    # recursive call to quicksort using the right
    # return the concatination quicksort of lhs + pivot + quicksort of rhs
    return quicksort(left) + [pivot] + quicksort(right)

print(quicksort([5, 9, 3, 7, 2, 8, 1, 6]))
```
{% endtab %}
{% endtabs %}





```python
def partition(A, lo, hi):
    pivot = A[lo + (hi - lo) // 2]
    i = lo - 1
    j = hi + 1

    while True:

        i += 1
        while A[i] < pivot:
            i += 1

        j -= 1
        while A[j] > pivot:
            j -= 1

        if i >= j:
            return j
        A[i], A[j] = A[j], A[i]


def quicksort(A, lo, hi):
    if lo < hi:
        p = partition(A, lo, hi)
        quicksort(A, lo, p)
        quicksort(A, p + 1, hi)
    return A


if __name__ == "__main__":
    arr = [8, 3, 5, 1, 7, 2]
    quicksort(arr, 0, len(arr) - 1)
    #  >>> [1, 2, 3, 5, 7, 8]

```

## Bubble Sort

## Script Name

Bubble Sort Algorithm.

### Aim

To write a program for Bubble sort.

### Purpose

To get a understanding about Bubble sort.

### Short description of package/script

* It is a python program of Bubble sort Algorithm.
* It is written in a way that it takes user input.

### Workflow of the Project

* First a function is written to perform Bubble sort.
* Then outside the function user input is taken.

### Detailed explanation of script, if needed

Start with the first element, compare the current element with the next element of the array. If the current element is greater than the next element of the array, swap both of them. If the current element is less than the next element, move to the next element. Keep on comparing the current element with all the elements in the array. The largest element of the array comes to its original position after 1st iteration. Repeat all the steps till the array is sorted.

#### Example

```text
Consider an array a=[5,4,3,2,1]
Iteration 1:-
         |5|4|3|2|1|
          |___________5>4 therefore we swap both of them.
         |4|5|3|2|1|
            |_________5>3 therefore we swap both.
         |4|3|5|2|1|
              |_______5>2 therefore we swap.
         |4|3|2|5|1|
                |_____5>1 therefore we swap.
         |4|3|2|1|5| Now 5 is placed at its original position

Iteration 2:-
         |4|3|2|1|5|
          |__________4>3 therefore we swap both.
         |3|4|2|1|5|
            |________4>2 therefore we swap both.
         |3|2|4|1|5|
              |______4>1 therefore we swap both.
         |3|2|1|4|5|
                 |__ 4 is placed at its original position.

Iteration 3:-
         |3|2|1|4|5|
          |_________3>2 we swap.
         |2|3|1|4|5|
            |_______3>1 we swap.
         |2|1|3|4|5|- 3 is placed at original position.

Iteration 4:-
          |2|1|3|4|5|
           |_________2>1 we swap.
          |1|2|3|4|5| the array is sorted.
```

### Setup instructions

Just clone the repository .

### Output



```python
#Link to problem:- 
#Bubble sort is a sorting algorithm. Sorting algorithms are used to arrange the array in particular order.In,Bubble sort larger elements are pushed at the end of array in each iteration.It works by repeatedly swapping the adjacent elements if they are in wrong order.

def bubbleSort(a): 
    n = len(a) 
    # Traverse through all array elements 

    for i in range(n-1): 
        # Last i elements are already in place 
        for j in range(0, n-i-1): 

            # traverse the array from 0 to n-i-1 
            # Swap if the element found is greater 
            # than the next element 
            if arr[j] > arr[j + 1] : 
                arr[j], arr[j + 1] = arr[j + 1], arr[j] 

arr = []
n=int(input("Enter size of array: "))
for i in range(n):
    e=int(input())
    arr.append(e)
bubbleSort(arr)
print ("Sorted array is:")
for i in range(len(arr)):
     print(arr[i])
     
#Time complexity - O(n^2)
#Space complexity - O(1)
```











Insertion Sort

```python
# Insertion Sort

## Aim

The main aim of the script is to sort numbers in list using insertion sort.

## Purpose

The main purpose is to sort list of any numbers in O(n) or O(n^2) time complexity.

## Short description of package/script

Takes in an array. <br>
Sorts the array and prints sorted array along with the number of swaps and comparisions made.
Insertion sort is a simple sorting algorithm that works similar to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part. Values from the unsorted part are picked and placed at the correct position in the sorted part.

## Detailed explanation of script, if needed

To sort an array of size n in ascending order: <br>
1: Iterate from a[1] to a[n] over the array. <br>
2: Compare the current element (val) to its predecessor. <br>
3: If the val is smaller than its predecessor, compare it to the elements before. Move the greater elements one position up to make space for the swapped element. <br>

## Setup instructions

Download code and run it in any python editor. Latest version is always better.

## Compilation Steps

1.Edit array a and enter your array/list you want to sort. 2. Run the code

## Sample Test Cases

### Test case 1:

input:<br>
a = [34,5,77,33] <br>

output :<br>

5, 33, 34, 77 along with <br>
no. of swaps = 3 <br>
no. of comparisons=5<br>

### Test case 2

input<br>
a=[90,8,11,3,2000,700,478] <br>

Output:<br>

No. of swaps= 8 <br>
No. of comparisions=12 <br>
Sorted Array is: <br>
3 8 11 90 478 700 2000<br>

### Test case 3

input<br>
a=[0,33,7000,344,-88,2000]<br>

output:<br>

No. of swaps= 6<br>
No. of comparisions=10<br>
Sorted Array is:<br>
-88 0 33 344 2000 7000<br>

## Output

<img width = 221 height = 27 src="../Insertion Sort/Images/input.png">
<img width = 385 height = 188 src="../Insertion Sort/Images/sort_output1.png">




```

## Divide and Conquer

{% hint style="info" %}
When would we use recursive solutions? Tree traversals and quick sort are instances where recursion creates an elegant solution that wouldn't be as possible iteratively.
{% endhint %}

Divide and conquer is when we take a problem, split it into the same type of sub-problem, and run the algorithm on those sub-problems.

If we have an algorithm that runs on a list, we could break the list into smaller lists and run the algorithm on those smaller lists. We will _divide_ the data into more manageable pieces.

We break down our algorithm problems into `base cases` -- the smallest possible size of data we can run our algorithm upon to determine the basic way our algorithm should work.

These solutions can give us better time complexity solutions; however, they wouldn't work if a portion of the algorithm's data is _dependent_ upon the rest. If we broke the list into two halves, and one half is required to work on the other half, we could not use recursion.

Recursion requires independent sub-data.

Let's apply recursion to breaking down what a list is. The sum of a list is equal to the first element plus the rest of the list. We could write that like in this `add_list` function found in [this file](day2_work.py):

```python
def add_list(l):
    # The sum of an empty list is 0
    if l == []:
        return 0

    return l[0] + add_list(l[1:])


l = [1,2,3,4]

print(add_list(l)) # Should print 10
```

This should print 10, or the sum of the items in our list.

On each pass, the `add_list` function is taking the first item and adding the sum of the rest of the list, found by calling `add_list` on the remainder of the list. This would loop through the rest of the list in this manner, only adding together the elements once the final element was reached.

Finding a sum like this is not the most time efficient -- it would be better to do iteratively. But this allows us to understand how recursion works.

Often, iterative solutions are easier to read and more performant.

If we add a print statement into the `add_list` function:

```text
    print(f'Add {l[0]} to the sum of {l[1:]}')
    return l[0] + add_list(l[1:])
```

The terminal would print:

> Add 1 to the sum of \[2, 3, 4\]  
> Add 2 to the sum of \[3, 4\]  
> Add 3 to the sum of \[4\]  
> Add 4 to the sum of \[\]  
> 10

This helps us understand what is happening at each recursive step.

Our base case is an empty list or 0, which is what we handle at the beginning of our function with returning 0 if the list is empty. By filling that in, it gives us our first return, so that each previous `add_list` call can be resolved based on the sum of the next.

When we use recursion, it uses a lot of memory, so each recursive calls allocates an amount of memory. We have a pre-set recursion limit in case we write an infinitely recursive algorithm to prevent our computer needing to reboot to end the algorithm.

With Big O, we're interested in the number of times we have to run an operation. `add_list` just runs basic addition, which is a single operation, and it is being called one time for every element in the list, so this is `O(n)`.

## Quick Sort

Quick sort is a great example use case of a recursive appropriate solution.

We need to include a base case and then call itself.

Quick sort sorts a list using `partitioning`. The partitioning process involves splitting up data around the `pivot`.

If our list is `[5, 3, 9, 4, 8, 1, 7]`.

We'll choose a pivot point to split the list. Let's say we choose 5 as the pivot. One list will contain all the numbers less than 5, and the other will contain all the numbers greater than or equal to 5. This results in two lists like so:

> \[3, 4, 1\] 5 \[9, 8, 7\]

5 is already sorted into the correct place that it needs to be. All the numbers to the right and left of it are in the area they need to, just not yet sorted.

This process is partitioning.

Our next step is to repeat this process until we hit our base case, which is an empty list or a list with just one element. When everything is down to one element lists, then we know they are properly sorted.

> 3 and 9 are our next pivots:  
> \[1\] 3 \[4\] 5 \[8, 7\] 9  
> Next, 8 is our pivot:  
> \[1\] 3 \[4\] 5 \[7\] 8 \[\] 9  
> 1 3 4 5 7 8 9

The number of sorted items doubles with each pass through this algorithm, and we have to make one complete pass through the data on each loop. That means each pass is O\(n\), and we have to make `log n` passes.

It takes `O(log n)` steps to pass through, with each pass taking `O(n)`, so the _average_ case is `O(n log n)`, the fastest search we can aim for.

What would be a bad case for quick sort?

\[1, 2, 3, 4, 5, 6, 7\]

If we look at the order of this on each loop:

> \[\] 1 \[2, 3, 4, 5, 6, 7\]  
> 1 \[\] 2 \[3, 4, 5, 6, 7\]  
> 1 2 \[\] 3 \[4, 5, 6, 7\]  
> 1 2 3 \[\] 4 \[5, 6, 7\]  
> 1 2 3 4 \[\] 5 \[6, 7\]  
> 1 2 3 4 5 \[\] 6 \[7\]  
> 1 2 3 4 5 6 7

This took a full 7 passes, for 7 elements, because there was only one sorted item being added with each pass.

Already sorted lists are the worst case scenario which results in an order `O(n^2)`.

Quick sort shines when the first pivot chosen is roughly the median value of the list. Now, since we can't always choose the median value with the traditional quick sort.

We could use `quick select` to find the median at each step -- but this slows down our algorithm to `O(n)` run time on average.

If we choose a _random_ pivot point, we generally do not pick the worst case pivot with each pass. Randomly selecting a pivot point results in the most time efficient average.

## Implementing Quick Sort

If we were to write out our quick sort algorithm in a basic way, it would look something like this:

```python
def quicksort(list):
    # One of our base cases is an empty list or list with one element
    if len(list) == 0 or len(list) == 1:
        return list

    # If we have a left list, a pivot point and a right list...
    left, pivot, right = partition(list)

    # Our sorted list looks like left + pivot + right, but sorted.
    # Pivot has to be in brackets to be a list, so python can concatenate all the elements to a single list
    return quicksort(left) + [pivot] + quicksort(right)
```

Let's define our partition function next:

```python
def partition(list):
    left = []
    pivot = list[0] # Or make random, as a stretch
    right = []

    for v in list[1:]:
        if v < pivot:
            left.append(v)
        else:
            right.append(v)

    return left, pivot, right
```

Let's test out a bunch of possible cases like so:

```python
print(quicksort([]))
print(quicksort([1]))
print(quicksort([1,2]))
print(quicksort([2,1]))
print(quicksort([2,2]))
print(quicksort([5,3,9,4,8,1,7]))
print(quicksort([1,2,3,4,5,6,7]))
print(quicksort([9,8,7,6,5,4,3,2,1]))
```

We already know off the tops of our heads that we have not setup our algorithm to handle edge cases like an input that is not a list, or is a list full of strings, etc.

Our terminal returns back:

```text
[]
[1]
[1, 2]
[1, 2]
[2, 2]
[1, 3, 4, 5, 7, 8, 9]
[1, 2, 3, 4, 5, 6, 7]
[1, 2, 3, 4, 5, 6, 7, 8, 9]
```

So we can see that it handles all of our tests well.

It's important to analyze what you know about your incoming data before choosing a type of algorithm. If you know that your list is almost completely sorted, bubble sort would handle that the quickest. If the list is completely garbled, quick sort would be best.

Even when we aren't handling sort, we need to customize our algorithmic choices to the data anticipated, _especially_ when dealing with large sets of data where time performance can have a huge impact.

## In Place Sorting

The quick sort function we wrote is not an in-place solution. When we sort that list, we're actually returning an entirely _new_ list. It's not returning the same list.

This isn't time or space efficient because it takes time and data to copy lists over to newly allocated spots in memory. It would be more efficient to move items around within the original given list.

This is `in-place sorting` -- using the original list to sort items within it and returning that same original list, but now sorted. We mutate the original list rather than making new lists.

To do in-place sorting, we need to be able to pass into the function the bounds of the current part of the list that we're working on, to ensure that we are only working on certain segments of the list at a time.

We can give it a low index, and a high index, to indicate the start and stop points of the section of the list to work on.

As we keep going, the low and high indices will change. Our base case should now change to where if the low and high are the _same_, then our list is sorted.

Let's try it:

```python
def quicksort2(l, low, high):
    if len(l) == 0 or len(l) == 1:
        return l

    if low >= high:
        return l

    pivot_index = low

    # Partitioning
    for i in range(low, high):

        if l[i] < l[pivot_index]:
            # If i is less than pivot, we need to swap it with the item after the pivot
            l[i], l[pivot_index + 1] = l[pivot_index + 1], l[i]

            # Then we'll swap the pivot with the item after the pivot
            l[pivot_index], l[pivot_index + 1] = l[pivot_index + 1], l[pivot_index]

            # Update the pivot index:
            pivot_index += 1

    # Sort from low to the pivot index
    quicksort2(l, low, pivot_index)
    # Sort from the pivot index to high
    quicksort2(l, pivot_index + 1, high)
```

We're iterating through the list and checking if the item at `list[i]` is less than the item at `list[pivot_index]`. If it is, then we need to swap these items.

That has to happen in two steps. First we swap i with an item one _beyond_ the pivot index. Then we swap the pivot with the item after the pivot.

Then we update the pivot index to search for the next item to sort in the array.

In order to call this function without passing in three parameters, we can write a short helper function:

```python
def in_place_quicksort(l):
    return quicksort2(l, 0, len(l))

print(in_place_quicksort([]))
print(in_place_quicksort([1]))
print(in_place_quicksort([1,2]))
print(in_place_quicksort([2,1]))
print(in_place_quicksort([2,2]))
print(in_place_quicksort([5,3,9,4,8,1,7]))
print(in_place_quicksort([1,2,3,4,5,6,7]))
print(in_place_quicksort([9,8,7,6,5,4,3,2,1]))
```

Now we can run this function and it sorts our lists without allocating extra memory.

Let's add some print statements just to see exactly what is happening at each step on one of the sorts:

```python
Our starting list is [5,3,9,4,8]. 

Checking against 5. Current list is [5, 3, 9, 4]. 

Checking against 3. Current list is [5, 3, 9, 4]. 

3 is less than 5, so we need to swap l[i] (3) with l[pivot_index + 1] (3).
Next, we will swap 5 with 3 and increase the pivot index from 0 to 1.
Now the current list is [3, 5, 9, 4] 

Checking against 9. Current list is [3, 5, 9, 4]. 

Checking against 4. Current list is [3, 5, 9, 4]. 

4 is less than 5, so we need to swap l[i] (4) with l[pivot_index + 1] (9).
Next, we will swap 5 with 4 and increase the pivot index from 1 to 2.
Now the current list is [3, 4, 5, 9] 


Splitting list to check quicksort([3, 4, 5, 9], 0, 2) and quicksort([3, 4, 5, 9], 3, 4). 


Checking against 3. Current list is [3, 4, 5, 9]. 

Checking against 4. Current list is [3, 4, 5, 9]. 



Splitting list to check quicksort([3, 4, 5, 9], 0, 0) and quicksort([3, 4, 5, 9], 1, 2). 

Checking against 4. Current list is [3, 4, 5, 9]. 



Splitting list to check quicksort([3, 4, 5, 9], 1, 1) and quicksort([3, 4, 5, 9], 2, 2). 

Checking against 9. Current list is [3, 4, 5, 9]. 



Splitting list to check quicksort([3, 4, 5, 9], 3, 3) and quicksort([3, 4, 5, 9], 4, 4). 

Our final sorted list is [3, 4, 5, 9]
```

This helps us visualize why we go through each swapping step and how the list is slowly being sorted, and split apart into smaller sorting lists.

{% page-ref page="../array/" %}

{% page-ref page="../tree/binary-search-tree/" %}

{% page-ref page="../untitled-4/" %}

{% page-ref page="../array/extra-array.md" %}

{% page-ref page="../stack/" %}

{% page-ref page="../tree/binary-tree/" %}

{% page-ref page="../untitled-6/" %}

{% page-ref page="../untitled-5/" %}

{% page-ref page="../untitled-2/" %}

{% page-ref page="./" %}

{% page-ref page="../queue/queue-sandbox.md" %}

{% page-ref page="../untitled-5/" %}

{% page-ref page="../untitled-4/double-linked-list.md" %}

{% page-ref page="../untitled-1/" %}

{% page-ref page="../untitled/" %}

{% page-ref page="../heap/" %}



