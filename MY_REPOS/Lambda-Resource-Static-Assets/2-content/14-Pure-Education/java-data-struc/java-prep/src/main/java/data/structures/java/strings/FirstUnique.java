package data.structures.java.strings;

import java.util.ArrayList;
import java.util.List;

public class FirstUnique
{
  //  O(n*n) complexity
  public static char findFirstUnique(String s)
  {
    for(int i = 0; i < s.length(); ++i)
    {
      boolean repeated = false;
      for(int j = 0; j < s.length(); ++j)
      {
        if(i != j && s.charAt(i) == s.charAt(j))
        {
          repeated = true;
          break;
        }
      }
      if(!repeated)
      {
        return s.charAt(i);
      }
    }
    return 0;
  }

  //  O(n) complexity
  public static char findFirstUnique1(String s)
  {
    List<Character> list = new ArrayList<>();

    boolean[] repeated = new boolean[256];

    for(char c : s.toCharArray())
    {
      if(!repeated[c])
      {
        if(!list.contains(c))
        {
          list.add(c);
        }
        else
        {
          list.remove((Object)c);
          repeated[c] = true;
        }
      }
    }
    return list.size() > 0 ? list.get(0) : 0;
  }
}
