package data.structures.java.compound;

import java.util.*;

public class Trie
{
  //  Note the difference between searchBFS ( which uses Streams ) and searchBFS1 which does not.
  //  searchBFS1 executes much faster.
  private static class Node
  {
    char c;
    Map<Character,Node> children = new HashMap<>();

    boolean isLeaf;

    Node(char c)
    {
      this.c = c;
    }

    Node() {}
  }

  private Node root = new Node();

  public void insert(String word)
  {
    Map<Character, Node> children = root.children;

    for(int i = 0; i < word.length(); ++i)
    {
      char c = word.charAt(i);

      Node node = children.get(c);
      if(node == null)
      {
        node = new Node(c);
        children.put(c, node);
      }

      children = node.children;
      if(i == word.length() - 1)
      {
        node.isLeaf = true;
      }
    }
  }

  public boolean search(String word)
  {
    Node node = searchNode(word);
    return node != null && node.isLeaf;
  }

  public List<String> searchBFS(String prefix)
  {
    List<String> result = new ArrayList<>();
    Map<Character, Node> children = root.children;
    Node node;
    for(char c : prefix.toCharArray())
    {
      node = children.get(c);
      if(node != null)
      {
        children = node.children;
      }
      else
      {
        return result;
      }
    }

    Queue<AbstractMap.SimpleEntry<String, Node>> queue = new LinkedList<>();
    children.entrySet().stream().forEach(e -> queue.add(new AbstractMap.SimpleEntry(prefix, e.getValue())));
    while(!queue.isEmpty())
    {
      AbstractMap.SimpleEntry<String, Node> e = queue.poll();
      String s = e.getKey();
      Node n = e.getValue();
      if(n.isLeaf)
      {
        result.add(s + n.c);
      }
      children = n.children;
      if(!children.isEmpty())
      {
        children.entrySet().stream().forEach(x -> queue.add(new AbstractMap.SimpleEntry(s + n.c, x.getValue())));
      }
    }
    return result;
  }

  public List<String> searchBFS1(String prefix)
  {
    List<String> result = new ArrayList<>();
    Map<Character, Node> children = root.children;
    Node node;
    for(char c : prefix.toCharArray())
    {
      node = children.get(c);
      if(node != null)
      {
        children = node.children;
      }
      else
      {
        return result;
      }
    }

    Queue<AbstractMap.SimpleEntry<String, Node>> queue = new LinkedList<>();

    for(Node n : children.values())
    {
      queue.add(new AbstractMap.SimpleEntry(prefix, n));
    }


    while(!queue.isEmpty())
    {
      AbstractMap.SimpleEntry<String, Node> e = queue.poll();
      String s = e.getKey();
      Node n = e.getValue();
      if(n.isLeaf)
      {
        result.add(s + n.c);
      }
      children = n.children;
      if(!children.isEmpty())
      {
        for(Node n1 : children.values())
        {
          queue.add(new AbstractMap.SimpleEntry(s + n.c, n1));
        }
      }
    }
    return result;
  }

  public List<String> searchDFS(String prefix)
  {
    List<String> result = new ArrayList<>();
    Map<Character, Node> children = root.children;
    Node node;
    for(char c : prefix.toCharArray())
    {
      node = children.get(c);
      if(node != null)
      {
        children = node.children;
      }
      else
      {
        return result;
      }
    }
    searchDFS(result, prefix, children);
    return result;
  }

  private void searchDFS(List<String> result, String prefix, Map<Character, Node> children)
  {
    if(children.isEmpty())
    {
      return;
    }

    for(Map.Entry<Character, Node> e : children.entrySet())
    {
      if(e.getValue().isLeaf)
      {
        result.add(prefix + e.getValue().c);
      }
      searchDFS(result, prefix + e.getValue().c, e.getValue().children);
    }
  }

  private Node searchNode(String s)
  {
    Map<Character, Node> children = root.children;

    Node node = null;
    for(char c : s.toCharArray())
    {
      node = children.get(c);
      if(node != null)
      {
        children = node.children;
      }
      else
      {
        return null;
      }
    }
    return node;
  }
}
