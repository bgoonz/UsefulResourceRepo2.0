package data.structures.java.graphs;

import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.*;

public class DijkstraShortestPathDirectedTest
{
  @Test
  public void getShortestPath()
  {
    DijkstraShortestPathDirected.Vertex a = new DijkstraShortestPathDirected.Vertex("A");
    DijkstraShortestPathDirected.Vertex b = new DijkstraShortestPathDirected.Vertex("B");
    DijkstraShortestPathDirected.Vertex c = new DijkstraShortestPathDirected.Vertex("C");
    DijkstraShortestPathDirected.Vertex d = new DijkstraShortestPathDirected.Vertex("D");
    DijkstraShortestPathDirected.Vertex e = new DijkstraShortestPathDirected.Vertex("E");
    DijkstraShortestPathDirected.Vertex f = new DijkstraShortestPathDirected.Vertex("F");
    DijkstraShortestPathDirected.Vertex g = new DijkstraShortestPathDirected.Vertex("G");
    DijkstraShortestPathDirected.Vertex h = new DijkstraShortestPathDirected.Vertex("H");

    new DijkstraShortestPathDirected.Edge(5, a, b);
    new DijkstraShortestPathDirected.Edge(8, a, h);
    new DijkstraShortestPathDirected.Edge(9, a, e);
    new DijkstraShortestPathDirected.Edge(5, e, h);
    new DijkstraShortestPathDirected.Edge(4, e, f);
    new DijkstraShortestPathDirected.Edge(20, e, g);
    new DijkstraShortestPathDirected.Edge(15, b, d);
    new DijkstraShortestPathDirected.Edge(12, b, c);
    new DijkstraShortestPathDirected.Edge(4, b, h);
    new DijkstraShortestPathDirected.Edge(6, h, f);
    new DijkstraShortestPathDirected.Edge(7, h, c);
    new DijkstraShortestPathDirected.Edge(1, f, c);
    new DijkstraShortestPathDirected.Edge(13, f, g);
    new DijkstraShortestPathDirected.Edge(9, d, g);
    new DijkstraShortestPathDirected.Edge(11, c, g);

    DijkstraShortestPathDirected.computePath(a);
    List<DijkstraShortestPathDirected.Vertex> path = new ArrayList<>();
    int distance = DijkstraShortestPathDirected.getShortestPath(g, path);
    assertEquals(25, distance);
    assertEquals(5, path.size());
    assertEquals(a, path.get(0));
    assertEquals(e,path.get(1));
    assertEquals(f,path.get(2));
    assertEquals(c,path.get(3));
    assertEquals(g,path.get(4));
  }
}