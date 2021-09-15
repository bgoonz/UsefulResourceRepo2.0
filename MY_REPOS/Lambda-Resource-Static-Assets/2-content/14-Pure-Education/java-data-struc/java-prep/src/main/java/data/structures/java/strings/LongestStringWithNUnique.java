package data.structures.java.strings;

import java.util.HashMap;
import java.util.Map;

public class LongestStringWithNUnique
{
  public static int longestSubstringLengthWithNUnique(String s, int n)
  {
    // "abcbbbbcccbdddadacb" -> "bcbbbbcccb"
    int max = 0, start = 0;
    Map<Character, Integer> map = new HashMap<>();

    for(int i = 0; i < s.length(); ++i)
    {
      char c = s.charAt(i);
      map.merge(c, 1, Integer::sum);

      if(map.size() > n)
      {
        max = Math.max(max, i - start);

        while(map.size() > n)
        {
          char t = s.charAt(start);
          int count = map.get(t);
          if(count > 1)
          {
            map.put(t, count - 1);
          }
          else
          {
            map.remove(t);
          }
          start++;
        }
      }
    }

    return Math.max(max, s.length() - start);
  }

  public static String longestSubstringWithNUnique(String s, int n)
  {
    // "abcbbbbcccbdddadacb" -> "bcbbbbcccb"
    int max = 0, start = 0;
    String maxStr = "";
    Map<Character, Integer> map = new HashMap<>();

    for(int i = 0; i < s.length(); ++i)
    {
      char c = s.charAt(i);
      map.merge(c, 1, Integer::sum);

      if(map.size() > n)
      {
        if(i - start > max)
        {
          max = i - start;
          maxStr = s.substring(start, i);
        }

        while(map.size() > n)
        {
          char t = s.charAt(start);
          int count = map.get(t);
          if(count > 1)
          {
            map.put(t, count - 1);
          }
          else
          {
            map.remove(t);
          }
          start++;
        }
      }
    }

    if(s.length() - start > max)
    {
      max = s.length() - start;
      maxStr = s.substring(start, start + max);
    }
    return maxStr;
  }
}
