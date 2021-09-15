package data.structures.java.numbers;

public class NumberToWords
{
  static String[] numNames = {
          "",
          "one",
          "two",
          "three",
          "four",
          "five",
          "six",
          "seven",
          "eight",
          "nine",
          "ten",
          "eleven",
          "twelve",
          "thirteen",
          "fourteen",
          "fifteen",
          "sixteen",
          "seventeen",
          "eighteen",
          "nineteen"
      };

  static String[] tenNames = {
          "",
          "ten",
          "twenty",
          "thirty",
          "forty",
          "fifty",
          "sixty",
          "seventy",
          "eighty",
          "ninety",
      };

  static String[] bigNumNames = {
          "",
          "thousand",
          "million",
          "billion",
          "trillion",
          "quadrillion",
          "quintillion"
      };

  private long number;

  public NumberToWords(long n)
  {
    number = n;
  }

  public String convert()
  {
    if(number == 0)
    {
      return "zero";
    }

    String prefix = "";
    if(number < 0)
    {
      prefix = "negative";
      number = -number;
    }

    String current = "";
    int bigNumPlace = 0;

    do
    {
      long n = number % 1000;
      if(n != 0)
      {
        String s = convertLessThan1000((int)n);
        current = s + bigNumNames[bigNumPlace++] + current;
      }
      number /= 1000;
    } while (number > 0);

    return prefix + current;
  }

  private static String convertLessThan20(int num)
  {
    return numNames[num];
  }

  private static String convertLessThan100(int num)
  {
    if(num < 20)
    {
      return convertLessThan20(num);
    }
    int tens = num / 10;
    int ones = num % 10;
    return tenNames[tens] + numNames[ones];
  }

  private static String convertLessThan1000(int num)
  {
    if(num < 100)
    {
      return convertLessThan100(num);
    }

    int hundreds = num / 100;
    int remainder = num % 100;
    return numNames[hundreds] + "hundred" + convertLessThan100(remainder);
  }
}
