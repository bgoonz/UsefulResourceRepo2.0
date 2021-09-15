import random
import math
import time

<<<<<<< HEAD
class Queue:
    def __init__(self):
        self.storage = []
    
=======

class Queue:
    def __init__(self):
        self.storage = []

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def enqueue(self, value):
        self.storage.append(value)

    def dequeue(self):
        if (self.size()) > 0:
            return self.storage.pop(0)
        else:
            return None

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
        self.lastID = 0
        self.users = {}
        self.friendships = {}
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def addFriendship(self, userID, friendID):
        """
        Creates a bi-directional friendship
        """
        if userID == friendID:
            return False
<<<<<<< HEAD
        elif friendID in self.friendships[userID] or userID in self.friendships[friendID]:
=======
        elif (
            friendID in self.friendships[userID] or userID in self.friendships[friendID]
        ):
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            return False
        else:
            self.friendships[userID].add(friendID)
            self.friendships[friendID].add(userID)
            return True
<<<<<<< HEAD
            
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def addUser(self, name):
        """
        Create a new user with a sequential integer ID
        """
        self.lastID += 1
        self.users[self.lastID] = User(name)
        self.friendships[self.lastID] = set()
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def populateGraph(self, numUsers, avgFriendships):
        """
        Takes a number of users and an average number of friendships
        as arguments
        Creates that number of users and a randomly distributed friendships
        between those users.
        The number of users must be greater than the average number of friendships.
        """
        # Reset graph
        self.lastID = 0
        self.users = {}
        self.friendships = {}

        # Add users
        # loop over a range of 0 to numUsers
        for i in range(0, numUsers):
            # add user to the graph
            self.addUser(f"User {i}")
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # create friendships

        # Generate all friendship combinations
        # make a list of possible friendships
        possibleFriendships = []

        # avoid duplicates ensuring that the first number is smaller than the second
<<<<<<< HEAD
        
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # loop over userID in users
        for userID in self.users:
            # loop over friend id in a range from user id + 1 to the lastID +1
            for friendID in range(userID + 1, self.lastID + 1):
                # append the tuple of (user id , friend id) to the possible friendships list
                possibleFriendships.append((userID, friendID))
<<<<<<< HEAD
        
        # shuffle the possible friendships using the random.suffle method
        random.shuffle(possibleFriendships)

        # create afriendships of the first x ammount of pairs in the list   
=======

        # shuffle the possible friendships using the random.suffle method
        random.shuffle(possibleFriendships)

        # create afriendships of the first x ammount of pairs in the list
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # X determined by the formula: numusers * avgFriendships // 2
        # we need to divide by to as each createFriendship adds 2 friendships
        # loop over a range to numUsers * avgFriendships // 2
        for i in range(0, math.floor(numUsers * avgFriendships / 2)):
            # set the friendship to possible friends at i
            friendship = possibleFriendships[i]
            # addfriendship of friendship[0] and friendship[1]
            self.addFriendship(friendship[0], friendship[1])

    def populateGraphLinear(self, numUsers, avgFriendships):
        # Reset graph
        self.lastID = 0
        self.users = {}
        self.friendships = {}

        # Add users
        # loop over a range of 0 to numUsers
        for i in range(numUsers):
            # add user to the graph
            self.addUser(f"User {i + 1}")

        # friendships

        # get the target friendships via (numUsers * avgFriendships)
<<<<<<< HEAD
        targetFriendships = (numUsers * avgFriendships)
=======
        targetFriendships = numUsers * avgFriendships
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # set a counter for total friendships
        totalFriendships = 0
        # set a counter for collisions
        collisions = 0

        # while total friendships is less than the target friendships
        while totalFriendships < targetFriendships:
            # set userID to a random number between 1 and the lastID
            userID = random.randint(1, self.lastID)
            # set friendID to a random number between 1 and the lastID
            friendID = random.randint(1, self.lastID)
            # if the return of add friendship of userID and friendID is true
            if self.addFriendship(userID, friendID):
                # increment total friendships
                totalFriendships += 2
            # otherwise
            else:
                # increment collisions
                collisions += 1
        # print collision
        print(f"COLLISIONS: {collisions}")

<<<<<<< HEAD

=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    def getAllSocialPaths(self, userID):
        """
        Takes a user's userID as an argument
        Returns a dictionary containing every user in that user's
        extended network with the shortest friendship path between them.
        The key is the friend's ID and the value is the path.
        """
        visited = {}  # Note that this is a dictionary, not a set
        # create a queue
        q = Queue()
        # enqueue the user id as a list
        q.enqueue([userID])

        # while queue is not empty
        while q.size() > 0:
            # dequeue to path variable
            path = q.dequeue()
            # set new user id to the last item in path
            newUserID = path[-1]
<<<<<<< HEAD
            
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
            # check if the new user id is not in the visited structure
            if newUserID not in visited:
                # set the new user ids path in visited
                visited[newUserID] = path

                # loop over each friend id in the friendships at the index of new user id
                for friendID in self.friendships[newUserID]:
                    # check that the friend id is not in visited
                    if friendID not in visited:
                        # create a copy of the path
                        new_path = list(path)
                        # append the friend id to the copy of the path
                        new_path.append(friendID)
                        # enqueue the copy of the path
                        q.enqueue(new_path)
<<<<<<< HEAD
       
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        # return the visited data structure
        return visited


<<<<<<< HEAD
if __name__ == '__main__':
=======
if __name__ == "__main__":
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    sg = SocialGraph()
    start_time = time.time()
    numUsers = 2000
    avgFriendships = 190
    # sg.populateGraph(numUsers, avgFriendships)
<<<<<<< HEAD
    
=======

>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    sg.populateGraphLinear(numUsers, avgFriendships)
    end_time = time.time()
    print(f"Linear runtime: {end_time - start_time} seconds")

    start_time = time.time()
    sg.populateGraph(numUsers, avgFriendships)
    end_time = time.time()
    print(f"Quadratic runtime: {end_time - start_time} seconds")

<<<<<<< HEAD



=======
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
    # connections = sg.getAllSocialPaths(1)
    # print(f"Users in extended social network: {len(connections) - 1}")

    # total_sp = 0

    # for userID in connections:
    #     total_sp += len(connections[userID])

    # print(f"Average length of social path: {total_sp / len(connections)}")
    # print(sg.friendships)
    # print(connections)
<<<<<<< HEAD
    # print (f"runtime: {end_time - start_time} seconds")
=======
    # print (f"runtime: {end_time - start_time} seconds")
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
