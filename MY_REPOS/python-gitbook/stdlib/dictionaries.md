# Dictionaries

{% file src="../.gitbook/assets/pythondictmethods.pdf" %}

![](../.gitbook/assets/image%20%2828%29.png)

![](../.gitbook/assets/image%20%2823%29.png)

![](../.gitbook/assets/image%20%2825%29.png)



{% embed url="https://gist.github.com/bgoonz/df0237e949950dfd81add75e2b95f60a" %}



### Dictionaries

A dictionary is a collection of unordered, modifiable\(mutable\) paired \(key: value\) data type.

#### Creating a Dictionary

To create a dictionary we use curly brackets, {} or the _dict\(\)_ built-in function.

```python
# syntax
empty_dict = {}
# Dictionary with data values
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
```

**Example:**

```python
person = {
    'first_name':'Asabeneh',
    'last_name':'Yetayeh',
    'age':250,
    'country':'Finland',
    'is_marred':True,
    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
    'address':{
        'street':'Space street',
        'zipcode':'02210'
    }
    }
```

The dictionary above shows that a value could be any data types:string, boolean, list, tuple, set or a dictionary.

#### Dictionary Length

It checks the number of 'key: value' pairs in the dictionary.

```python
# syntax
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
print(len(dct)) # 4
```

**Example:**

```python
person = {
    'first_name':'Asabeneh',
    'last_name':'Yetayeh',
    'age':250,
    'country':'Finland',
    'is_marred':True,
    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
    'address':{
        'street':'Space street',
        'zipcode':'02210'
    }
    }
print(len(person)) # 7
```

#### Accessing Dictionary Items

We can access Dictionary items by referring to its key name.

```python
# syntax
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
print(dct['key1']) # value1
print(dct['key4']) # value4
```

**Example:**

```python
person = {
    'first_name':'Asabeneh',
    'last_name':'Yetayeh',
    'age':250,
    'country':'Finland',
    'is_marred':True,
    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
    'address':{
        'street':'Space street',
        'zipcode':'02210'
    }
    }
print(person['first_name']) # Asabeneh
print(person['country'])    # Finland
print(person['skills'])     # ['JavaScript', 'React', 'Node', 'MongoDB', 'Python']
print(person['skills'][0])  # JavaScript
print(person['address']['street']) # Space street
print(person['city'])       # Error
```

Accessing an item by key name raises an error if the key does not exist. To avoid this error first we have to check if a key exist or we can use the _get_ method. The get method returns None, which is a NoneType object data type, if the key does not exist.

```python
person = {
    'first_name':'Asabeneh',
    'last_name':'Yetayeh',
    'age':250,
    'country':'Finland',
    'is_marred':True,
    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
    'address':{
        'street':'Space street',
        'zipcode':'02210'
    }
    }
print(person.get('first_name')) # Asabeneh
print(person.get('country'))    # Finland
print(person.get('skills')) #['HTML','CSS','JavaScript', 'React', 'Node', 'MongoDB', 'Python']
print(person.get('city'))   # None
```

#### Adding Items to a Dictionary

We can add new key and value pairs to a dictionary

```python
# syntax
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct['key5'] = 'value5'
```

**Example:**

```python
person = {
    'first_name':'Asabeneh',
    'last_name':'Yetayeh',
    'age':250,
    'country':'Finland',
    'is_marred':True,
    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
    'address':{
        'street':'Space street',
        'zipcode':'02210'
        }
}
person['job_title'] = 'Instructor'
person['skills'].append('HTML')
print(person)
```

#### Modifying Items in a Dictionary

We can modify items in a dictionary

```python
# syntax
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct['key1'] = 'value-one'
```

**Example:**

```python
person = {
    'first_name':'Asabeneh',
    'last_name':'Yetayeh',
    'age':250,
    'country':'Finland',
    'is_marred':True,
    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
    'address':{
        'street':'Space street',
        'zipcode':'02210'
    }
    }
person['first_name'] = 'Eyob'
person['age'] = 252
```

#### Checking Keys in a Dictionary

We use the _in_ operator to check if a key exist in a dictionary

```python
# syntax
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
print('key2' in dct) # True
print('key5' in dct) # False
```

#### Removing Key and Value Pairs from a Dictionary

* _pop\(key\)_: removes the item with the specified key name:
* _popitem\(\)_: removes the last item
* _del_: removes an item with specified key name

```python
# syntax
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct.pop('key1') # removes key1 item
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct.popitem() # removes the last item
del dct['key2'] # removes key2 item
```

**Example:**

```python
person = {
    'first_name':'Asabeneh',
    'last_name':'Yetayeh',
    'age':250,
    'country':'Finland',
    'is_marred':True,
    'skills':['JavaScript', 'React', 'Node', 'MongoDB', 'Python'],
    'address':{
        'street':'Space street',
        'zipcode':'02210'
    }
    }
person.pop('first_name')        # Removes the firstname item
person.popitem()                # Removes the address item
del person['is_married']        # Removes the is_married item
```

#### Changing Dictionary to a List of Items

The _items\(\)_ method changes dictionary to a list of tuples.

```python
# syntax
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
print(dct.items()) # dict_items([('key1', 'value1'), ('key2', 'value2'), ('key3', 'value3'), ('key4', 'value4')])
```

#### Clearing a Dictionary

If we don't want the items in a dictionary we can clear them using _clear\(\)_ method

```python
# syntax
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
print(dct.clear()) # None
```

#### Deleting a Dictionary

If we do not use the dictionary we can delete it completely

```python
# syntax
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
del dct
```

#### Copy a Dictionary

We can copy a dictionary using a _copy\(\)_ method. Using copy we can avoid mutation of the original dictionary.

```python
# syntax
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
dct_copy = dct.copy() # {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
```

#### Getting Dictionary Keys as a List

The _keys\(\)_ method gives us all the keys of a a dictionary as a list.

```python
# syntax
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
keys = dct.keys()
print(keys)     # dict_keys(['key1', 'key2', 'key3', 'key4'])
```

#### Getting Dictionary Values as a List

The _values_ method gives us all the values of a a dictionary as a list.

```python
# syntax
dct = {'key1':'value1', 'key2':'value2', 'key3':'value3', 'key4':'value4'}
values = dct.values()
print(values)     # dict_values(['value1', 'value2', 'value3', 'value4'])
```

```python
import itertools

# Given an array of coins and an array of quantities for each coin with the
# same index, determine how many distinct sums can be made from non-zero
# sets of the coins

# Note: This problem took a little more working-through, with a failed brute-
# force attempt that consisted of finding every combination of coins and
# adding them, which failed when I needed to consider >50k coins
# the overall number of coins was guaranteed to be less than about 1 million,
# so the solution appeared to be a form of divide-and-conquer where each
# possible sum for each coin was put into a set at that coin's index in the
# original coins array, and then the sums were repeatedly combined into an
# aggregate set until every coin possible coin value (given by the coins
# array) had been added into the set of sums

# problem considered "hard," asked by Google


def possibleSums(coins, quantity):
    # sum_map = set()
    # start with brute force
    # total_arr = [coins[i] for i, q in enumerate(quantity) for l in range(q)]

    # for i in range(1, len(total_arr)+1):
    #     combos = itertools.combinations(total_arr, i)
    #     print(combos)
    #     for combo in combos:
    #         sum_map.add(sum(combo))

    # return len(sum_map)

    # faster?
    comb_indices = [i for i in range(len(coins))]
    possible_sums = []
    for i, c in enumerate(coins):
        this_set = set()
        for q in range(1, 1 + quantity[i]):
            this_set.add(c * q)
        possible_sums.append(this_set)
    # print(possible_sums)

    while len(possible_sums) > 1:
        possible_sums[0] = combine_sets(possible_sums[0], possible_sums[1])
        possible_sums.pop(1)

    return len(possible_sums[0])


def combine_sets(set1, set2):
    together_set = set()
    for item1 in set1:
        for item2 in set2:
            together_set.add(item1 + item2)
        together_set.add(item1)

    for item2 in set2:
        together_set.add(item2)
    return together_set

```



```python
# need strings[i] = strings[j] for all patterns[i] = patterns[j] to be true -
# give false if strings[i] != strings[j] and patterns[i] = patterns[j] or
# strings[i] = strings[j] and patterns[j] != patterns[j] - this last condition
# threw me for a bit as an edge case! Need to ensure that each string is unique
# to each key, not just that each key corresponds to the given string!

# from a google interview set, apparently
def areFollowingPatterns(strings, patterns):
    pattern_to_string = {}
    string_to_pattern = {}
    for i in range(len(patterns)):
        # first, check condition that strings are equal for patterns[i]=patterns[j]
        this_pattern = patterns[i]
        if patterns[i] in pattern_to_string:
            if strings[i] != pattern_to_string[this_pattern]:
                return False
        else:
            pattern_to_string[this_pattern] = strings[i]

    # now check condition that patterns are equal for strings[i]=strings[j]
    # if there are more keys than values, then there is not 1:1 correspondence
    if len(pattern_to_string.keys()) != len(set(pattern_to_string.values())):
        return False

    return True

```





```python
# gives True if two duplicate numbers in the nums array are within k distance
# (inclusive) of one another, measuring by absolute difference in index

# did relatively well on this one, made a greater-than/less-than flip error on
# the conditional for the true case and needed to rewrite my code to remove
# keys from the dictionary without editing it while looping over it, but
# otherwise went well!

# problem considered medium difficulty, from Palantir


def containsCloseNums(nums, k):
    num_dict = {}
    # setup keys for each number seen, then list their indices
    for i, item in enumerate(nums):
        if item in num_dict:
            num_dict[item].append(i)
        else:
            num_dict[item] = [i]

    # remove all nums that are not repeated
    # first make a set of keys to remove to prevent editing the dictionary size while iterating over it
    removals = set()
    for key in num_dict.keys():
        if len(num_dict[key]) < 2:
            removals.add(key)

    # now remove each key from the num_dict that has fewer than two values
    for key in removals:
        num_dict.pop(key)

    # now check remaining numbers to see if they fall within the desired range
    for key in num_dict.keys():
        last_ind = num_dict[key][0]
        for next_ind in num_dict[key][1:]:
            if next_ind - last_ind <= k:
                return True
            last_ind = next_ind

    return False

```







