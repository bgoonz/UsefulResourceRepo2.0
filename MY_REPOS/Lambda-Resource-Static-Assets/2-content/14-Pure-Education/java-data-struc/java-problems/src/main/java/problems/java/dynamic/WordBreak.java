package problems.java.dynamic;

import java.util.*;

public class WordBreak
{
    static boolean wordBreak(Set<String> dictionary, String word)
    {
        boolean[] dp = new boolean[word.length() + 1];
        dp[0] = true;
        for(int len = 1; len <= word.length(); ++len)
        {
            for(int i = 0; i < len; ++i)
            {
                if(dp[i] && dictionary.contains(word.substring(i, len)))
                {
                    dp[len] = true;
                    break;
                }
            }
        }

        return dp[dp.length - 1];
    }

    static boolean testsPass()
    {
        Set<String> dict1 = new HashSet<>(Arrays.asList("c", "od", "e", "x"));
        boolean check = wordBreak(dict1, "code") && wordBreak(dict1, "codex");
        if(!check)
        {
            return false;
        }
        check = wordBreak(dict1, "coder");
        if(check)
        {
            return false;
        }
        //////////////////////////////////////////////////////////////////////////////
        Set<String> dict2 = new HashSet<>(Arrays.asList("star", "rock", "rocks", "tar",
                "stars", "super", "high", "way"));
        check = wordBreak(dict2, "rockstar") && wordBreak(dict2, "superhighway");
        if(!check)
        {
            return false;
        }
        check =  wordBreak(dict2, "superduperway");
        if(check)
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
