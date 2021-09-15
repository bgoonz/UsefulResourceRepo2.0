package designpatterns.creational;

public class Singleton2
{
  enum President
  {
    INSTANCE;
  }

  public static void main(String[] args)
  {
    President first = President.INSTANCE;
    President second = President.INSTANCE;
    assert(first == second);
  }
}
