package problems.java.trees;

import java.util.ArrayList;
import java.util.List;

public class IsBST
{
    static<T extends Comparable<T>> boolean isBSTUsingRecursion(Tree.Node<T> node)
    {
        if(node == null)
        {
            return true;
        }

        if(node.left != null && node.left.data.compareTo(node.data) != -1 ||
            node.right != null && node.right.data.compareTo(node.data) == -1)
        {
            return false;
        }
        return isBSTUsingRecursion(node.left) && isBSTUsingRecursion(node.right);
    }

    static<T extends Comparable<T>> boolean isBSTUsingArray(Tree.Node<T> node)
    {
        List<T> result = new ArrayList<>();
        copyToList(node, result);

        for(int i = 1; i < result.size(); ++i)
        {
            if (result.get(i).compareTo(result.get(i - 1)) == -1)
            {
                return false;
            }
        }
        return true;
    }

    private static<T extends Comparable<T>> void copyToList(Tree.Node<T> node, List<T> result)
    {
        if(node == null)
        {
            return;
        }
        copyToList(node.left, result);
        result.add(node.data);
        copyToList(node.right, result);
    }

    static boolean testsPass()
    {
        Tree<Integer> tree = new Tree<>(4, 1, 5, 3, 2, 6);
        boolean check = isBSTUsingRecursion(tree.root) == true;
        if(!check)
        {
            return false;
        }
        check = isBSTUsingArray(tree.root) == true;
        if(!check)
        {
            return false;
        }
        Tree.Node<Integer> n1 = new Tree.Node(5);
        Tree.Node<Integer> n2 = new Tree.Node(3);
        Tree.Node<Integer> n3 = new Tree.Node(8);
        n1.left = n3; n1.right = n2;
        check = isBSTUsingRecursion(n1) == false;
        if(!check)
        {
            return false;
        }
        check = isBSTUsingArray(n1) == false;
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
