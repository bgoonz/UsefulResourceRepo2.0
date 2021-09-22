def timeof(n):
    if n == 1:
        return
    i = 0
<<<<<<< HEAD
    while i <= n: # O(n) * O(1) + 1
        # inner loop will break out after first itteration O(1)
        for _ in range(n):
            print('*')
=======
    while i <= n:  # O(n) * O(1) + 1
        # inner loop will break out after first itteration O(1)
        for _ in range(n):
            print("*")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            break
        i += 1


<<<<<<< HEAD
timeof(10)
=======
timeof(10)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
