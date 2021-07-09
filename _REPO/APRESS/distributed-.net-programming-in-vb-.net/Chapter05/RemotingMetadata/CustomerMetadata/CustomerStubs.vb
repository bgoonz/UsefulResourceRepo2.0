'The CustomerService class stub code
Public Class CustomerService 
   Inherits MarshalByRefObject
   
   Public Function Test() as Integer
      Throw New NotSupportedException("Method cannot be run locally")
   End Function
   
   Public Function CreateCustomer(name As String) As Customer
      Throw New NotSupportedException("Method cannot be run locally")
   End Function
 End Class

'The Customer class stub code
Public Class Customer 
   Inherits MarshalByRefObject
   
   Private mName as String
   
   Public Sub New(name As String)
      Throw New NotSupportedException("Method cannot be run locally")
   End Sub

   Public Function SayHello() As String
      Throw New NotSupportedException("Method cannot be run locally")
   End Function
End Class


