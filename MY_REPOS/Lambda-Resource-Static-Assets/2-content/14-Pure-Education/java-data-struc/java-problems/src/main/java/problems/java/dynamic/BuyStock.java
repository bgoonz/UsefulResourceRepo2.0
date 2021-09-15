package problems.java.dynamic;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class BuyStock
{
    static int oneTransaction(int[] prices)
    {
        if(prices == null || prices.length == 0)
        {
            return 0;
        }

        int max = 0;
        int min = prices[0];

        for(int i = 1; i < prices.length; ++i)
        {
            max = Math.max(max, prices[i] - min);
            min = Math.min(min, prices[i]);
        }
        return max;
    }

    //  Consider input of prices:
    //  Prices: 1, 4, 5, 7, 6, 3, 2, 9
    //  Left array is a Max(prior, current - min)
    //  Left:   0, 3, 4, 6, 6, 6, 6, 8
    //  Right array is a Max(prior, max - current), Note: moving from right to left
    //  Right:  8, 7, 7, 7, 7, 7, 7, 0
    //  Value is computed by picking sum of max from left and right arrays
    static int twoTransactions(int[] prices)
    {
        if(prices == null || prices.length == 0)
        {
            return 0;
        }

        int len = prices.length;
        int[] leftMin = new int[len], rightMax = new int[len];

        int min = prices[0];
        for(int i = 1; i < len; ++i)
        {
            leftMin[i] = Math.max(leftMin[i - 1], prices[i] - min);
            min = Math.min(min, prices[i]);
        }

        int max = prices[len - 1];
        for(int i = len - 2; i >= 0; --i)
        {
            rightMax[i] = Math.max(rightMax[i + 1], max - prices[i]);
            max = Math.max(max, prices[i]);
        }

        int[] sumArray = new int[len];
        Arrays.setAll(sumArray, i -> leftMin[i] + rightMax[i]);
        return Arrays.stream(sumArray).max().getAsInt();
    }

    static int manyTransactions(int[] prices)
    {
        if(prices == null || prices.length == 0)
        {
            return 0;
        }

        int profit = 0;
        for(int i = 1; i < prices.length; ++i)
        {
            int diff = prices[i] - prices[i - 1];
            profit += diff > 0 ? diff : 0;
        }
        return profit;
    }

    /*
    The cost of stock on each day is given in an array A[] of size N.
    Find all the days on which you buy and sell the stock so that
    in between those days your profit is maximum.
    Input:  {130,100,180,260,310,90,40,535,695}
    Output: (1 4) (6 8)
    */
    static List<int[]> daysToBuyAndSell(int[] prices)
    {
        int len = prices.length;
        int[] dp = new int[len];
        Arrays.fill(dp, 1);

        for(int i = 1; i < dp.length; ++i)
        {
            if(prices[i] > prices[i - 1])
            {
                dp[i] = 1 + dp[i - 1];
            }
        }

        List<int[]> result = new ArrayList<>();
        for(int i = len - 1; i >= 0; --i)
        {
            if(dp[i] > 1)
            {
                int startIdx = i - dp[i] + 1;
                result.add(new int[] {startIdx, i});
                i = startIdx;
            }
        }
        return result;
    }

    static boolean testsPass()
    {
        boolean check = oneTransaction(new int[] {1, 4, 5, 7, 6, 3, 2, 9}) == 8;
        if(!check)
        {
            return false;
        }
        check = twoTransactions(new int[] {1, 4, 5, 7, 6, 3, 2, 9}) == 13;
        if(!check)
        {
            return false;
        }
        check = manyTransactions(new int[] {1, 4, 5, 7, 6, 3, 2, 9}) == 13;
        if(!check)
        {
            return false;
        }

        List<int[]> days = daysToBuyAndSell(new int[] {130, 100, 180, 260, 310, 90, 40, 535, 695});
        check = Arrays.equals(days.get(0), new int[] {6, 8}) &&
                Arrays.equals(days.get(1), new int[] {1, 4});
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
