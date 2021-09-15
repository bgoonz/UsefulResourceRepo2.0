package data.structures.java.functional.numbers;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class PairNumbers
{
  public static List<int[]> pairNumbers(int[] a1, int[] a2)
  {
    return Arrays.stream(a1)
        .boxed()
        .flatMap(i -> Arrays.stream(a2).mapToObj(j -> new int[] {i, j}))
        .collect(Collectors.toList());
  }
}
