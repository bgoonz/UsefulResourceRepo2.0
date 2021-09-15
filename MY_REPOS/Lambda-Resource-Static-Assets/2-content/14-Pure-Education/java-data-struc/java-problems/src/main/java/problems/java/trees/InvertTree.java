package problems.java.trees;

import java.util.LinkedList;
import java.util.Queue;

import static problems.java.trees.Tree.toArray;

public class InvertTree
{
    //  Swaps left and right nodes - same as Mirror
    static<T extends Comparable<T>> void invertRecursive(Tree.Node<T> root)
    {
        if(root == null)
        {
            return;
        }

        invertRecursive(root.left);
        invertRecursive(root.right);

        Tree.Node<T> temp = root.left;
        root.left = root.right;
        root.right = temp;
    }

    static<T extends Comparable<T>> void invertIterative(Tree.Node<T> root)
    {
        Queue<Tree.Node<T>> queue = new LinkedList<>();
        queue.offer(root);
        while(!queue.isEmpty())
        {
            Tree.Node<T> node = queue.poll();
            if(node.left != null)
            {
                queue.offer(node.left);
            }
            if(node.right != null)
            {
                queue.offer(node.right);
            }

            Tree.Node<T> temp = root.left;
            root.left = root.right;
            root.right = temp;
        }
    }

    static boolean testsPass()
    {
        Tree<Integer> tree = new Tree<>(4, 2, 6, 1, 5, 3, 7);
        Tree.Node<Integer>[] a = toArray(tree.root);
        boolean check = a[0].data == 4 &&
                a[1].data == 2 &&
                a[2].data == 6 &&
                a[3].data == 1 &&
                a[4].data == 3 &&
                a[5].data == 5 &&
                a[6].data == 7;
        if(!check)
        {
            return false;
        }
        invertRecursive(tree.root);
        a = toArray(tree.root);
        check = a[0].data == 4 &&
                a[1].data == 6 &&
                a[2].data == 2 &&
                a[3].data == 7 &&
                a[4].data == 5 &&
                a[5].data == 3 &&
                a[6].data == 1;
        if(!check)
        {
            return false;
        }
        tree = new Tree<>(4, 2, 6, 1, 5, 3, 7);
        invertIterative(tree.root);
        check = a[0].data == 4 &&
                a[1].data == 6 &&
                a[2].data == 2 &&
                a[3].data == 7 &&
                a[4].data == 5 &&
                a[5].data == 3 &&
                a[6].data == 1;
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
