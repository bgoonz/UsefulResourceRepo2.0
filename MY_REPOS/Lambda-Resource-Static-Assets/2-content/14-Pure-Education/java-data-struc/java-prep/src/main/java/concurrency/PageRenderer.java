package concurrency;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

import static concurrency.Common.launderThrowable;


public class PageRenderer
{
  static class ImageData
  {
  }

  static class ImageInfo
  {
    public ImageData downloadImage()
    {
      return new ImageData();
    }
  }

  private final ExecutorService executor;
  public PageRenderer(ExecutorService executor)
  {
    this.executor = executor;
  }

  private List<ImageInfo> scanForImageInfo(String source)
  {
    return new ArrayList<>();
  }

  private void renderText(String source)
  {
  }

  void renderImage(ImageData imageData)
  {
  }

  void renderPage(String source) throws InterruptedException
  {
    final List<ImageInfo> infos = scanForImageInfo(source);
    CompletionService<ImageData> completionService = new ExecutorCompletionService<>(executor);
    for(final ImageInfo info : infos)
    {
      completionService.submit(() -> info.downloadImage());
    }

    renderText(source);

    try
    {
      for(int i = 0; i < infos.size(); ++i)
      {
        Future<ImageData> f = completionService.take();
        ImageData imageData = f.get();
        renderImage(imageData);
      }
    }
    catch(ExecutionException e)
    {
      throw launderThrowable(e.getCause());
    }
  }
}
