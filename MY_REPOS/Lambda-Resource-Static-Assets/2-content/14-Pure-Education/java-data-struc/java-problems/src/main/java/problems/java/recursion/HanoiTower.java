package problems.java.recursion;

import java.util.Arrays;
import java.util.Stack;

public class HanoiTower
{
    private Stack<Integer> disks = new Stack<>();
    static HanoiTower[] init()
    {
        HanoiTower[] towers = new HanoiTower[3];
        for(int i = 0; i < 3; ++i)
        {
            towers[i] = new HanoiTower();
        }
        for(int i = 2; i >= 0; --i)
        {
            towers[0].disks.push(i);
        }
        return towers;
    }
    private void moveTo(HanoiTower dest)
    {
        dest.disks.push(disks.pop());
    }
    private void moveDisks(int n, HanoiTower dest, HanoiTower buffer)
    {
        if(n > 0)
        {
            moveDisks(n - 1, buffer, dest);
            moveTo(dest);
            buffer.moveDisks(n - 1, dest, this);
        }
    }
    static HanoiTower[] play()
    {
        HanoiTower[] towers = init();
        towers[0].moveDisks(3, towers[1], towers[2]);
        return towers;
    }


    static boolean testsPass()
    {
        HanoiTower[] towers = play();
        boolean check = towers[0].disks.size() == 0 &&
                towers[1].disks.size() == 3 && towers[2].disks.size() == 0;

        if(!check)
        {
            return false;
        }

        int[] disks = towers[1].disks.stream().mapToInt(x -> x).toArray();
        check = Arrays.equals(new int[] {2, 1, 0}, disks);
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
