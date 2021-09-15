package data.structures.java.strings;

import data.structures.java.arrays.DuplicatesAndMissing;
import java.util.stream.Collectors;

public class RemoveDups
{
  public static String removeDups(String s)
  {
    if(s == null || s.length() < 2)
    {
      return s;
    }

    int pos = 1;
    char[] result = new char[s.length()];
    result[0] = s.charAt(0);

    for(int i = 1; i < s.length(); ++i)
    {
      int j;
      for(j = 0; j < pos; ++j)
      {
        if(s.charAt(j) == s.charAt(i))
        {
           break;
        }
      }

      if(j == pos)
      {
        result[pos++] = s.charAt(i);
      }
    }
    return new String(result, 0, pos);
  }

  public static String removeDups1(String input)
  {
    return input.chars().mapToObj(c -> (char)c)
        .distinct()
        .map(String::valueOf)
        .collect(Collectors.joining());
  }


  public static int[] removeDups(int[] a)
  {
    return DuplicatesAndMissing.removeAllDuplicates(a);
  }

  public static String removeAdjacentDuplicates(String s)
  {
    char[] ar = s.toCharArray();
    int pos = 1;
    for(int i = 1; i < ar.length; ++i)
    {
      if(ar[i] != ar[i - 1])
      {
        ar[pos++] = ar[i];
      }
    }
    return new String(ar, 0, pos);
  }
}
