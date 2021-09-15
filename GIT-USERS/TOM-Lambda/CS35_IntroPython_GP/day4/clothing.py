from product import Product

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Clothing(Product):
    def __init__(self, name, price, color, size):
        super().__init__(name, price)

        self.color = color
        self.size = size

    def __str__(self):
<<<<<<< HEAD
        return f"{super().__str__()} comes in {self.color}, {self.size}"
=======
        return f"{super().__str__()} comes in {self.color}, {self.size}"
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
