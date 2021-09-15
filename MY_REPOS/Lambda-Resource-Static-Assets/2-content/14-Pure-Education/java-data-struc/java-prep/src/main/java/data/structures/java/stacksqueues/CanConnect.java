package data.structures.java.stacksqueues;

import java.util.*;

public class CanConnect
{
  /*
  Consider 2D array as Source, Destination. For example:
        {"A", "B"},
        {"B", "C"},
        {"B", "D"},
        {"B", "E"},
        {"C", "A"},
        {"E", "A"}
   */
  public static boolean pathExists(String[][] paths, String from, String to)
  {
    Map<String, Set<String>> pathMap = Arrays.stream(paths).collect(
        HashMap::new,
        (map, item) -> map.computeIfAbsent(item[0], e -> new HashSet<>()).add(item[1]),
        HashMap::putAll);

    Set<String> visited = new HashSet<>();

    Queue<String> queue = new LinkedList<>();
    queue.add(from);

    while(!queue.isEmpty())
    {
      String item = queue.remove();
      Set<String> destSet = pathMap.get(item);

      if(destSet != null)
      {
        if (destSet.contains(to))
        {
          return true;
        }
        destSet.removeAll(visited);
        visited.addAll(destSet);
        queue.addAll(destSet);
      }
    }
    return false;
  }
}
