package data.structures.java.maps;

import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

public class BestAverage
{
  //  {{"nick", "80"}, {"paul", "50"}, {"ron", "60"}, {"nick", "100"}};
  private String[][] data;
  public BestAverage(String[][] data)
  {
    this.data = data;
  }

  public int compute1()
  {
    Map<String, Integer> totalMap = new HashMap<>();

    for(String[] pair : data)
    {
      totalMap.merge(pair[0], Integer.parseInt(pair[1]), Integer::sum);
    }

    Map<String, Integer> countMap = new HashMap<>();
    for(String[] pair : data)
    {
      countMap.merge(pair[0], 1, Integer::sum);
    }

    int bestAvg = 0;
    for(Map.Entry<String,Integer> e : totalMap.entrySet())
    {
      int count = countMap.get(e.getKey());
      bestAvg = Math.max(bestAvg, e.getValue() / count);
    }

    return bestAvg;
  }

  public int compute2()
  {
    Map<String,Integer> gradesMap = Arrays.stream(data).collect(
        HashMap<String,Integer>::new,
        (map, arr) -> map.merge(arr[0], Integer.parseInt(arr[1]), Integer::sum),
        HashMap<String,Integer>::putAll);


    Map<String,Integer> countMap = Arrays.stream(data).collect(
        HashMap<String,Integer>::new,
        (map, arr) -> map.merge(arr[0], 1, Integer::sum),
        HashMap<String,Integer>::putAll);

    int bestAverage = gradesMap.entrySet().stream()
        .mapToInt(x -> x.getValue() / countMap.get(x.getKey()))
        .max().getAsInt();
    return bestAverage;
  }
}
