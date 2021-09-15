package problems.java.strings;

public class CountWords
{
    static int countWordsSeparatedMyMultiplesSpaces(String s)
    {
        int count = 0;
        boolean lastWhiteSpace = false;
        for(char c : s.toCharArray())
        {
            if(Character.isWhitespace(c))
            {
                if(!lastWhiteSpace)
                {
                    lastWhiteSpace = true;
                }
            }
            else
            {
                if(lastWhiteSpace)
                {
                    lastWhiteSpace = false;
                    count++;
                }
            }
        }
        return count;
    }

    static int countWordsWithSplit(String s)
    {
        return s.split("\\s+").length;
    }

    static boolean testsPass()
    {
        String test = "this  is   a t es   t";
        boolean check = countWordsSeparatedMyMultiplesSpaces(test) == 6;
        if(!check)
        {
            return false;
        }
        check = countWordsWithSplit(test) == 6;
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
