package problems.java.strings;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class LongestAwesomeString
{
    /*
    https://leetcode.com/problems/find-longest-awesome-substring/
    An awesome substring is a non-empty substring of s such that
    we can make any number of swaps in order to make it palindrome
    Example1:
       Input: s = "3242415"
       Output:  5
       "24241" is the longest awesome substring
    Example2:
        Input: s = "213123"
        Output: 6
        "213123" is the longest awesome substring

    See also: problems.java.arrays.RearrangeToMakePalindrome
    */

    public static long longestAwesome(String s)
    {
        if(s.length() == 1)
        {
            return 1;
        }

        Map<Character, Long> map = s.chars().mapToObj(c -> (char)c)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));


        Map<Boolean, List<Map.Entry<Character, Long>>> partitionedMap = map.entrySet().stream()
                .collect(Collectors.partitioningBy(e -> e.getValue() % 2 == 0));

        List<Map.Entry<Character, Long>> evenList = partitionedMap.get(true);
        List<Map.Entry<Character, Long>> oddList = partitionedMap.get(false);

        long evenLen = evenList.stream().map(e -> e.getValue()).reduce(0L, Long::sum);

        long oddLen = 0L;
        if(oddList.size() > 0)
        {
            oddLen = oddList.stream().mapToLong(e -> e.getValue()).max().getAsLong();
        }
        return evenLen + oddLen;
    }

    static boolean canRearrangeToMakePalindrome(char[] a)
    {
        return problems.java.arrays.RearrangeToMakePalindrome.canRearrangeToMakePalindrome(a);
    }

    static boolean testsPass()
    {
        boolean check = longestAwesome("3242415") == 5;
        if(!check)
        {
            return false;
        }

        check = longestAwesome("213123") == 6;
        if(!check)
        {
            return false;
        }

        check = longestAwesome("112233334445") == 11;
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
