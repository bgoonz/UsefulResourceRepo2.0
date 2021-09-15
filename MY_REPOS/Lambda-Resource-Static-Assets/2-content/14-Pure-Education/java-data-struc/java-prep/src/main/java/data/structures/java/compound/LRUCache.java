package data.structures.java.compound;

import java.util.HashMap;
import java.util.Map;

public class LRUCache<K,V>
{
  private static class Node<K, V>
  {
    K key;
    V value;
    Node<K, V> prev;
    Node<K, V> next;

    Node(K key, V value)
    {
      this.key = key;
      this.value = value;
    }
  }

  int capacity;
  Map<K, Node<K, V>> map = new HashMap<>();
  Node<K, V> head;
  Node<K, V> end;


  public LRUCache(int capacity)
  {
    this.capacity = capacity;
  }

  public void set(K key, V value)
  {
    if(map.containsKey(key))
    {
      Node<K, V> old = map.get(key);
      old.value = value;
      remove(old);
      setHead(old);
    }
    else
    {
      Node<K, V> newNode = new Node<>(key, value);
      if(map.size() >= capacity)
      {
        map.remove(end.key);
        remove(end);
        setHead(newNode);
      }
      else
      {
        setHead(newNode);
      }
      map.put(key, newNode);
    }
  }

  public V get(K key)
  {
    if(map.containsKey(key))
    {
      Node<K, V> node = map.get(key);
      remove(node);
      setHead(node);
      return node.value;
    }
    return null;
  }

  private void remove(Node<K, V> node)
  {
    if (node.prev != null)
    {
      node.prev.next = node.next;
    }
    else
    {
      head = node.next;
    }

    if (node.next != null)
    {
      node.next.prev = node.prev;
    }
    else
    {
      end = node.prev;
    }
  }

  private void setHead(Node<K, V> node)
  {
    node.next = head;
    node.prev = null;

    if (head != null)
    {
      head.prev = node;
    }

    head = node;

    if (end == null)
    {
      end = head;
    }
  }
}
