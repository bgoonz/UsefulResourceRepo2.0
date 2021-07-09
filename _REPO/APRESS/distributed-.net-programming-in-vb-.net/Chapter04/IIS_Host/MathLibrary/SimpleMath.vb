Public Class SimpleMath
   Inherits MarshalByRefObject

   Public Sub New()
   End Sub

   Public Function Add(n1 As Integer, n2 As Integer) As Integer
      Return n1 + n2
   End Function

   Public Function Subtract(n1 As Integer, n2 As Integer) As Integer
      Return n1 - n2
   End Function
End Class