package data.structures.java.stacksqueues;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class PhoneNumberAlpha
{
  private int[] number;
  private int numberOfDigits;
  private static String[] TABLE = {
      "",
      "",
      "abc",
      "def",
      "ghi",
      "jkl",
      "mno",
      "pqrs",
      "tuv",
      "wxyz"
  };

  public PhoneNumberAlpha(int[] number)
  {
    this.number = number;
    this.numberOfDigits = number.length;
  }

  public List<String> generateCombinations()
  {
    List<String> result = new ArrayList<>();

    Queue<String> queue = new LinkedList<>();
    queue.add("");
    while(!queue.isEmpty())
    {
      String s = queue.remove();
      if(s.length() == numberOfDigits)
      {
        result.add(s);
      }
      else
      {
        String val = TABLE[number[s.length()]];
        for(int i = 0; i < val.length(); ++i)
        {
          queue.add(s + val.charAt(i));
        }
      }
    }
    return result;
  }

  public static List<String> letterCombinationsRecursive(int[] numbers, int numOfDigits)
  {
    data.structures.java.recursion.PhoneNumberAlpha phoneNumber = new
        data.structures.java.recursion.PhoneNumberAlpha(numbers, numOfDigits);
    List<String> result = phoneNumber.generate();
    return result;
  }
}
