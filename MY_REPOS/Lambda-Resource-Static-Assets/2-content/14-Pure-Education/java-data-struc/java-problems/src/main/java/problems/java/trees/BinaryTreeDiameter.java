package problems.java.trees;

import static problems.java.common.Common.max3;
import static problems.java.trees.Tree.getHeight;

public class BinaryTreeDiameter
{
    /*
    Given a binary tree, you need to compute the length of the diameter of the tree.
    The diameter of a binary tree is the length of the longest path between any two nodes in a tree.
    This path may or may not pass through the root.
    Example:
          4
         / \
        2   5
       / \
      1   3
    Return 3, which is the length of the path [1,2,4,5] or [3,2,4,5].
    */

    static<T extends Comparable<T >> int diameter(Tree.Node<T> root)
    {
        if(root == null)
        {
            return 0;
        }

        int leftHeight = getHeight(root.left);
        int rightHeight = getHeight(root.right);

        int leftDia = diameter(root.left);
        int rightDia = diameter(root.right);

        return max3(leftHeight + rightHeight, leftDia, rightDia);
    }


    static boolean testsPass()
    {
        Tree<Integer> tree1 = new Tree<>(4, 2, 5, 1, 3);
        boolean check = diameter(tree1.root) == 3;
        if(!check)
        {
            return  false;
        }

        Tree<Integer> tree2 = new Tree<>(4, 2, 6, 1, 5, 3);
        check = diameter(tree2.root) == 4;
        if(!check)
        {
            return  false;
        }

        //  This should not include the root
        Tree<Integer> tree3 = new Tree<>(8, 4, 2, 6, 1, 5, 3);
        check = diameter(tree3.root) == 4;
        if(!check)
        {
            return  false;
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
