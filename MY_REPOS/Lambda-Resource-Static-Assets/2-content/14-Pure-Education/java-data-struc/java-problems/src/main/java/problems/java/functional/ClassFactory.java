package problems.java.functional;

import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

public class ClassFactory
{
    static abstract class Fruit
    {
        int weight;
        Fruit(int weight)
        {
            this.weight = weight;
        }
    }

    static class Apple extends Fruit
    {
        Apple(int weight)
        {
            super(weight);
        }

        @Override
        public String toString()
        {
            return "Apple{}";
        }
    }

    static class Orange extends Fruit
    {
        Orange(int weight)
        {
            super(weight);
        }

        @Override
        public String toString()
        {
            return "Orange{}";
        }
    }

    static Map<String, Function<Integer, Fruit>> constructorMap = new HashMap<String,Function<Integer, Fruit>>() {{
        put("apple", Apple::new);
        put("orange", Orange::new);
    }};

    static Fruit getFruit(String name, int weight)
    {
        return constructorMap.get(name).apply(weight);
    }

    static boolean testsPass()
    {
        Fruit apple = getFruit("apple", 50);
        boolean check = apple.toString().equals("Apple{}");
        if(!check)
        {
            return false;
        }
        Fruit orange = getFruit("orange", 50);
        check = orange.toString().equals("Orange{}");
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
