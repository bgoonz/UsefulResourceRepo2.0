package data.structures.java.strings;

import java.util.*;
import java.util.stream.Collectors;

public class Anagrams
{
  public static boolean isAnagram(String s1, String s2)
  {
    if(s1.length() != s2.length())
    {
      return false;
    }

    int[] check = new int[256];
    for(char c : s1.toCharArray())
    {
      check[c]++;
    }

    for(char c : s2.toCharArray())
    {
      if(--check[c] < 0)
      {
        return false;
      }
    }

    return true;
  }

  public static boolean isAnagramUsingSort(String s1, String s2)
  {
    if(s1.length() != s2.length())
    {
      return false;
    }

    char[] a1 = s1.toCharArray();
    char[] a2 = s2.toCharArray();
    Arrays.sort(a1);
    Arrays.sort(a2);
    return Arrays.equals(a1, a2);
  }

  public static Map<String, List<String>> groupAnagrams(String[] arr)
  {
    Map<String, List<String>> result = new HashMap<>();

    for(String s : arr)
    {
      char[] chArr = s.toCharArray();
      Arrays.sort(chArr);
      String sorted = String.valueOf(chArr);
      result.computeIfAbsent(sorted, v -> new ArrayList<>()).add(s);
    }
    return result;
  }

  public static Map<String,List<String>> groupAnagramsWithStreams(List<String> words)
  {
    return words.stream().collect(Collectors.groupingBy(x -> alphabetize(x)));
  }

  private static String alphabetize(String s)
  {
    char[] a = s.toCharArray();
    Arrays.sort(a);
    return new String(a);
  }
}
