import unittest
from ancestor import earliest_ancestor

<<<<<<< HEAD
class Test(unittest.TestCase):

    '''
=======

class Test(unittest.TestCase):

    """
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
       10
     /
    1   2   4  11
     \ /   / \ /
      3   5   8
       \ / \   \
        6   7   9
<<<<<<< HEAD
    '''
    def test_earliest_ancestor(self):
        test_ancestors = [(1, 3), (2, 3), (3, 6), (5, 6), (5, 7), (4, 5), (4, 8), (8, 9), (11, 8), (10, 1)]
=======
    """

    def test_earliest_ancestor(self):
        test_ancestors = [
            (1, 3),
            (2, 3),
            (3, 6),
            (5, 6),
            (5, 7),
            (4, 5),
            (4, 8),
            (8, 9),
            (11, 8),
            (10, 1),
        ]
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
        self.assertEqual(earliest_ancestor(test_ancestors, 1), 10)
        self.assertEqual(earliest_ancestor(test_ancestors, 2), -1)
        self.assertEqual(earliest_ancestor(test_ancestors, 3), 10)
        self.assertEqual(earliest_ancestor(test_ancestors, 4), -1)
        self.assertEqual(earliest_ancestor(test_ancestors, 5), 4)
        self.assertEqual(earliest_ancestor(test_ancestors, 6), 10)
        self.assertEqual(earliest_ancestor(test_ancestors, 7), 4)
        self.assertEqual(earliest_ancestor(test_ancestors, 8), 4)
        self.assertEqual(earliest_ancestor(test_ancestors, 9), 4)
        self.assertEqual(earliest_ancestor(test_ancestors, 10), -1)
        self.assertEqual(earliest_ancestor(test_ancestors, 11), -1)

<<<<<<< HEAD
if __name__ == '__main__':
    unittest.main()
=======

if __name__ == "__main__":
    unittest.main()
>>>>>>> 23fb4d348bb9c7b7b370cb2afcd785793e3816ea
