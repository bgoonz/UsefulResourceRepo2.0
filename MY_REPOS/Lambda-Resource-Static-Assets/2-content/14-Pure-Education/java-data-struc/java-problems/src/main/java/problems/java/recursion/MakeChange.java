package problems.java.recursion;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class MakeChange
{
    ///////////////////////////////////////////////////////////////////////////////
    static int makeChange(int amount, int denom)
    {
        //  Using 25, 10, 5, 1 denoms
        int nextDenom = 0;
        switch(denom)
        {
            case 25:
                nextDenom = 10;
                break;
            case 10:
                nextDenom = 5;
                break;
            case 5:
                nextDenom = 1;
                break;
            case 1:
                return 1;
        }
        int ways = 0;
        for(int i = 0; i * denom <= amount; ++i)
        {
            ways += makeChange(amount - i * denom, nextDenom);
        }
        return ways;
    }

    ///////////////////////////////////////////////////////////////////////////////
    static int numberOfWaysToAddUp(int amount, int[] denoms)
    {
        return numberOfWaysToAddUp(amount, denoms, denoms.length - 1);
    }

    private static int numberOfWaysToAddUp(int amount, int[] denoms, int lastIndex)
    {
        if(amount == 0)
        {
            return 1;
        }
        if(amount < 0 || lastIndex < 0)
        {
            return 0;
        }

        return  numberOfWaysToAddUp(amount, denoms, lastIndex - 1) +
                numberOfWaysToAddUp(amount - denoms[lastIndex], denoms, lastIndex);
    }


    ///////////////////////////////////////////////////////////////////////////////
    static List<int[]> numberOfWaysToAddUpWithPrint(int amount, int[] denoms)
    {
        List<int[]> result = new ArrayList<>();
        String s = "";
        numberOfWaysToAddUpWithPrint(amount, denoms, denoms.length - 1, result, s);
        return result;
    }

    private static void numberOfWaysToAddUpWithPrint(int amount, int[] denoms,
                                                     int lastIndex, List<int[]> result, String s)
    {
        if(amount == 0)
        {
            String[] parts = s.split(",");
            int[] vals = Arrays.stream(parts).mapToInt(Integer::valueOf).toArray();
            result.add(vals);
            return;
        }
        if(amount < 0 || lastIndex < 0)
        {
            return;
        }

        numberOfWaysToAddUpWithPrint(amount, denoms, lastIndex - 1, result, s);
        s += denoms[lastIndex] + ",";
        numberOfWaysToAddUpWithPrint(amount - denoms[lastIndex], denoms, lastIndex, result, s);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////
    static boolean canGetExactChange(int target, int[] denominations)
    {
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

        return canGetExactChange(amount - denominations[index], denominations, index) ||
                canGetExactChange(amount, denominations, index - 1);
    }

    static boolean testsPass()
    {
        boolean check = makeChange(100, 25) == 242;
        if(!check)
        {
            return false;
        }

        check = numberOfWaysToAddUp(5, new int[] {1, 2, 3}) == 5;
        if(!check)
        {
            return false;
        }
        List<int[]> result = numberOfWaysToAddUpWithPrint(5, new int[] {1, 2, 3});
        check = Arrays.equals(new int[] {1, 1, 1, 1, 1}, result.get(0)) &&
                Arrays.equals(new int[] {2, 1, 1, 1}, result.get(1)) &&
                Arrays.equals(new int[] {2, 2, 1}, result.get(2)) &&
                Arrays.equals(new int[] {3, 1, 1}, result.get(3)) &&
                Arrays.equals(new int[] {3, 2}, result.get(4));
        if(!check)
        {
            return false;
        }

        check = canGetExactChange(94, new int[] {200, 100, 25, 10 , 5});
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
