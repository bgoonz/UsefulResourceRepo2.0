def letter_count(s):
    d = {}

    for c in s:

        if c.isspace():
            continue
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        c = c.lower()

        if c not in d:
            d[c] = 1
        else:
            d[c] += 1
<<<<<<< HEAD
    
    return d

=======

    return d


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def print_sorted_count(s):
    count = letter_count(s)

    items = list(count.items())

    items.sort(key=lambda e: e[1], reverse=True)

    for i in items:
        print(f"{i[0]}: {i[1]}")


my_string = "aabcDcc dd      ddd D"

print(letter_count(my_string))
print_sorted_count(my_string)
<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
