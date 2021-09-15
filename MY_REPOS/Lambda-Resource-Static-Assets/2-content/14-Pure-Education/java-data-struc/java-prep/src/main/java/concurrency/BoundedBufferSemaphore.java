package concurrency;

import java.util.concurrent.Semaphore;

public class BoundedBufferSemaphore<T>
{
  private Semaphore itemsSem;
  private Semaphore spacesSem;

  private T[] data;
  private int head;
  private int tail;

  public BoundedBufferSemaphore(int capacity)
  {
    data = (T[]) new Object[capacity];
    itemsSem = new Semaphore(0);
    spacesSem = new Semaphore(capacity);
  }

  public boolean isFull()
  {
    return spacesSem.availablePermits() == 0;
  }

  public boolean isEmpty()
  {
    return itemsSem.availablePermits() == 0;
  }

  public void put(T t) throws InterruptedException
  {
    spacesSem.acquire();
    doPut(t);
    itemsSem.release();
  }

  public T take() throws InterruptedException
  {
    itemsSem.acquire();
    T t = doGet();
    spacesSem.release();
    return t;
  }

  private synchronized void doPut(T t)
  {
    data[tail] = t;
    if(++tail == data.length)
    {
      tail = 0;
    }
  }

  private synchronized T doGet()
  {
    T t = data[head];
    data[head] = null;
    if(++head == data.length)
    {
      head = 0;
    }
    return t;
  }
}
