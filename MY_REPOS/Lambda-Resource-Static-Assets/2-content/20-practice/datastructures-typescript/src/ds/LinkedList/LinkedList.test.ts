import LinkedList from './LinkedList';

// TODO: This is useful enough to be part of the LinkedList API, but how?
//   - new LinkedList(1, 2, 3) ?
//   - LinkedList.of(1, 2, 3) ?
function listOf<T>(...args: Array<T>): LinkedList<T> {
  const list = new LinkedList<T>();
  args.forEach(a => list.addBack(a));
  return list;
}

describe('LinkedList', () => {
  const testListIsACopy = (listFactory, getFirstCorrespondingNode) => {
    it('returns a copy of the list', () => {
      const list = listOf('one', 'two', 'three');
      const newList = listFactory(list);
      expect(newList).not.toBe(list);
    });

    it(`copies each of the list's internal nodes`, () => {
      const list = listOf('one', 'two', 'three');
      const newList = listFactory(list);

      // I prefer to use public APIs in tests, but it's necessary to access
      // the nodes directly here to make sure they are not reused.
      // Note: This is probably a type error because `head` is private, but
      // intellisense for imported modules is apparently broken in CodeSandbox
      // right now. A "fix" for this is probably casting `list` and `newList`
      // to `any` before accessing `head`.
      for (
        let listNode = getFirstCorrespondingNode(list), newListNode = newList.head;
        listNode && newListNode;
        listNode = listNode.next, newListNode = newListNode.next
      ) {
        expect(listNode).not.toBe(newListNode);
      }
    });
  };

  describe('length', () => {
    it('has a length of 0 when created', () => {
      const list = listOf();
      expect(list.length).toBe(0);
    });

    it('reports the correct number of elements as new elements are added', () => {
      const list = listOf('one');
      expect(list.length).toBe(1);
      list.addFront('two');
      expect(list.length).toBe(2);
      list.addBack('three');
      expect(list.length).toBe(3);
    });
  });

  describe('isEmpty', () => {
    it('is empty when first created', () => {
      const list = listOf();
      expect(list.isEmpty).toBe(true);
    });

    it('is not empty when elements are added', () => {
      const list = listOf('one');
      expect(list.isEmpty).toBe(false);
    });

    it('is empty when all items are removed', () => {
      const list = listOf('one', 'two');
      list.removeFront();
      expect(list.isEmpty).toBe(false);
      list.removeFront();
      expect(list.isEmpty).toBe(true);
    });
  });

  describe('toArray', () => {
    it('returns an empty array when called on an empty list', () => {
      const list = listOf();
      expect(list.toArray()).toEqual([]);
    });

    it('returns an array of all emements in the list, in sequence', () => {
      const list = listOf('one');
      expect(list.toArray()).toEqual(['one']);
      list.addBack('two');
      expect(list.toArray()).toEqual(['one', 'two']);
      list.addBack('three');
      expect(list.toArray()).toEqual(['one', 'two', 'three']);
    });
  });

  describe('addFront', () => {
    it('increases the length of the list by 1', () => {
      const list = listOf();
      expect(list.length).toBe(0);
      list.addFront('one');
      expect(list.length).toBe(1);
    });

    it('adds the element to the list', () => {
      const list = listOf();
      expect(list.contains('one')).toBe(false);
      list.addFront('one');
      expect(list.contains('one')).toBe(true);
    });

    it('adds the element to the front of the list', () => {
      const list = listOf();
      list.addFront('one');
      expect(list.first()).toBe('one');
      list.addFront('two');
      expect(list.first()).toBe('two');
    });

    it('returns the given element', () => {
      const list = listOf();
      const element = list.addFront('one');
      expect(element).toBe('one');
    });

    it('allows the same element to be added multiple times', () => {
      const list = listOf();
      list.addFront('one');
      list.addFront('one');
      expect(list.toArray()).toEqual(['one', 'one']);
    });
  });

  describe('addBack', () => {
    it('increases the length of the list by 1', () => {
      const list = listOf();
      expect(list.length).toBe(0);
      list.addBack('one');
      expect(list.length).toBe(1);
    });

    it('adds the element to the list', () => {
      const list = listOf();
      expect(list.contains('one')).toBe(false);
      list.addBack('one');
      expect(list.contains('one')).toBe(true);
    });

    it('adds the element to the front of the list', () => {
      const list = listOf();
      list.addBack('one');
      expect(list.last()).toBe('one');
      list.addBack('two');
      expect(list.last()).toBe('two');
    });

    it('returns the given element', () => {
      const list = listOf();
      const element = list.addBack('one');
      expect(element).toBe('one');
    });

    it('allows the same element to be added multiple times', () => {
      const list = listOf();
      list.addBack('one');
      list.addBack('one');
      expect(list.toArray()).toEqual(['one', 'one']);
    });
  });

  describe('removeFront', () => {
    it('removes one element from the list', () => {
      const list = listOf('one', 'two', 'three');
      expect(list.length).toBe(3);
      list.removeFront();
      expect(list.length).toBe(2);
    });

    it('removes the first element from the list', () => {
      const list = listOf('one', 'two', 'three');
      list.removeFront();
      expect(list.first()).toBe('two');
    });

    it('returns the removed element', () => {
      const list = listOf('one');
      list.addBack('one');
      const value = list.removeFront();
      expect(value).toBe('one');
    });

    it('throws when remove is called on an empty list', () => {
      const list = listOf();
      expect(() => list.removeFront()).toThrow();
    });
  });

  describe('removeAll', () => {
    it('fails gracefully if called on an empty list', () => {
      const list = listOf();
      expect(() => list.removeAll()).not.toThrow();
    });

    it('removes all elements from the list', () => {
      const list = listOf(1, 2, 3);
      expect(list.toArray()).toEqual([1, 2, 3]);
      list.removeAll();
      expect(list.toArray()).toEqual([]);
    });

    it(`sets the list's length to zero`, () => {
      const list = listOf(1, 2, 3);
      list.removeAll();
      expect(list.length).toBe(0);
    });

    it('removes the head node', () => {
      // It's necessary to dig into the internals here.
      const list = listOf(1, 2, 3);
      expect(list.head).toBeDefined();
      list.removeAll();
      expect(list.head).toBeUndefined();
    });

    it('removes the tail node', () => {
      // It's necessary to dig into the internals here.
      const list = listOf(1, 2, 3);
      expect(list.tail).toBeDefined();
      list.removeAll();
      expect(list.tail).toBeUndefined();
    });

    it('returns nothing', () => {
      const list = listOf(1, 2, 3);
      expect(list.removeAll()).toBeUndefined();
    });

    it('does not break the list', () => {
      const list = listOf('one', 'two', 'three');
      list.removeAll();
      expect(list.toArray()).toEqual([]);
      list.addBack('four');
      list.addBack('five');
      expect(list.toArray()).toEqual(['four', 'five']);
      list.removeAll();
      expect(list.toArray()).toEqual([]);
    });
  });

  describe('first', () => {
    it('returns the first element in the list', () => {
      const list = listOf('one');
      expect(list.first()).toBe('one');
      list.addBack('two');
      expect(list.first()).toBe('one');
      list.removeFront();
      expect(list.first()).toBe('two');
    });

    it('throws when first is called on an empty list', () => {
      const list = listOf();
      expect(() => list.first()).toThrow();
    });
  });

  describe('last', () => {
    it('returns the last element in the list', () => {
      const list = listOf('one');
      expect(list.last()).toBe('one');
      list.addBack('two');
      expect(list.last()).toBe('two');
      list.removeFront();
      expect(list.last()).toBe('two');
    });

    it('throws when last is called on an empty list', () => {
      const list = listOf();
      expect(() => list.last()).toThrow();
    });
  });

  describe('rest', () => {
    testListIsACopy(l => l.rest(), l => l.head.next);

    it('returns a list that does not share new elements with the old list', () => {
      const list = listOf('one', 'two');
      const newList = list.rest();
      list.addBack('three');
      newList.addBack('four');
      expect(list.toArray()).toEqual(['one', 'two', 'three']);
      expect(newList.toArray()).toEqual(['two', 'four']);
    });

    it('returns a list with one fewer elements', () => {
      const list = listOf('one', 'two', 'three');
      const newList = list.rest();
      expect(newList.length).toBe(list.length - 1);
    });

    it('throws when called on an empty list', () => {
      const list = listOf();
      expect(() => list.rest()).toThrow();
    });

    it('returns a list without the first element', () => {
      const list = listOf('one', 'two', 'three');
      const newList = list.rest();
      expect(newList.toArray()).toEqual(['two', 'three']);
    });
  });

  describe('butLast', () => {
    testListIsACopy(l => l.butLast(), l => l.head);

    it('returns a list that does not share new elements with the old list', () => {
      const list = listOf('one', 'two');
      const newList = list.butLast();
      list.addBack('three');
      newList.addBack('four');
      expect(list.toArray()).toEqual(['one', 'two', 'three']);
      expect(newList.toArray()).toEqual(['one', 'four']);
    });

    it('returns a list with one fewer elements', () => {
      const list = listOf('one', 'two', 'three');
      const newList = list.butLast();
      expect(newList.length).toBe(list.length - 1);
    });

    it('throws when called on an empty list', () => {
      const list = listOf();
      expect(() => list.butLast()).toThrow();
    });

    it('returns a list without the last element', () => {
      const list = listOf('one', 'two', 'three');
      const newList = list.butLast();
      expect(newList.toArray()).toEqual(['one', 'two']);
    });
  });

  describe('get', () => {
    it('returns the element at the given index', () => {
      const list = listOf('one', 'two', 'three');
      expect(list.get(0)).toBe('one');
      expect(list.get(1)).toBe('two');
      expect(list.get(2)).toBe('three');
    });

    it('accepts negative indices for accessing elements from the end of the list', () => {
      const list = listOf('one', 'two', 'three');
      expect(list.get(-1)).toBe('three');
      expect(list.get(-2)).toBe('two');
      expect(list.get(-3)).toBe('one');
    });

    it(`throws when given a negative index whose absolute value is larger than the list's length`, () => {
      const list = listOf(1, 2, 3);
      expect(() => list.get(-4)).toThrow();
    });

    it('throws when given an index greater than the last index in the list', () => {
      const list = listOf(1, 2, 3);
      expect(() => list.get(3)).toThrow();
    });
  });

  describe('forEach', () => {
    it('calls the given callback function for each element in the list', () => {
      type Value = { seen: boolean };
      const a = { seen: false };
      const b = { seen: false };
      const list = listOf(a, b);
      // TODO: This is not type-compatible with LinkedList.forEach because it doesn't
      // accept a second index parameter, but it's hard to build that because CodeSandbox
      // isn't giving me type hints or error messages in this file.
      list.forEach(v => (v.seen = true));
      expect(a.seen).toBe(true);
      expect(b.seen).toBe(true);
    });

    it('iterates over each element in order', () => {
      const values = [];
      const list = listOf('a', 'b', 'c');
      list.forEach(v => values.push(v));
      expect(values).toEqual(['a', 'b', 'c']);
    });

    it(`passes the element's index as an optional second parameter to the callback function`, () => {
      const indices = [];
      const list = listOf('a', 'b', 'c');
      list.forEach((v, index) => indices.push(index));
      expect(indices).toEqual([0, 1, 2]);
    });

    it('does not throw if called on an empty list', () => {
      const list = listOf();
      expect(() => list.forEach(v => {})).not.toThrow();
    });
  });

  describe('contains', () => {
    it('returns false when called on an empty list', () => {
      const list = listOf();
      expect(list.length).toBe(0);
      expect(list.contains('one')).toBe(false);
    });

    it('returns false when given an element not in the list', () => {
      const list = listOf('one', 'two');
      expect(list.contains('three')).toBe(false);
    });

    it('returns true when given an element in the list', () => {
      const list = listOf('one', 'two');
      expect(list.contains('one')).toBe(true);
    });

    it('accepts a function to be used for equality checking', () => {
      type Person = { name: string };
      const list = listOf<Person>({ name: 'Bob' });
      expect(list.contains({ name: 'Bob' })).toBe(false);
      expect(list.contains({ name: 'Bob' }, (a, b) => a.name === b.name)).toBe(true);
    });

    it(`uses the list's equality function if no equality function is given`, () => {
      type Person = { name: string };
      const list = listOf<Person>({ name: 'Bob' });
      expect(list.contains({ name: 'Bob' })).toBe(false);
      list.setEqualityFn((a, b) => a.name === b.name);
      expect(list.contains({ name: 'Bob' })).toBe(true);
      expect(list.contains({ name: 'Bob' }, (a, b) => a === b)).toBe(false);
    });
  });

  describe('slice', () => {
    testListIsACopy(l => l.slice(), l => l.head);

    it('returns a list of the same length when given no arguments', () => {
      const list = listOf('one', 'two', 'three');
      const newList = list.slice();
      expect(newList.length).toBe(list.length);
    });

    it('returns a full copy of the list when given no arguments', () => {
      const list = listOf('one', 'two', 'three');
      const newList = list.slice();
      expect(newList.toArray()).toEqual(list.toArray());
    });

    it('returns a list that does not share new elements with the old list', () => {
      const list = listOf('one', 'two');
      const newList = list.slice();
      list.addBack('three');
      newList.addBack('four');
      expect(list.toArray()).toEqual(['one', 'two', 'three']);
      expect(newList.toArray()).toEqual(['one', 'two', 'four']);
    });

    it('returns a list that starts at the given start index', () => {
      const list = listOf('one', 'two', 'three');
      expect(list.slice(0).toArray()).toEqual(['one', 'two', 'three']);
      expect(list.slice(1).toArray()).toEqual(['two', 'three']);
      expect(list.slice(2).toArray()).toEqual(['three']);
      expect(list.slice(3).toArray()).toEqual([]);
    });

    it('returns a list that ends at the given end index', () => {
      const list = listOf('one', 'two', 'three');
      expect(list.slice(0, 2).toArray()).toEqual(['one', 'two', 'three']);
      expect(list.slice(0, 1).toArray()).toEqual(['one', 'two']);
      expect(list.slice(0, 0).toArray()).toEqual(['one']);
    });

    it('clamps the end index to the last index in the list', () => {
      const list = listOf('one', 'two', 'three');
      expect(list.slice(0, 10).toArray()).toEqual(['one', 'two', 'three']);
    });

    it('returns a list that ends at the last index, given no end index', () => {
      const list = listOf('one', 'two', 'three');
      expect(list.slice(0).toArray()).toEqual(['one', 'two', 'three']);
    });

    it('subtracts negative end indices from the length of the list', () => {
      const list = listOf('one', 'two', 'three');
      expect(list.slice(0, -1).toArray()).toEqual(['one', 'two', 'three']);
      expect(list.slice(0, -2).toArray()).toEqual(['one', 'two']);
      expect(list.slice(0, -3).toArray()).toEqual(['one']);
      expect(list.slice(0, -4).toArray()).toEqual([]);
    });

    it('returns a part of the list given both a start and end index', () => {
      const list = listOf('one', 'two', 'three', 'four', 'five');
      expect(list.slice(0, 2).toArray()).toEqual(['one', 'two', 'three']);
      expect(list.slice(1, 3).toArray()).toEqual(['two', 'three', 'four']);
      expect(list.slice(1, 4).toArray()).toEqual(['two', 'three', 'four', 'five']);
      expect(list.slice(2, 4).toArray()).toEqual(['three', 'four', 'five']);
      expect(list.slice(3, 4).toArray()).toEqual(['four', 'five']);
    });

    it('fails gracefully if given a start index greater than the last index in the list', () => {
      const list = listOf('one');
      expect(() => list.slice(2)).not.toThrow();
    });
  });

  describe('clone', () => {
    testListIsACopy(l => l.clone(), l => l.head);

    it('creates a full copy of the list', () => {
      const list = listOf('one', 'two', 'three');
      const newList = list.clone();
      expect(newList.toArray()).toEqual(list.toArray());
    });

    it('returns a list with the same elements from the original list', () => {
      type Person = { name: string };
      const bob: Person = { name: 'Bob' };
      const list = listOf(bob);
      const newList = list.clone();
      expect(newList.first()).toBe(bob);
    });
  });

  describe('map', () => {
    testListIsACopy(l => l.map(a => a), l => l.head);

    it('returns a new list of the same size', () => {
      const list = listOf('one', 'two', 'three');
      const newList = list.map(a => a);
      expect(newList.length).toBe(list.length);
    });

    it('returns a list containing the results of calling the element mapper function on each element in the original list', () => {
      const list = listOf(1, 2, 3);
      const newList = list.map(a => a * a);
      expect(newList.toArray()).toEqual([1, 4, 9]);
    });

    it('can return a new list containing a different type of element', () => {
      type Person = { name: string };
      const list = listOf('Bob', 'Jane');
      const newList: LinkedList<Person> = list.map(name => ({ name }));
      expect(newList.toArray()).toEqual([{ name: 'Bob' }, { name: 'Jane' }]);
    });
  });

  describe('filter', () => {
    testListIsACopy(l => l.filter(v => v), l => l.head);

    it('returns a full copy of the list when given the identity predicate', () => {
      const list = listOf('one', 'two', 'three');
      const newList = list.filter(v => v);
      expect(newList.length).toBe(list.length);
      expect(newList.toArray()).toEqual(list.toArray());
    });

    it('returns an empty list when given a predicate that always returns false', () => {
      const list = listOf('one', 'two', 'three');
      const newList = list.filter(v => false);
      expect(newList.length).toBe(0);
      expect(newList.toArray()).toEqual([]);
    });

    it('returns a new list with only the elements where predicateFn(element) evaluates to true', () => {
      const list = listOf(1, 2, 3, 4, 5);
      expect(list.filter(v => v % 2 === 0).toArray()).toEqual([2, 4]);
      expect(list.filter(v => v % 2 === 1).toArray()).toEqual([1, 3, 5]);
    });
  });

  describe('reject', () => {
    testListIsACopy(l => l.reject(v => v), l => l.head);

    it('returns a full copy of the list when given a predicate that always returns false', () => {
      const list = listOf('one', 'two', 'three');
      const newList = list.reject(v => false);
      expect(newList.length).toBe(list.length);
      expect(newList.toArray()).toEqual(list.toArray());
    });

    it('returns an empty list when given the identity predicate', () => {
      const list = listOf('one', 'two', 'three');
      const newList = list.reject(v => v);
      expect(newList.length).toBe(0);
      expect(newList.toArray()).toEqual([]);
    });

    it('returns a new list with only the elements where predicateFn(element) evaluates to false', () => {
      const list = listOf(1, 2, 3, 4, 5);
      expect(list.reject(v => v % 2 === 0).toArray()).toEqual([1, 3, 5]);
      expect(list.reject(v => v % 2 === 1).toArray()).toEqual([2, 4]);
    });
  });

  describe('reverse', () => {
    testListIsACopy(l => l.reverse(), l => l.head);

    it('returns a list of the same size', () => {
      const list = listOf('one', 'two', 'three');
      const newList = list.reverse();
      expect(newList.length).toBe(list.length);
    });

    it('returns a new list with elements in reverse order', () => {
      const list = listOf('one', 'two', 'three');
      const newList = list.reverse();
      expect(newList.toArray()).toEqual(['three', 'two', 'one']);
    });
  });
});
