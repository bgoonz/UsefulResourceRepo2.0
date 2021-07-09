Option Strict On


Module Module1

  Const x As String = "This is a string"

  Sub Main()
    Dim a As Double = 5.678
    Dim b As Int32 = 123

    Console.WriteLine(a.ToString)
    Console.WriteLine(b.ToString)
    Console.WriteLine(456.987.ToString)

    Dim c As Integer
    Console.WriteLine(c.GetType())
    Console.WriteLine(c.GetType().ToString)

    Console.ReadLine()
  End Sub

End Module