package problems.java.arrays;

import java.util.Arrays;
import java.util.List;

public class AnswerQueries
{
    /*
    Length-N array of booleans, initially all false.
    You will receive Q Set/GET queries.
    When you receive a SET query, the value of the query denotes an index in the array that is set to true.
    When you receive a GET query, you must return the smallest index that contains a true value that is
    greater than or equal to the given index, or -1 if no such index exists.
    Example:
        Input: Size = 5, Queries: [[GET, 2], [SET, 1], [GET, 0], [GET, 2], [GET, 1]]
        Output: [-1, 1, -1, 1]
    */

    static class Query
    {
        enum Type {GET, SET};
        int index;
        Type type;

        Query(Type type, int index)
        {
            this.type = type;
            this.index = index;
        }
    }

    static int [] answerQueries(List<Query> queries, int size)
    {
        boolean[] data = new boolean[size];

        int resultLen = (int)queries.stream().filter(q -> q.type == Query.Type.GET).count();
        int[] result = new int[resultLen];
        int pos = 0;
        for(Query query : queries)
        {
            int queryIndex = query.index;
            switch(query.type)
            {
                case GET:
                    if(data[queryIndex] == true)
                    {
                        result[pos++] = queryIndex;
                    }
                    else
                    {
                        int i;
                        for(i = queryIndex + 1; i < size; ++i)
                        {
                            if(data[i] == true)
                            {
                                break;
                            }
                        }
                        if(i < size)
                        {
                            result[pos++] = i;
                        }
                        else
                        {
                            result[pos++] = -1;
                        }
                    }
                    break;
                case SET:
                    data[queryIndex] = true;
                    break;
            }
        }
        return result;
    }

    static boolean testsPass()
    {
        List<Query> queries = Arrays.asList(
                new Query(Query.Type.GET, 2),
                new Query(Query.Type.SET, 1),
                new Query(Query.Type.GET, 0),
                new Query(Query.Type.GET, 2),
                new Query(Query.Type.GET, 1));

        int[] result = answerQueries(queries, 5);

        boolean check = Arrays.equals(new int[] {-1, 1, -1, 1}, result);
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
