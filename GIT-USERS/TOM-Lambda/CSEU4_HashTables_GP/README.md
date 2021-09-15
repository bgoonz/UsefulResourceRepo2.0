# Hash Tables

## The Problem With Arrays

What is the problem we are trying to solve?
- With a list / array it is `O(n)` to linear search and `O(log n)` for a binary search.

```python
arr = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit" ]
#        0         1        2       3      4           5              6          7    
```

- Can we do better?
YES!

lookup with `O(1)` time complexity using a magic function?
- 

## Hash Functions

What is a hash function?
- we can input a string
- it will output a number
- it has to be deterministic



## Map the hash!

The numbers that we have generated could get fairly large and we need a way to turn them in to an index of a list / array.

Think of ways to do this geven a finite size of a list to turn the number in to one clamped to a range


## Summary
Hash Table has mthods / functions to put data in to it and to get data out of it

To Put:
1. Run the key string through a hashing function to get a hash value
2. Mod the hash value with the table size to get the index
3. Store the value at this index

To Get:
1. Run the key string through a hashing function to get a hash value
2. Mod the hash value with the table size to get the index
3. Return the value at this index



## LLC

```
Slot
Index    Chain (LL)
-----    -------------------------------------------
0        -> ({ key: "qux", val: 10 })
1        -> ({ key: "foo", val: 12 }) -> ({ key: "plugh", val: 20 })
2        -> ({ key: "bar", val: 30 }) -> ({ key: "baz", val: 999 }) -> ({ key: "xyzzy", val: 50 })
3        -> None
```

```python

# Put
put("foo", 12) # hash to 1
put("bar", 30) # hash to 2
put("baz", 999) # hashes to 2 (collision!)
put("qux", 10) # hash to 0
put("plugh", 20) # hash to 1 (Collision!)
put("xyzzy", 50) # hash to 2 (Collision!)

# Get
get("foo") # 1 => 12
get("bar") # 2 => 30
get("baz") # 2 C -> move to heads next => 999
```

## Load Factor & Resizing

### The problem with overloaded Hash Tables

Let's go over load factor

- Perfectly Loaded Hash Table
    - Absolutely `O(1)` lookups

```
0 |-> D
1 |-> H
2 |-> A
3 |-> C
4 |-> G
5 |-> B
6 |-> E
7 |-> F
```

- Heavily Loaded Hash Table
    - Getting Worse...

```
0 |-> D -> M
1 |-> H
2 |-> A -> I
3 |-> C -> J -> L -> N
4 |-> G
5 |-> B -> O
6 |-> E -> K -> P
7 |-> F
```

- Degenerately Loaded Hash Table

```
0 |-> D -> M -> Q
1 |-> H -> R -> X -> Y
2 |-> A -> I -> 0
3 |-> C -> J -> L -> N -> Z
4 |-> G -> S -> U
5 |-> B -> O -> 1 -> 2
6 |-> E -> K -> P -> W
7 |-> F -> T -> V
```

### Todays Assignment

- Today you'll be implementing automatic hash table resizing.

- We will not be going over the code in class.

- We're just going to describe the algorithm.

*TODO:* ...

### What is Hash Table Load Factor?

`Number of Elements / Number of Slots (buckets)`

- if Load Factor > 0.7 (70%) then Grow
- if Load Factor < 0.2 (20%) then Shrink

*Example*
```Python
# if we have 32 slots and 23 elements then the algorithm applied will tell us that we have a load factor of 0.72
e = 9
s = 8
lf = e / s
print(lf)
```

### Computing the Hash Table
- run through the whole table counting elements
    - takes too long
- keep terack of total items in the table. as we put or delete them
    - remember that put might not increase the in the case of overwriting a value
        - in that case the total will remain the same

    - with the maitained value we can compute load factor at any time
        - you always know how many slots you have


### Growing the hash table based on load
- each time we put, we should check the load factor to see if it should expand / grow
    - if the load factor is over the max (0.7) it is time to rehash (or resize)

- Process:
    1. make a new hash table area, *double* the size of the previous
        - Why Double?
            - it is a costly operation to do
            - make it infrequent
            - in absence of any other good reason, it kepps the time complexity easy to compute
                - could be any factor
                - doubling is extremely common
    
    2. Go through the old hash table removing elements, and putting the removed elements in to the new hash table
        - How do you iterate through all items in the old hash table?
            - go through each linked list item in each hashtable bucket
                - insert them into the new hash table area
        
        - what is the time complexity?
            - `O(m)` `m` being thwe number of items in the hash table

    3. Forget about the old hash table let the garbage collector clean it up

    ### Shrinking the hash table based on load
    - Each time you delete, you will check the load to see if it should contract (shrink)
        - if the load is under the min (0.2) it is time to *rehash* / resize

    - the same thing as expanding, except we want the new table to have half the capacity of the old

    - for the assignment, we will say that `8` is the minimum size.
        - don't want to kepp dividing the table down to zero

    

## Applications of Hash Tables

### The General Problem Hash Tables Solve

- We have something we need to look up quickly
    - Especialy something that would hinder your applications overall performance

### In Lieu of Linear Search

- Linear Search
    - What if we have 5 elements?
        - pretty much anything will work
    - What if we have 5 trillion elements?
        - Linear Search it is too slow `O(n)`
        - BST not bad at `O(log n)` but we can do better
        - Hash Tables is a winner with a `O(1)` Time Complexity

### Variations

- Can apply to anything where reacquiring information is too time-consuming.
    - Network cache
        - it takes a while to go get a web page (or other data) over the network
        - save it first time in a hashtable keyed by URL
        - Then susiquent `Gets` are quite fast
    - Memoization
        - Slow Recursive functions `O(2^n) or worse *Fib(n)*
        - Store
- Can apply to cases where you have to index a number of records
    - Show me all the people whose age is 30
        - Dave: age of all people with the same age
    -  A search engine with a new indexing algorithm
        - 'max element in the table' for fast lookups. 
- Can apply to cases where you want to remove duplicates
    - since there can only be one key. we can add the same key over and over and there will still be only 1 copy of that key
    - eg: voting App
- Can be used to track counts
    - Key is the `Item` and the value is the `count`

### Challenges / Demos

- *Memoization* 1
    - `Fib(n)` Recursive
        - Why is it slow?
        - Redundant Calculations
        - keep calling `fib(n)`
    
    - any functions whare we keep getting the same data for a particular call
        - for given args, remember the result of the function
        - when we call the function with the same args, just return the previously computed value

- *Lookup Tables* 2
    - Inverse Square Root Lookup Table
    - same concept as memoization
    - can be computed ahead of time
    - or it can be computed as needed

- *Sorting* 3
    - it is common to sort lists
    - what if we want to sort a dictionary?
    - you can sort it by key
    - you could sort it by value
    - you have to turn it in to in to a list of key/value tuples
    - you can use a lambda to specify the values to use for sorting

- *Letter Count* 4
    - Using the letter as a key
    - keep track of the count as we go

- *Indexing* 5
- for a list of employee records, build an index and quickly report all people in a particular dept

- *Transposition Table* 6
    - if you have data in one form but need to transform it in to another
    - along the lins of ROT13 or a caesars cipher
        - Letters are substituted for other letters
        - *Aside*: it is a bad way of trying to make things cryptographically sound
            - it can be broken quickly with *Frequency Analysis*
        