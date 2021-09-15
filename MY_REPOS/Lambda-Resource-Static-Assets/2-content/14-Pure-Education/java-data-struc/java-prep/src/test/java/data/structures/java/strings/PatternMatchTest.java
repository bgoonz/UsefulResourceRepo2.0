package data.structures.java.strings;

import org.junit.Test;

import static org.junit.Assert.*;

public class PatternMatchTest
{

  @Test
  public void patternMatch()
  {
    String test = "Hello world", pat1 = "o wo", pat2 = "owo";
    assertTrue(PatternMatch.patternMatch(test, pat1));
    assertFalse(PatternMatch.patternMatch(test, pat2));
  }

  @Test
  public void subsequenceMatch()
  {
    String test = "Hello world", pat = "lo wo";
    assertTrue(PatternMatch.subsequenceMatch(test, pat));

    assertTrue(PatternMatch.subsequenceMatch("abcxdefyzlmn", "xyz"));
  }
}