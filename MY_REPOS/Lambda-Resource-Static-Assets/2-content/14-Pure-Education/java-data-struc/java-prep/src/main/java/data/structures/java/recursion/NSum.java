package data.structures.java.recursion;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Stack;

public class NSum
{
  //  This is exactly the same problem as MakeChange

  //  Find all subsets in array that add up to some number
  // [1, 3, 4, 5, 6, 8, 15]
  //  15 = 1+3+5+6
  //  15 = 4+5+6
  //  15 = 1+6+8
  //  15 = 3+4+8
  //  15 = 15

  private int [] data;
  private int target;
  private int currentSumOnStack;
  private Stack<Integer> stack = new Stack<>();
  private List<int[]> results = new ArrayList<>();


  public NSum(int [] data, int target)
  {
    Arrays.sort(data);  //  must be sorted
    this.data = data;
    this.target = target;
  }

  private void saveCombination()
  {
    int [] vals = new int[stack.size()];
    int pos = 0;
    for(int i : stack)
    {
      vals[pos++] = i;
    }
    results.add(vals);
  }

  public List<int[]> generateSubsets()
  {
    generateSubset(0);
    return results;
  }

  private void generateSubset(int index)
  {
    if(currentSumOnStack == target)
    {
      saveCombination();
    }

    for(int i = index; i < data.length; i++)
    {
      if(currentSumOnStack + data[i] <= target)
      {
        stack.push(data[i]);
        currentSumOnStack += data[i];
        generateSubset(i + 1);
        currentSumOnStack -= stack.pop();
      }
    }
  }

  //  --------------------------------------------------------
  //  Another solution to provide the count. Array does not need to be sorted
  //  Solution very similar to the knapsack problem
  public static int nSum(int [] arr, int target)
  {
    return nSum(arr, target, arr.length - 1);
  }

  private static int nSum(int[] arr, int amount, int index)
  {
    if(amount == 0)
    {
      return 1;
    }
    if(amount < 0 || index < 0)
    {
      return 0;
    }

    if(arr[index] > amount)
    {
      return nSum(arr, amount, index - 1);
    }

    int exclude = nSum(arr, amount - arr[index], index - 1);
    int include = nSum(arr, amount, index - 1);
    return exclude + include;
  }
}
