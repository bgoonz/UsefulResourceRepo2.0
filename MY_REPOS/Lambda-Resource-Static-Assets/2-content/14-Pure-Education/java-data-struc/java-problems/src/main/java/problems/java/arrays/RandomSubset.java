package problems.java.arrays;

import java.util.Arrays;
import java.util.stream.IntStream;

import static problems.java.common.Common.randomRange;

public class RandomSubset
{
    static int[] generateRandomSubset(int[] a, int m)
    {
        int [] result = new int[m];
        for(int i = 0; i < m; ++i)
        {
            int randomPos = randomRange(i, a.length);
            result[i] = a[randomPos];
            a[randomPos] = a[i];
        }
        return result;
    }

    static boolean testsPass()
    {
        int[] cards = IntStream.rangeClosed(1, 52).toArray();
        cards = RandomSubset.generateRandomSubset(cards, 6);

        boolean check = Arrays.stream(cards).distinct().count() == 6;
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
