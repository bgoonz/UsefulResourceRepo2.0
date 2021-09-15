package data.structures.java.maps;

import data.structures.java.maps.WordCount;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

import static org.junit.Assert.*;

public class WordCountTest
{
  Map<String,Long> resultLong = new HashMap<String,Long>()
  {{
    put("one", 4L);
    put("two", 2L);
    put("three", 1L);
  }};

  Map<String,Integer> resultInt = new HashMap<String,Integer>()
  {{
    put("one", 4);
    put("two", 2);
    put("three", 1);
  }};


  @Test
  public void compute1()
  {
    WordCount wordCount = new WordCount("one two one three two one one");
    assertTrue(resultLong.equals(wordCount.compute1()));
  }

  @Test
  public void compute2()
  {
    WordCount wordCount = new WordCount("one two one three two one one");
    assertTrue(resultInt.equals(wordCount.compute2()));
  }
}