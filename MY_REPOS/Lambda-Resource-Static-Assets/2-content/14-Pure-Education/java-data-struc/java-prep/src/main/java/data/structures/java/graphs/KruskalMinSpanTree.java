package data.structures.java.graphs;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class KruskalMinSpanTree
{
  /*
  use Node to establish parent-child relationships between Vertices and to prevent cycles.
  Each Vertex will contain a Node.
  1.  Sort edges by their weight
  2.  Start off with all Vertices being disjoint, for example:
      A B C D E F G
  3.  DisjointSet wil be responsible for for most of the work
      a.  Starting with the lowest weight edge, get its vertices (which will be disjoint) and join (union) one vertex to another.
          i.  Once a Vertex has a parent, when you call DisjointSet.find, it will return the id of the parent
      b.  Proceed to other edges with lowest weights. If Node ids of two vertices are not equal, it means they belong to disjoint sets and:
          1.  We can add the current edge to the Minimum Spanning Tree
          2.  We can join (union) two vertices to place them into the same set.
   */
  static class Node
  {
    //  Use Node to establish parent-child relationships and to determine disjoin sets
    int rank;
    int id;
    Node parent;

    Node(int rank, int id, Node parent)
    {
      this.rank = rank;
      this.id = id;
      this.parent = parent;
    }
  }

  static class Vertex
  {
    String name;
    Node node;

    Vertex(String name)
    {
      this.name = name;
    }
  }

  static class Edge implements Comparable<Edge>
  {
    int weight;
    Vertex fromVertex;
    Vertex toVertex;

    Edge(int weight, Vertex from, Vertex to)
    {
      this.weight = weight;
      this.fromVertex = from;
      this.toVertex = to;
    }

    public int getWeight()
    {
      return weight;
    }

    @Override
    public int compareTo(Edge o)
    {
      return Integer.compare(this.weight, o.weight);
    }
  }

  static class DisjointSet
  {
    int nodeIdIndex;
    List<Node> rootNodes = new ArrayList<>();

    DisjointSet(List<Vertex> vertices)
    {
      makeSets(vertices); //  will create a Disjoint set, i.e. each node in its own set with a rank of 0
    }

    void makeSets(List<Vertex> vertices)
    {
      for(Vertex v : vertices)
      {
        Node n = new Node(0, nodeIdIndex++, null);
        v.node = n;
        rootNodes.add(n);
      }
    }

    int find(Node n)
    {
      Node current = n;

      while(current.parent != null)
      {
        current = current.parent;
      }

      //  use path compression to make each node the direct child of the root
      Node root = current;
      current = n;
      while(current != root)
      {
        Node tmp = current.parent;
        current.parent = root;
        current = tmp;
      }
      return root.id;
    }

    void union(Node n1, Node n2)
    {

      int id1 = find(n1);
      int id2 = find(n2);

      //  patternMatch if these nodes are part of the same disjoint set
      if(id1 == id2)
      {
        return;
      }

      Node rootNode1 = rootNodes.get(id1);
      Node rootNode2 = rootNodes.get(id2);
      //  Attach nodes with smaller rank to the node with a higher rank
      if(rootNode1.rank > rootNode2.rank)
      {
        rootNode2.parent = rootNode1;
      }
      else if(rootNode2.rank > rootNode1.rank)
      {
        rootNode1.parent = rootNode2;
      }
      else
      {
        rootNode2.parent = rootNode1;
        rootNode1.rank++;
      }
    }
  }

  public List<Edge> minSpanningTree(List<Vertex> verteces, List<Edge> edges)
  {
    DisjointSet disjointSet = new DisjointSet(verteces);

    Collections.sort(edges);

    List<Edge> resultTree = new ArrayList<>();
    for(Edge e : edges)
    {
      Vertex v1 = e.fromVertex;
      Vertex v2 = e.toVertex;
      if(disjointSet.find(v1.node) != disjointSet.find(v2.node))
      {
        //  Vertices are not in the same set
        resultTree.add(e);
        disjointSet.union(v1.node, v2.node);
      }
    }

    return resultTree;
  }
}
