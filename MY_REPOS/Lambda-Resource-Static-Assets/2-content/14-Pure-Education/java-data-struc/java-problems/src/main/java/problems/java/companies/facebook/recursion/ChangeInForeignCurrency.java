package problems.java.companies.facebook.recursion;

import java.util.Arrays;

public class ChangeInForeignCurrency
{
    /*
    https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=2903692913051025

    Given a list of the available denominations,
    determine if it's possible to receive exact change for an amount of money targetMoney.
    Both the denominations and target amount will be given in generic units of that currency.

    Example1:                                   Example:
    ---------                                   ---------
    denominations = [5, 10, 25, 100, 200]       denominations = [4, 17, 29]
    targetMoney = 94                            targetMoney = 75
    output = false                              output = true
    */

    static boolean canGetExactChange(int target, int[] denominations)
    {
        Arrays.sort(denominations);
        return canGetExactChange(target, denominations, denominations.length - 1);
    }

    private static boolean canGetExactChange(int amount, int[] denominations, int index)
    {
        if(amount == 0)
        {
            return true;
        }
        if(amount < 0 || index < 0)
        {
            return false;
        }

        if(denominations[index] > amount)
        {
            return canGetExactChange(amount, denominations, index - 1);
        }

        return canGetExactChange(amount - denominations[index], denominations, index) ||
                canGetExactChange(amount, denominations, index - 1);
    }

    static boolean testsPass()
    {
        boolean check = canGetExactChange(94, new int[] {5, 10, 25, 100, 200});
        if(check)
        {
            return false;
        }

        check = canGetExactChange(75, new int[] {4, 17, 29});
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
