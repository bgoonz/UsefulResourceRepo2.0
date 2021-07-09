Imports SimpleCarLibrary

Module CarClient

   Sub Main()

      Dim carSvc As CarService = New CarService()
      Console.WriteLine(carSvc.GetInfo())

      Console.ReadLine()
      carSvc.Dispose()

   End Sub
End Module