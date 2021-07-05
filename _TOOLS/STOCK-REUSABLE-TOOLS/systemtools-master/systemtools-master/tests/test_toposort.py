"""
Unit tests for toposort utility.

Test with py.test

"""
from __future__ import print_function

import random
import pytest

# Uncomment to import from repo instead of site-packages.
import os
import sys
parentdir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, parentdir)

from systemtools import toposort


class TestTopologicalSort(object):

    def test_dag(self):
        print('\nSorting graph:')
        print('A--> B--> D--> E <---F')
        print('|         ^          |')
        print('|         |          |')
        print('+-------> C <--------+')
        edges = [
            ('B','D'), ('D','E'), ('A','B'), ('A','C'), ('C','D'), ('F','C'),
            ('F','E')]
        sorted = toposort.toposort(edges)

        # Check that all values are present in sorted list.
        for v in ('A', 'B', 'C', 'D', 'E', 'F'):
            assert v in sorted

        iA = sorted.index('A')
        iB = sorted.index('B')
        iC = sorted.index('C')
        iD = sorted.index('D')
        iE = sorted.index('E')
        iF = sorted.index('F')
        assert iA < iB
        assert iA < iC
        assert iB < iD
        assert iD < iE
        assert iC < iD
        assert iF < iC

    def test_cycle(self):
        print('\nSorting graph with cycle:')
        print('          +---------------+')
        print('          |               |')
        print('A--> B--> D--> E <---F <--+')
        print('|         ^          |')
        print('|         |          |')
        print('+-------> C <--------+')
        # There is a cycle: D->F->C->D
        edges_with_cycle = [
            ('B','D'), ('D','E'), ('A','B'), ('A','C'), ('C','D'), ('F','C'),
            ('F','E'), ('D', 'F')]

        # Check that a graph with a cycle raises a RuntimeError exception.
        with pytest.raises(RuntimeError) as ex:
            sorted = toposort.toposort(edges_with_cycle)
            assert str(ex).startswith('cycle found')

    def test_prune_parentless(self):
        print('\nSorting graph:')
        print('A--> B--> D--> E <---F')
        print('|         ^          |')
        print('|         |          |')
        print('+-------> C <--------+')
        edges = [
            ('B','D'), ('D','E'), ('A','B'), ('A','C'), ('C','D'), ('F','C'),
            ('F','E')]
        sorted = toposort.toposort(edges, False, True)

        assert 'A' not in sorted
        assert 'F' not in sorted

        # Check that all values are present in sorted list.
        for v in ('B', 'C', 'D', 'E',):
            assert v in sorted

    def test_exhaustive_topo_sort(self):
        # Edges where edge[1] --> edge[0].
        # In other words each edge is (item, depends_on)
        #
        #    +-->A--+
        # R--|      |-->B
        #    +-->C--+
        #
        edgesA = [('A','R'),('B','A'),('C','R'),('B','C')]
        edgesB = [('B','A'),('A','R'),('B','C'),('C','R')]
        edgesC = [('C','R'),('B','C'),('A','R'),('B','A')]
        edgesD = [('B','C'),('C','R'),('B','A'),('A','R')]

        sorted = toposort.toposort(edgesA, True)
        for v in ('A', 'B', 'C', 'R'):
            assert v in sorted

        iR = sorted.index('R')
        iA = sorted.index('A')
        iC = sorted.index('C')
        iB = sorted.index('B')
        assert iR < iA
        assert iR < iB
        assert iR < iC
        assert iA < iB
        assert iC < iB
        print(sorted)

        sorted = toposort.toposort(edgesB, True)
        for v in ('A', 'B', 'C', 'R'):
            assert v in sorted
        iR = sorted.index('R')
        iA = sorted.index('A')
        iC = sorted.index('C')
        iB = sorted.index('B')
        assert iR < iA
        assert iR < iB
        assert iR < iC
        assert iA < iB
        assert iC < iB
        print(sorted)

        sorted = toposort.toposort(edgesC, True)
        for v in ('A', 'B', 'C', 'R'):
            assert v in sorted
        iR = sorted.index('R')
        iA = sorted.index('A')
        iC = sorted.index('C')
        iB = sorted.index('B')
        assert iR < iA
        assert iR < iB
        assert iR < iC
        assert iA < iB
        assert iC < iB
        print(sorted)

        sorted = toposort.toposort(edgesD, True)
        for v in ('A', 'B', 'C', 'R'):
            assert v in sorted
        iR = sorted.index('R')
        iA = sorted.index('A')
        iC = sorted.index('C')
        iB = sorted.index('B')
        assert iR < iA
        assert iR < iB
        assert iR < iC
        assert iA < iB
        assert iC < iB
        print(sorted)

    def test_bumstead(self):
        # Edges are (x, y) where x depends on y.  In a DAG: y-->x
        clothing = [
            ('jacket', 'tie'), ('jacket', 'belt'),
            ('tie', 'shirt'),
            ('belt', 'shirt'), ('belt', 'pants'),
            ('pants', 'undershorts'),
            ('shoes', 'pants'), ('shoes', 'undershorts'), ('shoes', 'socks'),
            ('watch', None)]

        sorted = toposort.toposort(clothing, True)
        self._validate_clothing(clothing, sorted)

        self._shuffle(clothing)
        sorted = toposort.toposort(clothing, True)
        self._validate_clothing(clothing, sorted)

        self._shuffle(clothing)
        sorted = toposort.toposort(clothing, True)
        self._validate_clothing(clothing, sorted)

        self._shuffle(clothing)
        sorted = toposort.toposort(clothing, True)
        self._validate_clothing(clothing, sorted)

        self._shuffle(clothing)
        sorted = toposort.toposort(clothing, True)
        self._validate_clothing(clothing, sorted)

        self._shuffle(clothing)
        sorted = toposort.toposort(clothing, True)
        self._validate_clothing(clothing, sorted)

        self._shuffle(clothing)
        sorted = toposort.toposort(clothing, True)
        self._validate_clothing(clothing, sorted)

        self._shuffle(clothing)
        sorted = toposort.toposort(clothing, True)
        self._validate_clothing(clothing, sorted)


    def test_bumstead_cycle(self):
        # Edges are (x, y) where x depends on y.  In a DAG: y-->x
        clothing = [
            ('jacket', 'tie'), ('jacket', 'belt'),
            ('tie', 'shirt'),
            ('undershorts', 'shoes'),
            ('belt', 'shirt'), ('belt', 'pants'),
            ('pants', 'undershorts'),
            ('shoes', 'pants'), ('shoes', 'undershorts'), ('shoes', 'socks'),
            ('watch', None)]

        with pytest.raises(RuntimeError) as ex:
            sorted = toposort.toposort(clothing, True)

        self._shuffle(clothing)
        with pytest.raises(RuntimeError) as ex:
            sorted = toposort.toposort(clothing, True)

        self._shuffle(clothing)
        with pytest.raises(RuntimeError) as ex:
            sorted = toposort.toposort(clothing, True)

        self._shuffle(clothing)
        with pytest.raises(RuntimeError) as ex:
            sorted = toposort.toposort(clothing, True)

        self._shuffle(clothing)
        with pytest.raises(RuntimeError) as ex:
            sorted = toposort.toposort(clothing, True)

        self._shuffle(clothing)
        with pytest.raises(RuntimeError) as ex:
            sorted = toposort.toposort(clothing, True)

        self._shuffle(clothing)
        with pytest.raises(RuntimeError) as ex:
            sorted = toposort.toposort(clothing, True)

        self._shuffle(clothing)
        with pytest.raises(RuntimeError) as ex:
            sorted = toposort.toposort(clothing, True)

    def test_zero_id(self):
        edges = [(0, None), (51, -1), (52, -1)]
        sorted = toposort.toposort(edges, True)
        assert len(sorted) == len([0, -1, 51, 51])
        for child, parent in edges:
            assert child in sorted

        print(sorted)

    def _validate_clothing(self, clothing, sorted):
        """Validate that Professor Bumstead dressed himself properly."""

        # Make sure he is wearing all his clothing items.
        for child, parent in clothing:
            assert child in sorted
            assert parent is None or parent in sorted

        # Make sure he put his clothes on in the right order.
        iUndershorts = sorted.index('undershorts')
        iPants = sorted.index('pants')
        iBelt = sorted.index('belt')
        iJacket = sorted.index('jacket')
        iShirt = sorted.index('shirt')
        iTie = sorted.index('tie')
        iSocks = sorted.index('socks')
        iShoes = sorted.index('shoes')
        iWatch = sorted.index('watch')
        assert iUndershorts < iPants
        assert iUndershorts < iShoes
        assert iPants < iShoes
        assert iPants < iBelt
        assert iShirt < iBelt
        assert iShirt < iTie
        assert iTie < iJacket
        assert iSocks < iShoes
        print(sorted)

    @staticmethod
    def _shuffle(x):
        for i in range(len(x)-1, 0, -1):
            # pick an element in x[:i+1] with which to exchange x[i]
            j = int(random.random() * (i+1))
            x[i], x[j] = x[j], x[i]

