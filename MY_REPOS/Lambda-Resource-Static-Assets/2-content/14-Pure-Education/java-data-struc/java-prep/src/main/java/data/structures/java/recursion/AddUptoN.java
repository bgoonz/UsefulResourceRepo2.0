package data.structures.java.recursion;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class AddUptoN
{
  //  Given integer N, list all combinations of integers that add up to N
  //  For example:
  //  N = 5
  //  Combinations:
  //  1, 1, 1, 1, 1
  //  1, 1, 1, 2
  //  1, 1, 3
  //  1, 2, 2
  //  1, 4
  //  2, 3
  //  5

  public static List<int[]> combinations(int amount)
  {
    List<int[]> result = new ArrayList<>();
    String s = "";
    combinations(result, amount, amount, s);
    return result;
  }

  private static int combinations(List<int []> result, int offset, int amount, String s)
  {
    if(amount == 0)
    {
      String[] vals = s.split(",");
      int[] ans = Arrays.stream(vals).mapToInt(Integer::valueOf).toArray();
      result.add(ans);
      return 1;
    }

    if(offset == 0 || amount < 0)
    {
      return 0;
    }

    int exclude = combinations(result, offset - 1, amount, s);
    s += offset + ",";  // 1, 1, 1, 1, 1 will be the first combination
    int include = combinations(result, offset, amount - offset, s);
    return exclude + include;
  }
}
