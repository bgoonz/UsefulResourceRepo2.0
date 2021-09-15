package data.structures.java.maps;

import java.util.*;
import java.util.stream.Collectors;

public class SortLogFile
{
  private String[] lines;
  public SortLogFile(String[] lines)
  {
    this.lines = lines;
  }

  public List<String> sorted()
  {
    Map<String,SortedSet<String>> stringMessageToIdMap = new HashMap<>();
    Map<String,SortedSet<String>> numberMessageToIdMap = new HashMap<>();

    for(String s : lines)
    {
      String[] ar = s.split("\\s+");
      String id = ar[0];
      String message = s.substring(id.length()).trim();
      if(message.matches("^[\\d ]*$"))
      {
        numberMessageToIdMap.computeIfAbsent(message, v -> new TreeSet<>()).add(id);
      }
      else
      {
        stringMessageToIdMap.computeIfAbsent(message, v -> new TreeSet<>()).add(id);
      }
    }

    List<String> result = new ArrayList<>();

    List<String> sortedStringMessages = stringMessageToIdMap.keySet().stream().sorted().collect(Collectors.toList());
    for(String message : sortedStringMessages)
    {
      Set<String> ids = stringMessageToIdMap.get(message);
      for(String id : ids)
      {
        String sortedMessage = id + " " + message;
        result.add(sortedMessage);
      }
    }

    for(Map.Entry<String, SortedSet<String>> e : numberMessageToIdMap.entrySet()) {
      for (String id : e.getValue()) {
        String message = id + " " + e.getKey();
        result.add(message);
      }
    }

    return result;
  }
}
