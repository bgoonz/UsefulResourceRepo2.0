package problems.java.companies.facebook.heaps;

import java.util.Arrays;
import java.util.Comparator;
import java.util.PriorityQueue;
import java.util.stream.Collectors;

public class MagicalCandyBags
{
    /*
    https://www.facebookrecruiting.com/portal/coding_practice_question/?problem_id=513590792640579

    You have N bags of candy. The ith bag contains arr[i] pieces of candy, and each of the bags is magical!
    It takes you 1 minute to eat all of the pieces of candy in a bag (irrespective of how many pieces of candy are inside),
    and as soon as you finish, the bag mysteriously refills. If there were x pieces of candy in the bag at the beginning of the minute,
    then after you've finished you'll find that floor(x/2) pieces are now inside.
    You have k minutes to eat as much candy as possible. How many pieces of candy can you eat?

    Example:
        N = 5
        k = 3
        arr = [2, 1, 7, 4, 2]
        output = 14
    In the first minute you can eat 7 pieces of candy. That bag will refill with floor(7/2) = 3 pieces.
    In the second minute you can eat 4 pieces of candy from another bag. That bag will refill with floor(4/2) = 2 pieces.
    In the third minute you can eat the 3 pieces of candy that have appeared in the first bag that you ate.
    */

    static int maxCandies(int[] a, int k)
    {
        PriorityQueue<Integer> pq = new PriorityQueue<>(Comparator.reverseOrder());
        pq.addAll(Arrays.stream(a).boxed().collect(Collectors.toList()));

        int sum = 0;
        for(int i = 0; i < k; ++i)
        {
            int val = pq.poll();
            sum += val;
            pq.offer(val / 2);
        }
        return sum;
    }

    static boolean testsPass()
    {
        boolean check = maxCandies(new int[] {2, 1, 7, 4, 2}, 3) == 14;
        if(!check)
        {
            return false;
        }

        check = maxCandies(new int[] {19, 78, 76, 72, 48, 8, 24, 74, 29}, 3) == 228;
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
