package design.patterns.java.creational;

public class Builder
{
  static class NutritionFacts
  {
    private final int servingSize;
    private final int servings;
    private final int calories;
    private final int fat;
    private final int sodium;

    @Override
    public String toString()
    {
      return "NutritionFacts{" +
          "servingSize=" + servingSize +
          ", servings=" + servings +
          ", calories=" + calories +
          ", fat=" + fat +
          ", sodium=" + sodium +
          ", carbohydrate=" + carbohydrate +
          '}';
    }

    private final int carbohydrate;

    private NutritionFacts(TheBuilder builder)
    {
      servingSize = builder.servingSize;
      servings = builder.servings;
      calories = builder.calories;
      fat = builder.fat;
      sodium = builder.sodium;
      carbohydrate = builder.carbohydrate;
    }




    static class TheBuilder
    {
      private final int servingSize;
      private final int servings;
      private int calories;
      private int fat;
      private int carbohydrate;
      private int sodium;

      public TheBuilder(int servingSize, int servings)
      {
        this.servingSize = servingSize;
        this.servings = servings;
      }

      public TheBuilder calories(int val)
      {
        calories = val;
        return this;
      }

      public TheBuilder fat(int val)
      {
        fat = val;
        return this;
      }
      public TheBuilder carbohydrate(int val)
      {
        carbohydrate = val;
        return this;
      }
      public TheBuilder sodium(int val)
      {
        sodium = val;
        return this;
      }

      public NutritionFacts build()
      {
        return new NutritionFacts(this);
      }
    }
  }

  public static void main(String[] args)
  {
    NutritionFacts facts = new NutritionFacts.TheBuilder(240, 8).calories(100).sodium(35).build();
    System.out.println(facts);
  }
}
