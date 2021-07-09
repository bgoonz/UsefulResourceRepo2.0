Imports CustomerInterfaces

Public Class CustomerService 
   Inherits MarshalByRefObject
   Implements ICustomerService
   
   'A basic test to make sure remoting settings are correct
   Public Function Test() as Integer Implements ICustomerService.Test
      Console.WriteLine("CustomerService.Test()")
      Return 5
   End Function
   
   'A factory method to return a Customer object
   Public Function CreateCustomer(name As String) As ICustomer _
      Implements ICustomerService.CreateCustomer
      
      Console.WriteLine("CustomerService.CreateCustomer(""{0}"")", name)
      Return New Customer(name)
   End Function
 End Class


Public Class Customer 
   Inherits MarshalByRefObject
   Implements ICustomer
   
   Private mName as String
   
   Public Sub New(name As String)
      Console.WriteLine("Customer.ctor(""{0}"")", name)
      mName = name
   End Sub

   Public Function SayHello() As String Implements ICustomer.SayHello
      Console.WriteLine("Customer.SayHello")
      Return "Hello " & mName
   End Function
End Class

