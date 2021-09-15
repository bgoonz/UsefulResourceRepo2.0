from Category import Category

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Store:
    def __init__(self, name, catagories):
        self.name = name
        self.categories = catagories

    def __str__(self):
        output = f"{self.name}\n"
        for i, c in enumerate(self.categories):
            output += f"    [{i + 1}]  {c.name}\n"

        output += f"    [{i + 2}]  Exit\n"

        return output


<<<<<<< HEAD

s = Store("Steves Shop", [Category("Tools"), Category("Clothes"), Category("Groceries"), Category("another category!")])
=======
s = Store(
    "Steves Shop",
    [
        Category("Tools"),
        Category("Clothes"),
        Category("Groceries"),
        Category("another category!"),
    ],
)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
selection = 0
while selection != len(s.categories) + 1:
    print(s)
    try:
        selection = int(input("Select the number of a department "))

        if selection == len(s.categories) + 1:
            print("Thank's for shopping with us!")
            break
        elif selection > 0 and selection <= len(s.categories):
            print(f"{s.categories[selection - 1]} department")
        else:
            print("Select a valid number.")

    except ValueError:
        print("Please enter your choice as number.")
