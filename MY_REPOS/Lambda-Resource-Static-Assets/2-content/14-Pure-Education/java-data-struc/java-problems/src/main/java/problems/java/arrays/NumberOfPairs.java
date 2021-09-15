package problems.java.arrays;

public class NumberOfPairs
{
    /*
    Given two arrays X and Y of positive integers, find the number of pairs such that x^y > y^x.
    Example:
        Input: X = [2 1 6], Y = [1 5]
        Output: 3
        2^1 > 1^1, 2^5 > 5^2, 6^1 > 1^6
    */

    static int numberOfPairs(int[] a1, int[] a2)
    {
        int count = 0;

        for(int i = 0; i < a1.length; ++i)
        {
            int x = a1[i];
            for(int j = 0; j < a2.length; ++j)
            {
                int y = a2[j];

                if(Math.pow(x, y) > Math.pow(y, x))
                {
                    count++;
                }
            }
        }
        return count;
    }

    static boolean testsPass()
    {
        boolean check = numberOfPairs(new int[] {2, 1, 6}, new int[] {1, 5}) == 3;
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
