from category import Category
from clothing import Clothing

# my categories
<<<<<<< HEAD
fiction = Category("Fiction", [Clothing("Some Product",30.78, "red", 20), Clothing("Other Product", 40, "Orange", 25)])
=======
fiction = Category(
    "Fiction",
    [
        Clothing("Some Product", 30.78, "red", 20),
        Clothing("Other Product", 40, "Orange", 25),
    ],
)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
non_fiction = Category("Non Fiction", [])
golf_balls = Category("Golf Balls", [])
other = Category("Some other Cat", [])

# store class that has a name and a categories
class Store:
    def __init__(self, name, categories):
        self.name = name
        self.categories = categories

    def __str__(self):
        output = f"{self.name}\n"
        for i, c in enumerate(self.categories):
            output += "   " + str(i + 1) + ": " + c.name + "\n"
<<<<<<< HEAD
        
        output += "   " + str(i + 2) + ": Exit"
        return output

=======

        output += "   " + str(i + 2) + ": Exit"
        return output


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
s = Store("Books n thingz", [fiction, non_fiction, golf_balls, other])

# shop_open = True
selection = 0
while selection != len(s.categories) + 1:
<<<<<<< HEAD
    print(s) # self.__repr__() => self.__str__()
=======
    print(s)  # self.__repr__() => self.__str__()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    selection = int(input("Select a category. "))
    if selection == len(s.categories) + 1:
        print("Thanks for shopping")
    else:
        print(f"{s.categories[selection - 1]}")
<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
