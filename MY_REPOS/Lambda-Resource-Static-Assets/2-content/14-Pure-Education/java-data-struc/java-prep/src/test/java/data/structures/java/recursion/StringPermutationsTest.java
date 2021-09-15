package data.structures.java.recursion;

import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;

public class StringPermutationsTest
{

  @Test
  public void stringPermutations()
  {
    String test = "ABC";
    List<String> result = StringPermutations.stringPermutations(test);
    assertEquals(6, result.size());
    assertTrue(result.contains("ABC"));
    assertTrue(result.contains("ACB"));
    assertTrue(result.contains("BAC"));
    assertTrue(result.contains("BCA"));
    assertTrue(result.contains("CAB"));
    assertTrue(result.contains("CBA"));
  }
}