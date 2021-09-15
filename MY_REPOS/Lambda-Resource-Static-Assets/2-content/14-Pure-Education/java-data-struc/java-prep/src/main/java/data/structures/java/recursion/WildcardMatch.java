package data.structures.java.recursion;

public class WildcardMatch
{
  public static boolean wildcardMatch(String str, String pattern)
  {
    while(pattern.length() > 0)
    {
      if(pattern.charAt(0) == '?')
      {
        if(str.length() == 0)
        {
          return false;
        }
        str = str.substring(1);
        pattern = pattern.substring(1);
      }
      else if(pattern.charAt(0) == '*')
      {
        if(wildcardMatch(str, pattern.substring(1)))
        {
          return true;
        }
        if(str.length() > 0 && wildcardMatch(str.substring(1), pattern))
        {
          return true;
        }
        return false;
      }
      else
      {
        if(str.length() == 0 || str.charAt(0) != pattern.charAt(0))
        {
          return false;
        }
        str = str.substring(1);
        pattern = pattern.substring(1);
      }
    }
    return str.length() == 0 && pattern.length() == 0;
  }

  public static boolean wildcardMatchDynamic(String str, String pattern)
  {
    return data.structures.java.dynamic.WildcardMatch.wildcardMatch(str, pattern);
  }
}
