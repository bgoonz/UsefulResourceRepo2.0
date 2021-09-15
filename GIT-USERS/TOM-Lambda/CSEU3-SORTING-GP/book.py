class Book:
    def __init__(self, title, author, genre):
        self.title = title
        self.author = author
        self.genre = genre

    def __str__(self):
<<<<<<< HEAD
        return f'{self.genre}: {self.title} by {self.author}'
=======
        return f"{self.genre}: {self.title} by {self.author}"
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
