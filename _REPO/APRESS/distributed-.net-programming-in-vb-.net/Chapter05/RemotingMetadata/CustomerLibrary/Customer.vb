
Public Class CustomerService 
   Inherits MarshalByRefObject
   
   'A basic test to make sure remoting settings are correct
   Public Function Test() as Integer
      Console.WriteLine("CustomerService.Test()")
      Return 5
   End Function
   
   'A factory method to return a Customer object
   Public Function CreateCustomer(name As String) As Customer
      Console.WriteLine("CustomerService.CreateCustomer(""{0}"")", name)
      Return new Customer(name)
   End Function
 End Class


Public Class Customer 
   Inherits MarshalByRefObject
   
   Private mName as String
   
   Public Sub New(name As String)
      Console.WriteLine("Customer.ctor(""{0}"")", name)
      mName = name
   End Sub

   Public Function SayHello() As String
      Console.WriteLine("Customer.SayHello")
      Return "Hello " & mName
   End Function
End Class

