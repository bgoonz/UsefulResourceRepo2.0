Let's try our hand at a very famous computing problem with lots of real-world variants and applications - ***the knapsack problem***.

The idea is that we have a backpack with a size or weight limit that constrains how many things we can put inside. We have lots of items we want to put into the knapsack. However, they won't all fit. Choosing the optimal combination of items that meets size or weight constraints while maximizing value might seem doable with a small example, but this becomes a difficult problem very quickly.

![small-knapsack-example](https://upload.wikimedia.org/wikipedia/commons/f/fd/Knapsack.svg)  
[Image author information](https://commons.wikimedia.org/wiki/File:Knapsack.svg)  

Let's start with a relatively simple approach. What would an algorithm look like that selected the most valuable, available items and put them into the knapsack until there was no more room?

**Naive**  
This is one example of a naive approach. It's simple. It gets us _a_ solution (although not the _best_ solution). This is a great place to start with any algorithm you are trying to solve. Oftentimes, writing out a naive approach will give you other ideas about how to approach the problem and can be the first step towards an optimal solution 

```python
def naive_fill_knapsack(sack, items):
    '''# Put highest value items in knapsack until full
    (other basic, naive approaches exist)
    '''
    # sort items by value
    items.sort(key=lambda x: x.value, reverse=True)

    sack = []
    weight = 0
    # put most valuable items in knapsack until full
    for i in items:
        weight += i.weight
        if weight > 50:
            return sack
        else:
            sack.append(i)
    
    return sack
```
What would happen if we tried out every possible solution to guarantee we find the _best_ solution?

**Brute-force**  

```python
def brute_force_fill_knapsack(sack, items):
    ''' Try every combination to find the best'''

    # generate all possible combinations of items
    combos = [] 
    sack = []
    for i in range(1, len(items)+1):
        list_of_combos = list(combinations(items, i))
        for combo in list_of_combos:
            combos.append(list(combo))
    
    best_value = -1
    # calculate the value of all combinations
    for c in combos:
        value = 0
        weight = 0
        for item in c:
            value += item.value
            weight += item.weight
        # find the combo with the highest value
        if weight <= 50 and value > best_value:
            best_value = value
            sack = c
    return sack
```

Brute force, sometimes referred to as "guess and check", _does_ work. However, as the number of items we have to chose from increases, the number of possible combinations we'd have to try to _guarantee_ we select the best combination increaes at a rate of `(n!)`. This is very fast. Trying out all possible combinations, while maybe a very intuitive approach, is NOT very scalable. 

**Greedy**  

A greedy approach is typically a little smarter than a naive approach and a little faster than a brute-force approach. It does NOT guarantee an optimal solution, but can often get pretty close.

With the knapsack problem, one example of a greedy approach is to use the ratio of an item's `size` : `value` to determine if it is a good thing to add to our bag. When the `size` is low and `value` is high, an item will add a lot of value without taking up much space. These are the items we want to add first. Items that use up space less efficiently are added later.

```python
def greedy_fill_knapsack(sack, items):
    '''Use ratio of [value] / [weight] 
    to choose items for knapsack
    '''

    # calculate efficiencies
    for i in items:
        i.efficiency = i.value/i.weight

    # sort items by efficiency
    items.sort(key=lambda x: x.efficiency, reverse=True)

    # put items in knapsack until full
    sack = []
    weight = 0
    for i in items:
        weight += i.weight
        if weight > 50:
            return sack
        else:
            sack.append(i)
    
    return sack
```