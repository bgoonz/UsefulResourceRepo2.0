package data.structures.java.maps;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class FindItinerary
{
  /*
  Consider trips
  From: To:
  ---------
  C  -> B
  E  -> D
  B  -> A
  D  -> C
  Reconstruct Itinerary:
  ----------------------
  A  -> B
  B  -> C
  C  -> D
  D  -> E
  */

  private Map<String,String> trips;
  public FindItinerary(Map<String,String> trips)
  {
    this.trips = trips;
  }

  public Map<String,String> find()
  {
    //  Create reversed map
    Map<String,String> reversedMap = trips.entrySet().stream()
        .collect(Collectors.toMap(Map.Entry::getValue, Map.Entry::getKey));

    //  To find starting point, locate key not present in reversed map
    Set<String> startSet = new HashSet<>(trips.keySet());
    startSet.removeAll(reversedMap.keySet());
    if(startSet.size() != 1)
    {
      return null;
    }

    String start = startSet.iterator().next();
    String end;
    Map<String,String> result = new HashMap<>();

    while((end = trips.get(start)) != null)
    {
      result.put(start, end);
      start = end;
    }
    return result;
  }
}
