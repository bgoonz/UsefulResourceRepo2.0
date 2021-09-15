package data.structures.java.heaps;

import java.util.*;

public class CitySkyline
{
  /*
  Buildings are represented with [x1, x2, y} coordinates, for example:
    [ [2 9 10], [3 7 15], [5 12 12], [15 20 10], [19 24 8] ]
  SkyLine is represented with [ x, y ] coordinates, for example:
    [ [2 10], [3 15], [7 12], [12 0], [15 10], [20 8], [24, 0] ]

  Approach:
    1.  Represent a rectangle with two edges: left and right.
    2.  For Left edges:
        a.  For edges with same x coordinate, the edge with largest height prevails
    3.  For right edges:
        a. Edge prevails if it is a last edge in the chain of consecutive buildings

  Design:
    Edge: x, y, Left/Right
    Edge Comparator:
      If edges do not share x coordinate, sort by ascending height
      If edges do share same x coordinate
        If they are both start edges, sort descending by height
        If they are both end edges, sort ascending by height
        If one is left and the other is right, left comes before right
    Find dominant height among buildings at each coordinate
      Use PriorityQueue to make sure the tallest edge dominates
      Once we detect the right edge of the tallest building, we need to remove left edge from Priority Queue

  */
  static class Edge
  {
    enum Type {LEFT, RIGHT};
    int pos;
    int height;
    Type type;

    Edge(int pos, int height, Type type)
    {
      this.pos = pos;
      this.height = height;
      this.type = type;
    }

    @Override
    public boolean equals(Object o)
    {
      if (this == o)
      {
        return true;
      }
      if (o == null || getClass() != o.getClass())
      {
        return false;
      }
      Edge edge = (Edge) o;
      return pos == edge.pos &&
          height == edge.height &&
          type == edge.type;
    }

    @Override
    public int hashCode()
    {
      return Objects.hash(pos, height, type);
    }
  }

  private int[][] buildings;

  public CitySkyline(int[][] buildings)
  {
    this.buildings = buildings;
  }

  protected void sortEdges(List<Edge> edges)
  {
    edges.sort((e1, e2) -> {
      if(e1.pos != e2.pos) return e1.pos - e2.pos;
      if(e1.type == Edge.Type.LEFT && e2.type == Edge.Type.LEFT) return e2.height - e1.height;
      if(e1.type == Edge.Type.RIGHT && e2.type == Edge.Type.RIGHT) return e1.height - e2.height;
      return Edge.Type.LEFT.compareTo(Edge.Type.RIGHT);
    });
  }

  protected List<Edge> createEdges()
  {
    List<Edge> edges = new ArrayList<>();
    for(int[] building : buildings)
    {
      Edge left = new Edge(building[0], building[2], Edge.Type.LEFT);
      Edge right = new Edge(building[1], building[2], Edge.Type.RIGHT);
      edges.add(left);
      edges.add(right);
    }
    return edges;
  }

  public List<int[]> generateSkyline()
  {
    List<Edge> edges = createEdges();
    sortEdges(edges);

    PriorityQueue<Integer> pq = new PriorityQueue<>(10, Collections.reverseOrder());

    List<int[]> result = new ArrayList<>();
    for(Edge edge : edges)
    {
      if(edge.type == Edge.Type.LEFT)
      {
        if(pq.isEmpty() || pq.peek() < edge.height)
        {
          result.add(new int[] {edge.pos, edge.height});
        }
        pq.offer(edge.height);
      }
      else
      {
        pq.remove(edge.height);
        if(pq.isEmpty() || pq.peek() < edge.height)
        {
          int [] skyline = {edge.pos, pq.isEmpty() ? 0 : pq.peek()};
          result.add(skyline);
        }
      }
    }
    return result;
  }
}
