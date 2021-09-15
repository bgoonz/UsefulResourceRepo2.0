package data.structures.java.recursion;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class PowerSet
{
  private List<Character> data;

  public PowerSet(String str)
  {
    this.data = str.chars().mapToObj(c -> (char) c).collect(Collectors.toList());
  }

  public List<List<Character>> powerSet()
  {
    return powerSet(data);
  }

  private List<List<Character>> powerSet(List<Character> list)
  {
    List<List<Character>> result = new ArrayList<>();

    if(list.isEmpty())
    {
      result.add(new ArrayList<>());
      return result;
    }

    Character first = list.get(0);
    List<Character> remainder = new ArrayList<>(list.subList(1, list.size()));
    for(List<Character> subList : powerSet(remainder))
    {
      List<Character> newList = new ArrayList<>();

      newList.add(first);
      newList.addAll(subList);

      result.add(newList);
      result.add(subList);
    }

    return result;
  }

  public static List<char[]> genPowerSetWithBits(String str)
  {
    data.structures.java.bits.PowerSet powerSet = new data.structures.java.bits.PowerSet(str);
    return powerSet.generate();
  }
}
