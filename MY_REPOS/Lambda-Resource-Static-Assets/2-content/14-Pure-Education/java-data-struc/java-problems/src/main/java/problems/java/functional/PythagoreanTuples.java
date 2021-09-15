package problems.java.functional;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class PythagoreanTuples
{
    static List<int[]> generate(int n)
    {
        List<double[]> triples = IntStream.rangeClosed(1, n).boxed()
                .flatMap(a -> IntStream.rangeClosed(a, n)
                    .mapToObj(b -> new double[] {a, b, Math.sqrt(a * a + b * b)}))
                .filter(t -> t[2] % 1 == 0)
                .collect(Collectors.toList());
        return triples.stream().map(x -> new int[] {(int)x[0], (int)x[1], (int)x[2]}).collect(Collectors.toList());
    }

    static boolean testsPass()
    {
        List<int[]> triples = generate(20);
        boolean check = Arrays.equals(new int[] {3, 4, 5}, triples.get(0)) &&
                Arrays.equals(new int[] {5, 12, 13}, triples.get(1)) &&
                Arrays.equals(new int[] {6, 8, 10}, triples.get(2)) &&
                Arrays.equals(new int[] {8, 15, 17}, triples.get(3)) &&
                Arrays.equals(new int[] {9, 12, 15}, triples.get(4)) &&
                Arrays.equals(new int[] {12, 16, 20}, triples.get(5)) &&
                Arrays.equals(new int[] {15, 20, 25}, triples.get(6));
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
