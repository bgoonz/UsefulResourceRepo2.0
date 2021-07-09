Public Class SimpleMath
   Inherits MarshalByRefObject
      
   Public Sub New()
      Console.WriteLine("SimpleMath ctor called")
   End Sub

   Public Function Add(n1 As Integer, n2 As Integer) As Integer
      Console.WriteLine("SimpleMath.Add({0}, {1})", n1, n2)
      Return n1 + n2
   End Function

   Public Function Subtract(n1 As Integer, n2 As Integer) As Integer
      Console.WriteLine("SimpleMath.Subtract({0}, {1})", n1, n2)
      Return n1 - n2
   End Function 
End Class