# \# Social Graph



## Social Graph

You have been assigned the task of building a new friend-based social network. In this network, users are able to view their own friends, friends of their friends, friends of their friends' friends, and so on. People connected to you through any number of friendship connections are considered a part of your extended social network.

The functionality behind creating users and friendships has been completed already. Your job is to implement a function that shows all the friends in a user's extended social network and chain of friendships that link them. The number of connections between one user and another are called the degrees of separation.

Your client is also interested in how the performance will scale as more users join so she has asked you to implement a feature that creates large numbers of users to the network and assigns them a random distribution of friends.

### 1. Generating Users and Friendships

It will be easier to build your extended social network if you have users to test it with. `populateGraph()` takes in a number of users to create and the average number of friends each user should have and creates them.

```text
>>> sg = SocialGraph()
>>> sg.populateGraph(10, 2)  # Creates 10 users with an average of 2 friends each
>>> print(sg.friendships)
{1: {8, 10, 5}, 2: {10, 5, 7}, 3: {4}, 4: {9, 3}, 5: {8, 1, 2}, 6: {10}, 7: {2}, 8: {1, 5}, 9: {4}, 10: {1, 2, 6}}
>>> sg = SocialGraph()
>>> sg.populateGraph(10, 2)
>>> print(sg.friendships)
{1: {8}, 2: set(), 3: {6}, 4: {9, 5, 7}, 5: {9, 10, 4, 6}, 6: {8, 3, 5}, 7: {4}, 8: {1, 6}, 9: {10, 4, 5}, 10: {9, 5}}
```

Note that in the above example, the average number of friendships is exactly 2 but the actual number of friends per user ranges anywhere from 0 to 4.

* Hint 1: To create N random friendships, you could create a list with all possible friendship combinations, shuffle the list, then grab the first N elements from the list. You will need to `import random` to get shuffle.
* Hint 2: `addFriendship(1, 2)` is the same as `addFriendship(2, 1)`. You should avoid calling one after the other since it will do nothing but print a warning. You can avoid this by only creating friendships where user1 &lt; user2.

### 2. Degrees of Separation

Now that you have a graph full of users and friendships, you can crawl through their social graphs. `getAllSocialPaths()` takes a userID and returns a dictionary containing every user in that user's extended network along with the shortest friendship path between each.

```text
>>> sg = SocialGraph()
>>> sg.populateGraph(10, 2)
>>> print(sg.friendships)
{1: {8, 10, 5}, 2: {10, 5, 7}, 3: {4}, 4: {9, 3}, 5: {8, 1, 2}, 6: {10}, 7: {2}, 8: {1, 5}, 9: {4}, 10: {1, 2, 6}}
>>> connections = sg.getAllSocialPaths(1)
>>> print(connections)
{1: [1], 8: [1, 8], 10: [1, 10], 5: [1, 5], 2: [1, 10, 2], 6: [1, 10, 6], 7: [1, 10, 2, 7]}
```

Note that in this sample, Users 3, 4 and 9 are not in User 1's extended social network.

* Hint 1: What kind of graph search guarantees you a shortest path?
* Hint 2: Instead of using a `set` to mark users as visited, you could use a `dictionary`. Similar to sets, checking if something is in a dictionary runs in O\(1\) time. If the visited user is the key, what would the value be?

### 3. Questions

1. To create 100 users with an average of 10 friends each, how many times would you need to call `addFriendship()`? Why?
2. If you create 1000 users with an average of 5 random friends each, what percentage of other users will be in a particular user's extended social network? What is the average degree of separation between a user and those in his/her extended network?

### 4. Stretch Goal

1. You might have found the results from question \#2 above to be surprising. Would you expect results like this in real life? If not, what are some ways you could improve your friendship distribution model for more realistic results?
2. If you followed the hints for part 1, your `populateGraph()` will run in O\(n^2\) time. Refactor your code to run in O\(n\) time. Are there any tradeoffs that come with this implementation?

{% tabs %}
{% tab title="Social-graph.py" %}
```python
import random


class Queue:
    def __init__(self):
        self.queue = []

    def enqueue(self, value):
        self.queue.append(value)

    def dequeue(self):
        if self.size() > 0:
            return self.queue.pop(0)
        else:
            return None

    def size(self):
        return len(self.queue)


class User:
    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return self.name


class SocialGraph:
    def __init__(self):
        self.lastID = 0
        self.users = {}
        self.friendships = {}

    def addFriendship(self, userID, friendID):
        """
        Creates a bi-directional friendship
        """
        if userID == friendID:
            print("WARNING: You cannot be friends with yourself")
        elif (
            friendID in self.friendships[userID] or userID in self.friendships[friendID]
        ):
            print("WARNING: Friendship already exists")
        else:
            self.friendships[userID].add(friendID)
            self.friendships[friendID].add(userID)

    def addUser(self, name):
        """
        Create a new user with a sequential integer ID
        """
        self.lastID += 1  # automatically increment the ID to assign the new user
        self.users[self.lastID] = User(name)
        self.friendships[self.lastID] = set()

    def populateGraph(self, numUsers, avgFriendships):
        """
        Takes a number of users and an average number of friendships
        as arguments

        Creates that number of users and a randomly distributed friendships
        between those users.

        The number of users must be greater than the average number of friendships.
        """

        # # Reset graph
        # self.lastID = 0
        # self.users = {}
        # self.friendships = {}
        # # !!!! IMPLEMENT ME
        #
        # # Add users
        # for i in range(0, numUsers):
        #     self.addUser(f"User {i}")
        #
        # possible_friendships = []
        # # Create friendships
        # for UserID in self.users:
        #     for friendID in range(UserID + 1, self.lastID + 1):
        #         possible_friendships.append((UserID, friendID))
        #
        # random.shuffle(possible_friendships)
        #
        # for i in range(numUsers * avgFriendships // 2):
        #     friendship = possible_friendships[i]
        #     self.addFriendship(friendship[0], friendship[1])

        # Reset graph
        self.lastID = 0
        self.users = {}
        self.friendships = {}
        # !!!! IMPLEMENT ME

        # Add users
        # call addUser() until our number of users is numUsers
        for i in range(numUsers):
            self.addUser(f"User {i + 1}")

        # Create random friendships
        # totalFriendships = avgFriendships * numUsers
        # Generate a list of all possible friendships
        possibleFriendships = []
        # Avoid dups by ensuring the first ID is smaller than the second
        for userID in self.users:
            for friendID in range(userID + 1, self.lastID + 1):
                possibleFriendships.append((userID, friendID))

        # Shuffle the list
        random.shuffle(possibleFriendships)
        print("random friendships:")
        print(possibleFriendships)

        # Slice off totalFriendships from the front, create friendships
        totalFriendships = avgFriendships * numUsers // 2
        print(f"Friendships to create: {totalFriendships}\n")
        for i in range(totalFriendships):
            friendship = possibleFriendships[i]
            self.addFriendship(friendship[0], friendship[1])

    def getAllSocialPaths(self, userID):
        """
        Takes a user's userID as an argument

        Returns a dictionary containing every user in that user's
        extended network with the shortest friendship path between them.

        The key is the friend's ID and the value is the path.
        """
        visited = {}  # Note that this is a dictionary, not a set
        # !!!! IMPLEMENT ME
        que = Queue()  # creating our queue

        # since BFS add start id to que
        que.enqueue(
            [userID]
        )  # enqueuing the user id in list / build possible path / keep a good one

        while que.size() > 0:  # while the queue is not empty...
            path = que.dequeue()

            new_user_id = path[-1]

            if new_user_id not in visited:
                visited[
                    new_user_id
                ] = path  # dict of paths from starting to everyone else

                for neighbor in self.friendships[new_user_id]:
                    path_copy = path.copy()
                    path_copy.append(neighbor)
                    que.enqueue(path_copy)

        return visited

    # %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    # earliest_ancestor
    # %%%%%%% Code From ancestor.py For Reference %%%%%%%
    # while q.size() > 0:
    #     path = q.dequeue()
    #     v = path[-1]
    #
    #     if len(path) >= max_path_length and v < earliest_anc or len(path) > max_path_length:
    #         earliest_anc = v
    #         max_path_length = len(path)
    #
    #     for neighbor in graph.vertices[v]:
    #         path_copy = list(path)
    #         path_copy.append(neighbor)
    #         q.enqueue(path_copy)
    #
    # return earliest_anc
    # %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
    # %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


if __name__ == "__main__":
    sg = SocialGraph()
    sg.populateGraph(11, 3)
    print("USERS:")
    print(sg.users)
    print("FRIENDSHIPS:")
    print(sg.friendships)
    connections = sg.getAllSocialPaths(1)
    print("CONNECTIONS:")
    print(connections)

```
{% endtab %}

{% tab title="Output" %}
```text

random friendships:
[(3, 9), (2, 11), (7, 11), (7, 9), (1, 7), (2, 9), (8, 10), (2, 6), (8, 9), (6, 8), (6, 9), (9, 11), (4, 9), (4, 5), (8, 11), (3, 11), (2, 10), (6, 7), (1, 2), (1, 3), (3, 7), (7, 8), (5, 11), (4, 7), (3, 6), (9, 10), (2, 7), (4, 10), (4, 8), (1, 10), (3, 4), (5, 10), (5, 8), (6, 11), (2, 4), (1, 8), (5, 6), (1, 5), (5, 7), (3, 8), (3, 10), (4, 6), (10, 11), (3, 5), (2, 8), (2, 5), (4, 11), (1, 6), (5, 9), (7, 10), (6, 10), (2, 3), (1, 4), (1, 9), (1, 11)]
Friendships to create: 16

USERS:
{1: User 1, 2: User 2, 3: User 3, 4: User 4, 5: User 5, 6: User 6, 7: User 7, 8: User 8, 9: User 9, 10: User 10, 11: User 11}
FRIENDSHIPS:
{1: {7}, 2: {9, 11, 6}, 3: {9, 11}, 4: {9, 5}, 5: {4}, 6: {8, 9, 2}, 7: {9, 11, 1}, 8: {9, 10, 11, 6}, 9: {2, 3, 4, 6, 7, 8, 11}, 10: {8}, 11: {2, 3, 7, 8, 9}}
CONNECTIONS:
{1: [1], 7: [1, 7], 9: [1, 7, 9], 11: [1, 7, 11], 2: [1, 7, 9, 2], 3: [1, 7, 9, 3], 4: [1, 7, 9, 4], 6: [1, 7, 9, 6], 8: [1, 7, 9, 8], 5: [1, 7, 9, 4, 5], 10: [1, 7, 9, 8, 10]}

```
{% endtab %}
{% endtabs %}

