package designpatterns.creational;

public class Singleton1
{
  //  Control the number of objects created by preventing external instantiation and modification
  //  This example illustrates the "holder" pattern

  static class President
  {
    private String name;
    public President(String name)
    {
      this.name = name;
    }

    @Override
    public String toString()
    {
      return "President{" +
          "name='" + name + '\'' +
          '}';
    }
  }

  static class PresidentFactory
  {
    private static class PresidentHolder
    {
      public static President president = new President("the jerk");
    }

    public static President getInstance()
    {
      return PresidentHolder.president;
    }
  }

  public static void main(String[] args)
  {
    President first = PresidentFactory.getInstance();
    President second = PresidentFactory.getInstance();
    assert(first == second);
  }
}
