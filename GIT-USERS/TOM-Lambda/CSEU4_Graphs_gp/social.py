import random

<<<<<<< HEAD
def populate_graph(self, num_users, avg_friendships):
        """
=======

def populate_graph(self, num_users, avg_friendships):
    """
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        Takes a number of users and an average number of friendships
        as arguments
        Creates that number of users and a randomly distributed friendships
        between those users.
        The number of users must be greater than the average number of friendships.
        """
<<<<<<< HEAD
        # Reset graph
        self.last_id = 0
        self.users = {}
        self.friendships = {}
        # !!!! IMPLEMENT ME

        # Add users
        for i in range(0, num_users):
            self.addUser(f"User {i}")

        # Create friendships
        # generate all possible friendship combinations
        possible_friendships = []

        # avoid dupes by ensuring the first number is smaller than the second
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
=======
    # Reset graph
    self.last_id = 0
    self.users = {}
    self.friendships = {}
    # !!!! IMPLEMENT ME

    # Add users
    for i in range(0, num_users):
        self.addUser(f"User {i}")

    # Create friendships
    # generate all possible friendship combinations
    possible_friendships = []

    # avoid dupes by ensuring the first number is smaller than the second
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
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
