Public Interface ICustomerService
   Function Test() As Integer
   Function CreateCustomer(name As String) As ICustomer
End Interface

Public Interface ICustomer
   Function SayHello() as String
End Interface
