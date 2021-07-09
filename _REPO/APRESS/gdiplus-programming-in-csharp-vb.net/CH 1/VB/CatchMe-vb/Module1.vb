
Module Module1

  Sub Main()
    Dim x As Int32 = 100
    Dim y As Int32 = 0
    Dim k As Int32

    Try
      k = x / y
    Catch e As Exception
      Console.WriteLine(e.Message)
    End Try

    Console.ReadLine()
  End Sub

End Module
