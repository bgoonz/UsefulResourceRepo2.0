from random import randint

min_num = int(input("Pick a minimum number! "))
max_num = int(input("Pick a maximum number! "))
secret_number = randint(min_num, max_num)

num_attempts = int(input("How many turns do you want? "))

while num_attempts != -1:
    user_guess = int(
        input(f"Try to guess the secret number, you have {num_attempts} left!  ")
    )

    if user_guess < min_num or user_guess > max_num:
        print("That number is not in range")
    elif user_guess < secret_number:
        print(f"Your guess of {user_guess} is too low!")
        num_attempts -= 1
    elif user_guess > secret_number:
        print(f"Your guess of {user_guess} is too high!")
        num_attempts -= 1
    else:
        print("You guessed correct, you win!")
        break

    if num_attempts == 0:
        print("You are out of turns... Better luck next time!")
        break
