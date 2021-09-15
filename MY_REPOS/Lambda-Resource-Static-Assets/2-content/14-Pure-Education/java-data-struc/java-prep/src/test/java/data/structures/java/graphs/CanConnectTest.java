package data.structures.java.graphs;

import org.junit.Before;
import org.junit.Test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.StringReader;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

public class CanConnectTest
{
  CanConnect cc = new CanConnect();

  @Before
  public void setUp() throws Exception
  {
    String input =
        "A, B\n" +
        "B, C\n" +
        "B, D\n" +
        "B, E\n" +
        "C, A\n" +
        "E, A\n";
    BufferedReader reader = new BufferedReader(new StringReader(input));
    cc.readInput(reader);
  }

  @Test
  public void printPaths() throws IOException
  {
    List<List<String>> results = cc.genPaths();

    List<?> listsOfFourItems = results.stream().filter(l -> l.size() == 4).collect(Collectors.toList());

    assertEquals(4, listsOfFourItems.size());
    assertTrue(listsOfFourItems.contains(Arrays.asList("c", "a", "b", "d")));
    assertTrue(listsOfFourItems.contains(Arrays.asList("c", "a", "b", "e")));
    assertTrue(listsOfFourItems.contains(Arrays.asList("e", "a", "b", "c")));
    assertTrue(listsOfFourItems.contains(Arrays.asList("e", "a", "b", "d")));
  }

  @Test
  public void pathExists()
  {
    assertTrue(cc.pathExists("A", "C"));
    assertTrue(cc.pathExists("E", "C"));
    assertTrue(cc.pathExists("C", "D"));
    assertTrue(cc.pathExists("E", "C"));
    assertTrue(cc.pathExists("A", "E"));
    assertTrue(cc.pathExists("A", "D"));
    assertTrue(cc.pathExists("B", "A"));

    assertFalse(cc.pathExists("D", "E"));
    assertFalse(cc.pathExists("D", "A"));
    assertFalse(cc.pathExists("D", "B"));
    assertFalse(cc.pathExists("D", "C"));
  }
}