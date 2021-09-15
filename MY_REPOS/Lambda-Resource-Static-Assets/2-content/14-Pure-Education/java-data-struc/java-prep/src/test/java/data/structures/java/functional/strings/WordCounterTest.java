package data.structures.java.functional.strings;

import org.junit.Test;

import static org.junit.Assert.*;

public class WordCounterTest
{

  @Test
  public void countWords()
  {
    String sentence = "this  sentence   may have    many  spaces between       words";
    assertEquals(8, WordCounter.countWords(sentence));
  }
}