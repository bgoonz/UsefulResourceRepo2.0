package problems.java.arrays;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class RearrangeToMakePalindrome
{
    public static boolean canRearrangeToMakePalindrome(char[] a)
    {
        String s = new String(a);
        Map<Character, Long> map = s.chars()
                .mapToObj(c -> (char)c)
                .collect(Collectors.groupingBy(Function.identity(), Collectors.counting()));

        if(a.length % 2 == 1)   // odd case is more difficult
        {
            //  Consider "abcba" and "abbba" and "bbbbb"
            if (map.size() == 1) // all same chars
            {
                return true;
            }

            //  Partition map into even and odd counts
            Map<Boolean, List<Map.Entry<Character, Long>>> partitionedMap =
                    map.entrySet().stream().collect(Collectors.partitioningBy(x -> x.getValue() % 2 == 0));

            List<Map.Entry<Character, Long>> oddList = partitionedMap.get(false);
            if (oddList.size() == 1)
            {
                char key = oddList.get(0).getKey();
                map.remove(key);
            }
        }

        return map.entrySet().stream().allMatch(e -> e.getValue() % 2 == 0);
    }

    static long longestAwesomeString(String s)
    {
        return problems.java.strings.LongestAwesomeString.longestAwesome(s);
    }

    static boolean testsPass()
    {
         boolean check = canRearrangeToMakePalindrome(new char[] {'a', 'b', 'c', 'd'}) == false &&
                 canRearrangeToMakePalindrome(new char[] {'a', 'a', 'b', 'b'}) == true &&
                 canRearrangeToMakePalindrome(new char[] {'a', 'a', 'b', 'b', 'c'}) == true &&
                 canRearrangeToMakePalindrome(new char[] {'a', 'a', 'b', 'b', 'b'}) == true &&
                 canRearrangeToMakePalindrome(new char[] {'a', 'c', 'b', 'a', 'c'}) == true &&
                 canRearrangeToMakePalindrome(new char[] {'a', 'a', 'a', 'a'}) == true;
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
