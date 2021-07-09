
Public Class CAOCustomer
   Inherits MarshalByRefObject
   
   Private mName As String

   Public Sub New(name As String)
      Throw New NotSupportedException("Method cannot be run locally")
   End Sub
   
   Public Function SayHello() As String
      Throw New NotSupportedException("Method cannot be run locally")
   End Function
End Class