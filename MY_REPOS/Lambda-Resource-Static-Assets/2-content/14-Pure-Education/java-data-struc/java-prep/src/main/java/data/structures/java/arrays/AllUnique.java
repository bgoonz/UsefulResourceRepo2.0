package data.structures.java.arrays;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class AllUnique
{
  public static boolean allValuesUnique(int[] a)
  {
    Set<Integer> checkSet = new HashSet<>();
    for(int v : a)
    {
      if(checkSet.contains(v))
      {
        return false;
      }
      checkSet.add(v);
    }
    return true;
  }

  public static boolean allValuesUnique1(int[] a)
  {
    Set<Integer> set = new HashSet<>(Arrays.stream(a).boxed().collect(Collectors.toList()));
    return set.size() == a.length;
  }

}
