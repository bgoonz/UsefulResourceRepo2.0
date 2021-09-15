<<<<<<< HEAD
# make a equipment class with the fields of 
=======
# make a equipment class with the fields of
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# name, price, style and weight
# that inherits from the product class
from product import Product

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Equipment(Product):
    # constructor
    def __init__(self, name, price, style, weight):
        super().__init__(name, price)
        self.style = style
        self.weight = weight

    def __str__(self):
<<<<<<< HEAD
        f'{super().__str__()} Style: {self.style}, Weight: {str(self.weight)}'
=======
        f"{super().__str__()} Style: {self.style}, Weight: {str(self.weight)}"
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
