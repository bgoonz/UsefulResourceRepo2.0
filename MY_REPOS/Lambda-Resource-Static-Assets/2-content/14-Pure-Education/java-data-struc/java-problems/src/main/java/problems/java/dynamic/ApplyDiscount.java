package problems.java.dynamic;

import java.util.Arrays;

public class ApplyDiscount
{
/*
    Price of items is represented in an array, i.e.
    [2, 3, 1, 2, 4, 2]
    Each item is discounted by smallest value to its right
    Thus, the discount array will contain:
    [1, 1, 0, 0, 2, 0]
    And actual price of items would be:
    [1, 2, 1, 2, 2, 2]
*/

    static int totalAfterDiscount(int[] prices)
    {
        int len = prices.length;
        int[] discount = new int[len];
        int min = prices[len - 1];
        for(int i = len - 2; i >= 0; --i)
        {
            discount[i] = prices[i] > min ? min : 0;
            min = Math.min(min, prices[i]);
        }

        int[] result = new int[len];
        Arrays.setAll(result, i -> prices[i] - discount[i]);
        return Arrays.stream(result).sum();
    }

    static boolean testsPass()
    {
        boolean check = totalAfterDiscount(new int[] {2, 3, 1, 2, 4, 2}) == 10;
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
