package data.structures.java.dynamic;

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
  public void wildcardMatchRecursive()
  {
    assertTrue(WildcardMatch.wildcardMatchRecursive("Good Morning", "*d*"));
    assertTrue(WildcardMatch.wildcardMatchRecursive("Good Morning", "*ing"));
    assertTrue(WildcardMatch.wildcardMatchRecursive("Good Morning", "Goo*"));
    assertTrue(WildcardMatch.wildcardMatchRecursive("Good Morning", "Goo*ing"));
    assertFalse(WildcardMatch.wildcardMatchRecursive("Good Morning", "Good *x"));
  }
}