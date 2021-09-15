package concurrency;

public class BoundedBufferWaitNotify
{
  static abstract class BaseBoundedBuffer<T>
  {
    private final T[] data;
    private int tail;
    private int head;
    private int count;

    protected BaseBoundedBuffer(int capacity)
    {
      data = (T[])new Object[capacity];
    }

    protected synchronized void doPut(T t)
    {
      data[tail] = t;
      if(++tail == data.length)
      {
        tail = 0;
      }
      count++;
    }

    protected synchronized T doTake()
    {
      T t = data[head];
      data[head] = null;
      if(++head == data.length)
      {
        head = 0;
      }
      --count;
      return t;
    }

    protected synchronized boolean isFull()
    {
      return data.length == count;
    }

    protected synchronized boolean isEmpty()
    {
      return data.length == 0;
    }
  }

  static class BoundedBuffer<T> extends BaseBoundedBuffer<T>
  {
    public BoundedBuffer(int capacity)
    {
      super(capacity);
    }

    public synchronized void put(T t) throws InterruptedException
    {
      while(isFull())
      {
        wait();
      }
      doPut(t);
      notifyAll();
    }

    public synchronized T take() throws InterruptedException
    {
      while(isEmpty())
      {
        wait();
      }
      T t = doTake();
      notifyAll();
      return t;
    }
  }
}
