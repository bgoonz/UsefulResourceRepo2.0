package data.structures.java.graphs;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

public class CanConnect
{
  private Map<String, GraphNode> allNodes = new HashMap<>();
  private List<String> paths;
  private List<String> errors = new ArrayList<>();


  public void readInput(BufferedReader reader) throws IOException
  {
    allNodes.clear();

    String line;
    int lineNumber = 1;
    while((line = reader.readLine()) != null)
    {
      addGraphNodes(line, lineNumber++);
    }
  }

  public boolean pathExists(String from, String to)
  {
    String fromLower = from.toLowerCase();
    String toLower = to.toLowerCase();

    if(paths == null)
    {
      genPaths();
    }

    if(!allNodes.containsKey(fromLower) || !allNodes.containsKey(toLower))
    {
      return false;
    }

    List<String> matches = paths.stream().filter(x -> x.startsWith(fromLower + ",")).collect(Collectors.toList());

     for(String match : matches)
    {
      String[] cities = match.split(",");
      List<String> cityList = Arrays.asList(cities);
      if(cityList.contains(toLower))
      {
        return true;
      }
    }
    return false;
  }

  public List<List<String>> genPaths()
  {
    List<List<String>> results = new ArrayList<>();

    for(Map.Entry<String,GraphNode> e : allNodes.entrySet())
    {
      List<String> path = new ArrayList<>();
      List<String> visited = new ArrayList<>();

      GraphNode.generatePaths(e.getValue(), e.getValue(), path, visited, results);
    }

    String allPaths = results.stream()
        .map(i -> i.stream().collect(Collectors.joining(",")))
        .collect(Collectors.toList())
        .stream()
        .collect(Collectors.joining(";"));

    String[] paths = allPaths.split(";");
    this.paths = Arrays.asList(paths);

    return results;
  }


  private boolean validatedLineEntry(String[] pair, int lineNumber)
  {
    if(pair.length > 2)
    {
      errors.add(String.format("Line #: %d contained more than 2 cities. Ignoring input after second comma.", lineNumber));
    }
    else if(pair.length < 2)
    {
      errors.add(String.format("Line #: %d did not contain two cities separated by comma. Skipping.", lineNumber));
      return false;
    }
    return true;
  }

  private void addGraphNodes(String line, int lineNumber)
  {
    if(line.trim().isEmpty())
    {
      errors.add(String.format("Line #: %d is empty", lineNumber));
      return;
    }
    String[] pair = line.split(",");
    if(validatedLineEntry(pair, lineNumber))
    {
      String city1 = pair[0].trim().toLowerCase();
      String city2 = pair[1].trim().toLowerCase();

      GraphNode gn1 = allNodes.get(city1);
      GraphNode gn2 = allNodes.get(city2);

      if(gn1 == null)
      {
        if(gn2 == null)
        {
          gn2 = new GraphNode(city2);
          allNodes.put(city2, gn2);
        }
        gn1 = new GraphNode(city1, gn2);
        allNodes.put(city1, gn1);
      }
      else
      {
        if(gn2 == null)
        {
          gn2 = new GraphNode(city2);
          allNodes.put(city2, gn2);
        }
        gn1.add(gn2);
      }
    }
  }

  static void displayHelp()
  {
    System.out.println("Following positional parameters are mandatory:");
    System.out.println("<filename> <from-city> <to-city>");
  }


  private static class GraphNode
  {
    String name;
    List<GraphNode> links = new ArrayList<>();

    GraphNode(String name)
    {
      this.name = name;
    }

    GraphNode(String name, GraphNode gn)
    {
      this(name);
      add(gn);
    }

    void add(GraphNode gn)
    {
      links.add(gn);
    }


    static void generatePaths(GraphNode gn,
                              GraphNode gnStart,
                              List<String> path,
                              List<String> visited,
                              List<List<String>> results)
    {
      if(gn.links.size() > 1)
      {
        int indexOfStartNode = gn.links.indexOf(gnStart);
        if(indexOfStartNode != -1)
        {
          gn.links.remove(indexOfStartNode);
          gn.links.add(gnStart);
        }
      }

      path.add(gn.name);
      visited.add(gn.name);

      for(GraphNode childGN : gn.links)
      {
        if(visited.contains(childGN.name))
        {
          results.add(new ArrayList<>(path));
          path.remove(path.size() - 1);
          visited.remove(visited.size() - 1);
          return;
        }
        generatePaths(childGN, gnStart, path, visited, results);
      }
      if(path.size() > 1)
      {
        results.add(new ArrayList<>(path));
      }
      path.remove(path.size() - 1);
    }

    @Override
    public String toString()
    {
      List<String> path = new ArrayList<>();
      List<String> visited = new ArrayList<>();
      List<List<String>> result = new ArrayList<>();
      generatePaths(this, this, path, visited, result);

      return result.stream()
          .map(i -> i.stream().collect(Collectors.joining(",")))
          .collect(Collectors.toList())
          .stream()
          .collect(Collectors.joining(";"));
    }
  }

  public static void main(String[] args) throws IOException
  {
    if(args.length < 3)
    {
      CanConnect.displayHelp();
      System.exit(1);
    }

    String fileName = args[0], fromCity = args[1], toCity = args[2];

    BufferedReader reader = new BufferedReader(new FileReader(args[0]));

    CanConnect cc = new CanConnect();
    cc.readInput(reader);

    if(cc.pathExists(fromCity, toCity))
    {
      System.out.println("yes");
    }
    else
    {
      System.out.println("no");
    }
    if(cc.errors.size() > 0)
    {
      System.out.printf("\nFollowing errors were detected in input file \"%s\".\n", fileName);
      cc.errors.stream().forEach(System.out::println);
    }
  }
}
