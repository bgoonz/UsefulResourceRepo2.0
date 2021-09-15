package data.structures.java.recursion;

import java.util.ArrayList;
import java.util.List;

public class ValidParens
{
  public static List<String> generateValidParens(int count)
  {
    char[] buffer = new char[count * 2];
    List<String> result = new ArrayList<>();
    generateValidParens(result, count, count, 0, buffer);
    return result;
  }

  private static void generateValidParens(List<String> result, int leftRem, int rightRem, int index, char[] buffer)
  {
    if(leftRem < 0 || rightRem < leftRem)
    {
      return;
    }

    if(leftRem == 0 && rightRem == 0)
    {
      result.add(new String(buffer));
      return;
    }

    if(leftRem > 0)
    {
      buffer[index] = '(';
      generateValidParens(result, leftRem - 1, rightRem, index + 1, buffer);
    }

    if(rightRem > leftRem)
    {
      buffer[index] = ')';
      generateValidParens(result, leftRem, rightRem - 1, index + 1, buffer);
    }
  }
}
