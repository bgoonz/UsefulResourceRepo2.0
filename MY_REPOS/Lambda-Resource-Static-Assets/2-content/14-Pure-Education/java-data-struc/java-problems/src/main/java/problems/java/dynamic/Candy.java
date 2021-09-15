package problems.java.dynamic;

import java.util.Arrays;

public class Candy
{
    //  There are N children standing in a line. Each child is assigned a rating value.
    //  Each child must have at least one candy.
    //  Children with a higher rating get more candies than their neighbors.
    //  At any time you may switch sides.
    //  What is the minimum candies you must give?
    //
    //  Ratings:          2, 4, 2, 6, 1, 7, 8, 9, 2, 1
    //                    ----------------------------
    //  Left:             1, 2, 1, 2, 1, 2, 3, 4, 1, 1
    //  Right:            1, 2, 1, 2, 1, 1, 1, 3, 2, 1
    //                    ----------------------------
    //  Max(left,right):  1, 2, 1, 2, 1, 2, 3, 4, 2, 1
    //  Total:            19


    static int giveMinimumCandy(int[] ratings)
    {
        int len = ratings.length;

        int[] left = new int[len], right = new int[len];

        left[0] = 1;
        for(int i = 1; i < len; ++i)
        {
            if(ratings[i] > ratings[i - 1])
            {
                left[i] = left[i - 1] + 1;
            }
            else
            {
                left[i] = 1;
            }
        }

        right[len - 1] = 1;
        for(int i = len - 2; i >= 0; --i)
        {
            if(ratings[i] > ratings[i + 1])
            {
                right[i] = right[i + 1] + 1;
            }
            else
            {
                right[i] = 1;
            }
        }

        int[] result = new int[len];
        Arrays.setAll(result, i -> Math.max(left[i], right[i]));
        return Arrays.stream(result).sum();
    }

    static boolean testsPass()
    {
        boolean check = giveMinimumCandy(new int[] {2, 4, 2, 6, 1, 7, 8, 9, 2, 1}) == 19;
        if(!check)
        {
            return false;
        }

        check = giveMinimumCandy(new int[] {1, 5, 2, 1}) == 7;
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
