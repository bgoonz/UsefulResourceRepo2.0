class Book:
    """Simple Book class"""
<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    title = "title"
    author = "last, first"
    genre = "fiction"

    def __init__(self, title, author, genre):
        self.title = title
        self.author = author
        self.genre = genre

    def __str__(self):
        return str(self.genre) + ": " + str(self.title) + " by " + str(self.author)

    def __repr__(self):
<<<<<<< HEAD
        return str(self.genre) + ": " + str(self.title) + " by " + str(self.author)
=======
        return str(self.genre) + ": " + str(self.title) + " by " + str(self.author)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
