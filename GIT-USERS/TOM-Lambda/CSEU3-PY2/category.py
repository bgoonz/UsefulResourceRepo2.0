class Category:
<<<<<<< HEAD
    def __init__(self, name, products = None):
=======
    def __init__(self, name, products=None):
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        self.name = name
        self.products = products

    def __str__(self):
        if self.products == None:
<<<<<<< HEAD
            return f'No products available in {self.name}'
        else:
            output = ''
            output += self.name + '\n'
            product_number = 1
            for p in self.products:
                output += f'  [{product_number}] {p.name}\n'
                product_number += 1
=======
            return f"No products available in {self.name}"
        else:
            output = ""
            output += self.name + "\n"
            product_number = 1
            for p in self.products:
                output += f"  [{product_number}] {p.name}\n"
                product_number += 1
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
