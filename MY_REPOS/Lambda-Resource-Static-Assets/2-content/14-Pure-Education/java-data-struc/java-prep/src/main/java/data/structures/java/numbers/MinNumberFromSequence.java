package data.structures.java.numbers;

import java.util.ArrayList;
import java.util.List;

public class MinNumberFromSequence
{
  /*
  Given a pattern containing only I’s and D’s. I for increasing and D for decreasing.
  Devise an algorithm to print the minimum number following that pattern.
  Digits from 1-9 can’t repeat.
  Examples:
   Input: D        Output: 21
   Input: I        Output: 12
   Input: DD       Output: 321
   Input: II       Output: 123
   Input: DIDI     Output: 21435
   Input: IIDDD    Output: 126543
   Input: DDIDDIID Output: 321654798

   Number of digits in output is one more than number of characters in input.
   Note that the first character of input corresponds to two digits in output.
   The tricky part occurs when 'D' is encountered at index other than 0.
   In such a case we have to track the nearest 'I' to the left of 'D'
   and increment each number in the output vector by 1 in between ‘I’ and ‘D’.
   */

  public static int print(String s)
  {
    List<Integer> result = new ArrayList<>();
    int nextNumber = 3;
    int posOfLastI = 0;

    //  base cases
    if(s.charAt(0) == 'I')
    {
      result.add(1);
      result.add(2);
      posOfLastI = 1;
    }
    else
    {
      result.add(2);
      result.add(1);
    }

    for(int i = 1; i < s.length(); ++i)
    {
      if(s.charAt(i) == 'I')
      {
        result.add(nextNumber++);
        posOfLastI = i + 1;
      }
      else
      {
        result.add(result.get(i));
        for(int j = posOfLastI; j <= i; ++j)
        {
          result.set(j, result.get(j) + 1);
        }
        nextNumber++;
      }
    }

    int num = 0;
    for(int i : result)
    {
      num = num * 10 + i;
    }

    return num;
  }
}
