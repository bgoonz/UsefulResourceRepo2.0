package designpatterns.behavioral;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Visitor
{
  //  We have an established hierarchy of classes which will not change.
  //  It is expensive to add new virtual methods as every class will need to implement them.
  //  Example:
  //  Established Hierarchy: venues, i.e. Restaurant, Bar, NightClub, Theatre, Lounge
  //  Changing Hierarchy: celebrities, i.e. Singers, Comedians, Actors.
  //  Future celebrities may include Poets, Writers, Developers, etc

  //  Consider design without using Visitor

  interface Celebrity
  {
    void perform();
  }

  enum Type
  {
    Singer,
    Commedian,
    Actor
  }

  static abstract class OldVenue
  {
    private Map<Type, Celebrity> celebrities = new HashMap<>();

    public void add(Type type, Celebrity celebrity)
    {
      celebrities.put(type, celebrity);
    }

    public abstract void acceptActor();
    public abstract void acceptSinger();
    public abstract void acceptComedian();
  }

  static class RestaurantOld extends OldVenue
  {
    @Override
    public void acceptActor() {}
    @Override
    public void acceptSinger() {}
    @Override
    public void acceptComedian() {}
  }

  static class BarOld extends OldVenue
  {
    @Override
    public void acceptActor() {}
    @Override
    public void acceptSinger() {}
    @Override
    public void acceptComedian() {}
  }

  static class NightClubOld extends OldVenue
  {
    @Override
    public void acceptActor() {}
    @Override
    public void acceptSinger() {}
    @Override
    public void acceptComedian() {}
  }

  //  When new celebrities are added in the future, we will need to add new methods to the
  //  abstract OldVenue class and to all derived classes
  //  Following design uses the Visitor pattern

  static abstract class NewVenue
  {
    private Set<CelebrityVisitor> celebrityVisitors = new HashSet<>();

    public void add(CelebrityVisitor celebrityVisitor)
    {
      celebrityVisitors.add(celebrityVisitor);
    }

    public abstract void accept(CelebrityVisitor celebrityVisitor);
  }

  static class RestaurantNew extends NewVenue
  {
    @Override
    public void accept(CelebrityVisitor celebrityVisitor)
    {
      celebrityVisitor.visit(this);
    }
  }

  static class BarNew extends NewVenue
  {
    @Override
    public void accept(CelebrityVisitor celebrityVisitor)
    {
      celebrityVisitor.visit(this);
    }
  }

  static class NightClubNew extends NewVenue
  {
    @Override
    public void accept(CelebrityVisitor celebrityVisitor)
    {
      celebrityVisitor.visit(this);
    }
  }

  static abstract class CelebrityVisitor
  {
    protected void add(NewVenue venue, CelebrityVisitor v)
    {
      venue.add(v);
    }
    public abstract void visit(RestaurantNew r);
    public abstract void visit(BarNew b);
    public abstract void visit(NightClubNew c);
  }

  static class Actor extends CelebrityVisitor
  {
    @Override
    public void visit(RestaurantNew r)
    {
      add(r, this);
      System.out.println("eating and acting");
    }

    @Override
    public void visit(BarNew b)
    {
      add(b, this);
      System.out.println("drinking and acting");
    }

    @Override
    public void visit(NightClubNew c)
    {
      add(c, this);
      System.out.println("chilling and acting");
    }
  }

  static class Singer extends CelebrityVisitor
  {
    @Override
    public void visit(RestaurantNew r)
    {
      add(r, this);
      System.out.println("eating and singing");
    }

    @Override
    public void visit(BarNew b)
    {
      add(b, this);
      System.out.println("drinking and singing");
    }

    @Override
    public void visit(NightClubNew c)
    {
      add(c, this);
      System.out.println("chilling and singing");
    }
  }

  public static void main(String[] args)
  {
    RestaurantNew restaurant = new RestaurantNew();
    BarNew bar = new BarNew();
    NightClubNew nightClub = new NightClubNew();

    Actor actor = new Actor();
    Singer singer = new Singer();

    restaurant.accept(actor);
    bar.accept(actor);
    nightClub.accept(actor);

    restaurant.accept(singer);
    bar.accept(singer);
    nightClub.accept(singer);

  }
}
