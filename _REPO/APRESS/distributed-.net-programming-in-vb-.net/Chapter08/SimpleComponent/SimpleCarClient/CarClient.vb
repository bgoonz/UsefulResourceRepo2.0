Imports SimpleCarLibrary

Module CarClient

   Sub Main()

      Dim carSvc As New CarService()
      Console.WriteLine(carSvc.GetInfo())

      Console.ReadLine()

   End Sub
End Module