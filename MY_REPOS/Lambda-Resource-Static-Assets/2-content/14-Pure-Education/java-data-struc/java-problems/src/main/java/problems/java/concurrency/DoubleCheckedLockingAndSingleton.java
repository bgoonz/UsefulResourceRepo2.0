package problems.java.concurrency;

public class DoubleCheckedLockingAndSingleton
{
    static class DoubleCheckedLocking
    {
        static class Resource
        {
        }

        private static Resource resource;

        static Resource getInstance()
        {
            if(resource == null)
            {
                synchronized (DoubleCheckedLocking.class)
                {
                    if(resource == null)
                    {
                        resource = new Resource();
                    }
                }
            }
            return resource;
        }
    }

    static class Singleton
    {
        static class Resource
        {
        }

        static class Holder
        {
            static Resource resource = new Resource();
        }

        static Resource getResource()
        {
            return Holder.resource;
        }
    }
}
