package data.structures.java.stacksqueues;

import org.junit.Test;

import static org.junit.Assert.*;

public class CanConnectTest
{
  @Test
  public void pathExists()
  {
    String[][] input = {
        {"A", "B"},
        {"B", "C"},
        {"B", "D"},
        {"B", "E"},
        {"C", "A"},
        {"E", "A"}
    };

    assertTrue(CanConnect.pathExists(input, "A", "C"));
    assertTrue(CanConnect.pathExists(input, "E", "C"));
    assertTrue(CanConnect.pathExists(input, "C", "D"));
    assertTrue(CanConnect.pathExists(input, "E", "C"));
    assertTrue(CanConnect.pathExists(input, "A", "E"));
    assertTrue(CanConnect.pathExists(input, "A", "D"));
    assertTrue(CanConnect.pathExists(input, "B", "A"));

    assertFalse(CanConnect.pathExists(input, "D", "E"));
    assertFalse(CanConnect.pathExists(input, "D", "A"));
    assertFalse(CanConnect.pathExists(input, "D", "B"));
    assertFalse(CanConnect.pathExists(input, "D", "C"));
  }
}