<<<<<<< HEAD
d = {
    "foo": 120,
    "bar": 17,
    "qux": 2
}
=======
d = {"foo": 120, "bar": 17, "qux": 2}
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# Sorting a dictionary doesn't make sense
#
# But you can sort a list based on the dictionary
#
# First get the list of items from the dict with .items()
#
# This returns an iterator, so we cast it to a list.
#
# [('bar', 17), ('foo', 12), ('qux', 2)]

items = list(d.items())

print(f"unsorted: {items}")
# Sort ascending by key

items.sort()

print(f"Sort ascending by key: {items}")

# Sort descending by key

items.sort(reverse=True)

print(f"Sort descending by key: {items}")

# Sort ascending by value

# lambda is an anonymous function. e is the argument representing the
# element (a key/value tuple in this case).
<<<<<<< HEAD
# 
=======
#
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# We return element 1 of the tuple (the value) to indicate we wish to
# sort on the value.

items.sort(key=lambda e: e[1])

print(f"Sort ascending by value: {items}")

# Sort descending by value

items.sort(key=lambda e: e[1], reverse=True)

<<<<<<< HEAD
print(f"Sort descending by value: {items}")
=======
print(f"Sort descending by value: {items}")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
