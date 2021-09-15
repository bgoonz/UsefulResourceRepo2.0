package data.structures.java.maps;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class WordCount
{
  private String dictionary;

  public WordCount(String dictionary)
  {
    this.dictionary = dictionary;
  }

  public Map<String,Long> compute1()
  {
    // Must use Long with Collectors.counting()
    String[] words = dictionary.split("\\s+");
    return Arrays.stream(words).collect(
        Collectors.groupingBy(Function.identity(), Collectors.counting()));
  }

  public Map<String,Integer> compute2()
  {
    String[] words = dictionary.split("\\s+");
    return Arrays.stream(words).collect(
        HashMap<String, Integer>::new,
        (map, word) -> map.merge(word, 1, Integer::sum),
        HashMap<String,Integer>::putAll);
  }
}
