package problems.java.arrays;

import java.util.*;
import java.util.stream.Collectors;

public class RectangleArea
{
    // Given a set of points in the x and y axes,
    // determine the minimum area of a rectangle formed from these points,
    // with sides parallel to the x and y axes.
    //
    // If there is a rectangle, there should be 2 points for the diagonal (x1, y1) and (x2, y2).
    // There should also be two other points corresponding to the two diagonal points: (x1, y2) and (x2, y1).
    // Filter out entries that do not have at least 2 y coordinates

    static int minRectangleArea(int[][] points)
    {
        Map<Integer, Set<Integer>> map = Arrays.stream(points).collect(
                HashMap::new,
                (m, item) -> m.computeIfAbsent(item[0], a -> new HashSet<>()).add(item[1]),
                HashMap::putAll);

        map = map.entrySet().stream()
                .filter(e -> e.getValue().size() > 1)
                .collect(Collectors.toMap(Map.Entry::getKey, Map.Entry::getValue));

        int minArea = Integer.MAX_VALUE;

        for(int i = 0; i < points.length - 1; ++i)
        {
            for(int j = i + 1; j < points.length; j++)
            {
                int x1 = points[i][0];
                int y1 = points[i][1];
                int x2 = points[j][0];
                int y2 = points[j][1];
                if(x1 != x2 && y1 != y2 && map.containsKey(x1) && map.containsKey(x2))
                {
                    if(map.get(x1).contains(y1) && map.get(x1).contains(y2) &&
                            map.get(x2).contains(y1) && map.get(x2).contains(y2))
                    {
                        int area = Math.abs((x1 - x2) * (y1 - y2));
                        minArea = Math.min(minArea, area);
                    }
                }
            }
        }

        return minArea;
    }


    static int areaOfOverlappingRectangle(int[][] r1, int[][] r2)
    {
        int[] xInterval1 = new int[] {r1[0][0], r1[1][0]};
        int[] yInterval1 = new int[] {r1[0][1], r1[1][1]};
        int[] xInterval2 = new int[] {r2[0][0], r2[1][0]};
        int[] yInterval2 = new int[] {r2[0][1], r2[1][1]};

        int w = xInterval2[0] > xInterval1[0] ? xInterval1[1] - xInterval2[0] : xInterval2[1] - xInterval1[0];
        int h = yInterval2[1] > yInterval1[0] ? yInterval1[1] - yInterval2[0] : yInterval2[1] - yInterval1[0];

        if(w > 0 && h > 0)
        {
            return w * h;
        }
        return 0;
    }


    static boolean testsPass()
    {
        int[][] points = {
                {2, 1},
                {2, 3},
                {3, 5},
                {5, 1},
                {5, 3},
                {7, 2},
                {8, 5},
                {2, 4},
                {2, 5},
                {5, 4},
                {5, 5},
        };

        boolean check = minRectangleArea(points) == 3;
        if(!check)
        {
            return false;
        }

        int[][] r1 = {
                {1, 1},
                {4, 4},
        };
        int [][] r2 = {
                {3, 3},
                {6, 5},
        };
        check = areaOfOverlappingRectangle(r1, r2) == 1;
        if(!check)
        {
            return false;
        }
        return true;
    }

    public static void main(String... args)
    {
        if(testsPass())
        {
            System.out.println("Tests passed");
        }
        else
        {
            System.out.println("Tests failed");
        }
    }
}
