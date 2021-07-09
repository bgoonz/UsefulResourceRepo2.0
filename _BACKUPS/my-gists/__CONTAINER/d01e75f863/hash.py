class Dict:
    def __init__(self, capacity=8):
        self.storage = [None] * capacity        
        self.capacity = capacity
        self.item_count = 0
​
    def hash(self, string):
        bytes = string.encode()
        sum = 0
        for byte in bytes:
            sum += byte
        return sum % self.capacity
​
    # def djb2(self, key):
    #     """
    #     DJB2 hash, 32-bit
    #     Implement this, and/or FNV-1.
    #     """
    #     str_key = str(key).encode()
​
    #     hash = FNV_offset_basis_64
​
    #     for b in str_key:
    #         hash *= FNV_prime_64 5731
    #         hash ^= b
    #         hash &= 0xffffffffffffffff  # 64-bit hash
​
        # return hash
​
    def load_factor(self):
        return self.item_count / self.capacity
​
    def __len__(self):
        return self.item_count
​
    def get(self, key):
        # hash the key to get the index
        index = self.hash(key)
        if self.storage[index] is None:
            # the slot is empty (throw an error maybe)
            return
        
        # Find the correct key value pair
        for key_value in self.storage[index]:
            if key_value[0] == key:
                return key_value[1]
        # Item not found (throw error again)? 
        return
​
    def insert(self, key, value):
        # Hash the key, to get an index
        index = self.hash(key)
        array_at_index = self.storage[index]
        if array_at_index is not None:
            # First check if key already exists in the array
            for key_value in array_at_index:
                # Find the item and update it
                if key_value[0] == key:
                    key_value[1] = value
                    return
            # Add the item to the array inside storage
            array_at_index.append([key, value])
        else:
            self.storage[index] = [[key, value]]
        self.item_count += 1
        # Check if we need to resize
        if self.load_factor() > 0.7:
            # Resize
            self.resize()
    
    def resize(self):
        print(f'need to resize because load factor is {self.load_factor()}')
        # Lets double the storage capacity
        old_storage = self.storage
        self.storage = [None] * len(old_storage) * 2
        self.capacity = len(self.storage)
        self.item_count = 0
        # for each item in the old storage, insert them again
        for slot in old_storage:
            # loop through the slot and insert each item
            if slot is None:
                continue
            for key_value in slot:
                self.insert(key_value[0], key_value[1])
​
        print(f'new load factor is {self.load_factor()}')
​
​
   
    def delete(self, key):
        # Hash the key, to get an index
        index = self.hash(key)
        self.item_count -= 1
        self.storage[index] = None
​
    def __setitem__(self, key, value):
        return self.insert(key, value)
    
    def __getitem__(self, key):
        return self.get(key)
​
d = Dict(8)
​
d['apple'] = 'is a fruit'
d['banana'] = 'is also fruit'
d['cucumber'] = 'is a vegetable'
d['peach'] = 'This is definitely not a banana'
d['pineapple'] = 'is tasty'
print(d.storage)
d['papaya'] = 'is tropical'
print(d.storage)
​