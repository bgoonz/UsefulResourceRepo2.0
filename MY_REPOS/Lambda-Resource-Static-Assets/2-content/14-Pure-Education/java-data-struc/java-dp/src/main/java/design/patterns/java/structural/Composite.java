package design.patterns.java.structural;

import java.util.ArrayList;
import java.util.List;

public class Composite
{
  //  Produce a hierarchical tree which can be accessed by using a uniform method

  interface Component
  {
    void show();
  }

  static class Leaf implements Component
  {
    private String name;
    public Leaf(String s)
    {
      this.name = s;
    }
    @Override
    public void show()
    {
      System.out.println(name);
    }
  }

  static class TheComposite implements Component
  {
    private List<Component> children = new ArrayList<>();

    public void add(Component component)
    {
      children.add(component);
    }

    public void remove(Component component)
    {
      children.remove(component);
    }

    @Override
    public void show()
    {
      children.stream().forEach(e -> e.show());
    }
  }

  public static void main(String[] args)
  {
    Leaf leaf1 = new Leaf("Leaf-1");
    Leaf leaf2 = new Leaf("Leaf-2");
    Leaf leaf3 = new Leaf("Leaf-3");
    Leaf leaf4 = new Leaf("Leaf-4");
    Leaf leaf5 = new Leaf("Leaf-5");

    TheComposite composite1 = new TheComposite();
    composite1.add(leaf1);
    composite1.add(leaf2);

    TheComposite composite2 = new TheComposite();
    composite2.add(leaf3);
    composite2.add(leaf4);
    composite2.add(leaf5);

    composite1.add(composite2);
    composite1.show();
  }
}
