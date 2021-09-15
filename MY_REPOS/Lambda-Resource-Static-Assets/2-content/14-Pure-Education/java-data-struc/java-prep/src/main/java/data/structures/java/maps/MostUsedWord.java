package data.structures.java.maps;

import java.util.*;
import java.util.stream.Collectors;

public class MostUsedWord
{
  private String dictionary;
  private Set<String> excludedSet;

  public MostUsedWord(String dictionary, List<String> excludedWords)
  {
    this.dictionary = dictionary;
    excludedSet = new HashSet<>(excludedWords);
  }

  public List<String> mostUsed()
  {
    String[] words = dictionary.split("\\s+");
    Map<String,Integer> wordMap = Arrays.stream(words).collect(
        HashMap<String,Integer>::new,
        (map, word) -> map.merge(word, 1, Integer::sum),
        HashMap<String,Integer>::putAll);

    wordMap.keySet().removeAll(excludedSet);

    //  Find most used words
    int mostUsedCount = wordMap.values().stream().reduce(Integer::max).get();
    return wordMap.entrySet().stream()
        .filter((e -> e.getValue() == mostUsedCount))
        .map(Map.Entry::getKey)
        .collect(Collectors.toList());
  }
}
