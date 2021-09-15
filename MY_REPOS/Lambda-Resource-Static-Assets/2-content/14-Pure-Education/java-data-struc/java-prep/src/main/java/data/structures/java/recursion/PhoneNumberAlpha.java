package data.structures.java.recursion;

import java.util.ArrayList;
import java.util.List;

public class PhoneNumberAlpha
{
  private int[] digitPhoneNumber;
  private int numOfDigits;
  private char[] letterPhoneNumber;
  private static char[][] TABLE = {
      {},
      {},
      {'A', 'B', 'C'},
      {'D', 'E', 'F'},
      {'G', 'H', 'I'},
      {'J', 'K', 'L'},
      {'M', 'N', 'O'},
      {'P', 'Q', 'R', 'S'},
      {'T', 'U', 'V'},
      {'W', 'X', 'Y', 'Z'}
  };

  public PhoneNumberAlpha(int[] number, int numOfDigits)
  {
    this.digitPhoneNumber = number;
    this.numOfDigits = numOfDigits;
    letterPhoneNumber = new char[numOfDigits];
  }


  public List<String> generate()
  {
    List<String> result = new ArrayList<>();
    generate(0, result);
    return result;
  }

  private void generate(int curDigit, List<String> result)
  {
    if(curDigit == numOfDigits)
    {
      result.add(String.valueOf(letterPhoneNumber));
      return;
    }

    int numMoves = TABLE[digitPhoneNumber[curDigit]].length;
    if(numMoves == 0)
    {
      letterPhoneNumber[curDigit] = (char)(digitPhoneNumber[curDigit] + '0');
      generate(curDigit + 1, result);
    }
    else
    {
      for (int i = 0; i < numMoves; ++i)
      {
        letterPhoneNumber[curDigit] = getCharKey(digitPhoneNumber[curDigit], i);
        generate(curDigit + 1, result);
      }
    }
  }

  private char getCharKey(int row, int col)
  {
    return TABLE[row][col];
  }

  public static List<String> generateIteratively(int[] number, int numOfDigits)
  {
    data.structures.java.stacksqueues.PhoneNumberAlpha phoneNumberAlpha =
        new data.structures.java.stacksqueues.PhoneNumberAlpha(number);
    return phoneNumberAlpha.generateCombinations();
  }
}
