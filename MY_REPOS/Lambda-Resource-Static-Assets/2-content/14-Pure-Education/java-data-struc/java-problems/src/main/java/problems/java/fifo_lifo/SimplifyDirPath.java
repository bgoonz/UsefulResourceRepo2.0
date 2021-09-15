package problems.java.fifo_lifo;

import org.apache.commons.lang3.StringUtils;

import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;
import java.util.stream.Collectors;

public class SimplifyDirPath
{
    static String simplifyDirPath(String path)
    {
        String[] parts = path.split("/");
        if(parts.length == 0)
        {
            return path;
        }

        Queue<String> queue = new LinkedList<>();
        for(String token : parts)
        {
            if(StringUtils.isNotBlank(token) && !token.equals("."))
            {
                if(token.equals("..") && !queue.isEmpty())
                {
                    queue.poll();
                }
                else
                {
                    queue.offer(token);
                }
            }
        }

        return "/" + queue.stream().collect(Collectors.joining("/"));
    }

    static boolean testsPass()
    {
        boolean check = simplifyDirPath("/a/./b/../../c/").equals("/c") &&
                simplifyDirPath("/home//foo/").equals("/home/foo");
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
