package data.structures.java.arrays;

import java.util.*;
import java.util.stream.Collectors;

public class MinAreaRectangle
{
  /*
  Given a set of points in the x and y axes,
  determine the minimum area of a rectangle formed from these points,
  with sides parallel to the x and y axes.

  If there is a rectangle, there should be 2 points for the diagonal (x1, y1) and (x2, y2).
  There should also be two other points corresponding to the two diagonal points: (x1, y2) and (x2, y1).
   */
  public static int minArea(int[][] points)
  {
    Map<Integer,Set<Integer>> xMap = Arrays.stream(points).collect(
      HashMap::new,
      (map, item) -> map.computeIfAbsent(item[0], e -> new HashSet<>()).add(item[1]),
      HashMap::putAll);

    //  Filter out entries that do not have 2 y coordinates
    xMap = xMap.entrySet().stream().filter(e -> e.getValue().size() > 1).collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

    int minArea = Integer.MAX_VALUE;
    for(int i = 0; i < points.length - 1; ++i)
    {
      for(int j = i + 1; j < points.length; ++j)
      {
        int x1 = points[i][0];
        int y1 = points[i][1];
        int x2 = points[j][0];
        int y2 = points[j][1];

        if(x1 != x2 && y1 != y2 && xMap.containsKey(x1) && xMap.containsKey(x2))
        {
          if(xMap.get(x1).contains(y1) && xMap.get(x2).contains(y2))
          {
            int area = Math.abs( (x1 - x2) * (y1 - y2));
            minArea = Math.min(minArea, area);
          }
        }
      }
    }
    return minArea;
  }
}
