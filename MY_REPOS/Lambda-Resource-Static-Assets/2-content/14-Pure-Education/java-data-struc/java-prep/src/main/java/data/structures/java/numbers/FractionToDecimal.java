package data.structures.java.numbers;

import java.util.HashMap;
import java.util.Map;

public class FractionToDecimal
{
  //  Numerator = 1, Denominator = 2 -> "0.5"
  //  Numerator = 2, Denominator = 1 -> "2"
  //  Numerator = 2, Denominator = 3 -> "0.(6)"

  public static String fractionToDecimal(int n, int d)
  {
    if(n == 0)
    {
      return "0";
    }
    if(d == 0)
    {
      return "";
    }

    String result = "";
    if((n < 0) ^ (d < 0))
    {
      result += "-";
    }

    long num = Math.abs(n);
    long denom = Math.abs(d);

    result += num / denom;

    //  remainder
    long remainder = num % denom * 10;
    if(remainder == 0)
    {
      return result;
    }

    result += ".";
    Map<Long, Integer> map = new HashMap<>();
    while(remainder != 0)
    {
      if(map.containsKey(remainder))
      {
        int beg = map.get(remainder);
        String part1 = result.substring(0, beg);
        String part2 = result.substring(beg);
        result = part1 +"(" + part2 + ")";
        return result;
      }
      map.put(remainder, result.length());
      result += remainder / denom;
      remainder = remainder % denom * 10;
    }
    return result;
  }
}
