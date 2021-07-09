Imports SimpleCarLibrary

Module CarClient

   Sub Main()

      SomeClientMethod()
      Console.ReadLine()
      
   End Sub
   
   Sub SomeClientMethod
      Dim carSvc As New CarService()
      carSvc.GetInfo()
      carSvc.AnotherMethod()   
   End Sub   
End Module