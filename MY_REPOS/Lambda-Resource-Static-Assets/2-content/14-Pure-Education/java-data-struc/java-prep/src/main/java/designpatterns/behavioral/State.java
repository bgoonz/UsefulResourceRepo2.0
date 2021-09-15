package designpatterns.behavioral;

public class State
{
  interface StateInterface
  {
    void toggle(Person person);
    void display();
  }

  static class Rich implements StateInterface
  {
    @Override
    public void toggle(Person person)
    {
      person.setState(new Poor());
      display();
    }

    @Override
    public void display()
    {
      System.out.println("I am poor now");
    }
  }

  static class Poor implements StateInterface
  {
    @Override
    public void toggle(Person person)
    {
      person.setState(new Rich());
      display();
    }

    @Override
    public void display()
    {
      System.out.println("I am rich now");
    }
  }

  // Change state at runtime
  static class Person
  {
    private StateInterface state;

    public Person()
    {
      state = new Poor();
    }

    public void setState(StateInterface newState)
    {
      this.state = newState;
    }

    public void toggleState()
    {
      state.toggle(this);
    }
  }

  public static void main(String[] args)
  {
    Person person = new Person();
    person.toggleState();
    person.toggleState();
    person.toggleState();
    person.toggleState();
  }
}
