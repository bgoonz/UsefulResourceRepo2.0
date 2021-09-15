package problems.java.recursion;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Stack;

public class NSumOrProduct
{
    //  Find all subsets in array that add up to some number
    // [1, 3, 4, 5, 6, 8, 15]
    //  15 = 1+3+5+6
    //  15 = 1+6+8
    //  15 = 3+4+8
    //  15 = 4+5+6
    //  15 = 15

    static List<int[]> generateNSum(int target, int[] vals)
    {
        Arrays.sort(vals);
        List<int[]> result = new ArrayList<>();
        generateNSum(target, vals, 0, 0, new Stack<>(), result);
        return result;
    }

    private static void generateNSum(int target, int[] sortedVals,
                                     int index, int sumOnStack, Stack<Integer> stack,
                                     List<int[]> result)
    {
        if(sumOnStack == target)
        {
            result.add(stack.stream().mapToInt(x -> x).toArray());
            return;
        }

        for(int i = index; i < sortedVals.length; ++i)
        {
            if(sortedVals[i] + sumOnStack <= target)
            {
                sumOnStack += stack.push(sortedVals[i]);
                generateNSum(target, sortedVals, i + 1, sumOnStack, stack, result);
                sumOnStack -= stack.pop();
            }
        }
    }

    static List<int[]> generateNProduct(int target)
    {
        //  16 has factors:
        //  2, 2, 2, 2
        //  2, 2, 4
        //  2, 8
        //  4, 4

        List<int[]> result = new ArrayList<>();
        generateNProduct(target, 2, 1, new Stack<>(), result);
        return result;
    }

    private static void generateNProduct(int target, int startVal, int currentProduct,
                                         Stack<Integer> stack, List<int[]> result)
    {
        if(currentProduct > target || startVal > target)
        {
            return;
        }

        if(currentProduct == target)
        {
            result.add(stack.stream().mapToInt(x -> x).toArray());
            return;
        }

        for(int i = startVal; i < target; ++i)
        {
            if(i * currentProduct <= target && target % i == 0)
            {
                stack.push(i);
                generateNProduct(target, i, i * currentProduct, stack, result);
                stack.pop();
            }
        }
    }



    static boolean testsPass()
    {
        List<int[]> result = generateNSum(15, new int[] {6, 1, 8, 5, 3, 15, 4});
        boolean check = result.size() == 5;
        if(!check)
        {
            return false;
        }
        check = Arrays.equals(new int[] {1, 3, 5, 6}, result.get(0)) &&
                Arrays.equals(new int[] {1, 6, 8}, result.get(1)) &&
                Arrays.equals(new int[] {3, 4, 8}, result.get(2)) &&
                Arrays.equals(new int[] {4, 5, 6}, result.get(3)) &&
                Arrays.equals(new int[] {15}, result.get(4));
        if(!check)
        {
            return false;
        }

        result = generateNProduct(16);
        check = Arrays.equals(new int[] {2, 2, 2, 2}, result.get(0)) &&
                Arrays.equals(new int[] {2, 2, 4}, result.get(1)) &&
                Arrays.equals(new int[] {2, 8}, result.get(2)) &&
                Arrays.equals(new int[] {4, 4}, result.get(3));
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
