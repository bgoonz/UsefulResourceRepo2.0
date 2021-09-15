package problems.java.trees;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class BreadthFirst
{
    static<T extends Comparable<T>> List<List<Tree.Node<T>>> breadthFirst(Tree.Node<T> node)
    {
        if(node == null)
        {
            return null;
        }
        List<List<Tree.Node<T>>> result = new ArrayList<>();
        List<Tree.Node<T>> current = new ArrayList<>();
        current.add(node);
        while(!current.isEmpty())
        {
            result.add(current);
            List<Tree.Node<T>> parents = current;
            current = new ArrayList<>();
            for(Tree.Node<T> parent : parents)
            {
                if(parent.left != null)
                {
                    current.add(parent.left);
                }
                if(parent.right != null)
                {
                    current.add(parent.right);
                }
            }
        }

        return result;
    }

    static boolean testsPass()
    {
        Tree<Integer> tree = new Tree<>(4, 2, 6, 1, 5, 3, 7);
        List<List<Tree.Node<Integer>>> list = breadthFirst(tree.root);
        List<Tree.Node<Integer>> l1 = list.get(0);
        boolean check = l1.get(0).data == 4;
        if(!check)
        {
            return false;
        }
        List<Tree.Node<Integer>> l2 = list.get(1);
        check = l2.get(0).data == 2 && l2.get(1).data == 6;
        if(!check)
        {
            return false;
        }
        List<Tree.Node<Integer>> l3 = list.get(2);
        check = l3.get(0).data == 1 &&
                l3.get(1).data == 3 &&
                l3.get(2).data == 5 && l3.get(3).data == 7;
        if(!check)
        {
            return false;
        }
        List<Tree.Node<Integer>> flatList = list.stream()
                .flatMap(List::stream).collect(Collectors.toList());
        int[] a = flatList.stream().mapToInt(x -> x.data).toArray();
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
