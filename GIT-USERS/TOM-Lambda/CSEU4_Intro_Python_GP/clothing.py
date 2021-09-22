from product import Product

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Clothing(Product):
    def __init__(self, name, price, colour, size):
        super().__init__(name, price)
        self.colour = colour
        self.size = size

    def __str__(self):
        return f"{super().__str__()} comes in {self.colour}, {self.size}"


# # OOP
# noun.verb()

# # Procedural / imperative
# verb(noun)

<<<<<<< HEAD
# Functional 
=======
# Functional
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
# (input) synth1 -> synth2 -> synth3 -> synthn -> (end result)

# a = 12
# def f1(something):
#     return something + 1

# def f2(something):
#     return something * 2

<<<<<<< HEAD
# b = f1(a) + f2(a) - f1(a)
=======
# b = f1(a) + f2(a) - f1(a)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
