package data.structures.java.recursion;

import java.util.ArrayList;
import java.util.List;

public class CombinationOfFactors
{
  //  Function that takes an integer n and return all possible combinations of its factors.
  public static List<List<Integer>> combinations(int n)
  {
    List<List<Integer>> result = new ArrayList<>();
    List<Integer> current = new ArrayList<>();
    combinations(n, 2, 1, current, result);
    return result;
  }

  private static void combinations(int number, int start, int product, List<Integer> current, List<List<Integer>> result)
  {
    if(start > number || product > number)
    {
      return;
    }

    if(product == number)
    {
      result.add(new ArrayList<>(current));
      return;
    }

    for(int i = start; i < number; ++i)
    {
      if(i * product > number)
      {
        break;
      }

      if(number % i == 0)
      {
        current.add(i);
        combinations(number, i, i * product, current, result);
        current.remove(current.size() - 1);
      }
    }
  }
}
