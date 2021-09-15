package data.structures.java.maps;

import data.structures.java.maps.SortLogFile;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class SortLogFileTest
{
  //"A1 one two three";
  //"A2 hello world";
  //"B1 3 5 8 12";
  //"A3 one two three";
  //"B2 5 2 19";
  //"A4 hello world";

  @Test
  public void sorted()
  {
    String [] data = new String[] {
      "A1 one two three",
      "A2 hello world",
      "B1 3 5 8 12",
      "A3 one two three",
      "B2 5 2 19",
      "A4 hello world"
    };

    SortLogFile sortLogFile = new SortLogFile(data);
    List<String> results = sortLogFile.sorted();
    assertEquals(6, results.size());
    assertEquals("A2 hello world", results.get(0));
    assertEquals("A4 hello world", results.get(1));
    assertEquals("A1 one two three", results.get(2));
    assertEquals("A3 one two three", results.get(3));
    assertEquals("B1 3 5 8 12", results.get(4));
    assertEquals("B2 5 2 19", results.get(5));
  }
}