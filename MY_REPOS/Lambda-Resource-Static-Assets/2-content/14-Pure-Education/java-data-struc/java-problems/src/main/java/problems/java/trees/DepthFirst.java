package problems.java.trees;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Stack;

public class DepthFirst
{
    static<T extends Comparable<T>> void depthFirst(Tree.Node<T> node, List<Tree.Node<T>> result)
    {
        if(node == null)
        {
            return;
        }
        depthFirst(node.left, result);
        result.add(node);
        depthFirst(node.right, result);
    }

    static<T extends Comparable<T>> void depthFirstReverse(Tree.Node<T> node, List<Tree.Node<T>> result)
    {
        if(node == null)
        {
            return;
        }
        depthFirstReverse(node.right, result);
        result.add(node);
        depthFirstReverse(node.left, result);
    }

    static<T extends Comparable<T>> List<Tree.Node<T>> depthFirstIterative(Tree.Node<T> node)
    {
        List<Tree.Node<T>> result = new ArrayList<>();
        if(node == null)
        {
            return result;
        }

        Stack<Tree.Node<T>> stack = new Stack<>();
        Tree.Node<T> p = node;
        while(!stack.isEmpty() || p != null)
        {
            if(p != null)
            {
                stack.push(p);
                p = p.left;
            }
            else
            {
                Tree.Node<T> t = stack.pop();
                result.add(t);
                p = t.right;
            }
        }

        return result;
    }

    static<T extends Comparable<T>> Tree.Node<T> kthSmallest(Tree.Node<T> node, int k)
    {
        if(node == null)
        {
            return null;
        }

        Stack<Tree.Node<T>> stack = new Stack<>();
        Tree.Node<T> p = node;
        while(!stack.isEmpty() || p != null)
        {
            if(p != null)
            {
                stack.push(p);
                p = p.left;
            }
            else
            {
                Tree.Node<T> t = stack.pop();
                k--;
                if(k == 0)
                {
                    return t;
                }
                p = t.right;
            }
        }
        return null;
    }

    static<T extends Comparable<T>> Tree.Node<T> kthLargest(Tree.Node<T> node, int k)
    {
        if(node == null)
        {
            return null;
        }

        Stack<Tree.Node<T>> stack = new Stack<>();
        Tree.Node<T> p = node;
        while(!stack.isEmpty() || p != null)
        {
            if(p != null)
            {
                stack.push(p);
                p = p.right;
            }
            else
            {
                Tree.Node<T> t = stack.pop();
                k--;
                if(k == 0)
                {
                    return t;
                }
                p = t.left;
            }
        }
        return null;
    }

    static boolean testsPass()
    {
        List<Tree.Node<Integer>> result = new ArrayList<>();
        Tree<Integer> tree = new Tree<>(4, 2, 6, 1, 5, 3, 7);
        depthFirst(tree.root, result);
        int[] a = result.stream().mapToInt(x -> x.data).toArray();
        boolean check = Arrays.equals(new int[] {1, 2, 3, 4, 5, 6, 7}, a);
        if(!check)
        {
            return false;
        }
        result = new ArrayList<>();
        depthFirstReverse(tree.root, result);
        a = result.stream().mapToInt(x -> x.data).toArray();
        check = Arrays.equals(new int[] {7, 6, 5, 4, 3, 2, 1}, a);
        if(!check)
        {
            return false;
        }
        result = depthFirstIterative(tree.root);
        a = result.stream().mapToInt(x -> x.data).toArray();
        check = Arrays.equals(new int[] {1, 2, 3, 4, 5, 6, 7}, a);
        if(!check)
        {
            return false;
        }
        Tree.Node<Integer> kth = kthSmallest(tree.root, 4);
        check = kth.data == 4;
        if(!check)
        {
            return false;
        }
        kth = kthLargest(tree.root, 2);
        check = kth.data == 6;
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
