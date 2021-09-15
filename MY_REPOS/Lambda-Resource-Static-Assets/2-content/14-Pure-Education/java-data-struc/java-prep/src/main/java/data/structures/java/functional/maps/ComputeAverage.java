package data.structures.java.functional.maps;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public class ComputeAverage
{
  private String[][] data;

  public ComputeAverage(String[][] data)
  {
    this.data = data;
  }

  public Map<String, Long> averages()
  {
    //  Sum grades for each name
    Map<String,Long> gradesMap = Arrays.stream(data).collect(
        HashMap::new,
        (map, item) -> map.merge(item[0], Long.parseLong(item[1]), Long::sum),
        HashMap::putAll);

    // Extract names (dim = 0) from 2-D array
    String[] names = Arrays.stream(data).map(i -> i[0]).toArray(String[]::new);

    //  Map name to number of grades
    Map<String,Long> countMap = Arrays.stream(names).collect(
        Collectors.groupingBy(Function.identity(), Collectors.counting()));

    //  Divide sum of grades by number of grades
    return gradesMap.entrySet().stream().collect(Collectors.toMap(e -> e.getKey(),
        e -> e.getValue() / countMap.get(e.getKey())));
  }
}
