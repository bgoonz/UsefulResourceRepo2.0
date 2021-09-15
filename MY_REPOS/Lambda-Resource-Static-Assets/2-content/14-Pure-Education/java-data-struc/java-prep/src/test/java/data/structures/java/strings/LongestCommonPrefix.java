package data.structures.java.strings;

import java.util.Arrays;

public class LongestCommonPrefix
{
  public static String longestCommonPrefix(String[] strs)
  {
    //  find shortest string
    int lenOfShortest = Arrays.stream(strs).mapToInt(String::length).min().getAsInt();
    StringBuilder sb = new StringBuilder();

    boolean mismatch = false;
    char [] firstStrArr = strs[0].toCharArray();
    int i = 0;
    for( ; i < lenOfShortest; ++i)
    {
      for(int j = 1; j < strs.length; ++j)
      {
        if(strs[j].charAt(i) != firstStrArr[i])
        {
          mismatch = true;
          break;
        }
      }

      if(mismatch)
      {
        break;
      }
    }

    return strs[0].substring(0, i);
  }
}
