from product import Product

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Clothing(Product):
    def __init__(self, name, price, colour, size):
        super().__init__(name, price)
        # call 56343 + offset(4)
        self.colour = colour
        self.size = size

    def __str__(self):
<<<<<<< HEAD
        return f'{super().__str__()} Comes in {self.colour}, {str(self.size)}'
=======
        return f"{super().__str__()} Comes in {self.colour}, {str(self.size)}"

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# p = Product(...) ==> p -> 34321
# c = Clothing(...) ==> c -> 12345 super() -> 56343


# p count = 2
<<<<<<< HEAD
# c count = 1
=======
# c count = 1
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
