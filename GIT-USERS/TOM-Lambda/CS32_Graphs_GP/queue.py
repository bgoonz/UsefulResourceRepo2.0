<<<<<<< HEAD
class Queue():
    def __init__(self):
        self.queue = []
    def enqueue(self, value):
        self.queue.append(value)
=======
class Queue:
    def __init__(self):
        self.queue = []

    def enqueue(self, value):
        self.queue.append(value)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def dequeue(self):
        if self.size() > 0:
            return self.queue.pop(0)
        else:
            return None
<<<<<<< HEAD
    def size(self):
        return len(self.queue)
=======

    def size(self):
        return len(self.queue)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
