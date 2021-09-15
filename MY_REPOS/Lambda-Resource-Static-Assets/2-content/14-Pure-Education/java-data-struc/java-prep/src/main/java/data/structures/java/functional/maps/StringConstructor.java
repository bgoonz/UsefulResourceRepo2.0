package data.structures.java.functional.maps;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public class StringConstructor
{
  static abstract class Fruit
  {
    protected int weight;
    Fruit(int weight)
    {
      this.weight = weight;
    }
  }

  static class Apple extends Fruit
  {
    Apple(int weight)
    {
      super(weight);
    }

    @Override
    public String toString()
    {
      return "Apple{" +
          "weight=" + weight +
          '}';
    }
  }

  static class Orange extends Fruit
  {
    Orange(int weight)
    {
      super(weight);
    }

    @Override
    public String toString()
    {
      return "Orange{" +
          "weight=" + weight +
          '}';
    }
  }

  private Map<String, Function<Integer, Fruit>> constructorMap = new HashMap<String, Function<Integer, Fruit>>() {{
    put("apple", Apple::new);
    put("orange", Orange::new);
  }};

  public Fruit getFruit(String fruit, Integer wieght)
  {
    return constructorMap.get(fruit.toLowerCase()).apply(wieght);
  }

  public static void main(String[] args)
  {
    StringConstructor stringConstructor = new StringConstructor();
    Fruit apple = stringConstructor.getFruit("apple", 50);
    Fruit orange = stringConstructor.getFruit("orange", 80);

    System.out.println(apple);
    System.out.println(orange);
  }
}
