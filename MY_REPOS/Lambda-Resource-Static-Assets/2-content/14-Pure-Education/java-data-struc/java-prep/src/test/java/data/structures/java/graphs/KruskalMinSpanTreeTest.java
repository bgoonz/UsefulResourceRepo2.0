package data.structures.java.graphs;

import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

public class KruskalMinSpanTreeTest
{

  @Test
  public void minSpanningTree()
  {
    KruskalMinSpanTree.Vertex a = new KruskalMinSpanTree.Vertex("A");
    KruskalMinSpanTree.Vertex b = new KruskalMinSpanTree.Vertex("B");
    KruskalMinSpanTree.Vertex c = new KruskalMinSpanTree.Vertex("C");
    KruskalMinSpanTree.Vertex d = new KruskalMinSpanTree.Vertex("D");
    KruskalMinSpanTree.Vertex e = new KruskalMinSpanTree.Vertex("E");
    KruskalMinSpanTree.Vertex f = new KruskalMinSpanTree.Vertex("F");
    KruskalMinSpanTree.Vertex g = new KruskalMinSpanTree.Vertex("G");

    KruskalMinSpanTree.Edge ab = new KruskalMinSpanTree.Edge(2, a, b);
    KruskalMinSpanTree.Edge be = new KruskalMinSpanTree.Edge(3, b, e);
    KruskalMinSpanTree.Edge ed = new KruskalMinSpanTree.Edge(4, e, d);
    KruskalMinSpanTree.Edge dg = new KruskalMinSpanTree.Edge(5, d, g);
    KruskalMinSpanTree.Edge gf = new KruskalMinSpanTree.Edge(5, g, f);
    KruskalMinSpanTree.Edge fa = new KruskalMinSpanTree.Edge(10, f, a);
    KruskalMinSpanTree.Edge ac = new KruskalMinSpanTree.Edge(6, a, c);
    KruskalMinSpanTree.Edge ae = new KruskalMinSpanTree.Edge(5, a, e);
    KruskalMinSpanTree.Edge cd = new KruskalMinSpanTree.Edge(1, c, d);
    KruskalMinSpanTree.Edge bd = new KruskalMinSpanTree.Edge(3, b, d);
    KruskalMinSpanTree.Edge fc = new KruskalMinSpanTree.Edge(2, f, c);

    KruskalMinSpanTree minSpanTree = new KruskalMinSpanTree();
    List<KruskalMinSpanTree.Edge> result = minSpanTree.minSpanningTree(Arrays.asList(a, b, c, d, e, f, g),
        Arrays.asList(ab, be, ed, dg, gf, fa, ac, ae, cd, bd, fc));
    assertEquals(6, result.size());
    assertEquals(16, result.stream().mapToInt(KruskalMinSpanTree.Edge::getWeight).sum());
  }
}