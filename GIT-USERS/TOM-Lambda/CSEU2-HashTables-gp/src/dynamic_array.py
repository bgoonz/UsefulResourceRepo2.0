class DynamicArray:
    def __init__(self, capacity=8):
        self.count = 0
        self.capacity = capacity
        self.storage = [None] * self.capacity

    def insert(self, index, value):
        # check that count is not bigger than capacity
        if self.count >= self.capacity:
            # resize the array
            self.double_size()
<<<<<<< HEAD
            
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # Shift everything that is to the right of index over by 1
        for i in range(self.count, index, -1):
            self.storage[i] = self.storage[i - 1]
        # insert the value at the index
        self.storage[index] = value
        # increment count
        self.count += 1

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def append(self, value):
        # check that count is not bigger than capacity
        if self.count >= self.capacity:
            # resize the array
            self.double_size()
<<<<<<< HEAD
       
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # insert the value at the count
        self.storage[self.count] = value
        # increment count
        self.count += 1
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def pop(self):
        # set the return value
        retval = self.storage[self.count - 1]
        # set the current count - 1 value to None
        self.storage[self.count - 1] = None
        # decrement count
        self.count -= 1
        # return the value
        return retval

    def double_size(self):
        # set capacity to capacity times 2
        self.capacity *= 2
        # create a new storage
        new_storage = [None] * self.capacity
        # copy over the contents of storage to the new storage
        for i in range(self.count):
            new_storage[i] = self.storage[i]
        # set the storage to be the new storage
        self.storage = new_storage

<<<<<<< HEAD
a = DynamicArray(2)
a.insert(0,10)
a.append(9)
a.append(8)
a.insert(3,7)
a.insert(4,6)
=======

a = DynamicArray(2)
a.insert(0, 10)
a.append(9)
a.append(8)
a.insert(3, 7)
a.insert(4, 6)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
a.append(34)
a.append(12)
a.append(9)
a.append(90)
print(a.storage)
print(a.pop())
<<<<<<< HEAD
print(a.storage)
=======
print(a.storage)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
