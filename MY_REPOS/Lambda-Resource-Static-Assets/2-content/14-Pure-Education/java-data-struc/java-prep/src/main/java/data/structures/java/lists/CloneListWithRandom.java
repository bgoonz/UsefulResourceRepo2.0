package data.structures.java.lists;

import java.util.HashMap;
import java.util.Map;

public class CloneListWithRandom
{
  //  This problem can be solved with a help of a Map.
  /*
  However, first solution is not ideal since it relies of equals and hashCode to be implemented on the RandomNode
   */
  public static<T> RandomNode<T> cloneRandomList(RandomNode<T> original)
  {
    Map<RandomNode<T>, RandomNode<T>> map = new HashMap<>();

    RandomNode<T> newHead = null;
    RandomNode<T> newTail = null;
    RandomNode<T> current = original;
    while(current != null)
    {
      RandomNode<T> copy = new RandomNode<>(current.data);
      if(newHead == null)
      {
        newHead = copy;
        newTail = copy;
      }
      else
      {
        newTail.next = copy;
        newTail = copy;
      }

      map.put(current, copy);

      current = current.next;
    }

    for(Map.Entry<RandomNode<T>,RandomNode<T>> e : map.entrySet())
    {
      RandomNode<T> org = e.getKey();
      if(org.random != null)
      {
        RandomNode<T> randomKey = map.get(org.random);
        RandomNode<T> randomValue = map.get(randomKey);
        e.getValue().random = randomValue;
      }
    }

    return newHead;
  }
}
