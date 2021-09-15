package problems.java.dynamic;

public class HouseRobber
{
    static int houseRobber(int[] loot)
    {
        if(loot == null || loot.length == 0)
        {
            return 0;
        }

        int[] dp =  new int[loot.length];
        dp[0] = loot[0];
        dp[1] = Math.max(loot[0], loot[1]);
        for(int i = 2; i < loot.length; ++i)
        {
            dp[i] = Math.max(dp[i - 2] + loot[i], dp[i - 1]);
        }
        return dp[dp.length - 1];
    }

    static boolean testsPass()
    {
        boolean check = houseRobber(new int [] {1, 2, 3, 4, 10, 5, 6, 4}) == 20;
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
