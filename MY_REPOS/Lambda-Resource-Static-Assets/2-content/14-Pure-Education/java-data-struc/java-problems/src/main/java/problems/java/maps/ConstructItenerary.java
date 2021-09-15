package problems.java.maps;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class ConstructItenerary
{
    /*
    Consider trips
    From: To:               Itinerary
    ---------               ---------
    B  -> C                 A  -> B
    D  -> E                 B  -> C
    A  -> B                 C  -> D
    C  -> D                 D  -> E
    */
    //  ReverseAndRotate input map
    //  Starting point will be the key not found in reversed map

    static Map<String,String> itinerary(Map<String,String> trips)
    {
        //  ReverseAndRotate input map
        Map<String,String> reverseMap = trips.entrySet().stream()
                .collect(Collectors.toMap(Map.Entry::getValue, Map.Entry::getKey));
        //  Starting point will be the key not found in reversed map
        Set<String> startPoint = new HashSet<>(trips.keySet());
        startPoint.removeAll(reverseMap.keySet());
        if(startPoint.size() != 1)
        {
            return null;
        }

        String start = startPoint.iterator().next();
        String end;

        Map<String,String> result = new HashMap<>();
        while((end = trips.get(start)) != null)
        {
            result.put(start, end);
            start = end;
        }
        return result;
    }

    static boolean testsPass()
    {
        Map<String,String> trips = new HashMap<String,String>() {{
            put("B", "C");
            put("D", "E");
            put("A", "B");
            put("C", "D");
        }};
        Map<String, String> result = itinerary(trips);
        boolean check = result.get("A").equals("B") &&
                result.get("B").equals("C") &&
                result.get("C").equals("D") &&
                result.get("D").equals("E");
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
