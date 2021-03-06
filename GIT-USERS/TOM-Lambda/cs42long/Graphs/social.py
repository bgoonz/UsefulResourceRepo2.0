import random
import time

# Create a data structure for the traversal
<<<<<<< HEAD
class Queue():
    def __init__(self):
        self.storage = []
    
    def enqueue(self, value):
        self.storage.append(value)
    
=======
class Queue:
    def __init__(self):
        self.storage = []

    def enqueue(self, value):
        self.storage.append(value)

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def dequeue(self):
        return self.storage.pop(0)

    def size(self):
        return len(self.storage)

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

<<<<<<< HEAD
    def populate_graph(self, num_users, avg_friendships): # O(n^2)
=======
    def populate_graph(self, num_users, avg_friendships):  # O(n^2)
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
        # !!!! IMPLEMENT ME

        # Add users
        for i in range(0, num_users):
            self.add_user(f"User {i+1}")
        # Create friendships
        # generate all possible friendships
        # create a list of possible friendships
        possible_friendships = []

        # 1, [2, 3, 4, 5, 6, 7, 8, 9]
        # 2, [3, 4, 5, 6, 7, 8, 9]
        # 3, [4, 5, 6, 7, 8, 9]
        # 4, [5, 6, 7, 8, 9]
        # 5, [6, 7, 8, 9]
        # 6, [7, 8, 9]
        # 7, [8, 9]
        # 8, [9]
        # 9, []
        # to avoid duplicates make sure that the first number is smaller than the second
        for user_id in self.users:
            for friend_id in range(user_id + 1, self.last_id + 1):
                possible_friendships.append((user_id, friend_id))
        # shuffle all possible friendship
        random.shuffle(possible_friendships)
        # create friendships for the first x pairs in the list of friends
        # X determined by the formula: num_users * avg_friendships // 2
        for i in range(num_users * avg_friendships // 2):
            friendship = possible_friendships[i]
            user_id = friendship[0]
            friend_id = friendship[1]
            self.add_friendship(user_id, friend_id)

<<<<<<< HEAD

    def populate_graph_l(self, num_users, avg_friendships): # O(n)
=======
    def populate_graph_l(self, num_users, avg_friendships):  # O(n)
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
        # !!!! IMPLEMENT ME

        # Add users
        for i in range(0, num_users):
            self.add_user(f"User {i+1}")

        # set a target friendships to (num_users * avg_friendships)
<<<<<<< HEAD
        target_friendships = (num_users * avg_friendships)
=======
        target_friendships = num_users * avg_friendships
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # create a counter for the total number of friendships created and set it to zero
        total_friendships = 0
        # create a collisions counter and set it to zero
        collisions = 0

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # iterate while the total friendships are less than target friendships
        while total_friendships < target_friendships:
            # randomly pick a user as the user_id.
            user_id = random.randint(1, self.last_id)
            # randomly pick a user as the friend_id
            friend_id = random.randint(1, self.last_id)
            # if an add friendship call using user_id and friend_id returns true.
            if self.add_friendship(user_id, friend_id):
                # add 2 to the total friendships (due to the bi-directional nature of the add friendship method)
                total_friendships += 2
            # otherwise
            else:
                # increment our collisions
                collisions += 1
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        print("COLLISIONS: ", collisions)

    # fill in some logic for a traversal
    def get_all_social_paths(self, user_id):
        """
        Takes a user's user_id as an argument
        Returns a dictionary containing every user in that user's
        extended network with the shortest friendship path between them.
        The key is the friend's ID and the value is the path.
        """
        visited = {}  # Note that this is a dictionary, not a set
        # !!!! IMPLEMENT ME
        # create an empty queue
        q = Queue()
        # enqueue the first path.
        q.enqueue([user_id])
        # while the q is not empty.
        while q.size() > 0:
            # dequeue the path.
            path = q.dequeue()
            # set a newuser_id to the last element in the path [-1]
            newuser_id = path[-1]
            # if the newuser_id is not in visited.
            if newuser_id not in visited:
                # set the vesited at the key of newuser_id to the path.
                visited[newuser_id] = path
                # for every friend_id in the friendships at the key of newuser_id
                for friend_id in self.friendships[newuser_id]:
                    # make a copy of the path called new_path.
                    new_path = path.copy()
                    # append the friend_id to the new_path.
                    new_path.append(friend_id)
                    # enqueue the new path.
                    q.enqueue(new_path)
        # return the populated visited dict to the caller
        return visited


<<<<<<< HEAD
if __name__ == '__main__':
=======
if __name__ == "__main__":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    num_users = 2000
    avg_friendships = 1900

    sg = SocialGraph()
    start_time = time.time()
    sg.populate_graph_l(num_users, avg_friendships)
    end_time = time.time()
    print(f"Linear Runtime: {end_time - start_time} seconds")
    # connections = sg.get_all_social_paths(1)
    # print(connections)

    sg = SocialGraph()
    start_time = time.time()
    sg.populate_graph(num_users, avg_friendships)
    end_time = time.time()
    print(f"Quadratic Runtime: {end_time - start_time} seconds")
    # connections = sg.get_all_social_paths(1)
    # print(connections)

<<<<<<< HEAD


    # sg.populate_graph(10, 2)
    # print(sg.friendships)
    # connections = sg.get_all_social_paths(1)
    # print(connections)
=======
    # sg.populate_graph(10, 2)
    # print(sg.friendships)
    # connections = sg.get_all_social_paths(1)
    # print(connections)
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
