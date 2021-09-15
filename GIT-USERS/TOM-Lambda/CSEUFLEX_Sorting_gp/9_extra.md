# Think about pythons built in sorting method

There can actually be some performance gains achieved when you _combine_ multiple sorting algorithms. For example, the built-in `sort()` functions for many programming languages actually use an approach like this. For example, Python's `sort()` algorithm, _Timsort_, is a combination of **Insertion Sort** and **Merge Sort**

**Question:**  
Why do you think **Timsort** uses **Merge Sort** over **Quick Sort**?

We can see some improved performance when sorting our books by combining **Quick Sort** and **Insertion Sort**

##### Approach

1. **Quick Sort** is typically better on large data sets, so use **Quick Sort** while the subset of books we are trying to sort is still pretty big (greater than 63 works well).
2. **Insertion Sort** is fast when data sets are small, so use **Insertion Sort** after we have a partition that is 63 elements or less.


```python
# Book Sort
def book_sort(books):
    # Quick Sort
    stack = []
    left = []
    right = []
    # use first element as pivot
    stack.insert(0, books)
    books = []
    # partition
    while len(stack) > 0:
        current = stack.pop(0)
        # Quick Sort (base case)
        if isinstance(current, object):
            books.insert(0, current)

        # Insertion Sort once the subset is less than 64 elements
        elif(len(current) < 64):
            # base case
            current = insertion_sort(books)
            books.insert(0, current)

        elif current != None:
            pivot = current.pop(0)
            print(len(current))
            while len(current) > 0:
                if current[0].genre < pivot.genre:
                    # move to LHS 
                    left.append(current.pop(0))
                elif current[0].genre > pivot.genre:
                    # move to RHS
                    right.append(current.pop(0))
                else:
                    if current[0].author < pivot.author:
                        # move to LHS 
                        left.append(current.pop(0))
                    elif current[0].author > pivot.author:
                        # move to RHS
                        right.append(current.pop(0))
                    else:
                        if current[0].title < pivot.title:
                            # move to LHS 
                            left.append(current.pop(0))
                        else:
                            # move to RHS
                            right.append(current.pop(0))

            # Quick Sort LHS, RHS
            if len(right) > 0:
                stack.insert(0, right)
            stack.insert(0, pivot)
            if len(left) > 0:
                stack.insert(0, left)
            print("*"+str(len(current)))

    return books
```