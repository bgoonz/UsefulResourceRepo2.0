package problems.java.trees;

public class SubTree
{
    static <T extends Comparable<T>> boolean subtree(Tree.Node<T> parent, Tree.Node<T> child)
    {
        if(parent == null)
        {
            return false;
        }
        if(parent.data.compareTo(child.data) == 0)
        {
            if(matches(parent, child))
            {
                return true;
            }
        }
        return subtree(parent.left, child) || subtree(parent.right, child);
    }

    private static<T extends Comparable<T>> boolean matches(Tree.Node<T> n1, Tree.Node<T> n2)
    {
        if(n1 == null && n2 == null)
        {
            return true;
        }
        if(n1 == null || n2 == null)
        {
            return false;
        }
        if(n1.data.compareTo(n2.data) != 0)
        {
            return false;
        }
        return matches(n1.left, n2.left) && matches(n1.right, n2.right);
    }

    static boolean testsPass()
    {
        Tree<Integer> parent = new Tree<>(4, 2, 6, 1, 5, 3, 7);
        Tree<Integer> child = new Tree<>(2, 1, 3);
        boolean check = subtree(parent.root, child.root);
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
