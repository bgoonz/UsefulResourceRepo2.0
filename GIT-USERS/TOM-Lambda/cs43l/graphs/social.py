import random
import time

<<<<<<< HEAD
class Stack:
    def __init__(self):
        self.storage = []
    
    def push(self, value):
        self.storage.append(value)
    
=======

class Stack:
    def __init__(self):
        self.storage = []

    def push(self, value):
        self.storage.append(value)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def pop(self):
        if self.size() > 0:
            return self.storage.pop()
        else:
            return None
<<<<<<< HEAD
    
    def size(self):
        return len(self.storage)

class Queue:
    def __init__(self):
        self.storage = []
    
    def enqueue(self, value):
        self.storage.append(value)
    
=======

    def size(self):
        return len(self.storage)


class Queue:
    def __init__(self):
        self.storage = []

    def enqueue(self, value):
        self.storage.append(value)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def dequeue(self):
        if self.size() > 0:
            return self.storage.pop(0)
        else:
            return None
<<<<<<< HEAD
    
    def size(self):
        return len(self.storage)

=======

    def size(self):
        return len(self.storage)


>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class User:
    def __init__(self, name):
        self.name = name

<<<<<<< HEAD
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
class SocialGraph:
    def __init__(self):
        self.last_id = 0
        self.users = {}
        self.friendships = {}

    def add_friendship(self, user_id, friend_id):
        """
        Creates a bi-directional friendship
        """
        if user_id == friend_id:
            # print("WARNING: You cannot be friends with yourself")
            return False
<<<<<<< HEAD
        elif friend_id in self.friendships[user_id] or user_id in self.friendships[friend_id]:
=======
        elif (
            friend_id in self.friendships[user_id]
            or user_id in self.friendships[friend_id]
        ):
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # print("WARNING: Friendship already exists")
            return False
        else:
            self.friendships[user_id].add(friend_id)
            self.friendships[friend_id].add(user_id)
            return True

    def add_user(self, name):
        """
        Create a new user with a sequential integer ID
        """
        self.last_id += 1  # automatically increment the ID to assign the new user
        self.users[self.last_id] = User(name)
        self.friendships[self.last_id] = set()

<<<<<<< HEAD
    def populate_graph(self, num_users, avg_friendships): # Quadratic O(n^2)
=======
    def populate_graph(self, num_users, avg_friendships):  # Quadratic O(n^2)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        """
        Takes a number of users and an average number of friendships
        as arguments

        Creates that number of users and a randomly distributed friendships
        between those users.

        The number of users must be greater than the average number of friendships.
        """
        # Reset graph
        self.last_id = 0
        self.users = {}
        self.friendships = {}
        # Add users
        for i in range(0, num_users):
            self.add_user(f"User {i}")
        # Create Frienships
        # Generate all possible friendship combinations
        possible_friendships = []
        # Avoid duplicates by ensuring the first number is smaller than the second
        for user_id in self.users:
            for friend_id in range(user_id + 1, self.last_id + 1):
                possible_friendships.append((user_id, friend_id))
        # Shuffle the possible friendships
        random.shuffle(possible_friendships)
        # Create friendships for the first X pairs of the list
        # X is determined by the formula: num_users * avg_friendships // 2
        # Need to divide by 2 since each add_friendship() creates 2 friendships
        for i in range(num_users * avg_friendships // 2):
            friendship = possible_friendships[i]
            self.add_friendship(friendship[0], friendship[1])

<<<<<<< HEAD
    def populate_graph_linear(self, num_users, avg_friendships): # Linear O(n)
=======
    def populate_graph_linear(self, num_users, avg_friendships):  # Linear O(n)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # Reset graph
        self.last_id = 0
        self.users = {}
        self.friendships = {}
        # Add users
        for i in range(0, num_users):
            self.add_user(f"User {i}")

<<<<<<< HEAD
        target_friendships = (num_users * avg_friendships)
=======
        target_friendships = num_users * avg_friendships
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        total_friendships = 0
        collisions = 0

        while total_friendships < target_friendships:
            user_id = random.randint(1, self.last_id)
            friend_id = random.randint(1, self.last_id)
            if self.add_friendship(user_id, friend_id):
                total_friendships += 2
            else:
                collisions += 1
<<<<<<< HEAD
        
        print(f"Collisions: {collisions}")


=======

        print(f"Collisions: {collisions}")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    def get_all_social_paths(self, user_id):
        """
        Takes a user's user_id as an argument

        Returns a dictionary containing every user in that user's
        extended network with the shortest friendship path between them.

        The key is the friend's ID and the value is the path.
        """
        # Create an empty Queue
        q = Queue()
        # Create an empty Visited dictionary
        visited = {}  # Note that this is a dictionary, not a set
        # Add A PATH TO the starting vertex to the queue
<<<<<<< HEAD
        q.enqueue( [user_id] )
=======
        q.enqueue([user_id])
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # While the queue is not empty...
        while q.size() > 0:
            # Dequeue the first PATH
            path = q.dequeue()
            # Grab the last vertex from the path
            v = path[-1]
            # If it has not been visited...
            if v not in visited:
                # When we reach an unvisited user, append the path to the visited dictionary
                visited[v] = path
                # Then enqueue PATHS TO each of its neighbors in the queue
                for neighbor in self.friendships[v]:
                    path_copy = path.copy()
                    path_copy.append(neighbor)
                    q.enqueue(path_copy)
        # return visited
        return visited

    def get_all_social_paths_dft(self, user_id):
        """
        Takes a user's user_id as an argument

        Returns a dictionary containing every user in that user's
        extended network with a friendship path between them.

        The key is the friend's ID and the value is the path.
        """
        # Create an empty Queue
        q = Stack()
        # Create an empty Visited dictionary
        visited = {}  # Note that this is a dictionary, not a set
        # Add A PATH TO the starting vertex to the queue
<<<<<<< HEAD
        q.push( [user_id] )
=======
        q.push([user_id])
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # While the queue is not empty...
        while q.size() > 0:
            # Dequeue the first PATH
            path = q.pop()
            # Grab the last vertex from the path
            v = path[-1]
            # If it has not been visited...
            if v not in visited:
                # When we reach an unvisited user, append the path to the visited dictionary
                visited[v] = path
                # Then enqueue PATHS TO each of its neighbors in the queue
                for neighbor in self.friendships[v]:
                    path_copy = path.copy()
                    path_copy.append(neighbor)
                    q.push(path_copy)
        # return visited
        return visited


<<<<<<< HEAD
if __name__ == '__main__':
=======
if __name__ == "__main__":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # sg = SocialGraph()
    # sg.populate_graph(10, 2)
    # print(sg.friendships)
    # connections = sg.get_all_social_paths(1)
    # print(connections)
    sg = SocialGraph()
    num_users = 2000
    avg_friendships = 1900
    start_time = time.time()
    sg.populate_graph_linear(num_users, avg_friendships)
    # print(sg.friendships)
    end_time = time.time()
<<<<<<< HEAD
    print (f"Linear runtime: {end_time - start_time} seconds")
=======
    print(f"Linear runtime: {end_time - start_time} seconds")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    sg = SocialGraph()
    start_time = time.time()
    sg.populate_graph(num_users, avg_friendships)
    end_time = time.time()
<<<<<<< HEAD
    print (f"Quadratic runtime: {end_time - start_time} seconds")
=======
    print(f"Quadratic runtime: {end_time - start_time} seconds")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
