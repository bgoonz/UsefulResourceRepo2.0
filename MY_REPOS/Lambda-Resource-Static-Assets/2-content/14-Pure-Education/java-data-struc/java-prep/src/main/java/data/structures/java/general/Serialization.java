package data.structures.java.general;

import java.io.InvalidObjectException;
import java.io.ObjectInputStream;
import java.io.Serializable;
import java.util.Date;

public class Serialization
{
  public static class Point implements Serializable
  {
    private final Date start;
    private final Date end;

    public Point(Date start, Date end)
    {
      this.start = start;
      this.end = end;
    }

    private Object writeReplace()
    {
      return new SerializationProxy(this);
    }

    private void readObject(ObjectInputStream stream) throws InvalidObjectException
    {
      throw new InvalidObjectException("Proxy required.");
    }
  }

  private static class SerializationProxy implements Serializable
  {
    private static final long serialVersionUID = 6211388566527071307L;

    private final Date start;
    private final Date end;
    public SerializationProxy(Point p)
    {
      this.start = p.start;
      this.end = p.end;
    }

    private Object readResolve()
    {
      return new Point(start, end);
    }
  }
}
