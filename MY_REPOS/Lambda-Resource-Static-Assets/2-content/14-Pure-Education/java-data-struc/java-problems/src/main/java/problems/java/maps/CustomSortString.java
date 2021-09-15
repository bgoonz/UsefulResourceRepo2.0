package problems.java.maps;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class CustomSortString
{
    /*
    Given one string ('abbceeeg') sort it based on another string ('egbca')
    Result will be: 'eeegbbca'
    Use map for more optimal solution
    */

    public static String customSortString(String s, String sortOrder)
    {
        Map<Character,Integer> map = s.chars().mapToObj(c -> (char)c).collect(
                HashMap::new,
                (m, i) -> m.merge(i, 1, Integer::sum),
                HashMap::putAll);

        char[] result = new char[s.length()];
        int pos = 0;
        for(char c : sortOrder.toCharArray())
        {
            int count = map.get(c);
            Arrays.fill(result, pos, pos + count, c);
            pos += count;
        }
        return new String(result);
    }

    static String customSortStringWithString(String s, String sortOrder)
    {
        return problems.java.strings.CustomSortString.customSortString(s, sortOrder);
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
