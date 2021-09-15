from product import Product

<<<<<<< HEAD
class Italker:

    def say(self, message):
        pass

=======

class Italker:
    def say(self, message):
        pass


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Clothing(Product, Italker):
    def __init__(self, name, price, colour, size):
        super().__init__(name, price)
        self.colour = colour
        self.size = size

    def say(self, message):
        print(f"{self.name} Says {message}")

<<<<<<< HEAD


    def __str__(self):
        return super().__str__() + f" comes in {self.colour}, {self.size}"
=======
    def __str__(self):
        return super().__str__() + f" comes in {self.colour}, {self.size}"
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
