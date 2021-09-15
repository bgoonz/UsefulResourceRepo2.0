package problems.java.lists;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class ClonseListWithRandomNode
{
    public static class RandomNode<T>
    {
        public T data;
        public RandomNode<T> next;
        public RandomNode<T> random;

        public RandomNode(T data)
        {
            this.data = data;
        }

        @Override
        public boolean equals(Object o)
        {
            if (this == o) return true;
            if (o == null || getClass() != o.getClass()) return false;
            RandomNode<?> that = (RandomNode<?>) o;
            return Objects.equals(data, that.data);
        }

        @Override
        public int hashCode()
        {
            return Objects.hash(data);
        }
    }

    static<T> RandomNode<T> clone(RandomNode<T> original)
    {
        Map<RandomNode<T>, RandomNode<T>> map = new HashMap<>();

        RandomNode<T> newHead = null;
        RandomNode<T> newTail = null;
        RandomNode<T> current = original;
        while(current != null)
        {
            RandomNode<T> copy = new RandomNode<>(current.data);
            if(newHead == null)
            {
                newHead = newTail = copy;
            }
            else
            {
                newTail.next = copy;
                newTail = copy;
            }

            map.put(current, copy);
            current = current.next;
        }

        for(Map.Entry<RandomNode<T>, RandomNode<T>> e : map.entrySet())
        {
            RandomNode<T> org = e.getKey();
            if(org.random != null)
            {
                RandomNode<T> randomKey = map.get(org.random);
                RandomNode<T> randomValue = map.get(randomKey);
                e.getValue().random = randomValue;
            }
        }

        return newHead;
    }

    static boolean testsPass()
    {
        RandomNode<Integer> rn1 = new RandomNode<>(1);
        RandomNode<Integer> rn2 = new RandomNode<>(2);
        RandomNode<Integer> rn3 = new RandomNode<>(3);
        RandomNode<Integer> rn4 = new RandomNode<>(4);
        RandomNode<Integer> rn5 = new RandomNode<>(5);
        rn1.next = rn2; rn2.next = rn3; rn3.next = rn4; rn4.next = rn5;
        rn1.random = rn3; rn2.random = rn4;
        RandomNode<Integer> newList = clone(rn1);
        boolean check = newList.data == 1;
        if(!check)
        {
            return false;
        }
        check = newList.random.data == 3;
        if(!check)
        {
            return false;
        }
        check = newList.next.data == 2;
        if(!check)
        {
            return false;
        }
        check = newList.next.random.data == 4;
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
