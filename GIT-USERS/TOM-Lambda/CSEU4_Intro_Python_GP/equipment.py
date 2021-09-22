<<<<<<< HEAD
# make an equipment class with the fields of 
# name, price, style and weight
# that inherits from the product class
from product import Product
=======
# make an equipment class with the fields of
# name, price, style and weight
# that inherits from the product class
from product import Product


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Equipment(Product):
    def __init__(self, name, price, style, weight):
        super().__init__(name, price)
        self.style = style
<<<<<<< HEAD
        self.weight = weight
=======
        self.weight = weight
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
