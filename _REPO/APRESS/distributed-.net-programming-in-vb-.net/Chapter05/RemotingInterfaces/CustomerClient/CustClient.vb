Imports System.Runtime.Remoting
Imports CustomerInterfaces

Module CustomerMain

   Sub Main()
     
      'Get a proxy to the remote ICustomerService object
      Dim obj as Object = Activator.GetObject( _
                           GetType(ICustomerService), _
                           "http://localhost:13101/customer.soap" _
                        )
      
      'Cast the returned ObjRef to ICustomerService          
      Dim custSvc As ICustomerService = CType(obj, ICustomerService)

      'Execute the simple Test method
      Console.WriteLine(custSvc.Test())

      'Get a proxy to a remote Customer object
      Dim cust As ICustomer = custSvc.CreateCustomer("Homer")
      Console.WriteLine(cust.SayHello())
      
      Console.ReadLine()
   End Sub
End Module