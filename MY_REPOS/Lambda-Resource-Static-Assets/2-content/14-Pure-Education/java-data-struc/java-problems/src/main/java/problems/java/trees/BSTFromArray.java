package problems.java.trees;

import java.util.Arrays;

import static problems.java.trees.IsBST.isBSTUsingRecursion;

public class BSTFromArray
{
    static<T extends Comparable<T>> Tree.Node<T> bstFromArray(T[] a)
    {
        Arrays.sort(a);
        return createBST(a, 0, a.length - 1);
    }

    private static<T extends Comparable<T>> Tree.Node<T> createBST(T[] a, int start, int end)
    {
        if(end < start)
        {
            return null;
        }

        int mid = (start + end) / 2;
        Tree.Node<T> root = new Tree.Node(a[mid]);
        root.left = createBST(a, start, mid - 1);
        root.right = createBST(a, mid + 1, end);
        return root;
    }

    static boolean testsPass()
    {
        Integer[] a = {4, 2, 6, 1, 5, 3, 7};
        Tree.Node<Integer> root = bstFromArray(a);
        boolean check = isBSTUsingRecursion(root);
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
