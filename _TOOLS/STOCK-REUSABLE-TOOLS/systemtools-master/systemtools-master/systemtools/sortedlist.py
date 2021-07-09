"""
Keep a list, or unique list, of items in sorted order.

The SortedList and UniqueSortedList objects can be saved to and loaded from a
file.  Binary search is used to find items in list and insertion location of
new items.

"""
import bisect


class SortedList(object):

    """
    Maintain a list of items in sorted (ascending) order.

    """

    def __init__(self, sequence=None):
        self._items = sorted(sequence) if sequence else []

    def __str__(self):
        return str(self._items)

    def __repr__(self):
        return repr(self._items)

    def __len__(self):
        return len(self._items)

    def __bool__(self):
        return bool(self._items)

    # PY2 support
    __nonzero__ = __bool__

    def __getitem__(self, key):
        return self._items.__getitem__(key)

    def __delitem__(self, key):
        del self._items[key]

    def __iter__(self):
        return self._items.__iter__()

    def __reversed__(self):
        return self._items.__reversed__()

    def __contains__(self, item):
        return self.find(item) is not None

    def index(self, x):
        a = self._items
        i = bisect.bisect_left(a, x)
        if i != len(a) and a[i] == x:
            return i
        raise ValueError('%s is not inlist' % (x,))

    def find(self, x):
        a = self._items
        i = bisect.bisect_left(a, x)
        if i != len(a) and a[i] == x:
            return i
        return None

    def find_startswith(self, x, begin=None, end=None):
        if begin or end:
            a = self._items[begin:end]
        else:
            a = self._items
        i = bisect.bisect_left(a, x)
        if i != len(a) and a[i].startswith(x):
            if begin:
                return i + begin
            return i
        return None

    def insert(self, x):
        a = self._items
        i = bisect.bisect_left(a, x)
        a.insert(i, x)
        return i

    def extend(self, seq):
        a = self._items
        for x in seq:
            a.insert(bisect.bisect_left(a, x), x)

    def remove(self, x):
        del self._items[self.index(x)]

    def pop(self, i=-1):
        x = self._items[i]
        del self._items[i]
        return x

    def insertion_index(self, x):
        return bisect.bisect_left(self._items, x)

    def get_lines(self, start=None, end=None):
        return '\n'.join((str(x) for x in self._items[start:end]))

    def load(self, filename, keep_case=False):
        with open(filename) as infile:
            if keep_case:
                items = [line.strip() for line in infile]
            else:
                items = [line.strip().lower() for line in infile]

        items.sort()
        self._items = items
        return len(items)

    def save(self, filename):
        with open(filename, 'w') as outfile:
            outfile.write(str(self))



class UniqueSortedList(SortedList):

    """
    Maintain a list of unique items in sorted (ascending) order.

    """

    def __init__(self, sequence=None):
        SortedList.__init__(self, set(sequence))

    def insert(self, x):
        a = self._items
        i = bisect.bisect_left(a, x)
        if i != len(a) and a[i] == x:
            return None
        a.insert(i, x)
        return i

    def extend(self, seq):
        a = self._items
        for x in seq:
            i = bisect.bisect_left(a, x)
            if i != len(a) and a[i] == x:
                continue
            a.insert(i, x)

    def load(self, filename, keep_case=False):
        with open(filename) as infile:
            if keep_case:
                items = {line.strip() for line in infile}
            else:
                items = {line.strip().lower() for line in infile}

        items = sorted(items)
        self._items = items
        return len(items)

