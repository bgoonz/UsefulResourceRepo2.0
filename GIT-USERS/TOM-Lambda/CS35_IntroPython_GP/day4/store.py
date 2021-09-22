# lets write a store class with a name and categories
class Store:
    def __init__(self, name, categories):
        # attributes
        self.name = name
        self.categories = categories

    def __str__(self):
        ret = f"{self.name}\n"
        for i, c in enumerate(self.categories):
            ret += "    " + str(i + 1) + ": " + c.name + "\n"
        ret += "    " + str(i + 2) + ": Exit"
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        return ret

    def __repr__(self):
        return f"Store({self.name}, {self.categories})"

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# how can we represent this class data as a string?
