package problems.java.trees;

import java.lang.reflect.Array;

import static problems.java.trees.DepthFirst.kthSmallest;
import static problems.java.trees.Tree.getSizeBreadthFirst;

public class FindMedian
{
    //  If number of nodes is:
    //  Odd:
    //    Median = Tree.Node[(count + 1) / 2]
    //  Even:
    //    Median = Tree.Node[count / 2 ], Tree.Node[(count / 2) + 1]

    static<T extends Comparable<T>> Tree.Node<T>[] findMedian(Tree.Node<T> root)
    {
        int count = getSizeBreadthFirst(root);
        if(count % 2 == 1)
        {
            Tree.Node<T> n1 = kthSmallest(root, (count + 1) / 2);
            Tree.Node<T>[] a = (Tree.Node<T>[]) Array.newInstance(root.getClass(), 1);
            a[0] = n1;
            return a;
        }
        else
        {
            Tree.Node<T> n1 = kthSmallest(root, count / 2);
            Tree.Node<T> n2 = kthSmallest(root, (count / 2) + 1);
            Tree.Node<T>[] a = (Tree.Node<T>[]) Array.newInstance(root.getClass(), 2);
            a[0] = n1;
            a[1] = n2;
            return a;
        }
    }

    static boolean testsPass()
    {
        Tree<Integer> tree1 = new Tree<>(4, 2, 6, 1, 5, 3, 7);
        Tree.Node<Integer>[] a1 = findMedian(tree1.root);
        boolean check = a1[0].data == 4;
        if(!check)
        {
            return false;
        }
        Tree<Integer> tree2 = new Tree<>(4, 2, 6, 1, 5, 3);
        Tree.Node<Integer>[] a2 = findMedian(tree2.root);
        check = a2[0].data == 3 && a2[1].data == 4;
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
