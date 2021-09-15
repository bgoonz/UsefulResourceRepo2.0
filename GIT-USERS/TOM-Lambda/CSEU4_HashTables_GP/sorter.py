<<<<<<< HEAD
d = {
    "foo": 12,
    "bar": 17,
    "qux": 2
}
=======
d = {"foo": 12, "bar": 17, "qux": 2}
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# cast our dict to a list of pairs
items = list(d.items())
print(items)

# Sort ascending by key
items.sort()
print(items)
# Sort descending by key
items.sort(reverse=True)
print(items)

# Sort ascending by value

# we can use lambdas, an anonymous function use an arg to to represent an element (key / Val table)
# we can then return element 1 of the tuple to indicate we want to sort by value
items.sort(key=lambda e: e[1])
print(items)

# Sort descending by value
items.sort(key=lambda e: e[1], reverse=True)
print(items)
