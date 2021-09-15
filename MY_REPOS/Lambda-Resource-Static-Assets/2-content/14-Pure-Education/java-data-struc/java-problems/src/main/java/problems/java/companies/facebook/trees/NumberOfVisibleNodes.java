package problems.java.companies.facebook.trees;

import problems.java.trees.Tree;

public class NumberOfVisibleNodes
{
    /*
    https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=495004218121393

    There is a binary tree with N nodes.
    You are viewing the tree from its left side and can see only the leftmost nodes at each level.
    Return the number of visible nodes.
    Note: You can see only the leftmost nodes, but that doesn't mean they have to be left nodes.
    The leftmost node at a level could be a right node.

    Note: This is the same problem as TreeHeight
            8  <------ root
           / \
         3    10
        / \     \
       1   6     14
          / \    /
         4   7  13
       Output = 4
    */

    static<T> int visibleNodes(Tree.Node<T> root)
    {
        if(root == null)
        {
            return 0;
        }

        return 1 + Math.max(visibleNodes(root.left), visibleNodes(root.right));
    }

    static boolean testsPass()
    {
        Tree<Integer> tree = new Tree<>(8, 3, 10, 1, 6, 14, 4, 7, 13);

        boolean check = visibleNodes(tree.root) == 4;
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
