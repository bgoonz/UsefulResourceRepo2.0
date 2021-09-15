package problems.java.recursion;

import java.util.ArrayList;
import java.util.List;

public class StringPermutations
{
    static List<String> stringPermutations(String str)
    {
        List<String> result = new ArrayList<>();

        if(str.length() > 1)
        {
            char firstChar = str.charAt(0);
            String rem = str.substring(1);
            for(String s : stringPermutations(rem))
            {
                for(int i = 0; i <= s.length(); ++i)
                {
                    result.add(insertAtChar(s, firstChar, i));
                }
            }
        }
        else
        {
            result.add(str);
        }

        return result;
    }

    private static String insertAtChar(String s, char c, int i)
    {
        return s.substring(0, i) + c + s.substring(i);
    }

    static boolean testsPass()
    {
        String test = "ABC";
        List<String> perms = stringPermutations(test);
        boolean check = perms.size() == 6;
        if(!check)
        {
            return false;
        }
        check = perms.contains("ABC") && perms.contains("ACB") && perms.contains("BAC") &&
                perms.contains("BCA") && perms.contains("CAB") && perms.contains("CBA");
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
