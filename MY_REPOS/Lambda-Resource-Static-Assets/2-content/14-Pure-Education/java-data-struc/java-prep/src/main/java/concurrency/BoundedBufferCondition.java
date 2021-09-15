package concurrency;

import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class BoundedBufferCondition<T>
{
  private Lock lock = new ReentrantLock();
  private Condition notFull = lock.newCondition();
  private Condition notEmpty = lock.newCondition();

  private T[] data;
  private int head;
  private int tail;
  private int count;

  public BoundedBufferCondition(int capacity)
  {
    data = (T[]) new Object[capacity];
  }

  public void put(T t) throws InterruptedException
  {
    lock.lock();
    try
    {
      while(count == data.length)
      {
        notFull.await();
      }
      data[tail] = t;
      if(++tail == data.length)
      {
        tail = 0;
      }
      ++count;
      notEmpty.signal();
    }
    finally
    {
      lock.unlock();
    }
  }

  public T take() throws InterruptedException
  {
    lock.lock();
    try
    {
      while(count == 0)
      {
        notEmpty.await();
      }
      T t = data[head];
      data[head] = null;
      if(++head == data.length)
      {
        head = 0;
      }
      count--;
      notFull.signal();
      return t;
    }
    finally
    {
      lock.unlock();
    }
  }
}
