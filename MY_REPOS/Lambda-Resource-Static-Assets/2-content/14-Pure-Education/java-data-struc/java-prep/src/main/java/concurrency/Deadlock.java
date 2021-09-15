package concurrency;

import java.util.concurrent.TimeUnit;

public class Deadlock
{
  static class Locker implements Runnable
  {
    private Object first, second;

    Locker(Object first, Object second)
    {
      this.first = first;
      this.second = second;
    }

    @Override
    public void run()
    {
      synchronized (first)
      {
        try
        {
          TimeUnit.SECONDS.sleep(2);
        }
        catch (InterruptedException e)
        {
          e.printStackTrace();
        }
        synchronized (second)
        {
          System.out.println(Thread.currentThread().getName());
        }
      }
    }
  }

  public static void main(String[] args)
  {
    Object lock1 = new Object();
    Object lock2 = new Object();
    new Thread(new Locker(lock1, lock2),"Thread 1").start();
    new Thread(new Locker(lock2, lock1),"Thread 2").start();
  }

}
