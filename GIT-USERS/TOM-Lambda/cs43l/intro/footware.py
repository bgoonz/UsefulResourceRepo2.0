from product import Product

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Footware(Product):
    def __init__(self, name, price, color, size):
        super().__init__(name, price)
        self.color = color
        self.size = size

    def __str__(self):
        return f"{super().__str__()} in {self.color} size {self.size}"

<<<<<<< HEAD
# shoes = Footware("Running Shoes", 20, "Red", 12)
# print(shoes)
=======

# shoes = Footware("Running Shoes", 20, "Red", 12)
# print(shoes)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
