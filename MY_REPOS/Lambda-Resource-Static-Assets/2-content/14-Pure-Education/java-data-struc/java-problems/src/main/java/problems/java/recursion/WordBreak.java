package problems.java.recursion;

import java.util.*;
import java.util.stream.Collectors;

public class WordBreak
{
    //  See also:   https://www.youtube.com/watch?v=hLQYQ4zj0qg&ab_channel=GeeksforGeeks
    static Map<String,List<String>> wordBreak(List<String> input)
    {
        Set<String> dictionary = new HashSet<>(input);

        Map<String,List<String>> result = new HashMap<>();

        for(String word : input)
        {
            List<String> bufferResult = new ArrayList<>();
            wordBreak(dictionary, word, "", bufferResult);
            int size = bufferResult.size();
            if(size > 1)
            {
                String key = bufferResult.get(size - 1);
                List<String> list = bufferResult.stream()
                        .limit(size - 1)
                        .collect(Collectors.toList());
                result.put(key, list);
            }
        }

        return result;
    }


    private static void wordBreak(Set<String> dictionary, String word,
                                  String buffer, List<String> bufferResult)
    {
        if(word.length() == 0)
        {
            buffer = buffer.trim();
            bufferResult.add(buffer);
            return;
        }

        for(int i = 1; i <= word.length(); i++)
        {
            String prefix = word.substring(0, i);

            if (dictionary.contains(prefix))
            {
                wordBreak(dictionary, word.substring(i), buffer + " " + prefix, bufferResult);
            }
        }
    }

    ////////////////////////////////////////////////////////////////////////////////////////////
    static boolean wordBreak(Set<String> dictionary, String word)
    {
        if(word.length() == 0)
        {
            return true;
        }

        for(int i = 1; i <= word.length(); ++i)
        {
            String prefix = word.substring(0, i);
            if(dictionary.contains(prefix) && wordBreak(dictionary, word.substring(i)))
            {
                return true;
            }
        }
        return false;
    }

    static boolean wordBreakWithMemoization(Set<String> dictionary, String word, Map<String, Boolean> memoMap)
    {
        if(word.length() == 0)
        {
            return true;
        }
        if(memoMap.containsKey(word))
        {
            return memoMap.get(word);
        }

        for(int i = 1; i <= word.length(); ++i)
        {
            String prefix = word.substring(0, i);
            if(dictionary.contains(prefix) && wordBreak(dictionary, word.substring(i)))
            {
                memoMap.put(word, true);
                return true;
            }
        }
        memoMap.put(word, false);
        return false;
    }


    static boolean testsPass()
    {
        List<String> data = Arrays.asList("rockstar", "star", "rock", "rocks",
                "tar", "stars", "rockstars", "super", "highway", "high", "way", "superhighway");


        Map<String,List<String>> result = wordBreak(data);
        boolean check = result.get("rockstar").get(0).equals("rock star");
        if(!check)
        {
            return false;
        }
        check = result.get("rockstar").get(1).equals("rocks tar");
        if(!check)
        {
            return false;
        }
        check = result.get("rockstars").get(0).equals("rock stars");
        if(!check)
        {
            return false;
        }

        check = result.get("highway").get(0).equals("high way");
        if(!check)
        {
            return false;
        }

        check = result.get("superhighway").get(0).equals("super high way");
        if(!check)
        {
            return false;
        }
        check = result.get("superhighway").get(1).equals("super highway");
        if(!check)
        {
            return false;
        }

        /////////////////////////////////////////////////////////////////////
        Set<String> dict2 = new HashSet<>(Arrays.asList("c", "od", "e", "x"));
        check = wordBreak(dict2, "code") && wordBreak(dict2, "codex");
        if(!check)
        {
            return false;
        }
        check = wordBreak(dict2, "coder");
        if(check)
        {
            return false;
        }

        check = wordBreakWithMemoization(dict2, "code", new HashMap<>());
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
