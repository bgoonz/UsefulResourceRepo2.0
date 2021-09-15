package problems.java.dynamic;

public class Elevator
{
    static int elevator(int capacity, int [] weights)
    {
        int len = weights.length;
        int[][] dp = new int[len + 1][capacity + 1];
        for(int i = 1; i <= len; ++i)
        {
            for(int j = 1; j <= capacity; ++j)
            {
                if(weights[i - 1] < j)
                {
                    dp[i][j] = Math.max(weights[i - 1] + dp[i - 1][j - weights[i - 1]], dp[i - 1][j]);
                }
                else
                {
                    dp[i][j] = dp[i - 1][j];
                }
            }
        }
        return dp[len][capacity];
    }

    static boolean testsPass()
    {
        boolean check = elevator(10, new int[] {3, 8, 4, 6, 1}) == 9;
        if(!check)
        {
            return false;
        }

        check = elevator(750, new int[] {420, 200, 150, 780, 350}) == 700;
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
