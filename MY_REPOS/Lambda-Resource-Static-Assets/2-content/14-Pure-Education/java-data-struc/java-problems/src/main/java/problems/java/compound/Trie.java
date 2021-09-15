package problems.java.compound;

import org.apache.commons.lang3.tuple.Pair;

import java.util.*;
import java.util.stream.Collectors;

public class Trie
{
    static class Node
    {
        char c;
        Map<Character, Node> children = new HashMap<>();
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
        Map<Character,Node> children = root.children;

        for(int i = 0; i < word.length(); ++i)
        {
            char c = word.charAt(i);
            Node node = children.get(c);
            if(node == null)
            {
                node = new Node(c);
                children.put(c, node);
            }

            if(i == word.length() - 1)
            {
                node.isLeaf = true;
            }

            children = node.children;
        }
    }

    public boolean search(String word)
    {
        Node node = searchNode(word);
        return node != null && node.isLeaf;
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

    public List<String> searchBFS(String prefix)
    {
        List<String> result = new ArrayList<>();
        Map<Character,Node> children = root.children;

        for(char c : prefix.toCharArray())
        {
            Node node = children.get(c);
            if(node != null)
            {
                children = node.children;
            }
            else
            {
                return result;
            }
        }

        Queue<Pair<String,Node>> queue = new LinkedList<>();
        queue.addAll(children.entrySet().stream()
                .map(e -> Pair.of(prefix, e.getValue()))
                .collect(Collectors.toList()));
        while(!queue.isEmpty())
        {
            Pair<String,Node> pair = queue.poll();
            String s = pair.getLeft();
            Node node = pair.getRight();
            if(node.isLeaf)
            {
                result.add(s + node.c);
            }
            children = node.children;
            if(!children.isEmpty())
            {
                queue.addAll(children.entrySet().stream()
                        .map(e -> Pair.of(s + node.c, e.getValue()))
                        .collect(Collectors.toList()));
            }
        }
        return result;
    }

    public List<String> searchDFS(String prefix)
    {
        List<String> result = new ArrayList<>();

        Map<Character,Node> children = root.children;
        for(char c : prefix.toCharArray())
        {
            Node node = children.get(c);
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

        for(Map.Entry<Character,Node> e : children.entrySet())
        {
            if(e.getValue().isLeaf)
            {
                result.add(prefix + e.getValue().c);
            }
            searchDFS(result, prefix + e.getValue().c, e.getValue().children);
        }
    }

    static boolean testsPass()
    {
        Trie trie = new Trie();
        trie.insert("to");
        trie.insert("tea");
        trie.insert("ted");
        trie.insert("ten");
        trie.insert("teddy");
        trie.insert("tenor");
        boolean check = trie.search("to") && trie.search("tea") && trie.search("ten");
        if(!check)
        {
            return false;
        }
        check = !trie.search("te") && !trie.search("teno") && !trie.search("tedd");
        if(!check)
        {
            return false;
        }
        List<String> result = trie.searchDFS("te");
        check = result.size() == 5;
        if(!check)
        {
            return false;
        }
        check = result.contains("tea") && result.contains("ted") && result.contains("ten") &
                result.contains("teddy") && result.contains("tenor");
        if(!check)
        {
            return false;
        }
        result = trie.searchBFS("te");
        check = result.size() == 5;
        if(!check)
        {
            return false;
        }
        check = result.contains("tea") && result.contains("ted") && result.contains("ten") &&
                result.contains("teddy") && result.contains("tenor");
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
