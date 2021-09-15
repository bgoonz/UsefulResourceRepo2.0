package problems.java.maps;

import java.util.HashMap;
import java.util.Map;

public class FractionalToDecimal
{
    //  Numerator = 1, Denominator = 2 -> "0.5"
    //  Numerator = 2, Denominator = 1 -> "2"
    //  Numerator = 2, Denominator = 3 -> "0.(6)"
    /*
    Consider: 2/3
                        map
    rem     result  key     value
    20      0.      20      2
    */

    static String fractionToDecimal(int n, int d)
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

        n = Math.abs(n); d = Math.abs(d);
        result += n / d;

        int rem = n % d * 10;
        if(rem == 0)
        {
            return result;
        }
        result += ".";
        Map<Integer,Integer> map = new HashMap<>();
        while(rem != 0)
        {
            if(map.containsKey(rem))
            {
                int beg = map.get(rem);
                String part1 = result.substring(0, beg);
                String part2 = result.substring(beg);
                result = part1 + "(" + part2 + ")";
                return result;
            }
            map.put(rem, result.length());
            result += rem / d;
            rem = rem % d * 10;
        }
        return result;
    }

    static boolean testsPass()
    {
        boolean check = fractionToDecimal(1, 2).equals("0.5");
        if(!check)
        {
            return false;
        }
        check = fractionToDecimal(2, 1).equals("2");
        if(!check)
        {
            return false;
        }
        check = fractionToDecimal(2, 3).equals("0.(6)");
        if(!check)
        {
            return false;
        }
        check = fractionToDecimal(22, 7).equals("3.(142857)");
        if(!check)
        {
            return false;
        }

        return true;
    }

    public static void main(String... args)
    {
        if(testsPass())
        {
            System.out.println("Tests passed");
        }
        else
        {
            System.out.println("Tests failed");
        }
    }

}
