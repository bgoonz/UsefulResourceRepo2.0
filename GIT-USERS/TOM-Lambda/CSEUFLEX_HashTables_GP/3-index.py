records = [
    ("Alice", "Engineering"),
    ("Bob", "Sales"),
    ("Carol", "Sales"),
    ("Erin", "Engineering"),
    ("Dave", "Engineering"),
    ("Frank", "Engineering"),
<<<<<<< HEAD
    ("Grace", "Marketing")
=======
    ("Grace", "Marketing"),
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
]


def build_index(rec):
    # build the index from the list
    idx = {}

    for r in rec:
        name, dept = r

        if dept not in idx:
            idx[dept] = []

        idx[dept].append(name)

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    return idx


idx = build_index(records)

print(idx)
# print all the departments
for i in idx:
    print(i)

# print everyone in Engineering:
<<<<<<< HEAD
idx['Engineering'].sort()
# ['Alice', 'Erin', 'Dave', 'Frank'].sort()
print(f"Engineering: {idx['Engineering']}")
=======
idx["Engineering"].sort()
# ['Alice', 'Erin', 'Dave', 'Frank'].sort()
print(f"Engineering: {idx['Engineering']}")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
