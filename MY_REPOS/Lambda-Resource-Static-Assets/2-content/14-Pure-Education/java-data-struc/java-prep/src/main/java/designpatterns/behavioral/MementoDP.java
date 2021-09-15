package designpatterns.behavioral;

import java.util.ArrayList;
import java.util.List;

public class MementoDP
{
  //  Allow an object to go back to a prior state

  //  Note that this class is immutable
  static class Memento
  {
    private final String time;

    public Memento(String time)
    {
      this.time = time;
    }

    public String get()
    {
      return time;
    }
  }

  static class Life
  {
    private String time;

    public void set(String time)
    {
      System.out.println("Setting time to " + time);
      this.time = time;
    }

    public Memento saveToMemento()
    {
      System.out.println("Saving time to Memento");
      return new Memento(time);
    }

    public void restoreFromMemento(Memento memento)
    {
      time = memento.get();
      System.out.println("Time restored from Memento: " + time);
    }
  }

  public static void main(String[] args)
  {
    List<Memento> savedTimes = new ArrayList<>();

    Life life = new Life();

    life.set("2000 B.C.");
    savedTimes.add(life.saveToMemento());
    life.set("2000 A.D");
    savedTimes.add(life.saveToMemento());
    life.set("3000 A.D");
    savedTimes.add(life.saveToMemento());

    life.restoreFromMemento(savedTimes.get(0));
  }
}
