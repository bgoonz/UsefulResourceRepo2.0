class Category:
<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def __init__(self, name, products):
        self.name = name
        self.products = products

    def __str__(self):
        output = "  " + self.name + "\n"
        if len(self.products) < 1:
            output = "No products available in this category"
        for p in self.products:
            output += "    " + str(p) + "\n"
<<<<<<< HEAD
        
        return output
=======

        return output
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
