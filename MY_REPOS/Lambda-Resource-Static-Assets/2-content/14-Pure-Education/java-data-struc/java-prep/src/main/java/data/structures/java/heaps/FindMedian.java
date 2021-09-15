package data.structures.java.heaps;

import java.util.Collections;
import java.util.PriorityQueue;

public class FindMedian
{
  private PriorityQueue<Integer> minHeap = new PriorityQueue<Integer>(20);
  private PriorityQueue<Integer> maxHeap = new PriorityQueue<Integer>(20, Collections.reverseOrder());
  private int[] data;

  public FindMedian(int[] data)
  {
    this.data = data;
  }

  public void populate()
  {
    for(int i : data)
    {
      if(minHeap.size() == maxHeap.size())
      {
        if(minHeap.peek() != null && i > minHeap.peek())
        {
          maxHeap.offer(minHeap.poll());
          minHeap.offer(i);
        }
        else
        {
          maxHeap.offer(i);
        }
      }
      else
      {
        if(maxHeap.peek() > i)
        {
          minHeap.offer(maxHeap.poll());
          maxHeap.offer(i);
        }
        else
        {
          minHeap.offer(i);
        }
      }
    }
  }

  public double getMedian()
  {
    if(maxHeap.isEmpty())
    {
      return minHeap.peek();
    }
    else if(minHeap.isEmpty())
    {
      return maxHeap.peek();
    }

    if(maxHeap.size() == minHeap.size())
    {
      return (minHeap.peek() + maxHeap.peek()) / 2.0;
    }
    else if(maxHeap.size() > minHeap.size())
    {
      return maxHeap.peek();
    }
    else
    {
      return minHeap.peek();
    }
  }
}
