package designpatterns.behavioral;

import java.util.ArrayList;
import java.util.List;

public class Interpreter
{
  //  Use it to interpret context
  //  For example, encode 'a' and 'b' to '1' and '2'

  static class Context
  {
    private String input;
    private String output;

    public Context(String input)
    {
      this.input = input;
      this.output = "";
    }

    public String getInput() { return input;}
    public void setInput(String input) {this.input = input;}
    public String getOutput() { return output;}
    public void setOutput(String output) {this.output = output;}
  }

  interface Expression
  {
    void encode(Context context);
  }

  static class AExpression implements Expression
  {
    @Override
    public void encode(Context context)
    {
      System.out.println("a expression");
      String input = context.getInput();
      context.setInput(input.substring(1));
      context.setOutput(context.getOutput() + "1");
    }
  }

  static class BExpression implements Expression
  {
    @Override
    public void encode(Context context)
    {
      System.out.println("b expression");
      String input = context.getInput();
      context.setInput(input.substring(1));
      context.setOutput(context.getOutput() + "2");
    }
  }

  public static void main(String[] args)
  {
    String s = "ababab";
    Context context = new Context(s);

    List<Expression> list = new ArrayList<>();
    list.add(new AExpression());
    list.add(new BExpression());
    list.add(new AExpression());
    list.add(new BExpression());
    list.add(new AExpression());
    list.add(new BExpression());

    for(Expression e : list)
    {
      e.encode(context);
    }

    System.out.println(context.getOutput());
  }
}
