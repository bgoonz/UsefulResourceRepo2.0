package data.structures.java.recursion;

public class EditDistance
{
  /*
  Notes:
  1.  If the last character matches, we proceed to the next character from the back:
        editDistance(s1, s2, len1 - 1, len2 - 1);
  1.  The extra character may appear at the end:
      i.e.: "abc" & "ab'
      In this case, base conditions will take care of the result
  2.  The extra character may appear in the middle:
      i.e.:
        "abc" & "abxc"
        "abxc" and "abc"
      In this case, editDistance(s1, s2, len1, len2 - 1) & editDistance(s1, s2, len1 - 1, len2)
      will take care of the result.
  3.  The character may mismatch:
      i.e.: "abc" & "axc"
      In this case, editDistance(s1, s2, len1 - 1, len2 - 1) will take care of the result
  */
  //  Find the cost of converting one string to another
  private static int min(int a, int b, int c)
  {
    return Math.min(Math.min(a, b), c);
  }

  public static int editDistance(String s1, String s2)
  {
    return editDistance(s1, s2, s1.length(), s2.length());
  }

  private static int editDistance(String s1, String s2, int len1, int len2)
  {
    if(len1 == 0)
    {
      return len2;
    }
    if(len2 == 0)
    {
      return len1;
    }

    if(s1.charAt(len1 - 1) == s2.charAt(len2 - 1))
    {
      return editDistance(s1, s2, len1 - 1, len2 - 1);
    }

    return 1 + min(editDistance(s1, s2, len1, len2 - 1),      //  Second string has extra char in the middle
            editDistance(s1, s2, len1 - 1, len2),             //  First string has extra char in the middle
            editDistance(s1, s2, len1 - 1, len2 - 1));   //  Character mismatch
  }


  public static int editDistanceDynamic(String s1, String s2)
  {
    return data.structures.java.dynamic.EditDistance.editDistance(s1, s2);
  }
}
