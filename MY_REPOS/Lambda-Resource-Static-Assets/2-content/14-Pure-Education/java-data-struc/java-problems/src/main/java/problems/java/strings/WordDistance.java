package problems.java.strings;

public class WordDistance
{
    //  words:  ["one", "two", "three", "four", "five"]
    //  word1 = "two", word2 = "five" ==> distance = 3
    //  word1 = "four", word2 = "two" ==> distance = 2

    static int wordDistance(String[] words, String word1, String word2)
    {
        int pos1 = -1, pos2 = -1;
        for(int i = 0; i < words.length; ++i)
        {
            String word = words[i];
            if(pos1 == -1 && word.equals(word1))
            {
                pos1 =  i;
            }
            else if(pos2 == -1 && word.equals(word2))
            {
                pos2 = i;
            }
            if(pos1 != -1 && pos2 != -1)
            {
                return Math.abs(pos2 - pos1);
            }
        }
        return -1;
    }

    static boolean testsPass()
    {
        boolean check = wordDistance(new String[]{"one", "two", "three", "four", "five"},
                "two", "five") == 3;
        if(!check)
        {
            return false;
        }
        check = wordDistance(new String[]{"one", "two", "three", "four", "five"}, "four", "two") == 2;
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
