"""
Fast random shuffle of items in list.

"""
from __future__ import print_function

import random

try:
    xrange
except NameError:
    xrange = range


def shuffle(x):
    """Randomize the order, in-place, of items in a list."""
    for i in xrange(len(x)-1, 0, -1):
        # Exchange element x[:i+1] with x[i]
        j = int(random.random() * (i+1))
        x[i], x[j] = x[j], x[i]


if __name__ == '__main__':
    alpha = list('abcdefghijklmnopqrstuvwxyz')
    print('Before:', ''.join(alpha))
    shuffle(alpha)
    print('After:', ''.join(alpha))
    shuffle(alpha)
    print('Again:', ''.join(alpha))
    shuffle(alpha)
    print('Again:', ''.join(alpha))
