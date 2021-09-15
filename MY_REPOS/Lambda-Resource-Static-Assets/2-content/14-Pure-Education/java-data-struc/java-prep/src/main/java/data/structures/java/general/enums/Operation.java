package data.structures.java.general.enums;

import java.util.Map;
import java.util.function.DoubleBinaryOperator;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public enum Operation implements DoubleBinaryOperator
{
  PLUS("+", (x, y) -> x + y),
  MINUS("-", (x, y) -> x - y),
  TIMES("*", (x, y) -> x * y),
  DIVIDE("/", (x, y) -> x / y);

  private final String symbol;
  private final DoubleBinaryOperator binaryOperator;

  Operation(String symbol, DoubleBinaryOperator op)
  {
    this.symbol = symbol;
    this.binaryOperator = op;
  }


  @Override
  public double applyAsDouble(double left, double right)
  {
    return binaryOperator.applyAsDouble(left, right);
  }

  private static final Map<String, Operation> stringToEnum = Stream.of(values()).collect(Collectors.toMap(Object::toString, e -> e));

  static Operation fromString(String s)
  {
    return stringToEnum.get(s);
  }

  @Override
  public String toString()
  {
    return symbol;
  }

  public static void main(String[] args)
  {
    Operation o1 = Operation.PLUS;
    double valPlus = o1.applyAsDouble(5, 7);
    System.out.println("Plus Op = " + valPlus);

    Operation o2 = Operation.MINUS;
    double valMinus = o2.applyAsDouble(5, 7);
    System.out.println("Minus Op = " + valMinus);

    Operation o3 = Operation.fromString("*");
    double valMul = o3.applyAsDouble(5, 7);
    System.out.println("Multiply Op = " + valMul);
  }

}
