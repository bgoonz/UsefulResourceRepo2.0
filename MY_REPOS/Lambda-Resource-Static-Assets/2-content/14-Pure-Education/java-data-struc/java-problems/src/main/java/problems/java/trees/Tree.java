package problems.java.trees;


import java.lang.reflect.Array;
import java.util.*;
import java.util.stream.Collectors;

import static problems.java.trees.BreadthFirst.breadthFirst;


public class Tree<T extends Comparable<T>>
{
    public static class Node<T>
    {
        public T data;
        public Node<T> left;
        public Node<T> right;

        public Node(T data)
        {
            this.data = data;
        }
    }

    public Node<T> root;

    public Tree(T... values)
    {
        for(T value : values)
        {
            add(value);
        }
    }


    void add(T value)
    {
        if(root == null)
        {
            root = new Node(value);
        }
        else
        {
            add(root, value);
        }
    }

    private void add(Node<T> node, T value)
    {
        if(value.compareTo(node.data) == -1)
        {
            if(node.left == null)
            {
                node.left = new Node(value);
            }
            else
            {
                add(node.left, value);
            }
        }
        else
        {
            if(node.right == null)
            {
                node.right = new Node(value);
            }
            else
            {
                add(node.right, value);
            }
        }
    }

    static<T extends Comparable<T>> int getHeight(Node<T> node)
    {
        if(node == null)
        {
            return 0;
        }

        return 1 + Math.max(getHeight(node.left), getHeight(node.right));
    }

    static<T extends Comparable<T>> Node<T>[] toArray(Node<T> root)
    {
        List<List<Node<T>>> list = breadthFirst(root);
        List<Node<T>> flatList = list.stream().flatMap(List::stream).collect(Collectors.toList());
        Node<T>[] a = (Node<T>[])Array.newInstance(root.getClass(), flatList.size());
        for(int i = 0; i < flatList.size(); ++i)
        {
            a[i] = flatList.get(i);
        }
        return a;
    }


    static<T extends Comparable<T>> int getSizeBreadthFirst(Node<T> root)
    {
        if(root == null)
        {
            return 0;
        }

        int count = 0;
        Queue<Node<T>> queue = new LinkedList<>();
        queue.offer(root);
        while (!queue.isEmpty())
        {
            count++;
            Node<T> node = queue.poll();
            if(node.left != null)
            {
                queue.add(node.left);
            }
            if(node.right != null)
            {
                queue.add(node.right);
            }
        }
        return count;
    }

    static<T extends Comparable<T>> int getSizeDepthFirst(Node<T> root)
    {
        class Helper
        {
            int count;

            void getSize(Node<T> root)
            {
                if(root == null)
                {
                    return;
                }

                count++;
                getSize(root.left);
                getSize(root.right);
            }
        }
        Helper helper = new Helper();
        helper.getSize(root);
        return helper.count;
    }

    Iterator<T> iterator()
    {
        return new Iterator(root);
    }

    private static class Iterator<T>
    {
        Stack<Node<T>> stack = new Stack<>();

        Iterator(Node<T> node)
        {
            while(node != null)
            {
                stack.push(node);
                node = node.left;
            }
        }

        boolean hasNext()
        {
            return stack.empty();
        }

        Node<T> next()
        {
            Node<T> node = stack.pop();

            if(node.right != null)
            {
                Node temp = node.right;
                while(temp != null)
                {
                    stack.push(temp);
                    temp = temp.left;
                }
            }
            return node;
        }
    }

    static boolean testsPass()
    {
        Tree<Integer> tree = new Tree<>(4, 2, 6, 1, 5, 3, 7);
        Iterator<Integer> iter = tree.iterator();
        boolean check = iter.next().data == 1;
        if(!check)
        {
            return false;
        }
        check = iter.next().data == 2;
        if(!check)
        {
            return false;
        }
        check = iter.next().data == 3;
        if(!check)
        {
            return false;
        }
        check = iter.next().data == 4;
        if(!check)
        {
            return false;
        }
        check = iter.next().data == 5;
        if(!check)
        {
            return false;
        }
        check = iter.next().data == 6;
        if(!check)
        {
            return false;
        }
        check = iter.next().data == 7;
        if(!check)
        {
            return false;
        }
        check = getSizeBreadthFirst(tree.root) == 7;
        if(!check)
        {
            return false;
        }
        check = getSizeDepthFirst(tree.root) == 7;
        if(!check)
        {
            return false;
        }
        Node<Integer>[] nodes = toArray(tree.root);
        int[] a = Arrays.stream(nodes).mapToInt(x -> x.data).toArray();
        check = Arrays.equals(new int[] {4, 2, 6, 1, 3, 5, 7}, a);
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
