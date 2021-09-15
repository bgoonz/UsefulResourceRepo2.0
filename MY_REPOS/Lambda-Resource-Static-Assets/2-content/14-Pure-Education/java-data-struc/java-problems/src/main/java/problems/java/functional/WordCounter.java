package problems.java.functional;

import java.util.stream.Stream;

public class WordCounter
{
    private int counter;
    private boolean lastSpace;

    public WordCounter(int counter, boolean lastSpace)
    {
        this.counter = counter;
        this.lastSpace = lastSpace;
    }

    public WordCounter accumulate(Character c)
    {
        return null;
    }

    public WordCounter combine(WordCounter wordCounter)
    {
        return null;
    }

    public int getCounter()
    {
        return counter;
    }

    static boolean testsPass()
    {
        String sentence = "one    two  three    four      five        six";
        Stream<Character> stream = sentence.chars().mapToObj(e -> (char)e);
        WordCounter wordCounter = stream.reduce(new WordCounter(0, true),
                WordCounter::accumulate, WordCounter::combine);
        boolean check = wordCounter.getCounter() == 6;
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
