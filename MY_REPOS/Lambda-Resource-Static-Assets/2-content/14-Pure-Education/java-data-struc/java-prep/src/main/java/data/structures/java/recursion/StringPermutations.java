package data.structures.java.recursion;

import java.util.ArrayList;
import java.util.List;

public class StringPermutations
{
  //  Complexity = O(n*n!)
  //  Note: use i <= word.length(), NOT i < word.length()
  private static String insertChatAt(String s, char c, int i)
  {
    String start = s.substring(0, i);
    String end = s.substring(i);
    return start + c + end;
  }

  public static List<String> stringPermutations(String s)
  {
    List<String> result = new ArrayList<>();

    if(s.length() > 1)
    {
      char firstChar = s.charAt(0);
      String rem = s.substring(1);
      for(String word : stringPermutations(rem))
      {
        // NOTE: use i <= word.length(), NOT i < word.length()
        for(int i = 0; i <= word.length(); ++i)
        {
          String str = insertChatAt(word, firstChar, i);
          result.add(str);
        }
      }
    }
    else
    {
      result.add(s);
    }
    return result;
  }
}
