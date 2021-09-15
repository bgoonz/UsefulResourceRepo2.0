package data.structures.java.stacksqueues;


import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class StructuredOutline
{
  //  Consider Input
  /*
    Heading(1, "h1_1");
    Heading(2, "h2_11");
    Heading(3, "h3_111");
    Heading(3, "h3_112");
    Heading(3, "h3_113");
    Heading(2, "h2_12");
    Heading(3, "h3_121");
    Heading(1, "h1_2");
    Heading(2, "h2_21");
    Heading(2, "h2_22");
    Heading(2, "h2_23");
    Heading(3, "h3_231");
    Heading(3, "h3_232");
    Heading(3, "h3_233");
    Heading(1, "h1_3");
  */
  public static class Heading
  {
    protected int weight;
    protected String text;

    public Heading(int weight, String text) {
      this.weight = weight;
      this.text = text;
    }
  }

  public static class Node
  {
    protected Heading heading;
    protected List<Node> children;

    public Node(Heading heading) {
      this.heading = heading;
      this.children = new ArrayList<>();
    }

    protected int getWeight()
    {
      return heading.weight;
    }
  }

  private List<Heading> headings;
  public StructuredOutline(List<Heading> headings)
  {
    this.headings = headings;
  }


  //  Once the parent-child relationship is established, the child node does not need to remain on the stack
  public Node createOutline()
  {
    Node root = new Node(new Heading(0, "root"));

    Stack<Node> stack = new Stack<>();
    stack.push(root);

    for(Heading heading : headings)
    {
      Node node = new Node(heading);

      if(stack.peek().getWeight() < heading.weight)
      {
        stack.peek().children.add(node);
        stack.push(node);
      }
      else if(stack.peek().getWeight() == heading.weight)
      {
        stack.pop();
        stack.peek().children.add(node);
        stack.push(node);
      }
      else  // stack.peek().getWeight() > heading.weight
      {
        //  Walk down the stack to find a parent for this node
        while(stack.peek().getWeight() > heading.weight)
        {
          stack.pop();
        }

        Stack<Node> temp = new Stack<>();
        while(node.getWeight() == stack.peek().getWeight())
        {
          temp.push(stack.pop());
        }
        stack.peek().children.add(node);
        while(!temp.empty())
        {
          stack.push(temp.pop());
        }
        stack.push(node);
      }
    }

    return root;
  }
}
