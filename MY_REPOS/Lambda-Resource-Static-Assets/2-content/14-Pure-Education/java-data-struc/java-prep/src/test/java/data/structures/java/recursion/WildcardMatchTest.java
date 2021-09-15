package data.structures.java.recursion;

import org.junit.Test;

import static org.junit.Assert.*;

public class WildcardMatchTest
{

  @Test
  public void wildcardMatch()
  {
    assertTrue(WildcardMatch.wildcardMatch("Good Morning", "*d*"));
    assertTrue(WildcardMatch.wildcardMatch("Good Morning", "*ing"));
    assertTrue(WildcardMatch.wildcardMatch("Good Morning", "Goo*"));
    assertTrue(WildcardMatch.wildcardMatch("Good Morning", "Goo*ing"));
    assertFalse(WildcardMatch.wildcardMatch("Good Morning", "Good *x"));
  }

  @Test
  public void wildcardMatchDynamic()
  {
    assertTrue(WildcardMatch.wildcardMatchDynamic("Good Morning", "*d*"));
    assertTrue(WildcardMatch.wildcardMatchDynamic("Good Morning", "*ing"));
    assertTrue(WildcardMatch.wildcardMatchDynamic("Good Morning", "Goo*"));
    assertTrue(WildcardMatch.wildcardMatchDynamic("Good Morning", "Goo*ing"));
    assertFalse(WildcardMatch.wildcardMatchDynamic("Good Morning", "Good *x"));
  }
}