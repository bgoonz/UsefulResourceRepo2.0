<<<<<<< HEAD

# make an equipment class with the fields of 
=======
# make an equipment class with the fields of
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# name, price, style and weight
# that inherits from the product class
from product import Product

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Equipment(Product):
    def __init__(self, name, price, style, weight):
        super().__init__(name, price)
        self.style = style
        self.weight = weight

    def __str__(self):
        return super().__str__() + f" comes in {self.style}, {self.weight}"
<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
