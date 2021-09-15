# Hash Table

```python
"""
Hashtables (associative arrays)
"""


# linear probing
class HashTable(object):

    def __init__(self):
        self.size = 10
        self.keys = [None] * self.size
        self.values = [None] * self.size

    def put(self, key, data):

        index = self.hashfunction(key)

        # not None -> it is a collision !!!
        while self.keys[index] is not None:
            if self.keys[index] == key:
                self.values[index] = data  # update
                return

            # rehash try to find another slot
            index = (index + 1) % self.size

        # insert
        self.keys[index] = key
        self.values[index] = data

    def get(self, key):

        index = self.hashfunction(key)

        while self.keys[index] is not None:
            if self.keys[index] == key:
                return self.values[index]

            index = (index + 1) % self.size

        # it means the key is not present in the associative array
        return None

    def hashfunction(self, key):
        sum = 0
        for pos in range(len(key)):
            sum = sum + ord(key[pos])

        return sum % self.size

table = HashTable()

table.put("apple", 10)
table.put("orange", 20)
table.put("car", 30)
table.put("table", 40)

print(table.get("car"))

```

## Hash Table

* Describe an implementation of a least-used cache, and big-O notation of it.
* A question involving an API's integration with hash map where the buckets of hash map are made up of linked lists.
* Implement data structure `Map` storing pairs of integers \(key, value\) and define following member functions in O\(1\) runtime: `void insert(key, value)`, `void delete(key)`, `int get(key)`, `int getRandomKey()`.

{% embed url="https://gist.github.com/bgoonz/4089b60131f0679eb0c16c831e623811" %}



```python
"""Write a HashTable class that stores strings
in a hash table, where keys are calculated
using the first two letters of the string."""

class HashTable(object):
    def __init__(self):
        self.table = [None]*10000

    def store(self, string):
        """Input a string that's stored in
        the table."""
        index = self.calculate_hash_value(string)
        if(self.lookup(string)==-1):
            self.table[index] = [string]
        else:
            self.table[index].append(string)
        pass

    def lookup(self, string):
        """Return the hash value if the
        string is already in the table.
        Return -1 otherwise."""
        index = self.calculate_hash_value(string)
        if(self.table[index]!=None):
            return index
        else:
            return -1

    def calculate_hash_value(self, string):
        """Helper function to calulate a
        hash value from a string."""
        hash_val = ord(string[0])*100+ord(string[1])
        return hash_val

# Setup
hash_table = HashTable()

# Test calculate_hash_value
# Should be 8568
print hash_table.calculate_hash_value('UDACITY')

# Test lookup edge case
# Should be -1
print hash_table.lookup('UDACITY')

# Test store
hash_table.store('UDACITY')
# Should be 8568
print hash_table.lookup('UDACITY')

# Test store edge case
hash_table.store('UDACIOUS')
# Should be 8568
print hash_table.lookup('UDACIOUS')

#print(hash_table.table)

```



{% page-ref page="../array/" %}

{% page-ref page="../tree/binary-search-tree/" %}

{% page-ref page="../untitled-4/" %}

{% page-ref page="../array/extra-array.md" %}

{% page-ref page="../stack/" %}

{% page-ref page="../tree/binary-tree/" %}

{% page-ref page="../untitled-6/" %}

{% page-ref page="./" %}

{% page-ref page="../untitled-2/" %}

{% page-ref page="../untitled-3/" %}

{% page-ref page="../queue/queue-sandbox.md" %}

{% page-ref page="./" %}

{% page-ref page="../untitled-4/double-linked-list.md" %}

{% page-ref page="../untitled-1/" %}

{% page-ref page="../untitled/" %}

{% page-ref page="../heap/" %}



