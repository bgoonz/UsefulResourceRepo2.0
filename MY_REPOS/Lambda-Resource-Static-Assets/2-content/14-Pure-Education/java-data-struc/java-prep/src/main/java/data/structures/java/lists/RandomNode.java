package data.structures.java.lists;

import java.util.Objects;

public class RandomNode<T>
{
  public T data;
  public RandomNode<T> next;
  public RandomNode<T> random;

  public RandomNode(T data)
  {
    this.data = data;
  }

  @Override
  public boolean equals(Object o)
  {
    if (this == o)
    {
      return true;
    }
    if (o == null || getClass() != o.getClass())
    {
      return false;
    }
    RandomNode<?> that = (RandomNode<?>) o;
    return Objects.equals(data, that.data);
  }

  @Override
  public int hashCode()
  {
    return Objects.hash(data);
  }
}
