package problems.java.arrays;

import java.util.*;

public class CountSum
{
    static int countTwoSum(int[] a, int target)
    {
        Arrays.sort(a);
        int left = 0, right = a.length - 1;
        int sumCount = 0;
        while(left < right)
        {
            int sum = a[left] + a[right];
            if(sum == target)
            {
                sumCount++;
                left++;
                right--;
            }
            else if(sum > target)
            {
                right--;
            }
            else
            {
                left++;
            }
        }
        return sumCount;
    }

    public static int countTwoSumWithSet(int[] a, int target)
    {
        // Note: Does not require sort
        Set<Integer> set = new HashSet<>();
        set.add(a[0]);

        int sumCount = 0;
        for(int i = 1; i < a.length; ++i)
        {
            int val = target - a[i];
            if(set.contains(val))
            {
                sumCount++;
            }
            set.add(a[i]);
        }
        return sumCount;
    }

    static Set<List<Integer>> countFourSum(int[] a, int target)
    {
        Set<List<Integer>> result = new HashSet<>();

        Arrays.sort(a);

        for(int i = 0; i < a.length - 3; ++i)
        {
            for(int j = i + 1; j < a.length - 2; ++j)
            {
                int k = j + 1;
                int l = a.length - 1;
                while(k < l)
                {
                    int sum = a[i] + a[j] + a[k] + a[l];
                    if(sum == target)
                    {
                        result.add(Arrays.asList(a[i], a[j], a[k], a[l]));
                        k++;
                        l--;
                    }
                    else if(sum > target)
                    {
                        l--;
                    }
                    else
                    {
                        k++;
                    }
                }
            }
        }
        return result;
    }

    static int[] threeSumClosestButLess(int[] a, int target)
    {
        int[] result = null;

        Arrays.sort(a);

        int minDiff = Integer.MAX_VALUE;

        for(int i = 0; i < a.length; ++i)
        {
            int j = i + 1;
            int k = a.length - 1;
            while(j < k)
            {
                int sum = a[i] + a[j] + a[k];
                if(sum == target)
                {
                    return new int[] {a[i], a[j], a[k]};
                }
                if(sum < target)
                {
                    if(target - sum < minDiff)
                    {
                        minDiff = target - sum;
                        result = new int[] {a[i], a[j], a[k]};
                    }
                    j++;
                }
                else
                {
                    k--;
                }
            }
        }

        return result;
    }


    static boolean testsPass()
    {
        int[] a1 = {9, 1, 8, 2, 7, 3, 6, 4, 5};
        boolean check = countTwoSum(a1, 10) == 4;
        if(!check)
        {
            return  false;
        }

        check = countTwoSumWithSet(a1, 10) == 4;
        if(!check)
        {
            return  false;
        }

        int[] a2 = {1, 2, 3, 4, 3, 4, 5, -2};
        Set<List<Integer>> result = countFourSum(a2, 10);
        check = result.size() == 2 && result.contains(Arrays.asList(-2, 3, 4, 5)) &&
                result.contains(Arrays.asList(1, 2, 3, 4));
        if(!check)
        {
            return  false;
        }

        check = Arrays.equals(new int[] {2, 6, 9},
                threeSumClosestButLess(new int[] {4, 1, 8, 3, 6, 2, 9}, 17));
        if(!check)
        {
            return  false;
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
