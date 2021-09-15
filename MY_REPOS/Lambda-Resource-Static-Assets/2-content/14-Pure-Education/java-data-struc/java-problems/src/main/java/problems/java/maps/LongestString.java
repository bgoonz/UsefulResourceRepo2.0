package problems.java.maps;

import org.apache.commons.lang3.tuple.Pair;

import java.util.HashMap;
import java.util.Map;

public class LongestString
{
    static Pair<Integer,String> longestSubstringLengthWithNUnique(String s, int n)
    {
        // "abcbbbbcccbdddadacb", 2 -> "bcbbbbcccb"

        int max = 0, start = 0;
        String maxStr = "";
        Map<Character,Integer> map = new HashMap<>();
        for(int i = 0; i < s.length(); ++i)
        {
            map.merge(s.charAt(i), 1, Integer::sum);
            if(map.size() > n)
            {
                if(i - start > max)
                {
                    max = i - start;
                    maxStr = s.substring(start, i);
                }

                while(map.size() > n)
                {
                    char c = s.charAt(start);
                    int count = map.get(c);
                    if(count > 1)
                    {
                        map.put(c, count - 1);
                    }
                    else
                    {
                        map.remove(c);
                    }
                    start++;
                }
            }
        }
        if(s.length() - start > max)
        {
            max = s.length() - start;
            maxStr = s.substring(start, start + max);
        }

        return Pair.of(max, maxStr);
    }


    static boolean testsPass()
    {
        Pair<Integer,String> pair = longestSubstringLengthWithNUnique("abcbbbbcccbdddadacb", 2);
        boolean check = pair.getLeft() == 10 && pair.getRight().equals("bcbbbbcccb");

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
