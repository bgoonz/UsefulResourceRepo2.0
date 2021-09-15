package problems.java.trees;

import static problems.java.trees.Tree.getHeight;

public class IsBalanced
{
    static<T extends Comparable<T>> boolean isBalanced(Tree.Node<T> node)
    {
        if(node == null)
        {
            return true;
        }

        int diff = getHeight(node.left) - getHeight(node.right);
        if(Math.abs(diff) > 1)
        {
            return false;
        }
        return isBalanced(node.left) && isBalanced(node.right);
    }

    static boolean testsPass()
    {
        Tree<Integer> tree1 = new Tree(4, 2, 6, 1, 5, 3, 7);
        boolean check = isBalanced(tree1.root);
        if(!check)
        {
            return false;
        }
        Tree<Integer> tree2 = new Tree(1, 2, 4, 7, 6, 5, 4);
        check = isBalanced(tree2.root);
        if(check)
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
