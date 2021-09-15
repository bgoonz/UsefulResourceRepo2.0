package data.structures.java.graphs;

import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class VertexGeneralTest
{

  @Test
  public void bfs()
  {
    VertexGeneral<Integer> vertex1 = new VertexGeneral<>(1);
    VertexGeneral<Integer> vertex2 = new VertexGeneral<>(2);
    VertexGeneral<Integer> vertex3 = new VertexGeneral<>(3);
    VertexGeneral<Integer> vertex4 = new VertexGeneral<>(4);
    VertexGeneral<Integer> vertex5 = new VertexGeneral<>(5);

    vertex1.add(vertex2);
    vertex1.add(vertex3);
    vertex1.add(vertex4);
    vertex2.add(vertex1);
    vertex4.add(vertex3);
    vertex5.add(vertex2);
    vertex5.add(vertex3);

    List<VertexGeneral<Integer>> result = VertexGeneral.bfs(vertex1);
    int[] data = result.stream().mapToInt(i -> i.getData()).toArray();
    assertArrayEquals(new int[] {1, 2, 3, 4}, data);
  }
}