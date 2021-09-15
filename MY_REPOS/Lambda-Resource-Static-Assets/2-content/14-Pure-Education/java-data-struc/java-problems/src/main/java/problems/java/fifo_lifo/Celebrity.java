package problems.java.fifo_lifo;

import java.util.Stack;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Celebrity
{
    /*
    In a party of N people, only one person is known to everyone.
    Such a person may be present in the party, if yes, he doesn't know anyone in the party.
    We can only ask questions like "does A know B?".
    Find the stranger (celebrity) in minimum number of questions.
    1.  If A knows B, then A can’t be celebrity. Discard A, and B may be celebrity.
    2.  If A doesn't know B, then B can’t be celebrity. Discard B, and A may be celebrity.
    3.  Repeat above two steps till we left with only one person.
    Use 2D matrix to represent people at the party:
    Row index 2 is a celebrity          No one is a celebrity
        {0, 1, 1, 1}                    {0, 1, 1, 1}
        {1, 0, 1, 0}                    {1, 0, 0, 0}
        {0, 0, 0, 0}                    {0, 0, 0, 0}
        {1, 0, 1, 0}                    {1, 0, 1, 0}
     */

    private static int [][] data;

    private static boolean knows(int a, int b)
    {
        return data[a][b] == 1;
    }

    static int findCelebrity(int[][] data)
    {
        Celebrity.data = data;

        Stack<Integer> stack = new Stack<>();
        stack.addAll(IntStream.range(0, data.length).boxed().collect(Collectors.toList()));

        while(stack.size() > 1)
        {
            int a = stack.pop();
            int b = stack.pop();
            if(knows(a, b))   //  a can't be a celebrity but b might
            {
                stack.push(b);
            }
            else    //  b can't be a celebrity but a might
            {
                stack.push(a);
            }
        }

        int lastPerson = stack.pop();
        for(int i = 0; i < data.length; ++i)
        {
            if(i != lastPerson && (knows(lastPerson, i) || !knows(i, lastPerson)))
            {
                return -1;
            }
        }
        return lastPerson;
    }

    static boolean testsPass()
    {
        int[][] data = {
                {0, 1, 1, 1},
                {1, 0, 1, 0},
                {0, 0, 0, 0},
                {1, 0, 1, 0}
        };
        boolean check = findCelebrity(data) == 2;
        if(!check)
        {
            return false;
        }

        data = new int[][] {
                {0, 1, 1, 1},
                {1, 0, 0, 0},
                {0, 0, 0, 0},
                {1, 0, 1, 0}
        };
        check = findCelebrity(data) == -1;
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
