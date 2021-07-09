"""
Topologically sort a directed acyclic graph with cycle detection.

Andrew Gillis
2009

"""
from __future__ import print_function


def toposort(edges, child_first=False, exclude_src_only=False):
    """Topologically sort a directed acyclic graph.

    A topological sort of a DAG G = (V, E) is a linear ordering of all its
    vertices such that if G contains an edge (u, v), then u appears before v in
    the ordering.

    This topological sort can be used to put items in dependency order, where
    the destination vertex is considered to be dependent on the source vertex.

    IMPORTANT: If the exclude_src_only option is set to True, then this sort
    will not return any vertices that only occur as sources.  This is used for
    dependency sorting when items that are ONLY sources (parents) of other
    items are not to be considered as items to be sorted.

    This sort finds cycles when building its dependency map.  If the graph is
    determined to have a cycle, then None is returned and sorting is not done.

    Arguments:
    edges       -- Sequence of data elements, where each element contains two
                   vertices and can therefore represent an edge in the graph.
    child_first -- If False, then the the edge consists of (parent, child).
                   Otherwise, the edge consists of {child, parent}.  The child
                   is always the node that depends on the parent.

    Returns:
    Ordered list of vertices where each vertex occurs before any of its
    destination vertices.

    """
    # For each node (vertex), create a list of the parent nodes it depends on.
    node_parent_map = {}
    for edge in edges:
        if child_first:
            child, parent = edge[0], edge[1]
        else:
            parent, child = edge[0], edge[1]

        if parent == child:
            raise RuntimeError("nodes in edge cannot be the same")

        if parent is not None and not exclude_src_only:
            node_parent_map.setdefault(parent, [])
        if child is not None:
            parent_list = node_parent_map.setdefault(child, [])
            if parent is not None:
                parent_list.append(parent)

    topo_sorted = []
    seen = None
    while node_parent_map:
        for node in node_parent_map:
            plist = node_parent_map[node]
            # If the same node is seen again, and nothing has been moved to the
            # sorted list, then there is a cycle in the graph.
            if seen is None:
                seen = node
            elif seen is node:
                raise RuntimeError(
                    'cycle found, cannot continue topological sort')

            keep = False
            # Iterate node's parents to see if any are still unsorted.
            for i, p in enumerate(plist):
                if p in node_parent_map:
                    # Node has unsorted parents, so keep it in unsorted map.
                    keep = True
                    # Keeping node, so remove any parents that are sorted.
                    if i > 0:
                        node_parent_map[node] = plist[i:]
                    break

            if not keep:
                topo_sorted.append(node)
                del node_parent_map[node]
                seen = None
                # Break here is critical since node_parent_map has changed.
                break

    return topo_sorted


if __name__ == '__main__':
    # Example sorting a DAG, and a graph with a cycle:
    #
    print('\nSorting graph:')
    print('A--> B--> D--> E <---F')
    print('|         ^          |')
    print('|         |          |')
    print('+-------> C <--------+')
    edges = [
        ('B', 'D'), ('D', 'E'), ('A', 'B'), ('A', 'C'), ('C', 'D'), ('F', 'C'),
        ('F', 'E')]
    print(toposort(edges))

    print('\nSorting graph with cycle:')
    print('          +---------------+')
    print('          |               |')
    print('A--> B--> D--> E <---F <--+')
    print('|         ^          |')
    print('|         |          |')
    print('+-------> C <--------+')
    # There is a cycle: D->F->C->D
    edges_with_cycle = [
        ('B', 'D'), ('D', 'E'), ('A', 'B'), ('A', 'C'), ('C', 'D'), ('F', 'C'),
        ('F', 'E'), ('D', 'F')]

    print(toposort(edges_with_cycle))
