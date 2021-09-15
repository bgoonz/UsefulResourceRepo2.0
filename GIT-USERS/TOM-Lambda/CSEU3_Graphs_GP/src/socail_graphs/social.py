import random
from util import Queue
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
<<<<<<< HEAD
            return False #print("WARNING: You cannot be friends with yourself")
        elif friend_id in self.friendships[user_id] or user_id in self.friendships[friend_id]:
            return False # print("WARNING: Friendship already exists")
=======
            return False  # print("WARNING: You cannot be friends with yourself")
        elif (
            friend_id in self.friendships[user_id]
            or user_id in self.friendships[friend_id]
        ):
            return False  # print("WARNING: Friendship already exists")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
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
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
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
        # iterate over 0 to num users...
        for i in range(0, num_users):
            # add user using an f-string
            self.add_user(f"User {i}")

        # Create friendships
        # generate all possible friendship combinations
        possible_friendships = []

        # avoid dups by making sure the first number is smaller than the second
        # iterate over user id in users...
        for user_id in self.users:
            # iterate over friend id in in a range from user id + 1 to last id + 1...
            for friend_id in range(user_id + 1, self.last_id + 1):
                # append a user id and friend id tuple to the possible friendships
                possible_friendships.append((user_id, friend_id))
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # shuffle friendships random import
        random.shuffle(possible_friendships)

        # create friendships for the first N pairs of the list
        # N is determined by the formula: num users * avg friendships // 2
        # NOTE: need to divide by 2 since each add_friendship() creates 2 friendships
        # iterate over a range using the formula as the end base...
        for i in range(num_users * avg_friendships // 2):
            # set friendship to possible friendships at i
            friendship = possible_friendships[i]
            # add friendship of frienship[0], friendship[1]
            self.add_friendship(friendship[0], friendship[1])

    def populate_graph_l(self, num_users, avg_friendships):
        # Reset graph
        self.last_id = 0
        self.users = {}
        self.friendships = {}
        # !!!! IMPLEMENT ME

        # Add users
        # iterate over 0 to num users...
        for i in range(0, num_users):
            # add user using an f-string
            self.add_user(f"User {i + 1}")

        # set the target friendships to num users * avg friendships
<<<<<<< HEAD
        target_friendships = (num_users * avg_friendships)
=======
        target_friendships = num_users * avg_friendships
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # set total friendships to zero
        total_friendships = 0
        # set collisions to zero
        collisions = 0

        # iterate over total friendships to target friendships
        while total_friendships < target_friendships:
            # set the user id to a random sample
            user_id = random.randint(1, self.last_id)
            # set the friend id to random sample
            friend_id = random.randint(1, self.last_id)
            # if the friendship can be added add it
            if self.add_friendship(user_id, friend_id):
                # increment total friendships
                total_friendships += 1
            # otherwise
            else:
                # increment collisions
                collisions += 1

<<<<<<< HEAD
    # print the collisions
        print(f"COLLISIONS {collisions}") 


=======
        # print the collisions
        print(f"COLLISIONS {collisions}")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea

    # O(n^2)
    def get_all_social_paths(self, user_id):
        """
        Takes a user's user_id as an argument
        Returns a dictionary containing every user in that user's
        extended network with the shortest friendship path between them.
        The key is the friend's ID and the value is the path.
        """
        # create an empty queue
        q = Queue()

        visited = {}  # Note that this is a dictionary, not a set

        # add a path with the starting vertex to the queue (add user_id inside a list to the queue)
        q.enqueue([user_id])
        # while the queue is not empty
<<<<<<< HEAD
        while q.size() > 0: #  O(n)
            # dequeue to the path
            path = q.dequeue()   
=======
        while q.size() > 0:  #  O(n)
            # dequeue to the path
            path = q.dequeue()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # set a vert to the last item in the path
            vert = path[-1]
            # if vert is not in visited
            if vert not in visited:
<<<<<<< HEAD
                # when we reach an unvisited user, append the path to the visited dictionary at the key of vert  
                visited[vert] = path  
                # loop over next vert in vertices at the index of vert
                for neighbor in self.friendships[vert]: # O(n)
                    # set a new path equal to a new list of the path (copy)
                    new_path = list(path) # or path.copy()
=======
                # when we reach an unvisited user, append the path to the visited dictionary at the key of vert
                visited[vert] = path
                # loop over next vert in vertices at the index of vert
                for neighbor in self.friendships[vert]:  # O(n)
                    # set a new path equal to a new list of the path (copy)
                    new_path = list(path)  # or path.copy()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
                    # append neighbor to new path
                    new_path.append(neighbor)
                    # enqueue the new path
                    q.enqueue(new_path)
        # return visited dictionary
        return visited


<<<<<<< HEAD
if __name__ == '__main__':
=======
if __name__ == "__main__":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    sg = SocialGraph()
    start_time = 0
    end_time = 0
    num_users = 1000
    avg_friendships = 500

    # linear time
    start_time = time.time()
    sg.populate_graph_l(num_users, avg_friendships)
    end_time = time.time()
    print(f"Linear runtime: {end_time - start_time} seconds")

    # Quadratic time
    start_time = time.time()
    sg.populate_graph(num_users, avg_friendships)
    end_time = time.time()
    print(f"Quadratic runtime: {end_time - start_time} seconds")

# if __name__ == '__main__':
#     sg = SocialGraph()
#     sg.populate_graph(1000, 5)
#     connections = sg.get_all_social_paths(1)
#     print(f"Users in extended social network: {len(connections) - 1}")
#     total_s_p = 0
#     for user_id in connections:
#         total_s_p += len(connections[user_id])
<<<<<<< HEAD
#     print(f"Avg length of social path: {total_s_p // len(connections)}")
=======
#     print(f"Avg length of social path: {total_s_p // len(connections)}")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
