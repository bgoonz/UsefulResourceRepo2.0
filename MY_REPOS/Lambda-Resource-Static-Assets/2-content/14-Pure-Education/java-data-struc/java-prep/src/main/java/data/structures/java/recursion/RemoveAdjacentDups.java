package data.structures.java.recursion;

import data.structures.java.strings.RemoveDups;

public class RemoveAdjacentDups
{
  public static String removeAdjacentDups(String s)
  {
    if(s.length() == 1)
    {
      return s;
    }

    if(s.charAt(0) == s.charAt(1))
    {
      return removeAdjacentDups(s.substring(1));
    }
    else
    {
      return s.charAt(0) + removeAdjacentDups(s.substring(1));
    }
  }



  public static String removeAdjacentDupsIterative(String input)
  {
    return RemoveDups.removeAdjacentDuplicates(input);
  }
}
