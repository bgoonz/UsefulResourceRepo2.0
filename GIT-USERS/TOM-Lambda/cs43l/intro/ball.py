from product import Product

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class Ball(Product):
    def __init__(self, name, price, solid):
        super().__init__(name, price)
        self.solid = solid

    def __str__(self):
<<<<<<< HEAD
        return f"{super().__str__()} and {'is solid' if self.solid else 'is inflatable'}"
=======
        return (
            f"{super().__str__()} and {'is solid' if self.solid else 'is inflatable'}"
        )

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

# basketball = Ball("Wilson Power Ball", 25, True)

# print(basketball)
<<<<<<< HEAD


=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
