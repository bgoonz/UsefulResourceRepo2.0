package concurrency;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.Semaphore;

import static data.structures.java.util.Common.randomRange;

public class BoundedSetWithSemaphore<T>
{
  // A binary semaphore can be used as a mutex with non-reentrant locking semantics;
  // whoever holds the sole permit holds the mutex.

  private final Set<T> set;
  private final Semaphore semaphore;

  public BoundedSetWithSemaphore(int bound)
  {
    set = Collections.synchronizedSet(new HashSet<>());
    semaphore = new Semaphore(bound);
  }

  public void add(T t) throws InterruptedException
  {
    semaphore.acquire();
    set.add(t);
    semaphore.release();
  }

  public T remove() throws InterruptedException
  {
    semaphore.acquire();
    T t = null;
    if(set.iterator().hasNext())
    {
      t = set.iterator().next();
      set.remove(t);
    }
    semaphore.release();
    return t;
  }

  public static void main(String[] args) throws InterruptedException
  {
    BoundedSetWithSemaphore<Integer> boundedSet = new BoundedSetWithSemaphore<>(1);

    Thread producer = new Thread(() -> {
      for(int i = 0; i < 100; i++)
      {
        try
        {
          boundedSet.add(i);
          Thread.sleep(randomRange(1, 100));
        }
        catch (InterruptedException e)
        {
          Thread.currentThread().interrupt();
        }
        System.out.printf("Put %d in the buffer\n", i);
      }
    });

    Thread consumer = new Thread(() -> {
      for(int i = 0; i < 100; i++)
      {
        try
        {
          Integer val = boundedSet.remove();
          System.out.printf("Value %d retrieved from buffer\n", val);
          Thread.sleep(randomRange(1, 100));
        }
        catch (InterruptedException e)
        {
          Thread.currentThread().interrupt();
        }
      }
    });

    producer.start();
    consumer.start();

    producer.join();
    consumer.join();
  }
}
