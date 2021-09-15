package problems.java.arrays;

import java.util.Random;

public class RandomInts
{
    static int[] generateArrayRandomInts(int size, int from, int to)
    {
        return new Random().ints(size, from, to).toArray();
    }

    static boolean testsPass()
    {
        int[] random = generateArrayRandomInts(5, 3, 9);
        boolean check = random.length == 5;
        if(!check)
        {
            return false;
        }
        check = random[0] >= 3 && random[0] <= 9 && random[1] >= 3 &&
                random[1] <= 9 && random[2] >= 3 && random[2] <= 9;
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
