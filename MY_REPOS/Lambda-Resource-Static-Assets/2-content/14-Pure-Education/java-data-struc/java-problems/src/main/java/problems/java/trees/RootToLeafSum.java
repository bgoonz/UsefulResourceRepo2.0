package problems.java.trees;

public class RootToLeafSum
{
    /*
           4
        /     \
      2        6
     /  \     / \
    1    3   5   7
    Path                    Number
    4->2->1                   421
    4->2->3                   423
    4->6->5                   465
    4->6->7                   467
    Answer = 421 + 423 + 465 + 467 = 1776
    */

    static int treePathSum(Tree.Node<Integer> root)
    {
        return treePathSum(root, 0);
    }

    private static int treePathSum(Tree.Node<Integer> node, int val)
    {
        if(node == null)
        {
            return 0;
        }

        val = val * 10 + node.data;
        if(node.left == null && node.right == null)
        {
            return val;
        }
        return treePathSum(node.left, val) + treePathSum(node.right, val);
    }

    //////////////////////////////////////////////////////////////////////////////////////////////
    static int maxPathSum(Tree.Node<Integer> root)
    {
        return maxPathSum(root, 0);
    }

    private static int maxPathSum(Tree.Node<Integer> node, int val)
    {
        if(node == null)
        {
            return val;
        }

        val += node.data;

        return Math.max(maxPathSum(node.left, val), maxPathSum(node.right, val));
    }

    static boolean testsPass()
    {
        Tree<Integer> tree = new Tree<>(4, 2, 6, 1, 5, 3, 7);
        boolean check = treePathSum(tree.root) == 1776;
        if(!check)
        {
            return false;
        }

        check = maxPathSum(tree.root) == 17;
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
