package generics;

import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

public class CollectionToArray
{
  /*
  The Collections Framework contains two methods for converting collections to arrays:
			public Object[] toArray();
			public <T> T[] toArray(T[] a);

  Because arrays must reify their component types, it is an error to create a new array unless its component type is reifiable
		  T[] a = new T[c.size()]; // compile-time error
		  return new List<Integer>[] {a, b}; // compile-time error
   */
  public static<T> T[] toArray(Collection<T> coll, T[] a)
  {
    if(a.length < coll.size())
    {
      a = (T[]) Array.newInstance(a.getClass().getComponentType(), coll.size());
    }

    int i = 0;
    for (T x : coll)
    {
      a[i++] = x;
    }
    if (i < a.length)
    {
      a[i] = null;
    }
    return a;
  }

  public static <T> T[] toArray(Collection<T> c, Class<T> k)
  {
    T[] a = (T[])Array.newInstance(k, c.size());
    int i = 0;
    for (T x : c)
    {
      a[i++] = x;
    }
    return a;
  }

  public static void main(String[] args)
  {
    List<String> strings = Arrays.asList("one", "two");
    String[] a1 = toArray(strings, new String[0]);
    assert Arrays.toString(a1).equals("[one, tow]");

    String[] a2 = new String[] {"x", "x", "x", "x"};
    toArray(strings, a2);
    assert Arrays.toString(a2).equals("[one, two, null, x]");
  }
}
