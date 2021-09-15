package data.structures.java.strings;

import data.structures.java.bits.BitsCommon;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class StringsCommon
{
  public static int countWordsSeparatedByMultipleSpaces(String s)
  {
    int count = 0;
    boolean lastSpace = false;

    for(char c : s.toCharArray())
    {
      if(Character.isWhitespace(c))
      {
        lastSpace = true;
      }
      else
      {
        if(lastSpace)
        {
          count++;
        }
        lastSpace = false;
      }
    }

    if(!lastSpace)
    {
      count++;
    }
    return count;
  }

  public static int countWordsSeparatedByMultipleSpaces1(String s)
  {
    String[] words = s.split("\\s+");
    return words.length;
  }

  //  ===================================================================
  //  ===================================================================
  //  ===================================================================
  public static boolean isAllUnique(String s)
  {
    boolean[] check = new boolean[256];

    for(char c : s.toCharArray())
    {
      if(check[c])
      {
        return false;
      }
      check[c] = true;
    }
    return true;
  }

  public static boolean isAllUnique1(String s)
  {
    List<Character> list = s.chars().mapToObj(c -> (char)c).collect(Collectors.toList());
    Set<Character> set = new HashSet<>(list);
    return s.length() == set.size();
  }

  public static boolean isAllUniqueForLowerCase(String str)
  {
    return BitsCommon.isUniqueAllLowerCase(str);
  }

  //  ===================================================================
  //  ===================================================================
  //  ===================================================================
  public static String removeChars(String s, String remove)
  {
    boolean [] charsToRemove = new boolean[256];

    char[] arr = remove.toCharArray();

    for(char c : arr)
    {
      charsToRemove[c] = true;
    }

    int pos = 0;
    arr = s.toCharArray();
    for(char c : arr)
    {
      if(!charsToRemove[c])
      {
        arr[pos++] = c;
      }
    }
    return new String(arr, 0, pos);
  }

  public static String removeChars1(String s, String remove)
  {
    return s.chars().filter(x -> remove.indexOf(x) == -1)
        .mapToObj(c -> (char)c)
        .map(String::valueOf)
        .collect(Collectors.joining());
  }


  //  ===================================================================
  //  ===================================================================
  //  ===================================================================
  public static boolean isRotation(String s1, String s2)
  {
    if(s1.length() != s2.length())
    {
      return false;
    }

    String s3 = s1 + s1;
    return s3.contains(s2);
  }


  //  ===================================================================
  //  ===================================================================
  //  ===================================================================
  public static int lengthOfLongestUniqueSubstr(String s)
  {
    int max = 0;
    for(int i = 0; i < s.length(); ++i)
    {
      for(int j = s.length(); j >= i; --j)
      {
        String subStr = s.substring(i, j);
        if(isAllUnique(subStr) && subStr.length() > max)
        {
          max = subStr.length();
        }
      }
    }
    return max;
  }

  //  ===================================================================
  //  ===================================================================
  //  ===================================================================
  public static String countAndSay(int n)
  {
    String s = String.valueOf(n);
    char[] ar = s.toCharArray();

    StringBuilder sb = new StringBuilder();
    int count = 1;

    for(int i = 1; i < ar.length; ++i)
    {
      if(ar[i] == ar[i - 1])
      {
        count++;
      }
      else
      {
        sb.append(count);
        sb.append(ar[i - 1]);
        count = 1;
      }
    }
    sb.append(count);
    sb.append(ar[ar.length - 1]);
    return sb.toString();
  }

  //  ===================================================================
  //  ===================================================================
  //  ===================================================================
  public static String numberToExcelColumn(int n)
  {
    StringBuilder sb = new StringBuilder();

    while(n > 0)
    {
      int rem = n % 26;
      //  if rem == 0, the 'Z' must be there
      if(rem == 0)
      {
        sb.append("Z");
        n = n / 26 - 1;
      }
      else
      {
        sb.append((char)(rem - 1 + 'A'));
        n /= 26;
      }
    }
    return sb.reverse().toString();
  }
}
