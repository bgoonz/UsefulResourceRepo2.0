# O(1) space complexity

# no matter how big n gets the space used will remain the same

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def o_1_space(n):
    total = 0

    for i in range(n):
        total += i
    return total

<<<<<<< HEAD
# O(n) space complexity

=======

# O(n) space complexity


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
def o_n_space(n):
    sums = []

    for i in range(n):
        sums.append(i + i)
<<<<<<< HEAD
    
    return sums

# O(n^2)

def o_n2_space(n):
    times_table = [] # empty list
=======

    return sums


# O(n^2)


def o_n2_space(n):
    times_table = []  # empty list
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    for i in range(n):
        row = []

        for j in range(n):
            row.append(j * i)
<<<<<<< HEAD
        
        times_table.append(row)
    
    return times_table

=======

        times_table.append(row)

    return times_table
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
