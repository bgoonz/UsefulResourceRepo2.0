package problems.java.concurrency;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.*;

public class PageRenderer
{
    static class ImageInfo
    {
        String info;

        ImageInfo(String info)
        {
            this.info = info;
        }

        ImageInfo downloadImage() throws InterruptedException
        {
            Thread.sleep(50);
            return new ImageInfo(info);
        }
    }

    private static ExecutorService exec = Executors.newCachedThreadPool();
    private static CompletionService<ImageInfo> completionService = new ExecutorCompletionService<>(exec);

    static List<ImageInfo> renderPage(List<ImageInfo> imageInfos) throws InterruptedException
    {
        List<ImageInfo> result = new ArrayList<>();

        for(ImageInfo imageInfo : imageInfos)
        {
            completionService.submit(() -> imageInfo.downloadImage());
        }

        try
        {
            for(int i = 0; i < imageInfos.size(); ++i)
            {
                Future<ImageInfo> f = completionService.take();
                ImageInfo imageInfo = f.get();
                result.add(imageInfo);
            }
        }
        catch(ExecutionException e)
        {
            Throwable t = e.getCause();
            if(t instanceof RuntimeException)
            {
                throw (RuntimeException)t;
            }
            else if(t instanceof Error)
            {
                throw (Error)t;
            }
            else
            {
                throw new IllegalStateException("Checked exception.", t);
            }
        }

        return result;
    }


    static boolean testsPass() throws InterruptedException
    {
        List<ImageInfo> images = Arrays.asList(new ImageInfo("one"),
                new ImageInfo("two"), new ImageInfo("three"));
        List<ImageInfo> result = renderPage(images);
        boolean check = result.size() == 3;
        if(!check)
        {
            return false;
        }
        return true;
    }

    public static void main(String... args) throws InterruptedException
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
