package data.structures.java.lists;

public class DownNode<T>
{
  public T data;
  public DownNode<T> next;
  public DownNode<T> down;

  public DownNode(T data)
  {
    this.data = data;
  }

}
