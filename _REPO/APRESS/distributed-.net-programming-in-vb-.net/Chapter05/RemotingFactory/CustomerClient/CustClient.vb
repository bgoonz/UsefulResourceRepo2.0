Imports System.Runtime.Remoting
Imports CustomerInterfaces

Module CustomerMain

   Sub Main()
        
      'Use the CustomerFactory to get an ICustomerService object         
      Dim custSvc As ICustomerService = CustomerFactory.CreateCustomerService()
      
      'Execute the simple Test method
      Console.WriteLine(custSvc.Test())

      'Get a proxy to a remote Customer object
      Dim cust As ICustomer = custSvc.CreateCustomer("Homer")
      Console.WriteLine(cust.SayHello())
      
      Console.ReadLine()
   End Sub
End Module