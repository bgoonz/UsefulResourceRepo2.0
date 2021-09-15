package problems.java.fifo_lifo;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;
import java.util.Queue;

public class PhoneNumberAlpha
{
    private static String[] TABLE = {
            "",
            "",
            "abc",
            "def",
            "ghi",
            "jkl",
            "mno",
            "pqrs",
            "tuv",
            "wxyz"
    };

    static List<String> generateCombinations(int[] n)
    {
        List<String> result = new ArrayList<>();
        Queue<String> queue = new LinkedList<>();
        queue.offer("");
        while(!queue.isEmpty())
        {
            String s = queue.poll();
            if(s.length() == n.length)
            {
                result.add(s);
            }
            else
            {
                String letters = TABLE[n[s.length()]];
                for(char c : letters.toCharArray())
                {
                    queue.offer(s + c);
                }
            }
        }
        return result;

    }

    static boolean testsPass()
    {
        List<String> list = generateCombinations(new int[] {4, 9, 8, 9, 6, 3, 7});
        boolean check = list.size() == 5184;
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
