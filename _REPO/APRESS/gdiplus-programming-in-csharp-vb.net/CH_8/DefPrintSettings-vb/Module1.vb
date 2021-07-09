Option Strict On

Imports System
Imports System.Drawing.Printing

Module Module1

  Sub Main()
    Dim pd As PrintDocument = New PrintDocument()
    Dim pg As PageSettings = pd.DefaultPageSettings
    Dim ps As PrinterSettings = pg.PrinterSettings

    Console.WriteLine("Printer Settings")
    Console.WriteLine("PrinterName = " + pd.PrinterSettings.PrinterName)
      Console.WriteLine("Is default Printer = " + _
                         ps.IsDefaultPrinter.ToString())
    Console.WriteLine("Is plotter = " + ps.IsPlotter.ToString())
    Console.WriteLine("Is printer valid = " + ps.IsValid.ToString())
    Console.WriteLine("Can Duplex = " + ps.IsValid.ToString())
    Console.WriteLine("Num copies = " + ps.Copies.ToString())
    Console.WriteLine("Max Copies = " + ps.MaximumCopies.ToString())
    Console.WriteLine("Max Page = " + ps.MaximumPage.ToString())
    Console.WriteLine("Min Page = " + ps.MinimumPage.ToString())
    Console.WriteLine("Supports Color = " + ps.SupportsColor.ToString())
    Dim p As PaperSize
    For Each p In ps.PaperSizes
      Console.WriteLine("Supports Paper Size: " + p.PaperName)
    Next
    Dim p1 As PaperSource
    For Each p1 In ps.PaperSources
      Console.WriteLine("Supports Paper Source: " + p1.SourceName)
    Next

    Console.WriteLine("\nPage Settings")
    Console.WriteLine("Is Color = " + pg.Color.ToString())
    Console.WriteLine("Top Bound = " + pg.Bounds.Top.ToString())
    Console.WriteLine("Bottom Bound = " + pg.Bounds.Bottom.ToString())
    Console.WriteLine("Left Bound = " + pg.Bounds.Left.ToString())
    Console.WriteLine("Right Bound = " + pg.Bounds.Right.ToString())
    Console.WriteLine("Top Margin = " + pg.Margins.Top.ToString())
    Console.WriteLine("Bottom Margin = " + pg.Margins.Bottom.ToString())
    Console.WriteLine("Left Margin = " + pg.Margins.Left.ToString())
    Console.WriteLine("Right Margin = " + pg.Margins.Right.ToString())
    Console.WriteLine("Landscape = " + pg.Landscape.ToString())
    Console.WriteLine("PaperSize = " + pg.PaperSize.PaperName)
    Console.WriteLine("PaperSource = " + pg.PaperSource.SourceName)
    Console.WriteLine("PrinterResolution = " + _
                      pg.PrinterResolution.Kind.ToString())
    Console.WriteLine("PrinterResolution X = " + _
                      pg.PrinterResolution.X.ToString())
    Console.WriteLine("PrinterResolution Y = " + _
                      pg.PrinterResolution.Y.ToString())

    Console.ReadLine()

  End Sub

End Module
