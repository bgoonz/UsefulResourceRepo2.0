package problems.java.maps;

import java.util.HashMap;
import java.util.Map;

public class MostProfitAssigningWork
{
    /*
    We have jobs: difficulty[i] is the difficulty of the ith job, and profit[i] is the profit of the ith job.
    Now we have some workers. worker[i] is the ability of the ith worker,
    which means that this worker can only complete a job with difficulty at most worker[i].
    Every worker can be assigned at most one job, but one job can be completed multiple times.
    For example, if 3 people attempt the same job that pays $1, then the total profit will be $3.
    If a worker cannot complete any job, his profit is $0.
    What is the most profit we can make?
    Example:
        Input: difficulty = [2,4,6,8,10], profit = [10,20,30,40,50], worker = [4,5,6,7]
        Output: 100
        Workers are assigned jobs of difficulty [4,4,6,6] and they get profit of [20,20,30,30] seperately.
    */

    static int mostProfit(int[] difficulty, int[] profit, int[] worker)
    {
        Map<Integer,Integer> profitMap = new HashMap<>();

        for(int i = 0; i < difficulty.length - 1; ++i)
        {
            for(int j = difficulty[i]; j < difficulty[i + 1]; ++j)
            {
                profitMap.put(j, profit[i]);
            }
        }

        int totalProfit = 0;
        for(int i = 0; i < worker.length; ++i)
        {
            totalProfit += profitMap.get(worker[i]);
        }

        return totalProfit;
    }

    static boolean testsPass()
    {
        boolean check = mostProfit(new int[] {2,4,6,8,10},
                new int[] {10,20,30,40,50}, new int[] {4,5,6,7}) == 100;
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
