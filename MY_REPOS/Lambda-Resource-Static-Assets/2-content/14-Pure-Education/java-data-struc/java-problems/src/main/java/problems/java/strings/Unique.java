package problems.java.strings;

import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Unique
{
    static boolean isAllUnique(String s)
    {
        boolean[] check = new boolean[256];

        for(char c : s.toCharArray())
        {
            if(check[c])
            {
                return false;
            }
            check[c] = true;
        }
        return true;
    }

    static boolean isAllUniqueWithStreams(String s)
    {
        long distinctCount = s.chars().distinct().count();
        return distinctCount == s.length();
    }

    static int lengthOfLongestUniqueSubstr(String s)
    {
        int max = Integer.MIN_VALUE;
        for(int i = 0; i < s.length(); ++i)
        {
            for(int j = s.length(); j > i; j--)
            {
                String subString = s.substring(i, j);
                if(isAllUnique(subString) && subString.length() > max)
                {
                    max = subString.length();
                }
            }
        }
        return max;
    }


    static char firstUnique(String s)
    {
        Map<Character, Long> map = s.chars()
                .mapToObj(c -> (char)c)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        for(char c : s.toCharArray())
        {
            if(map.get(c) == 1)
            {
                return c;
            }
        }
        return 0;
    }

    static boolean testsPass()
    {
        String allUnique = "abcdefghijklmnopq";
        String notAllUnique = "abcdefghidjklm";
        boolean check = isAllUnique(allUnique);
        if(!check)
        {
            return false;
        }
        check = isAllUnique(notAllUnique);
        if(check)
        {
            return false;
        }
        check = isAllUniqueWithStreams(allUnique);
        if(!check)
        {
            return false;
        }
        check = isAllUniqueWithStreams(notAllUnique);
        if(check)
        {
            return false;
        }
        String test = "qwertyuiopqazxcvbnm";
        check = lengthOfLongestUniqueSubstr(test) == 18;
        if(!check)
        {
            return false;
        }

        check = firstUnique("abcdabc") == 'd';
        if(!check)
        {
            return false;
        }
        check = firstUnique("abcdefg") == 'a';
        if(!check)
        {
            return false;
        }
        check = firstUnique("abcddcba") == 0;
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
