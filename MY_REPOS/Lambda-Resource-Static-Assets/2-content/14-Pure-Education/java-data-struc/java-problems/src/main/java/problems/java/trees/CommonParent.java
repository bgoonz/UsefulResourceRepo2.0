package problems.java.trees;

import static problems.java.trees.Tree.toArray;

public class CommonParent
{
    static<T extends Comparable<T>> Tree.Node<T> commonParent(Tree.Node<T> parent,
                                                              Tree.Node<T> first, Tree.Node<T> second)
    {
        if(parent == null)
        {
            return null;
        }
        if(parent == first || parent == second)
        {
            return parent;
        }

        boolean isFirstOfLeft = parentCovers(parent.left, first);
        boolean isSecondOnLeft = parentCovers(parent.left, second);
        if(isFirstOfLeft != isSecondOnLeft)
        {
            return parent;
        }
        Tree.Node<T> childNode = isFirstOfLeft ? parent.left : parent.right;
        return commonParent(childNode, first, second);
    }

    private static<T extends Comparable<T>> boolean parentCovers(Tree.Node<T> parent, Tree.Node<T> node)
    {
        if(parent == null)
        {
            return false;
        }
        if(parent == node)
        {
            return true;
        }
        return parentCovers(parent.left, node) || parentCovers(parent.right, node);
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
        check = a[1] == commonParent(a[0], a[4], a[3]);
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
