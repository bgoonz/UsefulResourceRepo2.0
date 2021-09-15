package problems.java.dynamic;

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
        int[] dp = new int[prices.length + 1];
        for(int i = 1; i <= prices.length; ++i)
        {
            int max = Integer.MIN_VALUE;
            for(int j = 0; j < i; ++j)
            {
                max = Math.max(max, prices[j] + dp[i - j - 1]);
            }
            dp[i] = max;
        }
        return dp[prices.length];
    }

    static boolean testsPass()
    {
        boolean check = maxValue(new int[] {2, 4, 8, 9}) == 10;
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
