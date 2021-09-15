package problems.java.recursion;

public class RodCutting
{
    /*
    Consider a rod which can be cut into multiple pieces and corresponding price for each piece.
    For example:
        Rod is 4 ft long with following prices
        Length: 1 2 3 4
        Price:  2 4 8 9
    Compute max amount that could be made from cutting/or  not curring this rod
      Lengths     Price
      -----------------
      4               9
      1,1,1,1         8
      2,2             8
      1,3             10
     */

    static int maxValue(int[] prices)
    {
        return maxValue(prices, prices.length);
    }

    private static int maxValue(int[] prices, int n)
    {
        if(n == 0)
        {
            return 0;
        }

        int max = Integer.MIN_VALUE;
        for(int i = 0; i < n; ++i)
        {
            max = Math.max(max, prices[i] + maxValue(prices, n - i - 1));
        }
        return max;
    }

    static boolean testsPass()
    {
        boolean check = maxValue(new int[] {2, 4, 8, 9}) == 10;
        if(!check)
        {
            return false;
        }
        check = maxValue(new int[] {2, 4, 8, 11}) == 11;
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
