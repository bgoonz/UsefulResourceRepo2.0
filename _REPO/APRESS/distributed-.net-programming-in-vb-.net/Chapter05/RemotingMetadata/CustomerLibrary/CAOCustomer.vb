Public Class CAOCustomer
   Inherits MarshalByRefObject
   
   Private mName As String

   Public Sub New(name As String)
      Console.WriteLine("Customer.ctor(""{0}"")", name)
      mName = name
   End Sub
   
   Public Function SayHello() As String
      Console.WriteLine("Customer.SayHello")
      Return "Hello " & mName
   End Function
End Class
