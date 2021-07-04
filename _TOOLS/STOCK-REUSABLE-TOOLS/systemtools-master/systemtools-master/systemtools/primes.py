#
# Find prime numbers, count how many there are, and optionally show distance
# between them.
#
from __future__ import print_function
import sys
import math


def primes(n, show_dist):
    if n < 2:
        return []
    numbers = [0]*(n+1)
    primes = [2]
    # Mark all odd numbers as maybe prime, leave evens marked composit.
    for i in xrange(3, n+1, 2):
        numbers[i] = 1

    sqn = int(math.sqrt(n))
    # Starting with 3, look at each odd number.
    for i in xrange(3, len(numbers), 2):
        # Skip if composit.
        if numbers[i] == 0:
            continue
        # Number is prime.  Would have been marked as composit if there were
        # any smaller prime factors already examined.
        primes.append(i)
        if i > sqn:
            # All the remaining odd numbers not marked composit must be prime.
            primes.extend([i for i in xrange(i+2, len(numbers), 2)
                           if numbers[i]])
            break
        # Mark all multiples of the prime as composit.  Check odd multiples.
        for r in xrange(i*i, len(numbers), i*2):
            numbers[r] = 0

    if show_dist:
        nums(numbers)
    return primes


def nums(numbers):
    i = 1
    numbers[2] = 1
    for n in numbers[1:]:
        if n:
            print('*', end='')
        else:
            print('_', end='')
        if i == 80:
            i = 1
            print()
        else:
            i += 1
    print()


def main():
    import argparse
    ap = argparse.ArgumentParser(
        description='Find all primes up to the given value')
    ap.add_argument('max', type=int, help='Find primes up to this value')
    ap.add_argument('--quiet', '-q', action='store_true',
                    help='Only count primes found, do not show them')
    ap.add_argument('--distance', '-d', action='store_true',
                    help='Show distance between primes')
    args = ap.parse_args()

    n = int(args.max)
    if n < 0:
        print("max cannot be negative", file=sys.stderr)
        return 1

    p = primes(n, args.distance)
    if not args.quiet:
        for x in p:
            print(x, end=' ')
        print()

    print("Found", len(p), "primes <=", n)
    return 0


if __name__ == '__main__':
    sys.exit(main())
