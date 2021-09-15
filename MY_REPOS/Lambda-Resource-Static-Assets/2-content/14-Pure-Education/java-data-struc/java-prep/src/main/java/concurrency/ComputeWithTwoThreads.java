package concurrency;

public class ComputeWithTwoThreads
{
  // Compute 1 * 2 / (1 + 2) using two threads

  static class Add extends Thread
  {
    int value;
    public void run()
    {
      value = 1 + 2;
    }
  }

  static class Multiply extends Thread
  {
    int value;
    public void run()
    {
      value = 1 * 2;
    }
  }

  public static void main(String[] args)
  {
    Thread t1 = new Add();
    Thread t2 = new Multiply();

    t1.start();
    t2.start();

    try
    {
      t1.join();
      t2.join();
    }
    catch(InterruptedException e)
    {
      e.printStackTrace();
    }

    double n = ((double)((Multiply)t2).value / ((Add) t1).value);
    System.out.println(n);
  }
}
