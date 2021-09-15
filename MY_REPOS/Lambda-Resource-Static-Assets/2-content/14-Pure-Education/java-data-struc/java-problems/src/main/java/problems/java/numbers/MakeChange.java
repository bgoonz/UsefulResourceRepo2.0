package problems.java.numbers;

import java.util.Arrays;

public class MakeChange
{
    static int makeChangeWithLeastNumberOfCoins(int initialAmount, int[] denoms)
    {
        //  denoms must be sorted
        Arrays.sort(denoms);
        int amountRemaining = initialAmount;
        int coins = 0;
        for(int i = denoms.length - 1; i >= 0; --i)
        {
            int denom = denoms[i];

            while(amountRemaining >= denom)
            {
                coins += amountRemaining / denom;
                amountRemaining %= denom;
            }
        }
        return coins;
    }

    static boolean testsPass()
    {
        boolean check = makeChangeWithLeastNumberOfCoins(99, new int[]{10, 1, 5}) == 14;
        if (!check)
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
