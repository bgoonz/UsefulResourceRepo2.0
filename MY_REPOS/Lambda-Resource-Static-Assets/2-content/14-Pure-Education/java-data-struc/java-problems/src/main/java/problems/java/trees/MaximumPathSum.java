package problems.java.trees;

import java.util.concurrent.atomic.AtomicInteger;

import static problems.java.common.Common.max3;

public class MaximumPathSum
{
    //  Must consider 3 cases
    //  1.  Node is in the left path of MaxSum and includes the root
    //  2.  Node is in the right path of MaxSum and does not include the root
    //  3.  Root is included along with left and right paths

    static int maxPathSum(Tree.Node<Integer> root)
    {
        AtomicInteger h = new AtomicInteger(Integer.MIN_VALUE);
        return maxPathSum(root, h);
    }

    private static int maxPathSum(Tree.Node<Integer> root, AtomicInteger result)
    {
        if(root == null)
        {
            return Integer.MIN_VALUE;
        }

        AtomicInteger h1 = new AtomicInteger(Integer.MIN_VALUE);
        AtomicInteger h2 = new AtomicInteger(Integer.MIN_VALUE);

        int s1 = maxPathSum(root.left, h1);
        int s2 = maxPathSum(root.right, h2);

        result.set(root.data + max3(h1.get(), h2.get(), 0));

        h1.set(Math.max(h1.get(), 0));
        h2.set(Math.max(h2.get(), 0));

        return max3(s1, s2, h1.get() + h2.get() + root.data);
    }

    static boolean testsPass()
    {
        Tree.Node<Integer> root = new Tree.Node<>(-10);
        Tree.Node<Integer> node9 = new Tree.Node<>(9);
        Tree.Node<Integer> node20 = new Tree.Node<>(20);
        Tree.Node<Integer> node15 = new Tree.Node<>(15);
        Tree.Node<Integer> node7 = new Tree.Node<>(7);

        root.left = node9;
        root.right = node20;
        node20.left = node15;
        node20.right = node7;


        boolean check = maxPathSum(root) == 42;
        if(!check)
        {
            return false;
        }

        root = new Tree.Node<>(10);
        root.left = node9;
        root.right = node20;

        check = maxPathSum(root) == 54;
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
