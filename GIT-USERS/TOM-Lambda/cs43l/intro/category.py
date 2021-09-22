class Category:
<<<<<<< HEAD

    def __init__(self, name, products = []):
=======
    def __init__(self, name, products=[]):
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        self.name = name
        self.products = products

    def __str__(self):
        output = f"  {self.name}\n"
        if len(self.products) < 1:
            output = f"No products available in {self.name}"
        else:
            for p in self.products:
                output += f"    {p}\n"

        return output
