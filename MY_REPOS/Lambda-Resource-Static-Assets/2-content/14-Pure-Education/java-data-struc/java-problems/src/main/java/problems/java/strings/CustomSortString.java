package problems.java.strings;

import java.util.Arrays;

public class CustomSortString
{
    /*
    Given one string ('abbceeeg') sort it based on another string ('egbca')
    Result will be: 'eeegbbca'
    Use map for more optimal solution
    */

    public static String customSortString(String s, String sortOrder)
    {
        char[] result = new char[s.length()];
        int pos = 0;
        for(char c : sortOrder.toCharArray())
        {
            int count = (int)s.chars().filter(x -> x == c).count();
            Arrays.fill(result, pos, pos + count, c);
            pos += count;
        }
        return new String(result);
    }

    static String customSortStringWithMaps(String s, String sortOrder)
    {
        return problems.java.maps.CustomSortString.customSortString(s, sortOrder);
    }

    static boolean testsPass()
    {
        boolean check = customSortString("abbceeeg", "egbca").equals("eeegbbca");
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
