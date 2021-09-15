<<<<<<< HEAD
class Stack():
    def __init__(self):
        self.stack = []
    def push(self, value):
        self.stack.append(value)
=======
class Stack:
    def __init__(self):
        self.stack = []

    def push(self, value):
        self.stack.append(value)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def pop(self):
        if self.size() > 0:
            return self.stack.pop()
        else:
            return None
<<<<<<< HEAD
    def size(self):
        return len(self.stack)
=======

    def size(self):
        return len(self.stack)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
