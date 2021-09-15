package designpatterns.behavioral;

public class ChainOfResponsibility
{
  //  Build a chain of processing units, each unit handles the request if threshold is satisfied.
  //  Since a chain is built, if one unit is not satisfied, it's next unit will be tested, and so on.
  //  Each request will be process along the chain.

  static abstract class Chain
  {
    public static int One = 1;
    public static int Two = 2;
    public static int Three = 3;

    protected int Threshold;

    protected Chain next;

    public void setNext(Chain chain)
    {
      next = chain;
    }

    public void message(String msg, int priority)
    {
      //  if priority is less than Threshold it is handled
      if(priority <= Threshold)
      {
        writeMessage(msg);
      }

      if(next != null)
      {
        next.message(msg, priority);
      }
    }

    abstract protected void writeMessage(String msg);
  }

  static class A extends Chain
  {
    public A(int threshold)
    {
      this.Threshold = threshold;
    }
    @Override
    protected void writeMessage(String msg)
    {
      System.out.println("A: " + msg);
    }
  }

  static class B extends Chain
  {
    public B(int threshold)
    {
      this.Threshold = threshold;
    }
    @Override
    protected void writeMessage(String msg)
    {
      System.out.println("B: " + msg);
    }
  }

  static class C extends Chain
  {
    public C(int threshold)
    {
      this.Threshold = threshold;
    }
    @Override
    protected void writeMessage(String msg)
    {
      System.out.println("C: " + msg);
    }
  }

  private static Chain createChain()
  {
    Chain chain1 = new A(Chain.Three);
    Chain chain2 = new B(Chain.Two);
    chain1.setNext(chain2);
    Chain chain3 = new C(Chain.One);
    chain2.setNext(chain3);
    return chain1;
  }

  public static void main(String[] args)
  {
    Chain chain = createChain();

    chain.message("level 3", Chain.Three);
    chain.message("level 2", Chain.Two);
    chain.message("level 1", Chain.One);
  }

}
