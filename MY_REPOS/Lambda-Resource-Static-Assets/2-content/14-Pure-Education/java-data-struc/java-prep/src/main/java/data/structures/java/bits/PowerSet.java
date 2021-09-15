package data.structures.java.bits;

import java.util.ArrayList;
import java.util.List;

public class PowerSet
{
  private String data;

  public PowerSet(String data)
  {
    this.data = data;
  }

  public List<char[]> generate()
  {
    char[] ar = data.toCharArray();

    List<char[]> result = new ArrayList<>();

    int size = 1 << data.length();
    for(int i = 0; i < size; ++i)
    {
      result.add(genSubset(ar, i));
    }
    return result;
  }

  private char[] genSubset(char[] ar, int bit)
  {
    StringBuilder sb = new StringBuilder();
    int idx = 0;
    for(int i = bit; i > 0; i >>= 1)
    {
      if((i & 1) == 1)
      {
        sb.append(ar[idx]);
      }
      idx++;
    }
    return sb.toString().toCharArray();
  }

  public static List<List<Character>> powerSetWithRecursion(String str)
  {
    data.structures.java.recursion.PowerSet powerSet = new data.structures.java.recursion.PowerSet(str);
    return powerSet.powerSet();
  }
}
