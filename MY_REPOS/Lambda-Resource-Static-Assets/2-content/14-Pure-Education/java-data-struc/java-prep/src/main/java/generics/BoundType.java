package generics;

public class BoundType
{
  static class GenericWithBound<T extends Number>
  {
    T value;
    GenericWithBound(T t)
    {
      value = t;
    }

    int getValue()
    {
      return value.intValue();
    }
  }

  public static void main(String[] args)
  {
    GenericWithBound<Integer> gwbInt = new GenericWithBound<>(25);
    System.out.println(gwbInt.getValue());

    GenericWithBound<Double> gwbDbl = new GenericWithBound<>(25.01);
    System.out.println(gwbInt.getValue());

    //  Following would be a compilation error
    //GenericWithBound<String> gwbString = new GenericWithBound<>("Hello");
  }
}
