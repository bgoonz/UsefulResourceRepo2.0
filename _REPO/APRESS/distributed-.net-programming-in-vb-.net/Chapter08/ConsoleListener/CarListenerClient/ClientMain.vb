Imports SimpleCarLibrary

Module CarMain

    Sub Main()
      'Activate the well-known object
      Dim remote As Object 
      remote = Activator.GetObject( _
                  GetType(CarService), _
                  "tcp://localhost:13101/CarService")
                  
      Dim carSvc As CarService = CType(remote, CarService)

      'Invoke a method
      Console.WriteLine(carSvc.GetInfo())
    End Sub
End Module
