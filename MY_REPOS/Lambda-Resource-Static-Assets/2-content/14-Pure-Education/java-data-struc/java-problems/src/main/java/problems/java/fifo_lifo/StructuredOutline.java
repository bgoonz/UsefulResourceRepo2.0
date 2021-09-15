package problems.java.fifo_lifo;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Stack;

public class StructuredOutline
{
    //  Create structured outline from input
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

    static class Heading
    {
        int weight;
        String text;

        Heading(int weight, String text)
        {
            this.weight = weight;
            this.text = text;
        }
    }

    static class Node
    {
        Heading heading;
        List<Node> children = new ArrayList<>();

        Node(Heading heading)
        {
            this.heading = heading;
        }

        int getWeight() { return heading.weight; }
    }

    private List<Heading> headings;

    public StructuredOutline(List<Heading> headings)
    {
        this.headings = headings;
    }

    Node createStructuredOutline()
    {
        Node root = new Node( new Heading(0, "root"));

        Stack<Node> stack = new Stack<>();
        stack.push(root);

        for(Heading heading : headings)
        {
            Node node = new Node(heading);

            if(stack.peek().getWeight() < heading.weight)
            {
                stack.peek().children.add(node);
            }
            else if(stack.peek().getWeight() == heading.weight)
            {
                stack.pop();
                stack.peek().children.add(node);
            }
            else
            {
                while(stack.peek().getWeight() >= heading.weight)
                {
                    stack.pop();
                }
                stack.peek().children.add(node);
            }
            stack.push(node);
        }

        return root;
    }

    static boolean testsPass()
    {
        List<Heading> data = Arrays.asList(
                new Heading(1, "h1_1"),
                new Heading(2, "h2_11"),
                new Heading(3, "h3_111"),
                new Heading(3, "h3_112"),
                new Heading(3, "h3_113"),
                new Heading(2, "h2_12"),
                new Heading(3, "h3_121"),
                new Heading(1, "h1_2"),
                new Heading(2, "h2_21"),
                new Heading(2, "h2_22"),
                new Heading(2, "h2_23"),
                new Heading(3, "h3_231"),
                new Heading(3, "h3_232"),
                new Heading(3, "h3_233"),
                new Heading(1, "h1_3")
        );
        StructuredOutline structuredOutline = new StructuredOutline(data);
        Node root = structuredOutline.createStructuredOutline();

        boolean check = root.children.size() == 3;
        if(!check)
        {
            return false;
        }


        Node h1_1 = root.children.get(0);
        Node h1_2 = root.children.get(1);
        Node h1_3 = root.children.get(2);



        check = h1_1.heading.text.equals("h1_1") &&
                h1_2.heading.text.equals("h1_2") &&
                h1_3.heading.text.equals("h1_3");
        if(!check)
        {
            return false;
        }

        check = h1_1.children.size() == 2;
        if(!check)
        {
            return false;
        }

        Node h2_11 = h1_1.children.get(0);
        Node h2_12 = h1_1.children.get(1);
        check = h2_11.heading.text.equals("h2_11") && h2_12.heading.text.equals("h2_12");
        if(!check)
        {
            return false;
        }

        check = h2_11.children.size() == 3;
        if(!check)
        {
            return false;
        }

        Node h3_111 = h2_11.children.get(0);
        Node h3_112 = h2_11.children.get(1);
        Node h3_113 = h2_11.children.get(2);

        check = h3_111.heading.text.equals("h3_111") &&
                h3_112.heading.text.equals("h3_112") &&
                h3_113.heading.text.equals("h3_113");
        if(!check)
        {
            return false;
        }

        return true;
    }

    public static void main(String... args)
    {
        if(testsPass())
        {
            System.out.println("Tests passed");
        }
        else
        {
            System.out.println("Tests failed");
        }
    }

}
