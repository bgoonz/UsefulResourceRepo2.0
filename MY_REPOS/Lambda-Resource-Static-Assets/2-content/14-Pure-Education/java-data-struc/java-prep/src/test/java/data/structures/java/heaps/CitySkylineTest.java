package data.structures.java.heaps;

import org.junit.Before;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;
public class CitySkylineTest
{
  CitySkyline citySkyline;
  @Before
  public void setUp() throws Exception
  {
    int[][] buildings = {
        {2, 9, 10},
        {3, 7, 15},
        {5, 12, 12},
        {15, 20, 10},
        {19, 24, 8}
    };
    citySkyline = new CitySkyline(buildings);
  }

  @Test
  public void sortEdges()
  {
    List<CitySkyline.Edge> edges = citySkyline.createEdges();
    assertEquals(10, edges.size());

    assertTrue(edges.contains(new CitySkyline.Edge(2, 10, CitySkyline.Edge.Type.LEFT)));
    assertTrue(edges.contains(new CitySkyline.Edge(3, 15, CitySkyline.Edge.Type.LEFT)));
    assertTrue(edges.contains(new CitySkyline.Edge(5, 12, CitySkyline.Edge.Type.LEFT)));
    assertTrue(edges.contains(new CitySkyline.Edge(15, 10, CitySkyline.Edge.Type.LEFT)));
    assertTrue(edges.contains(new CitySkyline.Edge(19, 8, CitySkyline.Edge.Type.LEFT)));

    assertTrue(edges.contains(new CitySkyline.Edge(9, 10, CitySkyline.Edge.Type.RIGHT)));
    assertTrue(edges.contains(new CitySkyline.Edge(7, 15, CitySkyline.Edge.Type.RIGHT)));
    assertTrue(edges.contains(new CitySkyline.Edge(12, 12, CitySkyline.Edge.Type.RIGHT)));
    assertTrue(edges.contains(new CitySkyline.Edge(20, 10, CitySkyline.Edge.Type.RIGHT)));
    assertTrue(edges.contains(new CitySkyline.Edge(24, 8, CitySkyline.Edge.Type.RIGHT)));

    citySkyline.sortEdges(edges);
    assertEquals(new CitySkyline.Edge(2, 10, CitySkyline.Edge.Type.LEFT), edges.get(0));
    assertEquals(new CitySkyline.Edge(3, 15, CitySkyline.Edge.Type.LEFT), edges.get(1));
    assertEquals(new CitySkyline.Edge(5, 12, CitySkyline.Edge.Type.LEFT), edges.get(2));
    assertEquals(new CitySkyline.Edge(7, 15, CitySkyline.Edge.Type.RIGHT), edges.get(3));
    assertEquals(new CitySkyline.Edge(9, 10, CitySkyline.Edge.Type.RIGHT), edges.get(4));
    assertEquals(new CitySkyline.Edge(12, 12, CitySkyline.Edge.Type.RIGHT), edges.get(5));
    assertEquals(new CitySkyline.Edge(15, 10, CitySkyline.Edge.Type.LEFT), edges.get(6));
    assertEquals(new CitySkyline.Edge(19, 8, CitySkyline.Edge.Type.LEFT), edges.get(7));
    assertEquals(new CitySkyline.Edge(20, 10, CitySkyline.Edge.Type.RIGHT), edges.get(8));
    assertEquals(new CitySkyline.Edge(24, 8, CitySkyline.Edge.Type.RIGHT), edges.get(9));
  }

  @Test
  public void generateSkyline()
  {
    List<int[]> skyLine = citySkyline.generateSkyline();
    assertEquals(7, skyLine.size());
    assertArrayEquals(new int[] {2, 10}, skyLine.get(0));
    assertArrayEquals(new int[] {3, 15}, skyLine.get(1));
    assertArrayEquals(new int[] {7, 12}, skyLine.get(2));
    assertArrayEquals(new int[] {12, 0}, skyLine.get(3));
    assertArrayEquals(new int[] {15, 10}, skyLine.get(4));
    assertArrayEquals(new int[] {20, 8}, skyLine.get(5));
    assertArrayEquals(new int[] {24, 0}, skyLine.get(6));
  }

  @Test
  public void smallerBuildingCompletelyCovered()
  {
    int[][] buildings = {
        {2, 10, 12},
        {3, 8, 10},
    };
    CitySkyline s = new CitySkyline(buildings);
    List<int[]> skyLine = s.generateSkyline();
    assertEquals(2, skyLine.size());
    assertArrayEquals(new int[] {2, 12}, skyLine.get(0));
    assertArrayEquals(new int[] {10, 0}, skyLine.get(1));
  }

  @Test
  public void smallerBuildingOnRight()
  {
    int[][] buildings = {
        {2, 10, 12},
        {9, 13, 7},
    };
    CitySkyline s = new CitySkyline(buildings);
    List<int[]> skyLine = s.generateSkyline();
    assertEquals(3, skyLine.size());
    assertArrayEquals(new int[] {2, 12}, skyLine.get(0));
    assertArrayEquals(new int[] {10, 7}, skyLine.get(1));
    assertArrayEquals(new int[] {13, 0}, skyLine.get(2));
  }

}