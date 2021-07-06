import java.io.*;
import java.util.*;

public class HelloWorld
{
    public static void main(String args[])
    {
        Scanner sc = new Scanner(System.in);
        int i, k, cas, t, j, time_start, time_end, result_seed=0;
        
        int time_ar[] = new int[15];
        cas = sc.nextInt();			
        
        for (t = 0; t < cas; t++)
        {
            time_start = sc.nextInt();
            time_end = sc.nextInt();
            for(i=0;i<10;i++)
            {
                time_ar[i]=sc.nextInt();
            }
            
            for (j = time_start; j < time_end; j++)
            {
                Random random = new Random(j);
                for (k = 0; k < 10; k++)
                {
                    if(random.nextInt(1000) != time_ar[k])
                        break;
                }
                if(k == 10)
                {
                    result_seed = j;
                    System.out.print(result_seed);
                    
                    for(i=0;i<10;i++)
                    {
                        System.out.print(" "+random.nextInt(1000));
                    }
                    System.out.println("");
                }
            }
        }
        
    }
}