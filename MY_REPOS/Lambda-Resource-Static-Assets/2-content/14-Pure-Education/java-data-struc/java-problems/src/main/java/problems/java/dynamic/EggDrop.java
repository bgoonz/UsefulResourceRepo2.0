package problems.java.dynamic;

public class EggDrop
{
    //  Time complexity:    O(nk^2), where n = eggs, k = floors
    //  Auxiliary space:    O(nk)
/*
    DP Array:
    Initialize dp[eggs][floors + 1]
    0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 25 27 28
    0 1 0 0 0 0 0 0 0 0 0   0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0  0
    Final state of dp
    0 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25 25 27 28
    0 1 2 2 3 3 3 4 4 4 4   5  5  5  5  5  6  6  6  6  6  6  7  7  7  7  7  7  7
*/

    static int drop(int floors, int eggs)
    {
        int[][] dp = new int[eggs][floors + 1];
        for(int i = 1; i <= floors; ++i)
        {
            dp[0][i] = i;
        }
        for(int i = 1; i < eggs; ++i)
        {
            dp[1][i] = 1;
        }

        for(int egg = 1; egg < eggs; ++egg)
        {
            for(int floor = 2; floor <= floors; ++floor)
            {
                int min = Integer.MAX_VALUE;
                for(int currentFloor = 1; currentFloor <= floor; ++currentFloor)
                {
                    int max = Math.max(dp[egg - 1][currentFloor - 1], dp[egg][floor - currentFloor]);
                    min = Math.min(min, 1 + max);
                }
                dp[egg][floor] = min;
            }
        }
        return dp[eggs - 1][floors];
    }

    static boolean testsPass()
    {
        boolean check = drop(105, 2) == 14;
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
