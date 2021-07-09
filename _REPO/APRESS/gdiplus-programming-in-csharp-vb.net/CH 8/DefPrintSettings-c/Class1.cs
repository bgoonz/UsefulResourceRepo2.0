using System;
using System.Drawing.Printing;

namespace DefPrintSettings_c
{
	class Class1
	{
		[STAThread]
		static void Main(string[] args)
		{
      PrintDocument pd = new PrintDocument();
      PageSettings pg = pd.DefaultPageSettings;
      PrinterSettings ps = pg.PrinterSettings;

      Console.WriteLine("Printer Settings");
      Console.WriteLine("PrinterName = " + pd.PrinterSettings.PrinterName);
      Console.WriteLine("Is default Printer = " +
                         ps.IsDefaultPrinter.ToString());
      Console.WriteLine("Is plotter = " + ps.IsPlotter.ToString());
      Console.WriteLine("Is printer valid = " + ps.IsValid.ToString());
      Console.WriteLine("Can Duplex = " + ps.IsValid.ToString());
      Console.WriteLine("Num copies = " + ps.Copies.ToString());
      Console.WriteLine("Max Copies = " + ps.MaximumCopies.ToString());
      Console.WriteLine("Max Page = " + ps.MaximumPage.ToString());
      Console.WriteLine("Min Page = " + ps.MinimumPage.ToString());
      Console.WriteLine("Supports Color = " + ps.SupportsColor.ToString());
      foreach (PaperSize p in ps.PaperSizes)
        Console.WriteLine("Supports Paper Size: " + p.PaperName);
      foreach (PaperSource p in ps.PaperSources)
        Console.WriteLine("Supports Paper Source: " + p.SourceName);

      Console.WriteLine("\nPage Settings");
      Console.WriteLine("Is Color = " + pg.Color.ToString());
      Console.WriteLine("Top Bound = " + pg.Bounds.Top.ToString());
      Console.WriteLine("Bottom Bound = " + pg.Bounds.Bottom.ToString());
      Console.WriteLine("Left Bound = " + pg.Bounds.Left.ToString());
      Console.WriteLine("Right Bound = " + pg.Bounds.Right.ToString());
      Console.WriteLine("Top Margin = " + pg.Margins.Top.ToString());
      Console.WriteLine("Bottom Margin = " + pg.Margins.Bottom.ToString());
      Console.WriteLine("Left Margin = " + pg.Margins.Left.ToString());
      Console.WriteLine("Right Margin = " + pg.Margins.Right.ToString());
      Console.WriteLine("Landscape = " + pg.Landscape.ToString());
      Console.WriteLine("PaperSize = " + pg.PaperSize.PaperName);
      Console.WriteLine("PaperSource = " + pg.PaperSource.SourceName);
      Console.WriteLine("PrinterResolution = " + 
                        pg.PrinterResolution.Kind.ToString());
      Console.WriteLine("PrinterResolution X = " + 
                        pg.PrinterResolution.X.ToString());
      Console.WriteLine("PrinterResolution Y = " + 
                        pg.PrinterResolution.Y.ToString());

      Console.ReadLine();

    }
	}
}
