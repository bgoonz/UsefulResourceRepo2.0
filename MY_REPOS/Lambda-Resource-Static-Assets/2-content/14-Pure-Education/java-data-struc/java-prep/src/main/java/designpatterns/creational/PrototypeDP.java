package designpatterns.creational;

public class PrototypeDP
{
  //  Use this pattern when similar objects are created frequently.
  //  PrototypeDP clones objects and sets the changed feature.

  interface Prototype
  {
    void setSize(int x);
    void printSize();
  }

  static class Proto implements Prototype, Cloneable
  {
    private int size;

    public Proto(int s)
    {
      this.size = s;
    }

    @Override
    public void setSize(int x)
    {
      this.size = x;
    }

    @Override
    public void printSize()
    {
      System.out.println("Size: " + size);
    }

    @Override
    public Proto clone() throws CloneNotSupportedException
    {
      return (Proto) super.clone();
    }
  }

  public static void main(String[] args) throws CloneNotSupportedException
  {
    Proto proto = new Proto(1);

    for(int i = 2; i < 10; ++i)
    {
      Proto temp = proto.clone();
      temp.setSize(i);
      temp.printSize();
    }
  }
}
