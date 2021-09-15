package data.structures.java.general;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class HeterogeneousContainer
{
  /*
  Consider a database row that can have arbitrarily many columns. It would be nice to be able to access all of them in a typesafe manner.
  The idea is to parameterize the key instead of the container.
  When a class literal is passed among methods to communicate both compile-time and runtime type information, it is called a type token.
  */

  static class Favorites
  {
    private Map<Class<?>, Object> favorites = new HashMap<>();

    public <T> void put(Class<T> type, T instance)
    {
      favorites.put(Objects.requireNonNull(type), type.cast(instance));
    }

    public <T> T get(Class<T> type)
    {
      return type.cast(favorites.get(type));
    }
  }

  public static void main(String[] args)
  {
    Favorites favorites = new Favorites();

    favorites.put(String.class, "String");
    favorites.put(Integer.class, 1);
    favorites.put(Class.class, Favorites.class);

    String s = favorites.get(String.class);
    int i = favorites.get(Integer.class);
    Class<?> klass = favorites.get(Class.class);

    System.out.printf("%s %d %s\n", s, i, klass);
  }
}
