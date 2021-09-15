package problems.java.recursion;

public class Elevator
{
    //  We have an elevator with stated capacity and people with various weights who want to get on.
    //  The objective is to maximize capacity without exceeding it.
    //  Example:
    //      Capacity:   750
    //      Weights:    [420, 200, 150, 780, 350]
    //      Max:        700 = 200 + 150 + 350
    //  NOTE:
    //  1.  Weights array does not need to be sorted
    //  2.  Same as knapsack problem but easier to understand
    //  3.  Try same approach with watching most movies during flight

    static int capacity(int limit, int[] weights)
    {
        return capacity(limit, weights, weights.length - 1);
    }

    private static int capacity(int limit, int[] weights, int index)
    {
        if(index < 0)
        {
            return 0;
        }

        if(weights[index] > limit)
        {
            return capacity(limit, weights, index - 1);
        }

        int include = weights[index] + capacity(limit - weights[index], weights, index - 1);
        int exclude = capacity(limit, weights, index - 1);
        return Math.max(include, exclude);
    }

    static boolean testsPass()
    {
        boolean check = capacity(750, new int[] {420, 200, 150, 780, 350}) == 700;
        if(!check)
        {
            return false;
        }
        check = capacity(800, new int[] {420, 200, 150, 780, 350}) == 780;
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
