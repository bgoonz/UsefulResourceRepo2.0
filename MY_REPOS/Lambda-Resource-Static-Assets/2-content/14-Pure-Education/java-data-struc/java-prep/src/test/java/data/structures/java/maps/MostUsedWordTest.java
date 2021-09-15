package data.structures.java.maps;

import data.structures.java.maps.MostUsedWord;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

import static org.junit.Assert.*;

public class MostUsedWordTest
{

  @Test
  public void mostUsed()
  {
    String dict = "this  is by aa far the worst the aa  best  is to aa come";
    MostUsedWord mostUsedWord = new MostUsedWord(dict, Arrays.asList("aa"));
    List<String> result = mostUsedWord.mostUsed();
    assertEquals(2, result.size());
    assertTrue(result.contains("is"));
    assertTrue(result.contains("the"));
  }
}