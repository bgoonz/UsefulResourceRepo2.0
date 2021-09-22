import random
from queue import Queue
import time

<<<<<<< HEAD
=======

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

    def populate_graph(self, num_users, avg_friendships):
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
        # !!!! IMPLEMENT ME

        # Add users
        for i in range(0, num_users):
            self.add_user(f"User {i}")

        # Create friendships
        # generate all possible friendship combinations
        possible_friendships = []

        # avoid dupes by ensuring the first number is smaller than the second
        for user_id in self.users:
            for friend_id in range(user_id + 1, self.last_id + 1):
                possible_friendships.append((user_id, friend_id))

        # shuffle the possible friendships
        random.shuffle(possible_friendships)

        # create friendships for the first X pairs of the list
        # X determined by the formula num users * avg friendships // 2
        # need to divide by 2 since each add friendship creates 2 friendships
        for i in range(num_users * avg_friendships // 2):
            friendship = possible_friendships[i]
            self.add_friendship(friendship[0], friendship[1])

    def populate_graph_linear(self, num_users, avg_friendships):
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
        # !!!! IMPLEMENT ME

        # Add users
        for i in range(0, num_users):
            self.add_user(f"User {i + 1}")
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        target_friendships = num_users * avg_friendships
        total_friendships = 0
        collisions = 0

        while total_friendships < target_friendships:
            user_id = random.randint(1, self.last_id)
            friend_id = random.randint(1, self.last_id)

            if self.add_friendship(user_id, friend_id):
                total_friendships += 2
            else:
                collisions += 1
        print(f"COLLISIONS: {collisions}")

    def get_all_social_paths(self, user_id):
        """
        Takes a user's user_id as an argument
        Returns a dictionary containing every user in that user's
        extended network with the shortest friendship path between them.
        The key is the friend's ID and the value is the path.
        """

        q = Queue()
        visited = {}  # Note that this is a dictionary, not a set
        # !!!! IMPLEMENT ME
        q.enqueue([user_id])

        while q.size() > 0:
            path = q.dequeue()

            v = path[-1]

            if v not in visited:
                visited[v] = path

                for neighbor in self.friendships[v]:
<<<<<<< HEAD
                    path_copy = list(path) # path.copy()
=======
                    path_copy = list(path)  # path.copy()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
                    path_copy.append(neighbor)
                    q.enqueue(path_copy)
        return visited


<<<<<<< HEAD
if __name__ == '__main__':
=======
if __name__ == "__main__":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    num_users = 2000
    avg_friendships = 5
    sg = SocialGraph()
    start_time = time.time()
    sg.populate_graph(num_users, avg_friendships)
    end_time = time.time()
    print(f"Quadratic Runtime: {end_time - start_time} seconds")
    start_time = time.time()
    sg.populate_graph_linear(num_users, avg_friendships)
    end_time = time.time()
    print(f"Linear Runtime: {end_time - start_time} seconds")
    # connections = sg.get_all_social_paths(1)
    # print(sg.friendships)
    # print(f"Users in extended social network: {len(connections) - 1}")
    # total_sp = 0
    # for user_id in connections:
    #     total_sp += len(connections[user_id])
<<<<<<< HEAD
    
    # print(f"Avg len of social path: {total_sp // len(connections)}")
=======

    # print(f"Avg len of social path: {total_sp // len(connections)}")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
