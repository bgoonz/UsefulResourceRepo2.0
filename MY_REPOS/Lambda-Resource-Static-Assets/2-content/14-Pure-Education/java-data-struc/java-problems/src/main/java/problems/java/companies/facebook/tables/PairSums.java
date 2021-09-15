package problems.java.companies.facebook.tables;

import problems.java.arrays.CountSum;

public class PairSums
{
    static int pairSum(int[] a, int target)
    {
        return CountSum.countTwoSumWithSet(a, target);
    }
}
