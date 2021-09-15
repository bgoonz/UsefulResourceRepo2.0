package problems.java.fifo_lifo;

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
    Construct map:
     A -> B
     B -> C, D, E
     C -> A
     E -> A
    */

    static boolean canConnect(String[][] paths, String from, String to)
    {
        Map<String, Set<String>> map = Arrays.stream(paths).collect(
                HashMap::new,
                (m, i) -> m.computeIfAbsent(i[0], a -> new HashSet<>()).add(i[1]),
                HashMap::putAll);

        Set<String> visited = new HashSet<>();
        Queue<String> queue = new LinkedList<>();
        queue.offer(from);
        while(!queue.isEmpty())
        {
            String s = queue.poll();
            Set<String> destinations = map.get(s);
            if(destinations != null)
            {
                if(destinations.contains(to))
                {
                    return true;
                }
                destinations.removeAll(visited);
                visited.addAll(destinations);
                queue.addAll(destinations);
            }
        }

        return false;
    }

    static boolean testsPass()
    {
        String[][] input = {
                {"A", "B"},
                {"B", "C"},
                {"B", "D"},
                {"B", "E"},
                {"C", "A"},
                {"E", "A"}
        };
        boolean check = canConnect(input, "A", "C") &&
                canConnect(input, "E", "C") &&
                !canConnect(input, "D", "C");
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
