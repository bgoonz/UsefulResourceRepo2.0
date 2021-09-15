import random

# Create a rock/paper/scissors REPL loop
# Have a computer AI to play against us
# Keep track of the score
# Rules: r beats s, s beats p, p beats r

wins = 0
losses = 0
ties = 0
<<<<<<< HEAD
choices = ['r', 'p', 's']
=======
choices = ["r", "p", "s"]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

while True:
    print(f"Score: {wins} - {losses} - {ties}")
    cmd = input("\nChoose r/p/s: ")
    # AI picks a random choice from r/p/s
    ai_choice = choices[random.randrange(3)]
<<<<<<< HEAD
    print (f"Computer chose {ai_choice}")
    if cmd == "r":
        if ai_choice == 'p':
            losses += 1
            print("You lose")
        elif ai_choice == 's':
            wins += 1
            print("You win!")
        elif ai_choice == 'r':
            ties += 1
            print("You tie.")
    elif cmd == "p":
        if ai_choice == 's':
            losses += 1
            print("You lose")
        elif ai_choice == 'r':
            wins += 1
            print("You win!")
        elif ai_choice == 'p':
            ties += 1
            print("You tie.")
    elif cmd == "s":
        if ai_choice == 'r':
            losses += 1
            print("You lose")
        elif ai_choice == 'p':
            wins += 1
            print("You win!")
        elif ai_choice == 's':
=======
    print(f"Computer chose {ai_choice}")
    if cmd == "r":
        if ai_choice == "p":
            losses += 1
            print("You lose")
        elif ai_choice == "s":
            wins += 1
            print("You win!")
        elif ai_choice == "r":
            ties += 1
            print("You tie.")
    elif cmd == "p":
        if ai_choice == "s":
            losses += 1
            print("You lose")
        elif ai_choice == "r":
            wins += 1
            print("You win!")
        elif ai_choice == "p":
            ties += 1
            print("You tie.")
    elif cmd == "s":
        if ai_choice == "r":
            losses += 1
            print("You lose")
        elif ai_choice == "p":
            wins += 1
            print("You win!")
        elif ai_choice == "s":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            ties += 1
            print("You tie.")
    elif cmd == "q":
        print("Goodbye!")
        break
    else:
<<<<<<< HEAD
        print("I do not understand that command.")
=======
        print("I do not understand that command.")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
